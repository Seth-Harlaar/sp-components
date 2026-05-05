import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tab-bar {
      display: flex;
      gap: var(--space-1, 0.25rem);
      border-bottom: 1px solid var(--color-border);
      padding: 0 var(--space-3, 0.5rem);
    }

    .tab-btn {
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      cursor: pointer;
      color: var(--color-text);
      font-family: var(--font-ui, monospace);
      font-size: var(--text-xs, 0.75rem);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: var(--space-4, 0.75rem) var(--space-5, 1rem);
      transition: color 0.15s ease, border-color 0.15s ease;
    }

    .tab-btn:hover {
      color: var(--color-text-alt, var(--color-text));
    }

    .tab-btn[aria-selected='true'] {
      color: var(--color-accent, var(--color-primary));
      border-bottom-color: var(--color-accent, var(--color-primary));
    }

    .panels {
      padding-top: var(--space-7, 1rem);
    }
  `

  static properties = {
    active:   { type: Number, reflect: true },
    _labels:  { state: true },
  }

  constructor() {
    super()
    this.active = 0
    this._labels = []
  }

  _onSlotChange(e) {
    const panels = e.target.assignedElements()
    this._labels = panels.map((el, i) => el.getAttribute('data-label') || `Tab ${i + 1}`)
    this._syncPanels(panels)
  }

  _syncPanels(panels) {
    panels.forEach((el, i) => {
      if (i === this.active) el.removeAttribute('hidden')
      else el.setAttribute('hidden', '')
    })
  }

  _selectTab(index) {
    this.active = index
    const slot = this.shadowRoot.querySelector('slot')
    if (slot) this._syncPanels(slot.assignedElements())
    this.dispatchEvent(new CustomEvent('tab-change', { detail: { index }, bubbles: true, composed: true }))
  }

  render() {
    return html`
      <div class="tab-bar" part="tab-bar">
        ${this._labels.map((label, i) => html`
          <button
            class="tab-btn"
            part="tab-btn"
            aria-selected=${i === this.active ? 'true' : 'false'}
            @click=${() => this._selectTab(i)}
          >${label}</button>
        `)}
      </div>
      <div class="panels" part="panels">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `
  }
}

customElements.define('sp-tabs', SpTabs)
