// electron 自定义菜单
import { Menu } from "electron";

// 定义自定义菜单
const menuArr: Array<Electron.MenuItemConstructorOptions | Electron.MenuItem> =
  [
    {
      label: "",
    },
    {
      label: "菜单1",
      submenu: [
        {
          label: "菜单1-1",
          click: () => {
            console.log("菜单1-1");
          },
        },
        {
          label: "菜单1-2",
          click: () => {
            console.log("菜单1-2");
          },
        },
      ],
    },
    {
      label: "编辑",
      submenu: [
        { label: "撤销", role: "undo" },
        { label: "重做", role: "redo" },
        { label: "剪切", role: "cut" },
        { label: "复制", role: "copy" },
        { label: "粘贴", role: "paste" },
        { label: "选择所有", role: "selectAll" },
        { label: "关于", role: "about" },
      ],
    },
    {
      label: "系统",
      submenu: [
        {
          label: "打开控制台",
          role: "toggleDevTools",
          accelerator: process.platform === "darwin" ? "Alt+Command+I" : "F12",
          click: (_, focusWindow) => {
            // (focusWindow as any).toggleDevTools(); // 类型上没有该方法，但是该方法是存在在对象上的
            console.log("打开控制台");
          },
        },
      ],
    },
  ];

// 创建菜单
const menu = Menu.buildFromTemplate(menuArr);
// 设置菜单，让我们的自定义菜单生效
Menu.setApplicationMenu(menu);
