// import {
//   app,
//   BrowserWindow,
//   ipcMain,
//   ipcRenderer,
//   MessageChannelMain,
// } from "electron";

// const createWindow = (url) => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//       webSecurity: false,
//       // preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   win.loadFile(url);
//   win.webContents.openDevTools();
//   return win;
// };

// app.whenReady().then(() => {
//   createWindow("./mainChildMessagePortCommunication/windows/index.html");
// });

// ipcMain.on("request-port", (event, arg) => {
//   // 创建通信端口
//   console.log("request-port");

//   console.log(event);

//   console.log(arg);
//   const { port1, port2 } = new MessageChannelMain();
//   // port1 主进程用
//   // port2 渲染进程用
//   event.sender.postMessage("deliver-port", null, [port2]);

//   port1.on("message", (evt) => {
//     console.log(evt);
//     if (evt.data === "start") {
//       // 开始进行复杂的数据处理
//       simulateDataProcessing(port1);
//       return;
//     }
//   });

//   port1.start();
// });

// /**
//  * 模拟复杂的数据处理
//  * @param port1
//  */
// function simulateDataProcessing(port1: Electron.MessagePortMain) {
//   const interval = setInterval(() => {
//     const data = Math.random().toFixed(2);
//     port1.postMessage(data);
//     console.log(data);
//   }, 1000);

//   port1.on("close", () => {
//     clearInterval(interval);
//   });
// }
// import "./windowKnowledge/index";
// import "./components/clock/index";
// import "./components/trayCalculator/index";
// import "./class/applicationCommonSetting/index";
// import "./class/systemDialogBoxAndMenu/index";
// import "./components/progressBar/index";
// import "./class/dataPersistence/nodePart/index";
import "./class/dataPersistence/browserPart/index";
