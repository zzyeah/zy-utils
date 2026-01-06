// 根据传入的tokens列表生成生抽象语法树

import { Token, TokenType } from "./tokenize";

export type ASTType = "root" | "ordered-list" | "unordered-list";

// 定义根节点类型
export interface RootAST {
  type: ASTType;
  ordered?: boolean;
  children: AST[];
}

// 定义内容节点类型，继承Token的属性
export interface ContentAST extends Pick<Token, "type" | "text" | "level"> {
  children?: ContentAST[];
}

// AST联合类型
export type AST = RootAST | ContentAST;

function parse(tokens: Token[]) {
  const ast: AST = {
    type: "root",
    children: [],
  };

  // 追踪当前的列表
  let currentList: AST | null = null;

  // 遍历所有的 token
  tokens.forEach((token) => {
    switch (token.type) {
      case "heading":
      case "paragraph": {
        currentList = null;
        // 表示当前是标题或者段落
        // 两者处理实际一样
        ast.children.push(token);
        break;
      }
      case "list-item": {
        // 表示为列表项
        // 需要确认是无序列表项还是有序列表项
        // 遇到列表项需要创建列表的父节点
        // 无序列表 -> 父节点：unordered-list
        // 有序列表 -> 父节点：ordered-list
        if (!currentList) {
          // 创建新的列表节点
          currentList = {
            type: token.ordered ? "ordered-list" : "unordered-list",
            children: [],
            ordered: token.ordered,
          };
          ast.children.push(currentList);
        }
        // 将当前的列表项推入列表节点的children中
        if (currentList) {
          currentList.children!.push({
            type: "list-item",
            text: token.text,
          });
        }
        break;
      }

      default:
        break;
    }
  });
  return ast;
}

export default parse;

module.exports = parse;
