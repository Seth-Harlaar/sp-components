export default {

  'sp-button': {
    name: 'sp-button',
    description: 'A styled button with multiple visual variants, sizes, and states. Self-registers as a custom element - drop it anywhere after importing.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-button.js',
    attributes: [
      {
        name: 'variant',
        type: 'String',
        default: '-',
        values: 'default | primary | outline | ghost | danger | dashed',
        description: 'Visual style of the button.'
      },
      {
        name: 'size',
        type: 'String',
        default: 'md',
        values: 'sm | md | lg',
        description: 'Controls padding and font-size.'
      },
      {
        name: 'full',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Stretches the button to fill its container width.'
      },
      {
        name: 'disabled',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Disables the button and reduces its opacity. Forwarded to the inner <button>.'
      },
      {
        name: 'type',
        type: 'String',
        default: 'button',
        values: 'button | submit | reset',
        description: 'Maps to the native button type attribute. Useful inside <form> elements.'
      }
    ],
    slots: [
      { name: '(default)', description: 'Button label text or child elements (e.g. an icon alongside text).' }
    ],
    parts: [
      { name: 'button', description: 'The inner <button> element. Target with sp-button::part(button) to override shape, spacing, or typography.' }
    ],
    examples: [
      {
        label: 'Variants',
        code: `<sp-button>Default</sp-button>
<sp-button variant="primary">Primary</sp-button>
<sp-button variant="outline">Outline</sp-button>
<sp-button variant="ghost">Ghost</sp-button>
<sp-button variant="danger">Danger</sp-button>
<sp-button variant="dashed">Dashed</sp-button>`
      },
      {
        label: 'Sizes',
        code: `<sp-button size="sm" variant="primary">Small</sp-button>
<sp-button variant="primary">Medium</sp-button>
<sp-button size="lg" variant="primary">Large</sp-button>`
      },
      {
        label: 'Full width',
        code: `<sp-button variant="primary" full>Full Width Button</sp-button>`
      },
      {
        label: 'Disabled',
        code: `<sp-button variant="primary" disabled>Disabled</sp-button>
<sp-button variant="outline" disabled>Also disabled</sp-button>`
      }
    ]
  },

  'sp-card': {
    name: 'sp-card',
    description: 'A content container with optional hover-lift interaction, a colored accent bar, raised shadow, a strong bordered style, and small/large size variants.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-card.js',
    attributes: [
      {
        name: 'interactive',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Adds a pointer cursor and a translateY lift + shadow on hover.'
      },
      {
        name: 'accent',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Renders a 3px color bar across the top of the card using --color-primary (or --sp-card-accent).'
      },
      {
        name: 'raised',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Applies a medium drop-shadow to lift the card off the page.'
      },
      {
        name: 'bordered',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Replaces the default subtle border with a thicker, more prominent border using --color-border-strong.'
      },
      {
        name: 'size',
        type: 'String',
        default: 'md',
        values: 'sm | md | lg',
        description: 'Controls padding and border-radius. sm reduces both; lg increases both.'
      }
    ],
    slots: [
      { name: '(default)', description: 'Any content - headings, paragraphs, buttons, tags, or nested components.' }
    ],
    parts: [
      { name: 'card', description: 'The outer card <div>. Target with sp-card::part(card) to change border-radius, padding, or background.' }
    ],
    examples: [
      {
        label: 'Basic',
        code: `<sp-card>
  <h3 style="margin:0 0 0.5rem">Card title</h3>
  <p style="margin:0;color:#555">Some content inside a card.</p>
</sp-card>`
      },
      {
        label: 'Accent bar',
        code: `<sp-card accent>
  <h3 style="margin:0 0 0.5rem">Accented card</h3>
  <p style="margin:0;color:#555">Note the top color bar.</p>
</sp-card>`
      },
      {
        label: 'Interactive (hover me)',
        code: `<sp-card interactive accent>
  <h3 style="margin:0 0 0.5rem">Interactive card</h3>
  <p style="margin:0;color:#555">Hover to see the lift effect.</p>
</sp-card>`
      },
      {
        label: 'Bordered',
        code: `<sp-card bordered>
  <h3 style="margin:0 0 0.5rem">Bordered card</h3>
  <p style="margin:0;color:#555">Thicker, more prominent border.</p>
</sp-card>`
      },
      {
        label: 'Sizes',
        code: `<sp-card size="sm">
  <p style="margin:0">Small card — tighter padding.</p>
</sp-card>
<sp-card>
  <p style="margin:0">Medium card — default.</p>
</sp-card>
<sp-card size="lg">
  <p style="margin:0">Large card — more breathing room.</p>
</sp-card>`
      }
    ]
  },

  'sp-icon': {
    name: 'sp-icon',
    description: 'Renders an SVG icon by name from the built-in icon set. Supports four sizes, an optional tooltip, and a clickable pointer state.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-icon.js',
    attributes: [
      {
        name: 'name',
        type: 'String',
        default: '-',
        values: 'asana | box | chatgpt | checkmark | circle-dashed | clipboard | clock | code | color-picker | computer-download | crop | dayforce | ddl | figma | garbage | github | key | location | magnifying-glass | pdf | picture | quill | signal | svg-view | v | x',
        description: 'The icon filename (without .svg) to display.'
      },
      {
        name: 'size',
        type: 'String',
        default: 'md',
        values: 'sm | md | lg | xl',
        description: 'Icon dimensions: sm = 16px, md = 20px, lg = 24px, xl = 32px. Override further with --sp-icon-size.'
      },
      {
        name: 'tooltip',
        type: 'String',
        default: '-',
        values: '-',
        description: 'Text shown in a floating tooltip on hover.'
      },
      {
        name: 'clickable',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Adds a pointer cursor and a subtle opacity fade on hover. Native click events work on sp-icon without this attribute — clickable is purely visual.'
      }
    ],
    slots: [],
    parts: [],
    examples: [
      {
        label: 'Basic icons',
        code: `<sp-icon name="github"></sp-icon>
<sp-icon name="clock"></sp-icon>
<sp-icon name="garbage"></sp-icon>
<sp-icon name="magnifying-glass"></sp-icon>`
      },
      {
        label: 'Sizes',
        code: `<sp-icon name="github" size="sm"></sp-icon>
<sp-icon name="github" size="md"></sp-icon>
<sp-icon name="github" size="lg"></sp-icon>
<sp-icon name="github" size="xl"></sp-icon>`
      },
      {
        label: 'Clickable with tooltip',
        code: `<sp-icon name="garbage" clickable tooltip="Delete"></sp-icon>
<sp-icon name="clipboard" clickable tooltip="Copy to clipboard"></sp-icon>
<sp-icon name="key" clickable tooltip="Manage keys"></sp-icon>`
      },
      {
        label: 'Click listener',
        code: `<sp-icon
  name="garbage"
  size="lg"
  clickable
  tooltip="Delete item"
  onclick="alert('Deleted!')"
></sp-icon>`
      }
    ]
  },

  'sp-nav': {
    name: 'sp-nav',
    description: 'A horizontal navigation bar with brand, links, and actions zones. Supports sticky positioning with a frosted-glass blur effect. Includes a built-in theme switcher that connects to sp-theme when present on the page.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-nav.js',
    attributes: [
      {
        name: 'sticky',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Sets position: sticky; top: 0 and switches the background to a semi-transparent blur.'
      }
    ],
    slots: [
      { name: 'brand', description: 'The leftmost zone - logo, site name, or any anchor element.' },
      { name: '(default)', description: 'Navigation links rendered in the center zone.' },
      { name: 'actions', description: 'The rightmost zone - buttons, icon links, or any action controls.' }
    ],
    parts: [
      { name: 'nav', description: 'The outer <nav> element.' },
      { name: 'brand', description: 'The brand wrapper div.' },
      { name: 'links', description: 'The links wrapper div (flex-1, center).' },
      { name: 'actions', description: 'The actions wrapper div (margin-left: auto).' },
      { name: 'theme-switcher', description: 'The theme selector wrapper div.' }
    ],
    examples: [
      {
        label: 'Full nav',
        code: `<sp-nav>
  <strong slot="brand">My Site</strong>
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Blog</a>
  <sp-button slot="actions" variant="primary">Sign in</sp-button>
</sp-nav>`
      },
      {
        label: 'Brand only',
        code: `<sp-nav>
  <span slot="brand">Brand</span>
</sp-nav>`
      }
    ]
  },

  'sp-tag': {
    name: 'sp-tag',
    description: 'A compact pill-shaped label for status, categories, or metadata. Supports five semantic color variants.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-tag.js',
    attributes: [
      {
        name: 'color',
        type: 'String',
        default: '-',
        values: 'primary | success | warning | error | info',
        description: 'Applies a semantic color variant. Omit for the neutral default style.'
      }
    ],
    slots: [
      { name: '(default)', description: 'The tag label text.' }
    ],
    parts: [
      { name: 'tag', description: 'The inner <span> element. Target with sp-tag::part(tag) to adjust padding, radius, or font.' }
    ],
    examples: [
      {
        label: 'All colors',
        code: `<sp-tag>Default</sp-tag>
<sp-tag color="primary">Primary</sp-tag>
<sp-tag color="success">Success</sp-tag>
<sp-tag color="warning">Warning</sp-tag>
<sp-tag color="error">Error</sp-tag>
<sp-tag color="info">Info</sp-tag>`
      }
    ]
  },

  'sp-modal': {
    name: 'sp-modal',
    description: 'A fixed-position modal dialog with a backdrop, heading, close button, body slot, and optional footer slot. Opens and closes via the open attribute or show()/close() methods. Escape key support built in.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-modal.js',
    attributes: [
      {
        name: 'open',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Shows the modal when present. Also controlled via show() and close() methods.'
      },
      {
        name: 'heading',
        type: 'String',
        default: '-',
        values: '-',
        description: 'Text displayed in the modal header. Rendered in uppercase monospace style.'
      }
    ],
    slots: [
      { name: '(default)', description: 'The main body content of the modal.' },
      { name: 'footer', description: 'Action buttons or additional content rendered below the body with a top border.' }
    ],
    parts: [
      { name: 'backdrop', description: 'The full-screen semi-transparent overlay behind the dialog.' },
      { name: 'dialog', description: 'The dialog box itself.' },
      { name: 'header', description: 'The header row containing the heading and close button.' },
      { name: 'body', description: 'The scrollable content area.' },
      { name: 'footer', description: 'The footer area for actions.' }
    ],
    examples: [
      {
        label: 'Basic modal',
        code: `<sp-button onclick="this.getRootNode().querySelector('#demo-modal').show()">Open Modal</sp-button>
<sp-modal id="demo-modal" heading="Confirm Action">
  <p>Are you sure you want to do this?</p>
  <div slot="footer" style="display:flex;gap:0.5rem;justify-content:flex-end">
    <sp-button onclick="this.getRootNode().querySelector('#demo-modal').close()">Cancel</sp-button>
    <sp-button variant="primary" onclick="this.getRootNode().querySelector('#demo-modal').close()">Confirm</sp-button>
  </div>
</sp-modal>`
      }
    ]
  },

  'sp-tabs': {
    name: 'sp-tabs',
    description: 'A tab bar that reads data-label from slotted panel elements and manages which panel is visible. Dispatches a tab-change event when the active tab changes.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-tabs.js',
    attributes: [
      {
        name: 'active',
        type: 'Number',
        default: '0',
        values: '-',
        description: 'Index of the currently active tab panel (zero-based).'
      }
    ],
    slots: [
      { name: '(default)', description: 'Panel elements, each with a data-label attribute for the tab button text.' }
    ],
    parts: [
      { name: 'tab-bar', description: 'The container holding all tab buttons.' },
      { name: 'tab-btn', description: 'Each individual tab button.' },
      { name: 'panels', description: 'The wrapper around the slotted panel content.' }
    ],
    examples: [
      {
        label: 'Basic tabs',
        code: `<sp-tabs>
  <div data-label="Overview">
    <p>Overview panel content.</p>
  </div>
  <div data-label="Details">
    <p>Details panel content.</p>
  </div>
  <div data-label="History">
    <p>History panel content.</p>
  </div>
</sp-tabs>`
      }
    ]
  },

  'sp-toast': {
    name: 'sp-toast',
    description: 'A fixed-position slide-up notification that auto-hides after a configurable duration. Controlled via the show(message, duration) method.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-toast.js',
    attributes: [
      {
        name: 'visible',
        type: 'Boolean',
        default: 'false',
        values: '-',
        description: 'Reflects the visible state. Set automatically by show() - do not set manually.'
      },
      {
        name: 'message',
        type: 'String',
        default: '-',
        values: '-',
        description: 'The text displayed inside the toast. Set automatically by show().'
      }
    ],
    slots: [],
    parts: [
      { name: 'toast', description: 'The pill-shaped toast container.' }
    ],
    examples: [
      {
        label: 'Trigger a toast',
        code: `<sp-toast id="toast"></sp-toast>
<sp-button onclick="this.getRootNode().querySelector('#toast').show('Saved!', 2500)">
  Show Toast
</sp-button>`
      }
    ]
  },

  'sp-theme': {
    name: 'sp-theme',
    description: 'Injects theme CSS tokens into <head> and sets data-theme on <html>. Drop it anywhere on the page — no content wrapping required. The active theme persists across page loads via localStorage and can be switched live by sp-nav\'s built-in theme selector or the setTheme(name) method.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-theme.js',
    attributes: [],
    slots: [
      { name: '(default)', description: 'Optional. Content placed inside sp-theme renders normally via a slot. Wrapping is not required — theming is applied to the whole page regardless.' }
    ],
    parts: [],
    examples: [
      {
        label: 'Basic usage (no wrapping needed)',
        code: `<!-- Drop anywhere on the page — theme applies globally -->
<sp-theme></sp-theme>

<!-- Components pick up tokens automatically -->
<sp-card accent>
  <sp-tag color="primary">Themed</sp-tag>
  <p style="margin:0.5rem 0 0">Theme tokens cascade to all components.</p>
</sp-card>`
      },
      {
        label: 'Pair with sp-nav for live switching',
        code: `<sp-theme></sp-theme>
<sp-nav sticky>
  <strong slot="brand">My App</strong>
</sp-nav>
<!-- sp-nav's theme selector controls sp-theme automatically -->`
      },
      {
        label: 'Programmatic switch',
        code: `<sp-theme id="theme"></sp-theme>
<sp-button onclick="document.querySelector('#theme').setTheme('dark')">
  Switch to dark
</sp-button>
<sp-button onclick="document.querySelector('#theme').setTheme('default')">
  Switch to light
</sp-button>`
      }
    ]
  }

}
