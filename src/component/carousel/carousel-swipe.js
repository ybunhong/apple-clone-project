import "./carousel-swipe.css";
import "../index.js";
import { BaseComponent } from "../base-component.js";

import img1 from "/src/assets/carousel/baseball.jpg";
import img2 from "/src/assets/carousel/ironman.jpg";
import img3 from "/src/assets/carousel/messi.jpg";
import img4 from "/src/assets/carousel/newjune.jpg";
import img5 from "/src/assets/carousel/ted.jpg";
import img6 from "/src/assets/carousel/youth.jpg";
import img7 from "/src/assets/carousel/studio.jpg";
import img8 from "/src/assets/carousel/robot.jpg";
import img9 from "/src/assets/carousel/tom.jpg";

export class CaroselSwipe extends BaseComponent {
  constructor() {
    super();
    this.currentSlide = 0; // Keeps track of the active slide index
    this.interval = null; // Will hold the autoplay interval
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.setupCarousel(); // Sets up button and dot behavior
    this.startAutoPlay(); // Start autoplay when connected
  }

  updateTemplate() {
    this.template = `
      <div class="carousel-wrapper">
        <div class="carousel">
          <!-- Navigation buttons -->
          <div class="carousel-btn prev"></div>
          <div class="carousel-btn next"></div>

          <!-- Slides container for sliding effect -->
          <div class="carousel-slides-container">
            <div class="carousel-slide"><img src="${img1}" /></div>
            <div class="carousel-slide"><img src="${img2}" /></div>
            <div class="carousel-slide"><img src="${img3}" /></div>
            <div class="carousel-slide"><img src="${img4}" /></div>
            <div class="carousel-slide"><img src="${img5}" /></div>
            <div class="carousel-slide"><img src="${img6}" /></div>
            <div class="carousel-slide"><img src="${img7}" /></div>
            <div class="carousel-slide"><img src="${img8}" /></div>
            <div class="carousel-slide"><img src="${img9}" /></div>
            <div class="carousel-slide"><img src="${img1}" /></div>
          </div>
        </div>

        <!-- Dot indicators directly under image -->
        <div class="custom-indicators">
          <button class="active"></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
    `;

    this.render();
  }

  setupCarousel() {
    // Get references to DOM elements inside this component
    const slidesContainer = this.querySelector(".carousel-slides-container");
    const indicators = this.querySelectorAll(".custom-indicators button");
    const nextBtn = this.querySelector(".carousel-btn.next");
    const prevBtn = this.querySelector(".carousel-btn.prev");

    // Shows a slide at given index and updates indicators
    const showSlide = (index) => {
      // Update dot active states
      indicators.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });
      // Slide the container by percentage (index * 100%)
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    };

    // Go to next slide
    nextBtn?.addEventListener("click", () => {
      this.currentSlide = (this.currentSlide + 1) % indicators.length;
      showSlide(this.currentSlide);
      this.resetAutoPlay(); // Reset autoplay on manual change
    });

    // Go to previous slide
    prevBtn?.addEventListener("click", () => {
      this.currentSlide =
        (this.currentSlide - 1 + indicators.length) % indicators.length;
      showSlide(this.currentSlide);
      this.resetAutoPlay(); // Reset autoplay on manual change
    });

    // Click on dot to jump to specific slide
    indicators.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.currentSlide = index;
        showSlide(index);
        this.resetAutoPlay(); // Reset autoplay on manual change
      });
    });

    // Initially show first slide
    showSlide(this.currentSlide);
  }

  // Starts the automatic slide show
  startAutoPlay() {
    this.interval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 9; // 9 slides
      const slidesContainer = this.querySelector(".carousel-slides-container");
      const indicators = this.querySelectorAll(".custom-indicators button");
      // Update dots
      indicators.forEach((btn, i) =>
        btn.classList.toggle("active", i === this.currentSlide)
      );
      // Slide container
      slidesContainer.style.transform = `translateX(-${
        this.currentSlide * 100
      }%)`;
    }, 5000); // every 5 seconds
  }

  // Resets autoplay timer (useful after manual navigation)
  resetAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.startAutoPlay();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.interval); // Clear interval when disconnected
  }
}

customElements.define("carousel-swipe", CaroselSwipe);
