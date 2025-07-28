import "../index.js";
import "./hero-banner.css";
import { BaseComponent } from "../base-component.js";

export class HeroBanner extends BaseComponent {
  static get observedAttributes() {
    return [
      "title",
      "desc",
      "icon",
      "icon-size",
      "toggle-icon",
      "position-button",
      "primary-button",
      "secondary-button",
      "href-primary",
      "href-secondary",
      "src",
      "logo",
      "color-text",
      "colorful-text",
    ];
  }

  constructor() {
    super();
    this.title = "";
    this.desc = "";
    this.positionButton = "";
    this.primaryButton = "";
    this.secondaryButton = "";
    this.hrefPrimary = "";
    this.hrefSecondary = "";
    this.src = "";
    this.logo = "";
    this.colorfulText = "";
    this.colorText = "";
    this.icon = "";
    this.iconSize = "";
    this.toggleIcon = "";
  }

  connectedCallback() {
    super.connectedCallback();
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
        case "href-primary":
          this.hrefPrimary = newValue || "";
          break;
        case "href-secondary":
          this.hrefSecondary = newValue || "";
          break;
        case "src":
          this.src = newValue || "";
          break;
        case "icon":
          this.icon = newValue || "";
          break;
        case "icon-size":
          this.iconSize = newValue || "";
          break;
        case "toggle-icon":
          this.toggleIcon = newValue || "";
          break;
        case "logo":
          this.logo = newValue || "";
          break;
        case "colorful-text":
          this.colorfulText = newValue || "";
          break;
        case "color-text":
          this.colorText = newValue || "black";
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
          <div class="hero-inner">
            ${
              this.logo
                ? `<img src="${this.logo}" alt="logo" class="hero-logo" />`
                : ""
            }

            <h2 class="hero-title" style="color: ${this.colorText}">
              ${this.title}
            </h2>

            <p class="hero-desc" style="color: ${this.colorText}">
              ${this.desc}
            </p>

            ${
              hasButtons
                ? `<div class="hero-buttons">
                    ${
                      this.primaryButton
                        ? `<base-button label="${this.primaryButton}" variant="primary" href="${this.hrefPrimary}"></base-button>`
                        : ""
                    }
                    ${
                      this.secondaryButton
                        ? `<base-button label="${this.secondaryButton}" variant="secondary" href="${this.hrefSecondary}"></base-button>`
                        : ""
                    }
                  </div>`
                : ""
            }

            ${
              this.colorfulText
                ? `<p class="hero-colorful-text">${this.colorfulText}</p>`
                : ""
            }
            ${
              this.icon
                ? `<icon-button icon="${this.icon}" size="${this.iconSize}" toggle-icon="${this.toggleIcon}"></icon-button>`
                : ""
            }
          </div>
        </div>
      </section>
    `;

    this.render();
  }
}

customElements.define("hero-banner", HeroBanner);
