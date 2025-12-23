const { ipcRenderer } = require("electron");

console.log("new window");
const saveBtn = document.getElementById("save") as HTMLButtonElement;
const selectBtn = document.getElementById("selectAndSave") as HTMLButtonElement;
const content = document.getElementById("content") as HTMLTextAreaElement;
saveBtn?.addEventListener("click", () => {
  if (content.value) {
    ipcRenderer.send("save-to-desktop", content.value);
    alert("保存成功");
  } else {
    alert("请输入内容");
  }
});

selectBtn?.addEventListener("click", async () => {
  if (!content.value) {
    alert("请输入内容");
    return;
  }
  const filePath = await ipcRenderer.invoke("select-dir");
  ipcRenderer.send("save-to-dir", { path: filePath, content: content.value });
  alert("保存成功");
});

export {};
