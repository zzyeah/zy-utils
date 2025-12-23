import { app, dialog, ipcMain, Menu, Tray } from "electron";
import path from "node:path";
import { createWindow } from "../../../utils/createWindow";
import "./menu";
import fs from "node:fs";
// import Store from "electron-store";

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
console.log(app.getPath("userData"));

ipcMain.on("save-to-desktop", (_, data) => {
  const desktopPath = app.getPath("desktop");
  fs.writeFileSync(path.join(desktopPath, "myTextFile.txt"), data);
});

ipcMain.handle("select-dir", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  return result.filePaths[0];
});

ipcMain.on("save-to-dir", (_, data: { path: string; content: any }) => {
  console.log(data);

  fs.writeFileSync(path.join(data.path, "myTextFile.txt"), data.content);
});

// 测试 electron-store 需要调整tsconfig.json
// type StoreData = {
//   name: string;
//   age: number;
//   data: {
//     label: string;
//   };
// };
// const store = new Store<StoreData>({
//   name: "my-first-electron-store-data",
// });

// store.set("name", "zzyeah");
// console.log(store.get("name"));

// store.set("data", { label: "hello" });
// console.log(store.get("data"));
// console.log(store.get("data.label"));
