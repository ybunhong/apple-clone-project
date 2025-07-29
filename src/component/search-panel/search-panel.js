import "./search-panel.css";
import "../index";
import "/main.css";
import { BaseComponent } from "../base-component.js";
import arrowIcon from "/src/assets/icons/arrow.svg"; // Static image path

class SearchPanel extends BaseComponent {
  constructor() {
    super();
    this.isOpen = false;
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.renderTemplate();

    window.addEventListener("toggle-panel", (event) => {
      const panelName = event.detail?.panel;
      if (panelName === "searchPanelClose") {
        this.toggleOpen();
      }
    });
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    const panel = this.querySelector(".search-panel");
    if (panel) {
      panel.classList.toggle("open", this.isOpen);
    }
  }

  renderTemplate() {
    const productList = [
      "Find a Store",
      "Apple Vision Pro",
      "AirPods",
      "Apple Intelligence",
      "Apple Trade In",
    ];

    const productItems = productList
      .map(
        (label) => `
        <div class="product-item">
          <icon-button icon="${arrowIcon}" text="${label}"></icon-button>
        </div>
      `
      )
      .join("");

    this.template = `
    <div class="max-width-container">
      <aside class="search-panel">
          <icon-input
            icon-input="/src/assets/icons/search.svg"
            text="Search apple.com"
          ></icon-input>
        <p style="font-size:14px; padding: 8px">Quick Link</p>
        <div class="product-list">
          ${productItems}
        </div>
      </aside>
      </div>
    `;

    this.render();
  }
}

customElements.define("search-panel", SearchPanel);
