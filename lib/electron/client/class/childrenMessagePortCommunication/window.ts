import { ipcRenderer } from "electron";

const transText = (event: Electron.IpcRendererEvent, text: string) => {
  const dataContent = document.querySelector("#data");
  console.log(text);

  dataContent!.innerHTML = text;
};
ipcRenderer.on("action", transText);

ipcRenderer.send("registerChannelEvent", "action");
