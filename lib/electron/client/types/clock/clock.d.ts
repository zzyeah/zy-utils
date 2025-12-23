// 方案1：扩展Window接口（推荐）
declare global {
  interface Window {
    isDragging: boolean;
  }
}

export {};
