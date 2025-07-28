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
        <div class="slide-track" id="scroll-track">
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
    <div class="button-container">
    <span class="bg-rounded-button">
      <div class="play-button">
        <icon-button id="scroll-toggle" icon="/src/assets/icons/pause-button.svg" toggle-icon="/src/assets/icons/play-button.svg" size="0.6"></icon-button>
      </div>
      </span>
    </div>
    `;

    this.render();

    const track = this.querySelector("#scroll-track");
    const toggleButton = this.querySelector("#scroll-toggle");

    let isScrolling = true;

    if (track && toggleButton) {
      toggleButton.addEventListener("click", () => {
        isScrolling = !isScrolling;
        track.style.animationPlayState = isScrolling ? "running" : "paused";
      });
    }
  }
}

customElements.define("auto-scroll", AutoScroll);
