// 主要负责提供分词的功能

export type TokenType = "heading" | "paragraph" | "list-item";

export interface Token {
  type: TokenType;
  level?: number;
  ordered?: boolean;
  text: string;
}

function tokenize(text: string) {
  const lines = text.split("\n");
  const tokens: Token[] = [];

  for (const line of lines) {
    // 判断 line 是哪种 Markdown 元素
    if (line.startsWith("#")) {
      // 标题
      // 确定标题的级别
      const level = line.match(/^#+/)![0].length;
      // 获取标题文本
      const text = line.slice(level).trim();
      // 形成token，推入tokens数组中
      tokens.push({
        type: "heading",
        level,
        text,
      });
    } else if (line.startsWith("-")) {
      // 无序列表项
      const text = line.slice(2).trim();
      tokens.push({
        type: "list-item",
        ordered: false,
        text,
      });
    } else if (line.match(/^\d+\./)) {
      // 该行以数字开头和点开头
      // 有序列表项
      const text = line.slice(3).trim();
      tokens.push({
        type: "list-item",
        ordered: true,
        text,
      });
    } else if (line.trim() !== "") {
      // 段落
      tokens.push({
        type: "paragraph",
        text: line.trim(),
      });
    }
  }

  return tokens;
}

module.exports = tokenize;

export default tokenize;
