// import { ipcRenderer } from "electron";
const { ipcRenderer } = require("electron");

// const openBtn = document.getElementById("open"),
//   closeBtn = document.getElementById("close");

const createGroup1WindowBtn = document.getElementById("createGroup1Window"),
  createGroup2WindowBtn = document.getElementById("createGroup2Window");

//通过win1打开win2
createGroup1WindowBtn?.addEventListener("click", function () {
  ipcRenderer.send("openWindow", "window2");
});

createGroup2WindowBtn?.addEventListener("click", function () {
  ipcRenderer.send("closeWindow", "window2");
});

export {};
