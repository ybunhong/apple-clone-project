// src/utils/renderHTML.js
export function renderHTML(template) {
  const tpl = document.createElement("template");
  tpl.innerHTML = template.trim();
  return tpl.content.cloneNode(true); // returns real DOM fragment
}
