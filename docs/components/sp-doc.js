import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpDoc extends LitElement {

  static properties = {
    data: { type: Object }
  }

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      color: #1a1a1a;
      line-height: 1.6;
      max-width: 860px;
      margin: 0 auto;
      padding: 0 1.5rem 4rem;
    }

    .breadcrumb {
      margin: 2rem 0 1.5rem;
      font-size: 0.875rem;
    }
    .breadcrumb a {
      color: #2563eb;
      text-decoration: none;
    }
    .breadcrumb a:hover { text-decoration: underline; }

    h1 {
      font-size: 1.75rem;
      margin: 0 0 0.25rem;
    }
    h1 code {
      font-family: ui-monospace, monospace;
      font-size: inherit;
    }
    .description {
      color: #555;
      margin: 0 0 2.5rem;
    }

    .section { margin-bottom: 2.5rem; }

    h2 {
      font-size: 1.1rem;
      margin: 0 0 0.75rem;
      padding-bottom: 0.35rem;
      border-bottom: 1px solid #e5e5e5;
    }

    h3.example-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #666;
      margin: 1.75rem 0 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .table-wrap { overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    th {
      text-align: left;
      padding: 0.5rem 0.75rem;
      background: #f5f5f5;
      border: 1px solid #e5e5e5;
      font-weight: 600;
      white-space: nowrap;
    }
    td {
      padding: 0.5rem 0.75rem;
      border: 1px solid #e5e5e5;
      vertical-align: top;
    }
    td code {
      font-family: ui-monospace, monospace;
      font-size: 0.8125rem;
      background: #f0f0f0;
      padding: 0.1em 0.35em;
      border-radius: 3px;
    }
    td.muted { color: #666; font-size: 0.8125rem; }
    .empty-row td { color: #999; font-style: italic; }

    .code-block {
      position: relative;
      background: #f5f5f5;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      overflow: hidden;
    }
    .code-block pre {
      margin: 0;
      padding: 1rem 1.25rem;
      padding-right: 4rem;
      overflow-x: auto;
      font-size: 0.8125rem;
      line-height: 1.55;
    }
    .code-block code {
      font-family: ui-monospace, monospace;
    }
    .copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 0.2rem 0.6rem;
      font-size: 0.75rem;
      cursor: pointer;
      color: #555;
      transition: background 100ms, color 100ms, border-color 100ms;
    }
    .copy-btn:hover { background: #e5e5e5; }
    .copy-btn.copied { color: #16a34a; border-color: #bbf7d0; background: #f0fdf4; }

    .example-preview {
      padding: 1.5rem;
      border: 1px solid #e5e5e5;
      border-bottom: none;
      border-radius: 6px 6px 0 0;
      background: #fff;
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: flex-start;
      min-height: 2.5rem;
    }
    .example-preview + .code-block {
      border-radius: 0 0 6px 6px;
    }
  `

  updated() {
    this._hydrateExamples()
  }

  _hydrateExamples() {
    this.renderRoot
      .querySelectorAll('.example-preview:not([data-hydrated])')
      .forEach(el => {
        el.innerHTML = decodeURIComponent(el.dataset.code)
        const themeEl = el.querySelector('sp-theme')
        if (themeEl) {
          const themeName = themeEl.getAttribute('name') || 'default'
          el.setAttribute('data-theme', themeName)
          if (themeName !== 'default') {
            el.setAttribute('part', `example-preview theme-${themeName}-preview`)
          }
        }
        el.dataset.hydrated = ''
      })
  }

  _copy(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied')
      btn.textContent = 'Copied!'
      setTimeout(() => {
        btn.classList.remove('copied')
        btn.textContent = 'Copy'
      }, 1800)
    }).catch(() => {
      btn.textContent = 'Failed'
      setTimeout(() => { btn.textContent = 'Copy' }, 1800)
    })
  }

  _renderTable(headers, rows, emptyMsg) {
    return html`
      <div class="table-wrap">
        <table>
          <thead>
            <tr>${headers.map(h => html`<th>${h}</th>`)}</tr>
          </thead>
          <tbody>
            ${rows.length === 0
              ? html`<tr class="empty-row"><td colspan="${headers.length}">${emptyMsg}</td></tr>`
              : rows}
          </tbody>
        </table>
      </div>
    `
  }

  _renderExample(ex) {
    return html`
      <div class="example">
        <h3 class="example-label">${ex.label}</h3>
        <div
          class="example-preview"
          part="example-preview"
          data-code="${encodeURIComponent(ex.code)}"
        ></div>
        <div class="code-block">
          <pre><code>${ex.code}</code></pre>
          <button class="copy-btn" @click=${e => this._copy(ex.code, e.currentTarget)}>Copy</button>
        </div>
      </div>
    `
  }

  render() {
    const d = this.data
    if (!d) return html`<p style="padding:2rem;color:#999">Loading…</p>`

    const importSnippet = `import '${d.import}'`

    const attrRows = d.attributes.map(a => html`
      <tr>
        <td><code>${a.name}</code></td>
        <td><code>${a.type}</code></td>
        <td><code>${a.default}</code></td>
        <td class="muted">${a.values || '—'}</td>
        <td>${a.description}</td>
      </tr>
    `)

    const slotRows = d.slots.map(s => html`
      <tr>
        <td><code>${s.name}</code></td>
        <td>${s.description}</td>
      </tr>
    `)

    const partRows = d.parts.map(p => html`
      <tr>
        <td><code>${p.name}</code></td>
        <td>${p.description}</td>
      </tr>
    `)

    return html`
      <nav class="breadcrumb">
        <a href="./index.html">← All components</a>
      </nav>

      <h1><code>&lt;${d.name}&gt;</code></h1>
      <p class="description">${d.description}</p>

      <section class="section">
        <h2>Import</h2>
        <div class="code-block">
          <pre><code>${importSnippet}</code></pre>
          <button class="copy-btn" @click=${e => this._copy(importSnippet, e.currentTarget)}>Copy</button>
        </div>
      </section>

      ${d.attributes.length > 0 ? html`
        <section class="section">
          <h2>Attributes</h2>
          ${this._renderTable(
            ['Name', 'Type', 'Default', 'Values', 'Description'],
            attrRows,
            'No attributes.'
          )}
        </section>
      ` : ''}

      <section class="section">
        <h2>Slots</h2>
        ${this._renderTable(
          ['Name', 'Description'],
          slotRows,
          'No slots.'
        )}
      </section>

      ${d.parts.length > 0 ? html`
        <section class="section">
          <h2>CSS Parts</h2>
          ${this._renderTable(
            ['Part', 'Description'],
            partRows,
            'No exposed parts.'
          )}
        </section>
      ` : ''}

      <section class="section">
        <h2>Examples</h2>
        ${d.examples.map(ex => this._renderExample(ex))}
      </section>
    `
  }
}

customElements.define('sp-doc', SpDoc)
