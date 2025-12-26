import { app, Menu, Tray } from "electron";
import path from "node:path";
import { createWindow } from "../../utils/createWindow";
import "./menu";

let window: Electron.BrowserWindow | null = null;
let tray: Tray | null = null;
let width = 1280,
  height = 720;

function createTray() {
  if (tray) {
    tray.destroy();
  }
  tray = new Tray(path.join(__dirname, "assets", "tray.png"));
  tray.on("click", () => {
    // tray.getBounds() 方法可以获取到托盘图标的位置和大小
    // 返回的是一个对象 {x, y, width, height}
    const trayBounds = tray!.getBounds();
    // 接下来设置窗口的位置
    window!.setPosition(
      trayBounds.x + trayBounds.width / 2 - width / 2,
      trayBounds.height
    );
    window!.isVisible() ? window!.hide() : window!.show();
  });
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      click: () => {
        console.log("open clicked");
        window!.show();
      },
    },
    {
      label: "Close",
      click: () => {
        console.log("close clicked");
        window!.hide();
      },
    },
    {
      label: "exit",
      click: () => {
        window!.close();
      },
    },
    {
      label: "f1",
      click: () => {
        // tray.getBounds() 方法可以获取到托盘图标的位置和大小
        // 返回的是一个对象 {x, y, width, height}
        const trayBounds = tray!.getBounds();
        // 接下来设置窗口的位置
        window!.setPosition(
          trayBounds.x + trayBounds.width / 2 - width / 2,
          trayBounds.height
        );
        window!.isVisible() ? window!.hide() : window!.show();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
}

function createBrowserWindow() {
  window = createWindow(
    path.join(__dirname, "./windows/window.html"),
    undefined,
    {
      height,
      width,
      alwaysOnTop: false,
      // frame: false,
      // resizable: false,
      show: false,
      // movable: false,
      minimizable: false,
      maximizable: false,
      minWidth: 1024,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: true,
        // contextIsolation: false,
        preload: path.join(__dirname, "preload.js"),
      },
    }
  );
  // window.webContents.openDevTools();
  // window.on("blur", () => {
  //   window?.hide();
  // });
}

app.whenReady().then(() => {
  createBrowserWindow();
  createTray();
});
