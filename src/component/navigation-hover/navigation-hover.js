import "./navigation-hover.css";
import { BaseComponent } from "../base-component.js";

export class NavigationHover extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  updateTemplate() {
    const navigationItems = [
      {
        title: "Shop",
        decs: [
          "Shop the latest",
          "Mac",
          "iPad",
          "iPhone",
          "Apple Watch",
          "Apple Vision Pro",
          "Accessories",
        ],
      },
      {
        title: "Quick Links",
        decs: [
          "Find a Store",
          "Order Status",
          "Apple Trade In",
          "Financing",
          "Personal Setup",
          "College Student Offer",
        ],
      },
      {
        title: "Shop Special Stories",
        decs: [
          "Certified Refurbished",
          "Education",
          "Business",
          "Veterans and Military",
          "Government",
        ],
      },
    ];

    const navigationList = navigationItems
      .map((item, index) => {
        const isDimmedGroup = index !== 0; // dim all except the first group
        return `
          <div class="nav-section ${isDimmedGroup ? "dimmed-group" : ""}">
            <p class="nav-title">${item.title}</p>
            <div class="nav-list">
              ${item.decs
                .map((desc) => `<p class="nav-item">${desc}</p>`)
                .join("")}
            </div>
          </div>
        `;
      })
      .join("");

    this.template = `
      <div class="navigation-toolbar">
        <div class="bg-navigation-container">
          <div class="navigation-items">
            ${navigationList}
          </div>
        </div>
      </div>
    `;

    this.render();
  }
}

customElements.define("navigation-hover", NavigationHover);
