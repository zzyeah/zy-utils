// import { generateHTML } from "./generate";
// import parse from "./parser";
// import tokenize from "./tokenize";

const markdownText = `
## 标题
这是一个段落。

- 列表项 1
- 列表项 2

这是第二个段落。

1. 西瓜
2. 哈密瓜
`;

const generateHTML = require("./generate");
const parse = require("./parser");
const tokenize = require("./tokenize");

export function markdownToHtml(markdownText: string) {
  // 1. 分词，解析为 token
  const tokens = tokenize(markdownText);

  // 2. 根据上一步得到的tokens 生成抽象语法树
  const ast = parse(tokens);

  // 3. 根据抽象语法树生成 HTML
  const html = generateHTML(ast);

  console.log(html);

  return html;
}

module.exports = markdownToHtml;
