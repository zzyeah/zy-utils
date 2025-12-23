const { ipcRenderer } = require("electron");
// import { ipcRenderer } from "electron";

let port: MessagePort | null = null;
const startBtn = document.querySelector("#start") as HTMLButtonElement,
  dataDisplay = document.querySelector("#data"),
  stopBtn = document.querySelector("#stop") as HTMLButtonElement;
ipcRenderer.on("deliver-port", (event) => {
  console.log(event);

  port = event.ports[0];

  port!.onmessage = (event) => {
    console.log(event.data);
    (dataDisplay as HTMLElement).innerText = event.data;
  };

  // 给主进程发送消息
  port!.postMessage("start");
});
startBtn.addEventListener("click", () => {
  console.log("start click");

  ipcRenderer.postMessage("request-port", null, []);
});

stopBtn.addEventListener("click", () => {
  // port.postMessage('stop')
  port!.close(); // 关闭端口
  (dataDisplay as HTMLElement).innerText = "已停止";
  port = null;
});

export {};
