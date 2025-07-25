import "../index.js";
import { BaseComponent } from "../base-component.js";
import "./auto-scroll.css";
import img1 from "/src/assets/auto-scroll/image1.jpg";
import img2 from "/src/assets/auto-scroll/image2.jpg";
import img3 from "/src/assets/auto-scroll/image3.jpg";
import img4 from "/src/assets/auto-scroll/image4.jpg";
import img5 from "/src/assets/auto-scroll/image5.jpg";
import img6 from "/src/assets/auto-scroll/image6.png";

export class AutoScroll extends BaseComponent {
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
    this.template = `
    <div class="slider">
        <div class="slide-track">
            <div class="slide">
                <img src='${img1}'/>
            </div>
            <div class="slide">
                <img src='${img2}'/>
            </div>
            <div class="slide">
                <img src='${img3}'/>
            </div>
            <div class="slide">
                <img src='${img4}'/>
            </div>
            <div class="slide">
                <img src='${img5}'/>
            </div>
            <div class="slide">
                <img src='${img6}'/>
            </div>

            <div class="slide">
                <img src='${img1}'/>
            </div>
            <div class="slide">
                <img src='${img2}'/>
            </div>
            <div class="slide">
                <img src='${img3}'/>
            </div>
            <div class="slide">
                <img src='${img4}'/>
            </div>
            <div class="slide">
                <img src='${img5}'/>
            </div>
            <div class="slide">
                <img src='${img6}'/>
            </div>
        </div>
    </div>
    `;

    this.render();
  }
}

customElements.define("auto-scroll", AutoScroll);
