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

import "./icon-button.css";
import { BaseComponent } from "../base-component";

export class IconButton extends BaseComponent {
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

    this.addEventListener("click", (event) => {
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

    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "icon":
          this.icon = newValue || "";
          if (!this.originalIcon) {
            this.originalIcon = this.icon;
          }
          break;
        case "size":
          this.size = IconButton.validateSize(newValue);
          break;
        case "toggle-icon":
          this.toggleIcon = newValue || "";
          this.hasToggleIcon = Boolean(newValue);
          break;
        case "disabled":
          this.disabled = newValue !== null;
          break;
        case "text":
          this.text = newValue || "";
          break;
        case "href":
          this.href = newValue || "";
          this.isLink = Boolean(newValue);
          break;
      }

      this.updateTemplate();
    }
  }

  static validateSize(value) {
    const num = parseFloat(value);
    return Number.isNaN(num) || num <= 0 ? 1 : Math.min(Math.max(num, 0.1), 8);
  }

  setToggleIcon() {
    this.icon = this.isToggled ? this.toggleIcon : this.originalIcon;
    this.updateTemplate();
  }

  updateTemplate() {
    const hasIcon = Boolean(this.icon);
    const hasText = Boolean(this.text);
    const altText = hasText ? this.text : "icon button";
    const sizeStyle = `style="transform: scale(${this.size})"`;
    const disabledAttrs = this.disabled ? 'disabled aria-disabled="true" tabindex="-1"' : "";

    let content = "";

    if (hasIcon) {
      content += `<img src="${this.icon}" alt="${altText}" class="icon-image" />`;
    }

    if (hasText) {
      content += `<span class="icon-button-text">${this.text}</span>`;
    }

    if (!hasIcon && !hasText) {
      content = `<span class="icon-button-text">Button</span>`;
    }

    this.template = this.isLink
      ? `<a href="${this.href}" class="icon-button ${this.disabled ? "icon-button-disabled" : ""}" ${sizeStyle} ${disabledAttrs}>${content}</a>`
      : `<button class="icon-button" ${sizeStyle} ${disabledAttrs}>${content}</button>`;

    this.render();
  }

  // Public API
  toggle() {
    if (this.hasToggleIcon) {
      this.isToggled = !this.isToggled;
      this.setToggleIcon();
    }
  }

  setToggleState(toggled) {
    this.isToggled = Boolean(toggled);
    this.setToggleIcon();
  }

  setText(newText) {
    this.text = newText || "";
    this.setAttribute("text", this.text);
  }

  setIcon(newIcon) {
    this.icon = newIcon || "";
    this.originalIcon = newIcon || "";
    this.setAttribute("icon", this.icon);
  }

  disable() {
    this.disabled = true;
    this.setAttribute("disabled", "");
  }

  enable() {
    this.disabled = false;
    this.removeAttribute("disabled");
  }

  getDebugInfo() {
    return {
      icon: this.icon,
      text: this.text,
      size: this.size,
      isToggled: this.isToggled,
      disabled: this.disabled,
    };
  }
}

customElements.define("icon-button", IconButton);
