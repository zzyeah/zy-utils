const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);
require('./menu');
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    return win;
}

app.whenReady().then(() => {
    const win = createWindow();
    win.loadFile('./window/index.html');
})