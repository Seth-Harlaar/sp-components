import { LitElement, html } from 'https://esm.sh/lit@3'

const THEMES_URL  = new URL('../themes/', import.meta.url).href
const STORAGE_KEY = 'sp-theme'

class SpTheme extends LitElement {
  #name       = 'default'
  #tokensLink = null
  #themeLink  = null

  // Read-only — external code can observe the active theme but not set it.
  // The only mutation path is setTheme(), called by sp-nav's built-in switcher.
  get name() { return this.#name }

  connectedCallback() {
    super.connectedCallback()
    this.#name = localStorage.getItem(STORAGE_KEY) || 'default'
    this.#tokensLink = this.#injectLink(`${THEMES_URL}default.css`, 'sp-theme-tokens')
    this.#themeLink  = this.#injectLink(`${THEMES_URL}${this.#name}.css`, 'sp-theme-active')
    document.documentElement.setAttribute('data-theme', this.#name)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.#tokensLink?.remove()
    this.#themeLink?.remove()
    document.documentElement.removeAttribute('data-theme')
  }

  setTheme(name) {
    this.#name = name
    localStorage.setItem(STORAGE_KEY, name)
    document.documentElement.setAttribute('data-theme', name)
    if (this.#themeLink) this.#themeLink.href = `${THEMES_URL}${name}.css`
  }

  #injectLink(href, id) {
    let el = document.head.querySelector(`#${id}`)
    if (!el) {
      el = document.createElement('link')
      el.rel = 'stylesheet'
      el.id  = id
      document.head.appendChild(el)
    }
    el.href = href
    return el
  }

  render() {
    return html`<slot></slot>`
  }
}

customElements.define('sp-theme', SpTheme)
