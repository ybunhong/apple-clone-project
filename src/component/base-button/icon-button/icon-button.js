import "./icon-button.css";

/**
 * IconButton Web Component
 *
 * Usage in HTML:
 * <icon-button
 *   icon="/path/to/default-icon.svg"
 *   toggle-icon="/path/to/toggle-icon.svg"
 *   text="Button Text"
 *   size="1.5"
 *   disabled
 *   action="some-panel"
 *   class="your-css-classes"
 *   href="/your html path"
 * ></icon-button>
 *
 *
 * Attributes:
 * - icon (string): URL/path of the default icon image (optional)
 * - toggle-icon (string): URL/path of the icon to toggle to on click (optional)
 * - text (string): Text content for the button (optional)
 * - size (number): Scale multiplier for the icon size, defaults to 1 (optional)
 * - disabled (boolean): Disables the button and prevents interaction (optional)
 * - action (string): Custom identifier dispatched with "toggle-panel" event on click (optional)
 * - href (string): Navigates to the provided path; renders as a link (<a>) instead of a button if set (optional)
 *
 * Examples:
 * <!-- Icon only -->
 * <icon-button icon="/icons/heart.svg"></icon-button>
 *
 * <!-- Text only -->
 * <icon-button text="Click Me"></icon-button>
 *
 * <!-- Icon + Text -->
 * <icon-button icon="/icons/heart.svg" text="Like"></icon-button>
 *
 * <!-- Icon + Text + Link-->
 * <icon-button icon="/icons/heart.svg" text="Like" href="../index.html"></icon-button>
 *
 * <!-- With toggle functionality -->
 * <icon-button
 *   icon="/icons/heart.svg"
 *   toggle-icon="/icons/heart-filled.svg"
 *   text="Like"
 *   action="like-button"
 * ></icon-button>
 *
 * In JavaScript:
 * const btn = document.querySelector('icon-button');
 *
 * // Programmatically toggle the icon
 * btn.toggle();
 *
 * // Set toggle state explicitly
 * btn.setToggleState(true);  // shows toggle icon
 * btn.setToggleState(false); // shows original icon
 *
 * // Update text content
 * btn.setText("New Text");
 *
 * // Update icon
 * btn.setIcon("/new/icon.svg");
 *
 * // Disable and enable the button
 * btn.disable();
 * btn.enable();
 *
 * Events:
 * - "toggle-panel": dispatched on click if 'action' attribute is set.
 *   Event.detail contains: { panel: actionValue }
 *
 * Accessibility:
 * - Disabled button uses 'disabled' attribute and updates tabindex accordingly.
 * - Proper alt text for icons when no text is present
 */

class IconButton extends BaseComponent {
  static get observedAttributes() {
    return ["icon", "size", "toggle-icon", "disabled", "text", "href"];
  }

  constructor() {
    super();
    this.icon = "";
    this.text = "";
    this.size = 1;
    this.originalIcon = "";
    this.toggleIcon = "";
    this.hasToggleIcon = false;
    this.isToggled = false;
    this.disabled = false;
    this.href = "";
    this.isLink = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.action = this.getAttribute("action");
    this.updateTemplate();
    this.addEventListener("click", event => {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (this.hasToggleIcon) {
        this.isToggled = !this.isToggled;
        this.setToggleIcon();
      }
      if (this.action) {
        this.dispatchEvent(
          new CustomEvent("toggle-panel", {
            bubbles: true,
            composed: true,
            detail: { panel: this.action },
          })
        );
      }
    });
  }

  static validateSize(value) {
    const num = parseFloat(value);
    if (Number.isNaN(num) || num <= 0) {
      console.warn(`Invalid size value: ${value}. Using default size 1.`);
      return 1;
    }
    return Math.min(Math.max(num, 0.1), 8);
  }

  setToggleIcon() {
    this.icon = this.isToggled ? this.toggleIcon : this.originalIcon;
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "icon": {
          this.icon = newValue || "";
          if (!this.originalIcon) {
            this.originalIcon = newValue || "";
          }
          break;
        }
        case "size": {
          const newSize = IconButton.validateSize(newValue);
          // Only update if the size actually changed to prevent unnecessary re-renders
          if (newSize !== this.size) {
            this.size = newSize;
          }
          break;
        }
        case "toggle-icon": {
          this.toggleIcon = newValue || "";
          this.hasToggleIcon = Boolean(newValue);
          break;
        }
        case "disabled": {
          this.disabled = newValue !== null;
          break;
        }
        case "text": {
          this.text = newValue || "";
          break;
        }
        case "href": {
          this.href = newValue || "";
          this.isLink = Boolean(newValue);
          break;
        }
        default: {
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
        }
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    const hasIcon = Boolean(this.icon);
    const hasText = Boolean(this.text);

    // Generate appropriate alt text for accessibility
    const altText = hasText ? this.text : "Button";

    // Build the button content
    let buttonContent = "";

    if (hasIcon) {
      buttonContent += `<img src="${this.icon}" alt="${altText}" class="icon-image" ${this.disabled ? "disabled" : ""}/>`;
    }

    if (hasText) {
      buttonContent += `<span class="button-text ${hasIcon ? "ml-2" : ""}">${this.text}</span>`;
    }
    if (!hasIcon && !hasText) {
      console.warn("IconButton: Neither icon nor text provided. Button may not be accessible.");
      buttonContent = "<span class='button-text'>Button</span>";
    }
    const currentSize = this.size || 1;

    this.template = `
      ${
        this.isLink
          ? `<a href="${this.href}" class="icon-button border-none bg-transparent flex items-center justify-center hover-bg-primary rounded-sm p-1"
                style="--icon-scale: ${currentSize}; transform: scale(var(--icon-scale));"
                ${this.disabled ? "aria-disabled='true' tabindex='-1'" : ""}>
                ${buttonContent}
              </a>`
          : `
      <button class="icon-button border-none bg-transparent flex items-center justify-center  hover-bg-primary rounded-sm p-1" 
      style="--icon-scale: ${currentSize}; transform: scale(var(--icon-scale));" 
      ${this.disabled ? "disabled" : ""}>
        ${buttonContent}
      </button>`
      }
    `;

    this.render();
  }

  // Public methods for external control
  toggle() {
    if (this.hasToggleIcon) {
      this.isToggled = !this.isToggled;
      this.setToggleIcon();
    }
  }

  setToggleState(toggled) {
    if (this.hasToggleIcon) {
      this.isToggled = Boolean(toggled);
      this.setToggleIcon();
    }
  }

  setText(newText) {
    this.text = newText || "";
    this.setAttribute("text", this.text);
    this.updateTemplate();
  }

  setIcon(newIcon) {
    this.icon = newIcon || "";
    this.originalIcon = newIcon || "";
    this.setAttribute("icon", this.icon);
    this.updateTemplate();
  }

  disable() {
    this.disabled = true;
    this.setAttribute("disabled", "");
    this.updateTemplate();
  }

  enable() {
    this.disabled = false;
    this.removeAttribute("disabled");
    this.updateTemplate();
  }

  // Debug method to check current state
  getDebugInfo() {
    return {
      icon: this.icon,
      text: this.text,
      size: this.size,
      originalIcon: this.originalIcon,
      toggleIcon: this.toggleIcon,
      isToggled: this.isToggled,
      disabled: this.disabled,
      hasToggleIcon: this.hasToggleIcon,
    };
  }
}

customElements.define("icon-button", IconButton);
