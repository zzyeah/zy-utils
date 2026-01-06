const SimpleMDE = require("../node_modules/simplemde/dist/simplemde.min.js");

const { ipcRenderer } = require("electron");

const editor = new SimpleMDE({
  element: document.getElementById("editor"),
  autoDownloadFontAwesome: true,
  autofocus: true,
});

ipcRenderer.on("load", (e, fileContent) => {
  if (fileContent) editor.value(fileContent);
});

ipcRenderer.on("format", (_, format) => {
  switch (arg) {
    case "toggle-bold": {
      editor.toggleBold();
      break;
    }
    case "toggle-italic": {
      editor.toggleItalic();
      break;
    }
    case "titleLevelOne": {
      editor.toggleHeading1();
      break;
    }
    case "titleLevelTwo": {
      editor.toggleHeading2();
      break;
    }
    case "titleLevelThree": {
      editor.toggleHeading3();
      break;
    }
    case "titleLevelFour": {
      editor.toggleHeading4();
      break;
    }
    case "titleLevelFive": {
      editor.toggleHeading5();
      break;
    }
    case "titleLevelSix": {
      editor.toggleHeading6();
      break;
    }
    case "toggle-ordered-list": {
      editor.toggleOrderedList();
      break;
    }
    case "toggle-unordered-list": {
      editor.toggleUnorderedList();
      break;
    }
    case "toggle-code": {
      editor.toggleCodeBlock();
      break;
    }
    case "toggle-quote": {
      editor.toggleBlockquote();
      break;
    }
    case "toggle-link": {
      editor.drawLink();
      break;
    }
  }
});

// 拖拽功能
const body = document.querySelector("body");
body.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const items = e?.dataTransfer?.items;
  if (items) {
    for (const item of items) {
      if (item.kind === "file") {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          editor.value(e.target.result);
        };
        // 以文本的形式去读取内容
        reader.readAsText(file);
      }
    }
  }
});
