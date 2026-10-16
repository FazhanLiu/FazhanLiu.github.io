# 刘发展 · Personal Website

刘发展的个人作品集网站，使用原生 HTML、CSS 和 JavaScript 构建，通过 GitHub Pages 发布，无需安装依赖或执行构建。

**在线访问：[fazhanliu.github.io](https://fazhanliu.github.io/)**

## 网站内容

- 个人简介、教育背景与技术能力
- 阿尔派电子与邦彦技术实习经历
- 代表项目：企业产品智能讲解 Agent、RoboCup UR5e 物体分拣、GNN 草图识别、目标检测与制造业感知型协作机器人算法
- 教育与荣誉、生活切片及联系方式
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
├── script.js            # Canvas 背景动画
├── assets/
│   ├── profile.jpg      # 个人照片
│   └── site-icon.svg    # 网站图标
└── README.md
```

## 内容维护

- 修改 `index.html` 更新简介、技能、实习、项目和联系方式。
- 修改 `styles.css` 调整配色、卡片样式和移动端布局。
- 修改 `script.js` 调整背景动画。
- 图片可放入 `assets/`，并在 HTML 中使用相对路径引用。
- 邦彦 logo 使用官网当前的 SVG 地址，加载失败时显示「邦彦技术」文字；其他外部图片与 Google Fonts 的加载也取决于网络和来源网站的可用性。
- 导航中预留了英文、日文入口；当前仓库尚未包含 `en.html` 和 `ja.html`。

## 发布

将修改提交并推送到 GitHub 后，在仓库 **Settings → Pages** 中确认发布来源为 `main` 分支的根目录（`/`）。若尚未配置，需先完成此设置。

发布进度与失败原因可在仓库的 **Actions** 中查看。部署完成后访问在线网址；若仍看到旧样式，可尝试强制刷新浏览器。

提交前可检查补丁格式：

```bash
git diff --check
```
