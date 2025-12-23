// const { clipboard } = require("electron");

// console.log("new window");
// const copyBtn = document.querySelector("#copyBtn");
// const copyText = document.querySelector("#copyText") as HTMLSpanElement;
// copyBtn?.addEventListener("click", () => {
//   console.log("copy");
//   clipboard.writeText(copyText!.textContent);
//   window.alert("复制成功");
// });

const notifyBtn = document.querySelector("#notifyBtn");
notifyBtn?.addEventListener("click", () => {
  //   console.log("notify");
  //   window.alert("通知");
  const option = {
    title: "通知",
    body: "这是H5 Notification 通知",
    data: new Date().getDate(),
  };
  const notify = new Notification(option.title, option);
  notify.onclick = (e) => {
    const target = e.currentTarget as Notification;
    console.log("点击了通知", target.data);
  };
});
