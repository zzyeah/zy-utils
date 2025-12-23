const { ipcRenderer } = require("electron");

const uploadBtn = document.getElementById("upload-button");
const fileInput = document.getElementById("file-input") as HTMLInputElement;
const progressBar = document.getElementById("progress-bar");

uploadBtn?.addEventListener("click", function () {
  if (fileInput?.files?.length) {
    const file = fileInput!.files[0];
    console.log(file);
    if (file) {
      // 进行上传操作
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file, file.name);
      xhr.open("POST", "http://localhost:3000/upload", true);
      // 该事件就是监听上传进度的
      xhr.upload.onprogress = function (e) {
        // e.lengthComputable 表示是否可以计算长度，如果为true，说明有长度，有进度信息
        // 这时候可以通过e.loaded 和 e.total 来计算进度
        // e.loaded 表示已经上传的长度
        // e.total 表示文件的总长度
        if (e.lengthComputable) {
          const progress = e.loaded / e.total;
          console.log("upload progress ", progress);
          // 进度条信息已经获取到，可以进行进度条的更新了
          // 更新任务栏的应用图标的进度状态
          ipcRenderer.send("uploadProgress", progress);

          if (progress >= 0) {
            progressBar!.style.width = `${progress * 100}%`;
          } else {
            progressBar!.style.width = "0";
          }
        }
      };

      xhr.onload = function () {
        if (xhr.status === 200) {
          alert("上传成功");
          ipcRenderer.send("uploadProgress", -1);
        } else {
          console.log("上传失败 ", xhr.status);
        }
      };
      xhr.send(formData);
    }
  }
});

fileInput?.addEventListener("change", function () {
  progressBar!.style.width = "0";
});

export {};
