import "../index.js";
import "./hero-banner.css";
import { BaseComponent } from "../base-component.js";

export class HeroBanner extends BaseComponent {
  static get observedAttributes() {
    return [
      "title",
      "desc",
      "position-button",
      "primary-button",
      "secondary-button",
      "src",
      "logo",
      "colorful-text"
    ];
  }

  constructor() {
    super();
    this.title = "";
    this.desc = "";
    this.positionButton = ""; 
    this.primaryButton = "";  
    this.secondaryButton = ""; 
    this.src = "";
    this.logo = "";
    this.colorfulText = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "title":
          this.title = newValue || "";
          break;
        case "desc":
          this.desc = newValue || "";
          break;
        case "position-button":
          this.positionButton = newValue || "center";
          break;
        case "primary-button":
          this.primaryButton = newValue || "";
          break;
        case "secondary-button":
          this.secondaryButton = newValue || "";
          break;
        case "src":
          this.src = newValue || "";
          break;
        case "logo":
          this.logo = newValue || "";
          break;
        case "colorful-text":
          this.colorfulText = newValue || "";
          break;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    const hasButtons = this.primaryButton || this.secondaryButton;

    this.template = /* html */ `
      <section class="hero-banner">
        <img src="${this.src}" alt="hero background" class="hero-img" />

        <div class="hero-content ${this.positionButton}">
          ${this.logo ? `<img src="${this.logo}" alt="logo" class="hero-logo" />` : ""}
          <h2 class="hero-title">${this.title}</h2>
          <p class="hero-desc">${this.desc}</p>
          <p class="hero-colorful-text">${this.colorfulText}</p>

          ${
            hasButtons
              ? `<div class="hero-buttons">
                  ${
                    this.primaryButton
                      ? `<base-button label="${this.primaryButton}" variant="primary"></base-button>`
                      : ""
                  }
                  ${
                    this.secondaryButton
                      ? `<base-button label="${this.secondaryButton}" variant="secondary"></base-button>`
                      : ""
                  }
                </div>`
              : ""
          }
        </div>
      </section>
    `;

    this.render();
  }
}

customElements.define("hero-banner", HeroBanner);
