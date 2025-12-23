async function test() {
  await import("./DynHtmlPrint/test");
}

if (import.meta.env.VITE_IS_TEST) {
  test();
}

console.log(import.meta.env);

// console.log(EventEmitter);

// const event = new EventEmitter();
// event.on("some-event", () => {
//   console.log("some-event trigger");
// });
// event.emit("some-event");
// console.log(result);

// SqlCreator('bbbb');

// const fileEle = document.querySelector('#file');
// console.log(fileEle);
// (fileEle as HTMLInputElement)?.addEventListener('change', (file: any)=>{
//   const fileReader = new FileReader();
//   fileReader.readAsText(file?.target?.files[0]);
//   fileReader.onload = (e) => {
//     console.log(fileReader.result);
//     const filename = file.target.files[0].name;
//     console.log(filename);

//   };
// })
