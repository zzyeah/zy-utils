// import { ipcRenderer } from "electron";
const { ipcRenderer } = require("electron");

const deg = 6; // 旋转角度值
const clock = document.querySelector("#clock") as HTMLDivElement;
const hour = document.querySelector(".hour") as HTMLDivElement;
const minute = document.querySelector(".min") as HTMLDivElement;
const second = document.querySelector(".sec") as HTMLDivElement;

setInterval(() => {
  const timeStamp = new Date();
  const h = timeStamp.getHours() * 30; // 一圈360度，12小时，一小时30度
  const m = timeStamp.getMinutes() * deg; // 一圈360度，60分钟，一分钟6度
  const s = timeStamp.getSeconds() * deg; // 一圈360度，60秒，一秒6度

  // 进行旋转
  hour.style.transform = `rotateZ(${h + m / 12}deg)`; // 在旋转时针的时候，还需要添加分针的角度
  minute.style.transform = `rotateZ(${m}deg)`;
  second.style.transform = `rotateZ(${s}deg)`;
}, 1000);

let offset: { x: number; y: number } | null = null; // 记录用户拖拽的偏移值

// 初始化时设置鼠标穿透
ipcRenderer.send("setIgnoreMouseEvent", false);

// 解决时钟挂件拖拽移动问题
document.addEventListener("mousedown", (e) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.matches(".clock, .clock *")) {
      window.isDragging = true; // 设置全局变量拖拽状态为 true

      // 开始拖拽时暂时禁用鼠标穿透
      ipcRenderer.send("setIgnoreMouseEvent", false);

      offset = { x: e.screenX - window.screenX, y: e.screenY - window.screenY };
    }
  }
});

document.addEventListener("mousemove", (e) => {
  if (window.isDragging && offset) {
    const { screenX, screenY } = e;

    window.moveTo(screenX - offset.x, screenY - offset.y);
  }
});

document.addEventListener("mouseup", () => {
  window.isDragging = false;
  offset = null;

  // 结束拖拽后恢复鼠标穿透
  ipcRenderer.send("setIgnoreMouseEvent", true, { forward: true });
});

// 动态设置穿透效果
clock.addEventListener("mouseenter", (e) => {
  // 在鼠标进入时钟区域的时候，解除鼠标穿透
  ipcRenderer.send("setIgnoreMouseEvent", false);
});

clock.addEventListener("mouseleave", (e) => {
  // 在鼠标离开时钟区域时，重新设置鼠标穿透
  ipcRenderer.send("setIgnoreMouseEvent", true, { forward: true });
});

export {};
