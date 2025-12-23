import { BrowserWindow } from "electron";

export function createWindow(
  url: string,
  parent?: BrowserWindow,
  options?: Electron.BrowserWindowConstructorOptions
) {
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
      alwaysOnTop:
        options && "alwaysOnTop" in options ? options?.alwaysOnTop : !parent,
    },
    window = new BrowserWindow({
      ...defaultOptions,
      ...options,
    });

  window.loadFile(url);
  return window;
}
