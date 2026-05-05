import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpToast extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: var(--space-9, 1.25rem);
      left: 50%;
      transform: translateX(-50%) translateY(1rem);
      z-index: var(--z-popup, 1000);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    :host([visible]) {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    .toast {
      background: var(--color-surface-2, var(--color-bg-raised, #222));
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full, 9999px);
      color: var(--color-text-alt, var(--color-text));
      font-family: var(--font-body, sans-serif);
      font-size: var(--text-sm, 0.875rem);
      padding: var(--space-4, 0.625rem) var(--space-9, 1.25rem);
      box-shadow: var(--shadow-md, 0 4px 20px rgba(0, 0, 0, 0.4));
      white-space: nowrap;
    }
  `

  static properties = {
    visible: { type: Boolean, reflect: true },
    message: { type: String },
  }

  constructor() {
    super()
    this.visible = false
    this.message = ''
    this._timer = null
  }

  show(message, duration = 2000) {
    if (this._timer) clearTimeout(this._timer)
    this.message = message
    this.visible = true
    this._timer = setTimeout(() => {
      this.visible = false
      this._timer = null
    }, duration)
  }

  render() {
    return html`<div class="toast" part="toast">${this.message}</div>`
  }
}

customElements.define('sp-toast', SpToast)
