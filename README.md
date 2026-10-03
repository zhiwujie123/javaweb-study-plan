# 学习管理系统（LMS）

一个纯前端、零依赖的学习管理系统单页应用，数据保存在浏览器 localStorage 中，可离线使用。

核心内容是**《JavaWeb 全程课（黑马 Tlias 实战）》学习计划**：完整收录 B 站 200 集课程（真实分 P 标题与时长），提供逐集进度打卡、每章习题测验、B 站对应集直达。

## 如何运行

**方式一（最简单）**：直接双击 `index.html` 用浏览器打开即可。

**方式二（本地服务器）**：

```bash
cd learning-management-system
perl server.pl          # 访问 http://127.0.0.1:8410
# 或
python -m http.server 8080
```

## 功能清单

| 模块 | 说明 |
|------|------|
| 🌴 JavaWeb 学习路线图 | 200 集按 13 章组织，逐集勾选打卡，总进度条实时更新；每集附「在 B 站观看本集」直达链接（自动定位对应分 P） |
| 🎯 习题测验 | 每章约 10 道单选/判断题（共 126 题），点击选项即时判分、显示答案解析，答完出总结页，自动保存历史最佳成绩 |
| 🏠 学习中心 | 今日学习进度/目标、连续打卡、课时统计、继续学习（自动指向第一个未学集数）、近 7 天时长柱状图、各课程进度 |
| 📖 全部课程 | 课程卡片、分类筛选、关键词搜索、学习进度条 |
| 📊 学习统计 | 累计时长、完成课时/课程、14 天学习时长图、各课程完成度 |
| ✅ 学习计划 | 任务添加（标题+截止日期）、完成勾选、删除、逾期提醒 |
| 📝 我的笔记 | 在课时页记录笔记、全站笔记汇总 |
| ⚙️ 设置 | 昵称、每日目标分钟数、导出/导入 JSON 备份、重置数据 |

## JavaWeb 课程进度初始化

首次使用会自动把 **P1~34**（HTML/CSS、JS/Vue/Ajax、Maven 依赖管理）标记为已学，从 P35（单元测试）继续。想调整初始进度，修改 `js/javaweb-course.js` 顶部的：

```js
var JW_LEARNED_UNTIL_P = 34;
```

已有旧版数据的用户不用担心：打开新版页面会自动补齐 JavaWeb 初始进度，原有的课程进度、笔记、待办**全部保留**。

## 数据说明

- 所有学习记录（进度、测验成绩、笔记、任务、每日学习时长、设置）保存在浏览器 `localStorage`，键名 `lms_v1`。
- 数据按浏览器隔离：分享网址给别人后，每个人都是自己独立的进度。
- 「设置 → 导出数据」可备份 JSON 文件，换浏览器/电脑时通过「导入数据」恢复。

## 部署到公网（GitHub Pages）

1. 在 GitHub 新建一个仓库（如 `javaweb-study-plan`，Public）。
2. 在本目录执行：

   ```bash
   git remote add origin https://github.com/<你的用户名>/javaweb-study-plan.git
   git push -u origin master
   ```

3. 仓库页面 → Settings → Pages → Source 选择 `master` 分支 / `(root)` → Save。
4. 一分钟后访问 `https://<你的用户名>.github.io/javaweb-study-plan/` 即可，把网址发给任何人都能使用。

（也可用 Vercel / Netlify：导入该 git 仓库即可，无需配置。）

## 技术栈

原生 HTML / CSS / JavaScript（ES6+），无任何外部依赖、无构建步骤，hash 路由单页应用。

## 目录结构

```
learning-management-system/
├── index.html            # 页面骨架（导航 + 脚本引入）
├── css/style.css         # 全部样式（含习题测验样式）
├── js/
│   ├── data.js           # 演示课程种子数据
│   ├── javaweb-course.js # JavaWeb 全程课数据（200集 + 13章 + B站链接）
│   ├── javaweb-quiz.js   # 习题测验数据（13章 126 题，含解析）
│   └── app.js            # 路由、渲染与交互逻辑
└── server.pl             # 极简本地静态服务器（可选）
```

## 版本管理

项目使用 git 管理，可随时回退历史版本：`git log` 查看提交记录，`git checkout <提交号>` 回到任意版本。
