import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";

const winRef: BrowserWindow[] = [];

/**
 * 用于记录消息通道
 */
const messageChannelRecord = {};

const registerChannel = (channelName: string, webContentId: number) => {
  if (messageChannelRecord[channelName] !== undefined) {
    // 已经注册过了
    // 判断当前窗口是否注册过
    let alreadyRegister = false;
    for (let i = 0; i < messageChannelRecord[channelName].length; i++) {
      const custom = messageChannelRecord[channelName][i];
      if (custom === webContentId) {
        alreadyRegister = true;
        break;
      }
    }
    if (!alreadyRegister) {
      messageChannelRecord[channelName].push(webContentId);
      return;
    }
    console.warn(
      "already register channelName:",
      channelName,
      "senderId:",
      webContentId
    );

    return;
  }
  messageChannelRecord[channelName] = [webContentId];
};

ipcMain.on("registerChannelEvent", (event, channelName) => {
  try {
    console.log("registerChannelEvent", ` ${channelName} ${event.sender.id}`);

    registerChannel(channelName, event.sender.id);
  } catch (error) {
    console.error(error);
  }
});

function getWebContentId(channelName: string): number[] {
  return messageChannelRecord[channelName] || [];
}

/**
 *
 * @param webContentIds 注册了channel事件的窗口id 的数组
 * @param channel 对应的事件
 * @param data 要传递的数组
 */
function transText(webContentIds: number[], channel: string, data: any) {
  for (let i = 0; i < webContentIds.length; i++) {
    const contentId = webContentIds[i];
    for (let j = 0; j < winRef.length; j++) {
      const target = winRef[j];
      if (target.webContents.id === contentId) {
        target.webContents.send(channel, data);
        break;
      }
    }
  }
}

ipcMain.on("transTextEvent", (event, channel, data) => {
  try {
    console.log("transTextEvent", channel, data);

    transText(getWebContentId(channel), channel, data);
  } catch (error) {}
});

const createWindow = (url) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(url);
  win.webContents.openDevTools();
  return win;
};

app.whenReady().then(() => {
  const w1 = createWindow("./window.html"),
    w2 = createWindow("./window1.html");
  winRef.push(w1, w2);
});
