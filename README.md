# 刘发展 · Personal Website

刘发展的个人作品集网站，使用原生 HTML、CSS 和 JavaScript 构建，通过 GitHub Pages 发布，无需安装依赖或执行构建。

**在线访问：[fazhanliu.github.io](https://fazhanliu.github.io/)**

## 网站内容

- 个人简介、教育背景与技术能力
- 阿尔派电子与邦彦技术实习经历
- 代表项目：企业产品智能讲解 Agent、RoboCup UR5e 物体分拣、GNN 草图识别、目标检测与制造业感知型协作机器人算法
- 教育与荣誉、生活切片及联系方式
- 摄影集展示：可扩展照片列表、连续横向轮播、悬停减速暂停、触屏滑动与手动播放控制
- 顶部白天／黑夜模式切换：首次跟随系统，手动选择后在本地记住偏好
- 响应式页面布局与 Canvas 背景动画

## 企业产品智能讲解 Agent

首页展示该项目在企业官网、展厅与售前咨询场景中的用途及实现：

- PDF 上传、分页提取、递归切分与中文乱码处理
- BGE 中文 Embedding、Chroma 持久化向量库、Top5 检索与 BGE CrossEncoder 重排
- DeepSeek 生成中文回答，并提供文件名、页码引用
- 意图识别、询价与预约留资、合同类问题转人工建议
- SQLite 留资保存、文档自动加载、重复上传去重与 CSV 意图评测

本仓库仅包含个人网站及项目介绍，不包含 Agent 后端、客户线索或知识库。GitHub Pages 提供静态页面，不能运行 Python / FastAPI 服务。该 Agent 当前不保存多轮对话历史。

## 本地预览

在仓库根目录运行（需要 Python 3）：

```bash
python3 -m http.server 5173
```

打开 [http://localhost:5173](http://localhost:5173)。停止预览时，在终端按 `Ctrl + C`。

## 文件结构

```text
.
├── index.html           # 首页内容与项目介绍
├── styles.css           # 页面样式与响应式布局
├── theme.js             # 主题初始化、切换与偏好保存
├── script.js            # 摄影轮播与 Canvas 背景动画
├── assets/
│   ├── profile.jpg      # 个人照片
│   ├── site-icon.svg    # 网站图标
│   └── photography/     # 摄影集网页压缩图
└── README.md
```

## 内容维护

- 修改 `index.html` 更新简介、技能、实习、项目和联系方式。
- 修改 `styles.css` 调整配色、卡片样式和移动端布局。
- 修改 `script.js` 调整摄影轮播和背景动画。
- 修改 `theme.js` 调整主题切换和偏好保存逻辑；两套主题的配色变量位于 `styles.css`。
- 图片可放入 `assets/`，并在 HTML 中使用相对路径引用。
- 邦彦 logo 使用官网当前的 SVG 地址，加载失败时显示「邦彦技术」文字；其他外部图片与 Google Fonts 的加载也取决于网络和来源网站的可用性。
- 导航中预留了英文、日文入口；当前仓库尚未包含 `en.html` 和 `ja.html`。

## 摄影集维护

摄影集位于「生活切片」下方。目前接入 13 张有效照片，包含建筑、城市、花卉、雪山与极光等主题。网页使用最长边 1600 像素的压缩副本，13 张合计约 2.66 MB；原始照片保留在本地 `assets/轮播图图片/` 来源文件夹，该目录已加入 Git 忽略规则；发布仅包含 `assets/photography/` 中的压缩副本。照片较少时自动重复铺满轮播轨道。

将照片放入 `assets/photography/`，然后在 `script.js` 的 `galleryPhotos` 数组中设置图片路径、标题和替代文字，例如：

```js
const galleryPhotos = [
  { src: "assets/photography/01.jpg", title: "伦敦街头", alt: "傍晚的伦敦街景" },
  { src: "assets/photography/02.jpg", title: "海边日落", alt: "夕阳下的海面" },
  // 继续添加其他照片。
];
```

建议压缩图片后上传，以减少网页加载时间。照片按 3:2 区域居中裁剪展示。默认滚动速度为每秒 32 像素，可修改 `targetVelocity` 中的 `32` 调整。鼠标悬停、键盘聚焦或点击暂停按钮时平滑减速；移开或继续播放后恢复。开启系统「减少动态效果」时默认不自动播放。

## 白天／黑夜模式

点击页面顶部的「黑夜模式」或「白天模式」按钮切换主题。首次访问跟随系统主题；手动选择后，通过浏览器 `localStorage` 的 `portfolio-theme` 字段保存偏好，刷新页面仍会保留。未手动选择时，页面会响应系统主题变化。

`theme.js` 在样式表加载前初始化主题，避免刷新时闪现错误配色。浏览器禁用本地存储时，仍可在当前页面正常切换，但不会保存选择。主题覆盖导航、文字、卡片、按钮及摄影集区域，照片本身保持原有颜色。

## 发布

将修改提交并推送到 GitHub 后，在仓库 **Settings → Pages** 中确认发布来源为 `main` 分支的根目录（`/`）。若尚未配置，需先完成此设置。

发布进度与失败原因可在仓库的 **Actions** 中查看。部署完成后访问在线网址；若仍看到旧样式，可尝试强制刷新浏览器。

提交前可检查补丁格式：

```bash
git diff --check
node --check script.js
node --check theme.js
```
