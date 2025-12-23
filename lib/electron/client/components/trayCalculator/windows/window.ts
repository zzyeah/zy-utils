const buttons = document.querySelector(".btns");
const btn = document.querySelectorAll("span");
const value = document.querySelector("#value");
const toggleBtn = document.querySelector(".toggleBtn"); // 切换主题

// 绑定事件
for (let i = 0; i < btn.length; i++) {
  const element = btn[i];
  element.addEventListener("click", () => {
    // 根据 value 去做不同的事情
    if (element.innerHTML === "=") {
      // 需要得到计算结果
      value!.innerHTML = calculate(value!.innerHTML);
    } else if (element.innerHTML === "Clear") {
      // 清空 value
      value!.innerHTML = "";
    } else if (element.innerHTML === "Theme") {
      // 切换主题
      document.body.classList.toggle("dark");
    } else {
      // 输入数字或运算符
      // 拼接到显示屏
      value!.innerHTML += element.innerHTML;
    }
  });
}

function calculate(calcStr: string): string {
  // 拿到这个表达式，我们首先要做的第一步就是将操作数和运算符分离出来
  const parts = extractExpression(calcStr);
  const a = parts[0];
  const operator = parts[1];
  const b = parts[2];
  switch (operator) {
    case "+": {
      const result = Number(a) + Number(b);
      return result.toString();
    }
    case "-": {
      const result = Number(a) - Number(b);
      return result.toString();
    }
    case "*": {
      const result = Number(a) * Number(b);
      return result.toString();
    }
    case "/": {
      const result = Number(a) / Number(b);
      return result.toString();
    }
    default:
      return "Error";
  }
}

function extractExpression(calcStr: string): string[] {
  const regex = /(-?\d+\.?\d*)([\+\-\*\/])(-?\d+\.?\d*)/;
  const matches = calcStr.match(regex);
  if (matches && matches.length === 4) {
    // matches[0] 是整个表达式
    // matches[1] 是第一个操作数
    // matches[2] 是运算符
    // matches[3] 是第二个操作数
    return [matches[1], matches[2], matches[3]];
  } else {
    return [];
  }
}

export {};
