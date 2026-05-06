import { LitElement, html, css } from 'https://esm.sh/lit@3'
import { unsafeHTML } from 'https://esm.sh/lit@3/directives/unsafe-html.js'

const ICONS_URL = new URL('./icons/', import.meta.url).href
const cache = new Map()

async function loadIcon(name) {
  if (cache.has(name)) return cache.get(name)
  try {
    const res = await fetch(`${ICONS_URL}${name}.svg`)
    const text = res.ok ? await res.text() : ''
    cache.set(name, text)
    return text
  } catch {
    cache.set(name, '')
    return ''
  }
}

class SpIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      color: inherit;
      --sp-icon-size: 20px;
    }

    :host([size="sm"]) { --sp-icon-size: 16px; }
    :host([size="md"]) { --sp-icon-size: 20px; }
    :host([size="lg"]) { --sp-icon-size: 24px; }
    :host([size="xl"]) { --sp-icon-size: 32px; }

    :host([clickable]) { cursor: pointer; }
    :host([clickable]:hover) svg { opacity: 0.7; }

    svg {
      display: block;
      width: var(--sp-icon-size);
      height: var(--sp-icon-size);
      transition: opacity 120ms ease;
    }

    .tooltip {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-bg-overlay, #1e293b);
      color: var(--color-text, #f1f5f9);
      font-family: var(--font-family-base, system-ui, sans-serif);
      font-size: 0.75rem;
      line-height: 1.4;
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-sm, 4px);
      white-space: nowrap;
      pointer-events: none;
      z-index: var(--z-popup, 9999);
      opacity: 0;
      visibility: hidden;
      transition: opacity 150ms ease, visibility 150ms ease;
    }

    :host(:hover) .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `

  static properties = {
    name:      { type: String },
    size:      { type: String, reflect: true },
    tooltip:   { type: String },
    clickable: { type: Boolean, reflect: true },
    _svg:      { state: true },
  }

  constructor() {
    super()
    this.size = 'md'
    this._svg = ''
  }

  updated(changed) {
    if (changed.has('name') && this.name) this._load()
  }

  async _load() {
    this._svg = ''
    this._svg = await loadIcon(this.name)
  }

  render() {
    return html`
      ${unsafeHTML(this._svg)}
      ${this.tooltip ? html`<span class="tooltip">${this.tooltip}</span>` : ''}
    `
  }
}

customElements.define('sp-icon', SpIcon)
