const { ipcRenderer } = require("electron");

const btn = document.querySelector("#open");
btn?.addEventListener("click", async function () {
  // 弹出一个对话框
  const result = await ipcRenderer.invoke("show-open-dialog");
  console.log(result);
});

const menu = document.querySelector("#menu") as HTMLElement;
window.oncontextmenu = function (e) {
  e.preventDefault();
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";
  menu.style.display = "block";
};

// 用户点击菜单的某一项
const menuItems = document.querySelectorAll(".menu");
menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    console.log("点击了右键菜单的某一个功能");

    // menu.style.display = "none";
  });
});

window.onclick = function () {
  menu.style.display = "none";
};
export {};
