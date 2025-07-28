import "./icon-input.css";
import "../index";
import { BaseComponent } from "../base-component";

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
