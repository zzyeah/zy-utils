import path from "node:path";
import { createWindow } from "../../utils/createWindow";
import { app, BrowserWindow, ipcMain } from "electron";

app.whenReady().then(() => {
  const window: BrowserWindow = createWindow(
    path.join(__dirname, "./windows/window.html"),
    undefined,
    {
      width: 800,
      height: 800,
      transparent: true, // 设置窗口透明
      resizable: false, // 禁止改变窗口大小
      frame: false, // 禁止窗口有边框
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    }
  );
  //   window.webContents.openDevTools();
  window.setAlwaysOnTop(true, "pop-up-menu"); // 设置窗口置顶
  // 移除这行初始化设置，改为通过 IPC 控制
  // window.setIgnoreMouseEvents(true);
});

ipcMain.on(
  "setIgnoreMouseEvent",
  (e, ...args: [boolean, { forward?: boolean }?]) => {
    console.log(args);
    BrowserWindow.fromWebContents(e.sender)?.setIgnoreMouseEvents(...args);
  }
);
