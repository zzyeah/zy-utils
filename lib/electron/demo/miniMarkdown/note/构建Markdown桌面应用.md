# 构建Markdown桌面应用



## SimpleMDE

SimpleMDE（Simple Markdown Editor）是一个轻量级、简单易用的 Markdown 编辑器。它基于 JavaScript 开发，可以轻松集成到网页和网页应用中。SimpleMDE 提供了丰富的功能和一个美观的用户界面，使得编辑 Markdown 文本变得便捷和高效。

官网地址：https://simplemde.com/

**主要特点**

1. **易用的界面：**
   - SimpleMDE 提供一个清晰、直观的用户界面，支持即时预览，让用户可以实时看到 Markdown 文本的渲染效果。
   - 它还包括一个工具栏，让用户可以快速访问常用的格式化选项。
2. **Markdown 编辑功能：**
   - 支持标准的 Markdown 语法，如标题、列表、代码块、链接、图片等。
   - 支持一些扩展功能，如表格、任务列表和自定义渲染。
3. **自定义和扩展性：**
   - SimpleMDE 允许开发者自定义编辑器的行为和外观，例如通过 CSS 样式定制外观。
   - 它还提供了一些配置选项，以适应不同的使用场景。
4. **集成和兼容性：**
   - 可以轻松地集成到现有的网页中，只需简单的 HTML 和 JavaScript。
   - 兼容主流的现代浏览器。

因此，我们可以在我们的项目中安装 SimpleMDE

```bash
npm install simplemde
```



## 热更新

关于热更新，涉及到两个东西：

- nodemon

  - 这是 Node.js 环境下的一个实用工具，用于检测到文件发生更改的时候自动重启应用程序。

  ```js
  "dev": "nodemon --exec NODE_ENV=development electron . --watch ./ --ext .js"
  ```

- electron-reload

  - 用于监听渲染进程下文件的改变

```js
// index.js
require("electron-reload")(__dirname);
```



## meta

当我们在 window/index.html 文件中添加了如下的 meta 标签：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
      default-src 'self';
      style-src 'self';
      font-src 'self';
    "
/>
```

会发现 Markdown 编辑器不好使了，连加载都加载不出来。

究其原因，是因为该 meta 标签用于设置内容安全策略，全部指定的都是 self，所以无法从其他域来加载内容。

要解决这个问题也很简单，只需要将自己能够信任的域添加上去就 OK 了

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
        default-src 'self';
        style-src 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com https://cdn.jsdelivr.net;
        font-src 'self' https://maxcdn.bootstrapcdn.com https://cdn.jsdelivr.net;
        connect-src 'self' https://cdn.jsdelivr.net;
        img-src 'self' https://xiejie-typora.oss-cn-chengdu.aliyuncs.com;
    "
/>
```

- `style-src 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com https://cdn.jsdelivr.net;`
  - self : 允许加载同源的样式
  - unsafe-inline：允许使用内联样式
  - `https://maxcdn.bootstrapcdn.com https://cdn.jsdelivr.net` : 允许从该源上面加载样式

- font-src ： 和字体相关的内容安全设置
- img-src ：和图片相关的内容安全设置

