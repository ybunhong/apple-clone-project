# Web-clone-Apple

# Porsche Store Frontend Clone

This project is a **frontend clone of the Porsche online store**, built entirely with **vanilla JavaScript, HTML, and CSS**. It aims to replicate the layout, user experience, and core functionality of a modern e-commerce website — all without relying on frameworks — to strengthen foundational web development skills.

In addition to coding, the project emphasizes **Information Architecture (IA)**: a focus on organizing files, components, and logic in a way that’s maintainable, scalable, and easy for team collaboration. The structure aligns with how professional development teams manage real-world applications.

---

## Project Setup

###  Prerequisites

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
