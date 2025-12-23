import { ipcRenderer } from "electron";
console.log(document.querySelector("#btn"));

document.getElementById("btn")?.addEventListener("click", function () {
  console.log(document.querySelector("#txt"));

  const text = (document.querySelector("#txt") as HTMLInputElement).value;
  console.log(`click ${text}`);

  ipcRenderer.send("transTextEvent", "action", text);
});
