import { LitElement, html, css } from 'https://esm.sh/lit@3'

class YourComponentName extends LitElement {
  static styles = css`
    :host { display: block; }

    /* Use tokens — never hardcode colors, spacing, or radii */
    .root {
      color: var(--color-text);
      background: var(--color-bg);
      padding: var(--space-4);
      border-radius: var(--radius-md);
    }
  `

  static properties = {
    // define reactive properties here
  }

  render() {
    /* Add part="" attributes to elements consumers may want to style */
    return html`<div class="root" part="root"><slot></slot></div>`
  }
}

customElements.define('your-component-name', YourComponentName)
