import "../index.js";
import { BaseComponent } from "../base-component.js";
import "./auto-scroll.css";
import { pause, play } from "../../assets/assets.js"; // Assuming these are exported from your assets

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
                <img src='/assets/auto-scroll/image1.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image2.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image3.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image4.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image5.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image6.png'/>
            </div>

            <div class="slide">
                <img src='/assets/auto-scroll/image1.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image2.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image3.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image4.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image5.jpg'/>
            </div>
            <div class="slide">
                <img src='/assets/auto-scroll/image6.png'/>
            </div>
        </div>
    </div>
    <div class="button-container">
    <span class="bg-rounded-button">
      <div class="play-button">
        <icon-button id="scroll-toggle" icon="${pause}" toggle-icon="${play}" size="0.6"></icon-button>
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
