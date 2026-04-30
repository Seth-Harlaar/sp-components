export default {

  'sp-button': {
    name: 'sp-button',
    description: 'A styled button with multiple visual variants, sizes, and states. Self-registers as a custom element — drop it anywhere after importing.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-button.js',
    attributes: [
      {
        name: 'variant',
        type: 'String',
        default: '—',
        values: 'default | primary | outline | ghost',
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
        values: '—',
        description: 'Stretches the button to fill its container width.'
      },
      {
        name: 'disabled',
        type: 'Boolean',
        default: 'false',
        values: '—',
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
<sp-button variant="ghost">Ghost</sp-button>`
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
    description: 'A content container with an optional hover-lift interaction and a colored accent bar at the top.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-card.js',
    attributes: [
      {
        name: 'interactive',
        type: 'Boolean',
        default: 'false',
        values: '—',
        description: 'Adds a pointer cursor and a translateY lift + shadow on hover.'
      },
      {
        name: 'accent',
        type: 'Boolean',
        default: 'false',
        values: '—',
        description: 'Renders a 3px color bar across the top of the card using --color-primary (or --sp-card-accent).'
      }
    ],
    slots: [
      { name: '(default)', description: 'Any content — headings, paragraphs, buttons, tags, or nested components.' }
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
      }
    ]
  },

  'sp-nav': {
    name: 'sp-nav',
    description: 'A horizontal navigation bar with brand, links, and actions zones. Supports sticky positioning with a frosted-glass blur effect.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-nav.js',
    attributes: [
      {
        name: 'sticky',
        type: 'Boolean',
        default: 'false',
        values: '—',
        description: 'Sets position: sticky; top: 0 and switches the background to a semi-transparent blur.'
      }
    ],
    slots: [
      { name: 'brand', description: 'The leftmost zone — logo, site name, or any anchor element.' },
      { name: '(default)', description: 'Navigation links rendered in the center zone.' },
      { name: 'actions', description: 'The rightmost zone — buttons, icon links, or any action controls.' }
    ],
    parts: [
      { name: 'nav', description: 'The outer <nav> element.' },
      { name: 'brand', description: 'The brand wrapper div.' },
      { name: 'links', description: 'The links wrapper div (flex-1, center).' },
      { name: 'actions', description: 'The actions wrapper div (margin-left: auto).' }
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
        default: '—',
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

  'sp-theme': {
    name: 'sp-theme',
    description: 'Loads theme CSS tokens into document.head and sets the data-theme attribute on itself. Wrap any content that should be themed — CSS custom properties cascade through Shadow DOM into all nested components.',
    import: 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-theme.js',
    attributes: [
      {
        name: 'name',
        type: 'String',
        default: 'default',
        values: 'default | dark | custom',
        description: 'Sets the active theme. Resolves theme CSS relative to the component\'s CDN URL. "custom" requires a themes/custom.css in the same repo.'
      }
    ],
    slots: [
      { name: '(default)', description: 'All content to be themed. CSS custom properties cascade from sp-theme into all descendant shadow roots.' }
    ],
    parts: [],
    examples: [
      {
        label: 'Light theme (default)',
        code: `<sp-theme name="default">
  <sp-card accent>
    <sp-tag color="primary">Light theme</sp-tag>
    <p style="margin:0.5rem 0 0">Themed card and tag.</p>
  </sp-card>
</sp-theme>`
      },
      {
        label: 'Dark theme',
        code: `<sp-theme name="dark">
  <sp-card accent>
    <sp-tag color="info">Dark mode</sp-tag>
    <p style="margin:0.5rem 0 0">Themed card and tag.</p>
  </sp-card>
</sp-theme>`
      }
    ]
  }

}
