import "./menu-panel.css";
import "../index";
import "/main.css";
import { BaseComponent } from "../base-component.js";
import cross from "/src/assets/icons/cross.svg";
import chevorn from "/src/assets/icons/chevorn.svg";

export class MenuPanel extends BaseComponent {
  constructor() {
    super();
    this.isOpen = false;
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.renderTemplate();

    window.addEventListener("toggle-panel", (event) => {
      const panelName = event.detail?.panel;
      if (panelName === "menuPanelClose") {
        this.toggleOpen();
      }
    });

    this.addEventListener("toggle-panel", (event) => {
      if (event.detail?.panel === "closeMenuPanel") {
        this.toggleOpen();
      }
    });
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    const panel = this.querySelector(".menu-panel");
    if (panel) {
      panel.classList.toggle("open", this.isOpen);
    }
  }

  renderTemplate() {
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
      .map(
        (item) => `
        <div class="menu-item">
          <span><a href="${item.href}">${item.label}</a></span>
          <icon-button icon="${chevorn}"></icon-button>
        </div>`
      )
      .join("");

    this.template = `
        <aside class="menu-panel">
          <div style="width: 100%; display: flex; justify-content: end; padding: 5% 0">
            <icon-button icon="${cross}" action="closeMenuPanel"></icon-button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 24px;">
            ${navList}
          </div>
        </aside>
    `;

    this.render();
  }
}

customElements.define("menu-panel", MenuPanel);
