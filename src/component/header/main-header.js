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
    if (oldValue !== newValue && name === "label") {
      this.label = newValue;
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
    <header class="main-header-wrapper">
      <section>
        <!-- Left -->
        <div class="header-toolbar">
          <icon-button class="apple-logo" icon="${appleLogo}" size="0.8"></icon-button>
        </div>

        <!-- Center -->
        <div class="header-navigation" id="header-nav">
          ${navList}
        </div>

        <!-- Right -->
        <div class="header-toolbar">
          <icon-button class="search" icon="${search}" size="0.8"></icon-button>
          <icon-button class="shopping-cart" icon="${shoppingCart}" size="0.8"></icon-button>
          <icon-button class="hamburger" icon="${hamburger}" size="0.8"></icon-button>
        </div>
      </section>

      <!-- Hidden Navigation Hover -->
      <navigation-hover id="overlay-nav"></navigation-hover>
    </header>
    `;

    this.render();

    const navArea = this.querySelector(".header-navigation");
    const overlay = this.querySelector("#overlay-nav");
    const header = this.querySelector("header"); // target <header>

    let hideTimeout;

    navArea.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
      overlay.style.display = "block";
      header.classList.add("active-overlay");
    });

    navArea.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        overlay.style.display = "none";
        header.classList.remove("active-overlay");
      }, 200);
    });

    overlay.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
    });

    overlay.addEventListener("mouseleave", () => {
      overlay.style.display = "none";
      header.classList.remove("active-overlay");
    });
  }
}

customElements.define("main-header", MainHeader);
