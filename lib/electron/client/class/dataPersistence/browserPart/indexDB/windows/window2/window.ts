const load = document.querySelector("#loadBtn") as HTMLButtonElement;

function updateUserPreference1(
  themeColor: string,
  fontSize: string,
  fontFamily: string,
  text: string
) {
  textInput.style.color = themeColor;
  textInput.style.fontSize = fontSize + "px";
  textInput.style.fontFamily = fontFamily;
  textInput.value = text;
}

load.addEventListener("click", () => {
  const color = localStorage.getItem("themeColor");
  const size = localStorage.getItem("fontSize");
  const family = localStorage.getItem("fontFamily");
  const text = localStorage.getItem("textInput") || "";
  if (color && size && family) {
    updateUserPreference1(color, size, family, text);
    alert("已加载用户偏好");
  } else {
    alert("未有保存过用户偏好");
  }
});
