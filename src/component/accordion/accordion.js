import "./accordion.css";
import { BaseComponent } from "../base-component.js";
import { chevorn } from "../../assets/assets.js";
import { sampleSets } from "../../sample/sample-data.js";

export class BaseAccordion extends BaseComponent {
  static get observedAttributes() {
    return ["title", "data-key"];
  }

  constructor() {
    super();
    this.title = "Untitled";
    this.data = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
    this.updateTemplate();
    this.render();
    this.cacheElements();
    this.setupToggle();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "title") this.title = newValue || "Untitled";
      if (name === "data-key") this.loadData();
      this.updateTemplate();
      this.render();
      this.cacheElements();
      this.setupToggle();
    }
  }

  loadData() {
    const key = this.getAttribute("data-key");
    this.data = sampleSets[key] || [];
    if (!this.data.length) {
      console.warn(`No data found for key: "${key}"`);
    }
  }

  updateTemplate() {
    const rows = this.data
      .map((item) => {
        const label = item["desc-label"]
          ? `<div class="desc-label">${item["desc-label"]}</div>`
          : `<div class="row-label">${item.label || ""}</div>`;
        const value = item["desc-value"]
          ? `<ul class="desc-value-list">${item["desc-value"]
              .split(";")
              .map((v) => `<li>${v.trim()}</li>`)
              .join("")}</ul>`
          : `<div class="row-value">${item.value || ""}</div>`;
        return `<div class="row">${label}${value}</div>`;
      })
      .join("");

    this.template = `
      <div class="accordion">
        <div class="accordion-head">
          <span>${this.title}</span>
          <icon-button
            class="accordion-toggle toggle-icon"
            icon="${chevorn}"
            size="0.8"
            action="accordion-toggle"
          ></icon-button>
        </div>
        <div class="accordion-content">${rows}</div>
      </div>
    `;
  }

  render() {
    this.innerHTML = this.template;
  }

  cacheElements() {
    this.accordionEl = this.firstElementChild;
    if (!this.accordionEl) return;
    const [head, content] = this.accordionEl.children;
    this.headEl = head;
    this.contentEl = content;
    this.toggleButtonEl = head.querySelector("icon-button");
  }

  setupToggle() {
    if (!this.headEl || !this.contentEl || !this.toggleButtonEl) return;

    const toggle = () => {
      this.accordionEl.classList.toggle("open");
      this.toggleButtonEl.toggle();
    };

    this.headEl.addEventListener("click", toggle);
    this.toggleButtonEl.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });
  }
}

customElements.define("base-accordion", BaseAccordion);
