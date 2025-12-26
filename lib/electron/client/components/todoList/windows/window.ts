const addTodoBtn = document.getElementById("addTodoBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const customPrompt = document.getElementById("customPrompt") as HTMLDivElement;
const customPromptInput = document.getElementById(
  "customPromptInput"
) as HTMLInputElement;
const customPromptOk = document.getElementById(
  "customPromptOk"
) as HTMLButtonElement;
const customPromptCancel = document.getElementById(
  "customPromptCancel"
) as HTMLButtonElement;

// import Dexie from "dexie";
const Dexie = require("dexie");
const db = new Dexie("todoDB"); // 创建数据库实例
db.version(1).stores({
  todos: "++id, text", // 创建表，id为自增字段，text为字段名
});
readTodos();
addTodoBtn.addEventListener("click", async function () {
  if (!todoInput.value) {
    return;
  }
  await db.todos.add({ text: todoInput.value });
  todoInput.value = "";
  readTodos();
});

// 读取待办事项
async function readTodos() {
  // const allTodos = await (db.todos as Table).toArray();
  const allTodos = await db.todos.toArray();

  todoList.innerHTML = "";
  allTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    todoList.appendChild(li);
    createTodoButtons(li, todo.text, todo.id);
  });
}

function createTodoButtons(li: HTMLLIElement, text: string, id: number) {
  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";
  updateBtn.addEventListener("click", function () {
    showCustomPrompt(text, (newValue) => {
      if (!newValue) {
        return;
      }
      // 执行具体更新操作
      updateTodo(id, newValue);
    });
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    if (window.confirm("确定要删除吗？")) deleteTodo(id);
  });
  const div = document.createElement("div");
  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);
  li.appendChild(div);
}

/**
 * 显示自定义提示框
 * @param text 回填的文本
 */
function showCustomPrompt(
  text: string,
  cb: (...args: any[]) => any = () => {}
) {
  customPromptInput.value = text;
  customPrompt.style.display = "block";

  // 确认修改逻辑
  customPromptOk.onclick = function () {
    cb(customPromptInput.value);
    customPrompt.style.display = "none";
  };

  // 取消修改逻辑
  customPromptCancel.onclick = function () {
    cb();
    customPrompt.style.display = "none";
  };
}

async function updateTodo(id: number, newValue: string) {
  // 执行具体更新操作
  // await (db.todos as Table).update(id, { text: newValue });
  await db.todos.update(id, { text: newValue });
  readTodos();
}

async function deleteTodo(id: number) {
  // 执行具体删除操作
  // await (db.todos as Table).delete(id);
  await db.todos.delete(id);
  readTodos();
}

export {};
