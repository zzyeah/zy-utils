import { app, BrowserWindow } from "electron";
import path, { join } from "node:path";

let parentWindow: BrowserWindow, childWindow: BrowserWindow;

const createWindow = (
  url,
  parent?: BrowserWindow,
  options?: Electron.BrowserWindowConstructorOptions
) => {
  console.log(!parent);

  const defaultOptions: Electron.BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      // preload: path.join(__dirname, "preload.js"),
    },
    parent: parent,
    alwaysOnTop: !parent,
  };

  const win = new BrowserWindow({
    ...defaultOptions,
    ...options,
  });

  win.loadFile(url);
  //   win.webContents.openDevTools();
  return win;
};

app.whenReady().then(() => {
  parentWindow = createWindow(path.join(__dirname, "./windows/fa.html"));
  childWindow = createWindow(
    path.join(__dirname, "./windows/child.html"),
    parentWindow,
    {
      movable: true,
    }
  );

  const { x, y, width } = parentWindow.getBounds();

  const childWinX = x + width + 15;
  const childWinY = y;
  childWindow.setPosition(childWinX, childWinY);
  childWindow.show();

  parentWindow.setAlwaysOnTop(true);
});
