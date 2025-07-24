import "./base-button.css";
import { BaseComponent } from "../base-component";

export class BaseButton extends BaseComponent {
  static get observedAttributes() {
    return ["label", "variant", "disabled", "type", "action", "href"];
  }

  constructor() {
    super();
    this.label = "";
    this.variant = "primary";
    this.disabled = false;
    this.type = "button";
    this.href = null;
    this.action = null;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (this.action) {
        this.dispatchEvent(
          new CustomEvent("base-button", {
            bubbles: true,
            detail: { action: this.action },
          })
        );
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "label":
          this.label = newValue;
          break;
        case "variant":
          this.variant = newValue;
          break;
        case "type":
          this.type = newValue;
          break;
        case "action":
          this.action = newValue;
          break;
        case "href":
          this.href = newValue;
          break;
        case "disabled":
          this.disabled = newValue !== null && newValue !== "false";
          break;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    const baseClass = "button";
    const variantClass = `button-${this.variant}`;
    const sizeClass = this.type === "status" ? "button-status" : "button-regular";
    const classes = `${baseClass} ${variantClass} ${sizeClass}`;

    if (this.href) {
      this.template = `<a href="${this.href}" class="${classes}">${this.label}</a>`;
    } else {
      this.template = `<button class="${classes}" ${this.disabled ? "disabled" : ""}>${this.label}</button>`;
    }

    this.render();
  }
}

customElements.define("base-button", BaseButton);
