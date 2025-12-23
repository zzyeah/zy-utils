import path from "node:path";
import { createWindow } from "../../../utils/createWindow";
import { app, ipcMain } from "electron";

// 存储所有窗口引用
const windowMap = new Map();
let mainWindow;
// 窗口1配置
const window1Config = {
  name: "main",
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
  group: "group1",
  file: path.join(__dirname, "./windows/window2.html"),
};

app.whenReady().then(() => {
  mainWindow = createMainWindow(window1Config);
});

function createMainWindow(config) {
  const ins = createWindow(config.file, undefined, {
    width: config.width,
    height: config.height,
    show: "show" in config ? config.show : true,
  });

  return ins;
}

ipcMain.on("create-window", (e, config) => {
  createGroupWindow(config);
});

function createGroupWindow(config) {
  const ins = createWindow(path.join(__dirname, config.file), undefined, {
    width: config.width,
    height: config.height,
    show: config.show,
    parent: mainWindow,
  });
  if (config.group) {
    if (windowMap.has(config.group)) {
      const data = [...windowMap.get(config.group), ins];
      windowMap.set(config.group, data);
    } else {
      windowMap.set(config.group, [ins]);
    }
    ins.on("close", (e) => {
      const data = windowMap.get(config.group);
      const filteredData = data.filter((item) => item !== ins);
      windowMap.set(config.group, filteredData);
      if (windowMap.get(config.group).length === 0) {
        windowMap.delete(config.group);
      }
      console.log(windowMap);
    });
    console.log(windowMap);
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
