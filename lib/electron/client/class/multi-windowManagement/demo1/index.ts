import path from "node:path";
import { createWindow } from "../../../utils/createWindow";
import { app, ipcMain } from "electron";

// 存储所有窗口引用
const windowMap = new Map();

// 窗口1配置
const window1Config = {
  name: "window1",
  width: 600,
  height: 400,
  show: true,
  file: path.join(__dirname, "./windows/window.html"),
};

// 窗口2配置
const window2Config = {
  name: "window2",
  width: 400,
  height: 200,
  show: false,
  file: path.join(__dirname, "./windows/window2.html"),
};

app.whenReady().then(() => {
  const window = createExtraWindow(window1Config);
  windowMap.set(window1Config.name, window);
  const window2 = createExtraWindow(window2Config);
  windowMap.set(window2Config.name, window2);
  // window.webContents.openDevTools();
});

function createExtraWindow(config) {
  const ins = createWindow(config.file, undefined, {
    width: config.width,
    height: config.height,
    show: config.show,
  });

  if (config.name === "window2") {
    ins.on("close", (e) => {
      // 阻止关闭默认事件
      e.preventDefault();
      // 隐藏窗口
      ins.hide();
    });
  }

  return ins;
}

ipcMain.on("openWindow", (e, args) => {
  console.log(windowMap);

  if (windowMap.has(args)) {
    windowMap.get(args).show();
  }
});

ipcMain.on("closeWindow", (e, args) => {
  if (windowMap.has(args)) {
    windowMap.get(args).hide();
  }
});
