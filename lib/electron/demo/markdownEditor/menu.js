const { Menu } = require("electron");

// 自定义菜单
const menuArr = [
  {
    label: "",
  },
  {
    label: "文件",
    submenu: [
      {
        label: "新建",
        accelerator: "Ctrl+N",
        click: () => {
          console.log("新建");
        },
      },
      {
        label: "打开",
        accelerator: "Ctrl+O",
        click: () => {
          console.log("打开");
        },
      },
      {
        label: "保存",
        accelerator: "Ctrl+S",
        click: () => {
          console.log("保存");
        },
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "撤销",
        role: "undo",
      },
      {
        label: "重做",
        role: "redo",
      },
      { type: "separator" },
      {
        label: "剪切",
        role: "cut",
      },
      {
        label: "复制",
        role: "copy",
      },
      {
        label: "粘贴",
        role: "paste",
      },
      {
        label: "全选",
        role: "selectall",
      },
    ],
  },
  {
    label: "格式化",
    submenu: [
      { label: "加粗" },
      { label: "斜体" },
      {
        label: "标题",
        submenu: [
          { label: "标题1" },
          { label: "标题2" },
          { label: "标题3" },
          { label: "标题4" },
          { label: "标题5" },
          { label: "标题6" },
        ],
      },
      { label: "有须列表" },
      { label: "无须列表" },
      { label: "引用" },
      { label: "链接" },
      { label: "代码块" },
    ],
  },
  {
    role: "help",
    label: "帮助",
    submenu: [
      {
        label: "有关编辑器",
        click: () => {
          console.log("关于编辑器");
        },
      },
    ],
  },
];

// 得到 menu 实例
const menu = Menu.buildFromTemplate(menuArr);

// 设置菜单
Menu.setApplicationMenu(menu);
