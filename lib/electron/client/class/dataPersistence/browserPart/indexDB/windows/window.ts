console.log("new window");
const themeColor = document.getElementById("themeColor") as HTMLInputElement;
const fontSize = document.getElementById("fontSize") as HTMLInputElement;
const fontFamily = document.getElementById("fontFamily") as HTMLSelectElement;
const saveBtn = document.getElementById("saveBtn") as HTMLElement;
const loadBtn = document.getElementById("loadBtn") as HTMLElement;
const textInput = document.getElementById("textInput") as HTMLTextAreaElement;

saveBtn?.addEventListener("click", () => {
  localStorage.setItem("themeColor", themeColor!.value);
  localStorage.setItem("fontSize", fontSize!.value);
  localStorage.setItem("fontFamily", fontFamily!.value);
  localStorage.setItem("textInput", textInput!.value);
  updateUserPreference(
    themeColor.value,
    fontSize.value,
    fontFamily.value,
    textInput.value
  );
});

function updateUserPreference(
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

loadBtn.addEventListener("click", () => {
  const color = localStorage.getItem("themeColor");
  const size = localStorage.getItem("fontSize");
  const family = localStorage.getItem("fontFamily");
  const text = localStorage.getItem("textInput") || "";
  if (color && size && family) {
    updateUserPreference(color, size, family, text);
    alert("已加载用户偏好");
  } else {
    alert("未有保存过用户偏好");
  }
});
