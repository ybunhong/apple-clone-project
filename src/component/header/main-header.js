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
      { href: "/index.html", label: "Store" },
      { href: "/pages/iphone.html", label: "Mac" },
      { href: "/pages/iphone.html", label: "iPhone" },
      { href: "/pages/iphone.html", label: "Watch" },
      { href: "/pages/iphone.html", label: "iPad" },
      { href: "/pages/iphone.html", label: "iPhone" },
      { href: "/pages/iphone.html", label: "Watch" },
      { href: "/pages/iphone.html", label: "Vision" },
      { href: "/pages/iphone.html", label: "AirPods" },
      { href: "/pages/iphone.html", label: "Entertainment" },
      { href: "/pages/iphone.html", label: "Accessories" },
      { href: "/pages/iphone.html", label: "Support" },
    ];

    const navList = navItems
      .map((item) => `<span><a href="${item.href}">${item.label}</a></span>`)
      .join("");

    this.template = `
    <header class="main-header-wrapper">
      <section>
        <!-- Left -->
        <div class="header-toolbar">
          <icon-button class="apple-logo" icon="${appleLogo}" size="0.8" href="/index.html"></icon-button>
        </div>

        <!-- Center -->
        <div class="header-navigation" id="header-nav">
          ${navList}
        </div>

        <!-- Right -->
        <div class="header-toolbar">
          <icon-button class="search" icon="${search}" size="0.8" action="searchPanelClose"></icon-button>
          <icon-button class="shopping-cart" icon="${shoppingCart}" size="0.8"></icon-button>
          <icon-button class="hamburger" icon="${hamburger}" size="0.8"></icon-button>
        </div>
      </section>

      <!-- Hidden Panels -->
      <navigation-hover id="overlay-nav"></navigation-hover>
      <search-panel id="search-panel"></search-panel>
    </header>
    `;

    this.render();

    // Navigation hover handling
    const navArea = this.querySelector(".header-navigation");
    const overlay = this.querySelector("#overlay-nav");
    const header = this.querySelector("header");

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
