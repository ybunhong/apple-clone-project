import { renderHTML } from "../utils/renderHTML.js"; // Import the utility

// Base class for all custom components
class BaseComponent extends HTMLElement {
  static get observedAttributes() {
    return []; // subclasses should override this
  }

  constructor() {
    super();
    this.template = ""; // Default template can be overridden in child classes
  }

  connectedCallback() {
    this.render(); // Call render to display initial content
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render(); // Re-render the component with the updated data
    }
  }

  render() {
    // Default render logic using the template defined in child components
    this.innerHTML = ""; // Clear previous content
    this.appendChild(renderHTML(this.template)); // Use renderHTML utility to render the template
  }
}

export { BaseComponent };
