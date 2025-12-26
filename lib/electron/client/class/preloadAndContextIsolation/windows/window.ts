console.log("new window");
const btn = document.getElementById("btn");
btn?.addEventListener("click", function () {
  console.log((window as any).myApi);

  const fd = (window as any).myApi.open(
    (window as any).myApi.path.join(
      (window as any).myApi.__dirname,
      "example.txt"
    ),
    "w"
  );
  (window as any).myApi.write(fd, "Hello World");
});

export {};
