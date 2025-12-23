import { app, dialog, globalShortcut, Menu, Tray } from "electron";
import path from "node:path";
import { createWindow } from "../../utils/createWindow";

// 存储托盘实例
let tray: Tray | null = null;
// 存储窗口实例
let window: Electron.BrowserWindow | null = null;

app.whenReady().then(() => {
  window = createWindow(
    path.join(__dirname, "./windows/window.html"),
    undefined,
    { alwaysOnTop: false }
  );
  window.webContents.openDevTools();
  createTray();

  // 使用globalShortcut注册快捷键会有返回值
  const ret = globalShortcut.register("ctrl+e", () => {
    dialog.showMessageBox({
      message: "全局快捷键 ctrl+e 测试成功",
      buttons: ["确定"],
    });
  });
  if (!ret) {
    dialog.showMessageBox({
      message: "全局快捷键 ctrl+e 注册失败",
      buttons: ["确定"],
    });
  }
  console.log(
    `${
      globalShortcut.isRegistered("ctrl+e")
        ? "全局快捷键 ctrl+e 注册成功"
        : "全局快捷键 ctrl+e 注册失败"
    }`
  );
});

app.on("will-quit", () => {
  globalShortcut.unregister("ctrl+e");
  globalShortcut.unregisterAll();
});

function createTray() {
  // 构建托盘图标
  const iconPath = path.join(__dirname, "./assets/tray.jpg");
  // 创建托盘实例
  tray = new Tray(iconPath);

  // 添加调试日志
  console.log("Tray icon path:", iconPath);
  console.log("Tray created successfully");

  // 图标需要有一定的功能
  tray.on("click", () => {
    console.log("tray click event triggered");
    console.log("window object:", window);

    if (window) {
      const isVisible = window.isVisible();
      const isDestroyed = window.isDestroyed();
      console.log("window visible:", isVisible);
      console.log("window destroyed:", isDestroyed);

      if (isVisible && !isDestroyed) {
        window.hide();
        console.log("window hidden");
      } else if (!isDestroyed) {
        window.show();
        console.log("window shown");
      }
    } else {
      console.log("window is null");
    }
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
  ]);
  tray.setContextMenu(contextMenu);
}
