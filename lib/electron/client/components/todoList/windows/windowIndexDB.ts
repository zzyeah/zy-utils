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

// 重点在于indexDB操作上面

const request = indexedDB.open("todoDB", 1);

// 存储数据库连接的变量
let db: IDBDatabase;

// 数据库连接成功
request.onsuccess = function (event) {
  const target = event.target as IDBOpenDBRequest;
  console.log(event);
  console.log("数据库连接成功");

  db = target.result;
  console.log(db);

  // 读取该数据库信息
  // 并且展示出来
  setTimeout(() => {
    readTodos();
  }, 0);
};

// 数据库连接失败
request.onerror = function (event) {
  console.log(event);
  console.log("数据库连接失败");
  console.error("Error opening database:", (event!.target as any)?.error);
};

// 数据库版本升级
// 在第一次创建或者版本升级的时候，都会触发回调
request.onupgradeneeded = function (event) {
  console.log("数据库版本升级");
  console.log(event);

  const target = event.target as IDBOpenDBRequest;
  // 新创建一个名为todos的对象存储
  // autoIncrement: true 代表使用自动增长的键

  target.result.createObjectStore("todos", {
    autoIncrement: true,
  });
};

/**
 * 读取并且显示所有代办事项
 */
function readTodos() {
  if (!db) {
    console.error("数据库未初始化");
    return;
  }
  // 创建只读事务
  // 用于读取todos对象存储（表）
  const transaction = db.transaction("todos");
  // 拿到数据仓库
  const store = transaction.objectStore("todos");
  // 使用游标读取所有数据
  const request = store.openCursor();
  todoList.innerHTML = "";
  request.onsuccess = function (event) {
    const target = event.target as IDBRequest;
    const cursor: IDBCursorWithValue = target.result; // 获取游标指向的第一条数据
    if (cursor) {
      const li = document.createElement("li");
      li.textContent = cursor.value;
      todoList.appendChild(li);
      createTodoButtons(li, cursor.value, cursor.primaryKey);

      // 清空列表
      todoList.appendChild(li);

      // 游标移动到下一条数据
      cursor.continue();
    }
  };
  request.onerror = function (event) {
    console.error("Error reading todos:", (event!.target as any)?.error);
  };
}

// 创建更新按钮和删除按钮
function createTodoButtons(
  li: HTMLLIElement,
  value: string,
  primaryKey: IDBValidKey
) {
  // 创建更新按钮
  const updateBtn = document.createElement("button");
  updateBtn.textContent = "更新";
  updateBtn.addEventListener("click", function () {
    showCustomPrompt(value, (newValue) => {
      if (!newValue) {
        return;
      }
      // 执行具体更新操作
      updateTodo(primaryKey, newValue);
    });
  });

  // 创建删除按钮
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "删除";
  deleteBtn.addEventListener("click", function () {
    const isDel = window.confirm("确定要删除吗？");
    if (isDel) deleteTodo(primaryKey);
  });

  const div = document.createElement("div");
  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);
  li.appendChild(div);
}

// 添加待办事项
addTodoBtn.addEventListener("click", async function () {
  // 获取输入框的内容
  const content = todoInput.value;
  if (!content) {
    alert("请输入待办事项");
    return;
  }
  const transaction = db.transaction("todos", "readwrite");
  const store = transaction.objectStore("todos");
  store.add(content);
  transaction.oncomplete = function () {
    console.log("添加成功");
    // 添加成功后，清空输入框
    todoInput.value = "";
    // 读取所有待办事项
    readTodos();
  };
  transaction.onerror = function (event) {
    console.error("Error adding todo:", (event!.target as any)?.error);
  };
});

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
function updateTodo(primaryKey: IDBValidKey, newValue: string) {
  if (!db) {
    console.error("数据库未初始化");
    return;
  }
  const transaction = db.transaction("todos", "readwrite");
  const store = transaction.objectStore("todos");
  store.put(newValue, primaryKey);

  transaction.oncomplete = function () {
    console.log("更新成功");
    // 读取所有待办事项
    readTodos();
  };

  transaction.onerror = function (event) {
    console.error("Error updating todo:", (event!.target as any)?.error);
  };
}

function deleteTodo(primaryKey: IDBValidKey) {
  if (!db) {
    console.error("数据库未初始化");
    return;
  }
  const transaction = db.transaction("todos", "readwrite");
  const store = transaction.objectStore("todos");
  store.delete(primaryKey);

  transaction.oncomplete = function () {
    console.log("删除成功");
    // 读取所有待办事项
    readTodos();
  };
}

export {};
