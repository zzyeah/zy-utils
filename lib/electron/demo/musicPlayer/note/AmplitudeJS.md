# AmplitudeJS

AmplitudeJS 是一个轻量级和开源的 JavaScript 库，它建立在 HTML5 音频 API 之上，提供了一套易于使用的接口来管理音频播放、播放列表、音量控制等。

官网地址：https://521dimensions.com/open-source/amplitudejs

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-01-12-013252.png" alt="image-20240112093252137" style="zoom:35%;" />

AmplitudeJS 具有以下特点：

1. **无依赖**：AmplitudeJS 不依赖于任何其他 JavaScript 库或框架，这使得它在任何项目中都很容易集成。
2. **自定义 UI**：开发者可以自由设计和实现音频播放器的用户界面，使其与应用的风格一致。AmplitudeJS 不强加任何样式，它只提供功能性的接口。
3. **丰富的 API**：AmplitudeJS 提供了广泛的 API，使得开发者可以通过编程的方式控制播放器的行为，如播放、暂停、跳转到特定时间点等。
4. **播放列表和歌曲管理**：它支持创建和管理多个播放列表，以及播放列表内歌曲的动态添加和删除。



## 快速上手案例

下面是一个关于 AmplitudeJS 的一个快速入门案例：

```js
// index.js
Amplitude.init({
  songs: [
    {
      name: "Gotta Have You",
      url: "./music/Gotta Have You.mp3",
    },
    {
      name: "K歌之王",
      url: "./music/K歌之王 - 陈奕迅.mp3",
    },
    // ...
  ],
  volume: 50,
});
```

首先需要在 html 中引入 amplitude.js。引入之后会提供一个 Amplitude 的对象，上面会有大量的方法，这里我们暂时只用到了 init 方法。该方法用于初始化我们要播放的歌曲，以及一开始的音量大小。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Music player</h1>
    <button class="amplitude-play">播放</button>
    <button class="amplitude-pause">暂停</button>
    <div class="amplitude-play-pause">播放/暂停</div>
    <script src="./amplitude.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
```

接下来就是 html 部分的代码，首先需要引入 amplitude.js 以及刚才我们自己所写的 index.js。

之后在 html 元素上挂相应的样式类就可以了，例如挂上一个 amplitude-play 类，那么这个元素就是一个“播放”按钮，挂上一个 amplitude-pause 类，那么这个元素就是一个“暂停”按钮。这使得我们不再需要去编写和 audio 元素相关的“播放”或者“暂停”这部分逻辑。而样式部分，则完全交给用户，让用户来自定义。



另外，在 AmplitudeJS 中定义了 4 个不同的级别来控制音频的播放：

- **全局（Global）**：全局元素控制任何正在播放的音频，无论范围如何。

```html
<!-- 全局播放/暂停按钮 -->
<button class="amplitude-play-pause" id="global-play-pause"></button>
```

- **播放列表（Playlist）**：播放列表级别的元素只影响特定播放列表中的音频。

```html
<!-- 特定播放列表的播放/暂停按钮 -->
<button class="amplitude-play-pause" data-amplitude-playlist="playlist_key" id="playlist-play-pause"></button>
```

- **歌曲（Song）**：歌曲级别的元素仅影响或显示单个歌曲，不考虑它是否属于某个播放列表。

```html
<!-- 控制特定歌曲的播放/暂停按钮 -->
<button class="amplitude-play-pause" data-amplitude-song-index="song_index" id="song-play-pause"></button>
```

- **播放列表中的歌曲（Song In Playlist）**：这些元素影响或显示播放列表中的特定歌曲。

```html
<!-- 控制播放列表中特定歌曲的播放/暂停按钮 -->
<button class="amplitude-play-pause" data-amplitude-song-index="song_index_in_playlist" data-amplitude-playlist="playlist_key" id="song-in-playlist-play-pause"></button>
```



## 常用类记录

- amplitude-prev：上一曲
- amplitude-next：下一曲
- amplitude-play-pause：播放和暂停
- amplitude-current-minutes：当前播放的分钟数
- amplitude-current-seconds：当前播放的秒数
- amplitude-duration-minutes：总的分钟数
- amplitude-duration-seconds：除开总分钟数后的剩余秒数
- amplitude-song-slider：播放进度条
- amplitude-mute：静音操作
- amplitude-volume-slider：控制音量大小
- data-amplitude-song-info：获取歌曲信息，这个歌曲信息来源于在使用 Amplitude.init 方法初始化歌曲时传入的歌曲信息
  - data-amplitude-song-info="name" ：就是获取歌曲的名称
