import "./icon-input.css";
import "../index";
import { BaseComponent } from "../base-component";

/**
 * IconInput Web Component
 *
 * Usage in HTML:
 * <icon-input
 *   text="Search for products"
 *   icon-input="/assets/icons/search.svg"
 * ></icon-input>
 *
 * Attributes:
 * - text (string): Placeholder text for the input field.
 * - icon-input (string): Path or URL to the icon displayed inside the input.
 *
 * Notes:
 * - The icon is rendered using the <icon-button> component.
 * - Make sure the <icon-button> component is globally registered.
 * - The input element is currently uncontrolled (no event binding or state handling).
 * - The `action` attribute is read on `connectedCallback` but not used — remove or implement if needed.
 */

export class IconInput extends BaseComponent {
  static get observedAttributes() {
    return ["text", "icon-input"];
  }

  constructor() {
    super();
    this.text = "";
    this.iconInput = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.action = this.getAttribute("action");
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "text":
          this.text = newValue || "";
          break;
        case "icon-input":
          this.iconInput = newValue || "";
          break;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = `

      <div class="search-input">
        <icon-button icon="${this.iconInput}" size="2.1"></icon-button>
        <input type="text" placeholder="${this.text}" />
      </div>
    `;

    this.render();
  }
}

customElements.define("icon-input", IconInput);
