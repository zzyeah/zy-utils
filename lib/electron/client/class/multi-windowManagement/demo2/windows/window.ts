// import { ipcRenderer } from "electron";
const { ipcRenderer } = require("electron");

const createGroup1WindowBtn = document.getElementById("createGroup1WindowBtn"),
  createGroup2WindowBtn = document.getElementById("createGroup2WindowBtn");

// 创建属于分组1的窗口
createGroup1WindowBtn?.addEventListener("click", function () {
  ipcRenderer.send("create-window", {
    name: `window1-${Date.now()}`,
    group: "group1",
    width: 400,
    height: 300,
    file: "./windows/window2.html",
    show: true,
  });
});

// 创建属于分组2的窗口
createGroup2WindowBtn?.addEventListener("click", function () {
  ipcRenderer.send("create-window", {
    name: `window2-${Date.now()}`,
    group: "group2",
    width: 400,
    height: 300,
    file: "./windows/window2.html",
    show: true,
  });
});

export {};
