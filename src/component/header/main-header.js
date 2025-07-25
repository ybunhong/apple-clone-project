import "../index.js";
import "./main-header.css";
import {
  appleLogo,
  search,
  shoppingCart,
  hamburger,
} from "../../assets/assets.js";
import { BaseComponent } from "../base-component.js";

export class MainHeader extends BaseComponent {
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
    const navItems = [
      { href: "index.html", label: "Store" },
      { href: "#", label: "Mac" },
      { href: "#", label: "iPhone" },
      { href: "#", label: "Watch" },
      { href: "#", label: "iPad" },
      { href: "#", label: "iPhone" },
      { href: "#", label: "Watch" },
      { href: "#", label: "Vision" },
      { href: "#", label: "AirPods" },
      { href: "#", label: "Entertainment" },
      { href: "#", label: "Accessories" },
      { href: "#", label: "Support" },
    ];
    const navList = navItems
      .map((item) => `<span><a href="${item.href}">${item.label}</a></span>`)
      .join("");
    this.template = `
    <header>
    <section>
        <!--Left-->
        <div class="header-toolbar">
        <icon-button class="apple-logo" icon="${appleLogo}" size="0.8"></icon-button>
        </div>
        <!--center-->
        <div class="header-navigation">
        ${navList}
        </div>
        <div class="header-toolbar">
        <icon-button class="search" icon="${search}" size="0.8"></icon-button>
        <icon-button class="shopping-cart" icon="${shoppingCart}" size="0.8"></icon-button>
        <icon-button class="hamburger" icon="${hamburger}" size="0.8"></icon-button>
        </div>
        </section>
    </header>
    `;

    this.render();
  }
}

customElements.define("main-header", MainHeader);
