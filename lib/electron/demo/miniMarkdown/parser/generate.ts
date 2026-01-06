import { AST } from "./parser";

export function generateHTML(ast: AST): string {
  if (ast.type === "root") {
    return `<div>${ast.children.map(generateHTML).join("")}</div>`;
  }

  if (ast.type === "ordered-list") {
    return `<ol>${ast.children.map(generateHTML).join("")}</ol>`;
  }

  if (ast.type === "unordered-list") {
    return `<ul>${ast.children.map(generateHTML).join("")}</ul>`;
  }

  if (ast.type === "paragraph") {
    return `<p>${ast.text}</p>`;
  }

  if (ast.type === "list-item") {
    return `<li>${ast.text}</li>`;
  }

  if (ast.type === "heading") {
    return `<h${ast.level}>${ast.text}</h${ast.level}>`;
  }

  throw new Error(`Unknown type: ${ast.type}`);
}

module.exports = generateHTML;
