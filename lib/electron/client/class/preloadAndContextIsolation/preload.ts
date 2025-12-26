import { contextBridge } from "electron";
import fs from "fs";
import path from "path";

// // const fs = require("fs");

// console.log(fs);
// console.log(window);

// (window as any).myApi = {
//   fs,
// };

// console.log((window as any).myApi.fs);
contextBridge.exposeInMainWorld("myApi", {
  write: fs.writeSync,
  open: fs.openSync,
  path: path,
  __dirname,
});

// const fd = fs.openSync("./example.txt", "w");
// fs.writeSync(fd, "Hello World");
