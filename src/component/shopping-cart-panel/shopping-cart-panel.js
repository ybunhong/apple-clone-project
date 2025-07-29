import "./shopping-cart-panel.css";
import "../index";
import "/main.css";
import { BaseComponent } from "../base-component.js";
import setting from "/src/assets/icons/setting.svg";
import account from "/src/assets/icons/account.svg";
import saved from "/src/assets/icons/saved.svg";
import order from "/src/assets/icons/order.svg";

class ShoppingCartPanel extends BaseComponent {
  constructor() {
    super();
    this.isOpen = false;
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.renderTemplate();

    window.addEventListener("toggle-panel", (event) => {
      const panelName = event.detail?.panel;
      if (panelName === "shoppingCartPanelClose") {
        this.toggleOpen();
      }
    });
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    const panel = this.querySelector(".shoppingcart-panel");
    if (panel) {
      panel.classList.toggle("open", this.isOpen);
    }
  }

  renderTemplate() {
    const productList = [
      { icon: order, label: "Order" },
      { icon: saved, label: "Saved" },
      { icon: account, label: "Account" },
      { icon: setting, label: "Setting" },
    ];

    const productItems = productList
      .map(
        (item) => `
        <div class="cart-item">
          <icon-button icon="${item.icon}" text="${item.label}"></icon-button>
        </div>
      `
      )
      .join("");

    this.template = `
    <div class="max-width-container">
      <aside class="shoppingcart-panel">
          
        <!-- Hidden -->
      <!--<div class="filledcart-panelcontainer">
          <p style="font-size:32px; font-weight: 600;">Bag</p>
          <base-button label="Review Bag" ></base-button>
          </div> -->

        <div class="cart-panelcontainer">
            <p style="font-size:32px; font-weight: 600;">Your Bag is empty</p>
            <p style="font-size: 12px; color: #afafaf"><a href="#">Sign in</a> to see if you have any saved item</p>
        </div>
        <p style="font-size:14px; padding: 8px">My Profiles</p>
        <div class="product-list">
          ${productItems}
        </div>
      </aside>
      </div>
    `;

    this.render();
  }
}

customElements.define("shoppingcart-panel", ShoppingCartPanel);
