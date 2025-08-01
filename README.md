# Web-clone-Apple

This project is a **frontend clone of the Apple Website**, built entirely with **vanilla JavaScript, HTML, and CSS**. It aims to replicate the layout, user experience of a modern e-commerce website — all without relying on frameworks — to strengthen foundational web development skills.

In addition to coding, the project emphasizes **Information Architecture (IA)**: a focus on organizing files, components, and logic in a way that’s maintainable, scalable, and easy for team collaboration. The structure aligns with how professional development teams manage real-world applications.

---

## Project Setup

### Prerequisites

Ensure the following tools are installed:

- **Git**  
  Check with: `git --version`  
  Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)

- **Git Flow** extension  
  (Optional but recommended for consistent branching)

- **Node.js & npm**  
  Download: [https://nodejs.org/en](https://nodejs.org/en)  
  (Install the **latest LTS version**)

---

### Installation Steps

#### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://git.clp.kr/ybunhonggg/web-clone-apple.git
```

### 2. Install Dependencies

```bash
npm install
```

This command will install all the required dependencies, including:

vite for local development

@commitlint/cli and @commitlint/config-conventional

husky for commit message linting

### 3. Activate Git Hooks (Husky)

```bash
npx husky install
```

This sets up Git hooks on your local machine to enforce commit message rules using Commitlint.

⚠️You must run this command once after cloning, or commit checks will not run.

## 📁 Project Structure

This project follows a modular and scalable file organization to support reusable Web Components, static assets, styles, and utility logic. Below is an overview of the key folders and their responsibilities.

## [Information Architecture] (https://www.figma.com/board/uZPFm8CR4eheu3M30lScnL/IA-iPhone?node-id=0-1&p=f&t=wR5ujmPn4nYaBGDv-0)

## [Figma](https://www.figma.com/design/0fCpkIA6kjDtdP5xNYVoE3/AppleCloneProject?node-id=530-469&p=f&t=5fiZK0YGdK59WrR0-0)

### src/

The `src/` folder contains all application logic, components, styles, and assets.

---

#### src/assets/

Static resources used across the project, including:

- **Images**
- **Icons**
- **SVGs**

These are referenced by components and pages for visual elements.

---

#### src/components/

All reusable Web Components are stored here and organized into two categories:

- **layout/**  
  Composite components built from smaller UI parts.  
  _Example: `product-card`_

- **ui/**  
  Atomic UI elements or base components.  
  _Example: `base-button`, `base-input`_

Each component typically resides in its own folder and may include:

- `.js` file (required)
- `.css` file (optional)

---

#### src/sample/

Contains mock or static data used for development and testing purposes.

- Format: `.js`
- Example use cases:
  - Simulating product lists
  - Testing user profiles
  - Faking API responses

---

#### src/style/

Contains global styling resources used across the application.

- **base/**: Design tokens and foundational styles  
  _(colors, typography, reset, etc.)_

- **utils/**: Utility classes  
  _(e.g., spacing, shadows, z-index helpers)_

- **style/**: Page-specific styles

The main entry file `index.css` imports everything from both `base/` and `utils/`.

---

#### src/utils/

JavaScript helper functions and utilities.

Typical use cases include:

- Fetching or transforming data
- Formatting dates
- String and number manipulation

## Git Strategy & Conventions

To ensure clarity and consistency in this project follows standardized **branch naming** and **commit message** conventions.

---

### Branch Naming Convention

- **Format:** `<name_type>`
- **Style:** lowercase with underscores

#### Examples:

- `button_component`
- `home_page`
- `fix_login_bug`
- `signup_flow_update`

#### Best Practices:

- **Be Descriptive**  
  Use names that clearly describe the purpose of the branch.

- **Use Underscores**  
  Separate words using `_` for readability.  
  _Note: Avoid using hyphens in this convention._

- **Keep It Short**  
  Make it meaningful but concise.

---

### Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) enforced by **CommitLint**.
