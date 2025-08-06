import "./display-iphone.css";
import "../index.js";
import { BaseComponent } from "../base-component.js";
import { products } from "../../data/sample-data.js";

export class DisplayIphone extends BaseComponent {
  static get observedAttributes() {
    return ["label"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "label") {
        this.label = newValue;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    const templateHTML = products
      .map((product) => {
        const specsHTML = product.specs
          .map(
            (spec) => `
          <div class="spec-item">
            <img src="${spec.icon}" alt="${spec.label}" class="spec-icon" />
            <p class="spec-label" style="font-size:12px">${spec.label}</p>
          </div>
        `
          )
          .join("");

        return `
        <div class="product-container">
          <img src="${product.image}" alt="${product.name}" />
          <p class="product-name" style="font-size:24px; font-weight: 600">${product.name}</p>
          <p class="product-desc" style="font-size:12px;">${product.description}</p>
          <p class="product-price" style="font-size:12px; font-weight: 600">${product.price}</p>
          <div class="product-btn">
            <base-button label="Learn more"></base-button>
            <p><a href="#">Buy now ></a></p>
            </div>
          <hr />
          <div class="product-specs">${specsHTML}</div>
        </div>
      `;
      })
      .join("");

    this.template = `
    <div class="product-parent">
      ${templateHTML}
    </div>
  `;

    this.render();
  }
}

customElements.define("display-iphone", DisplayIphone);
