---

---

# vite press博客搭建

## 前言

服务器过期快一年了，博客也快一年没更新了，最近重新搭建了一下博客，记录一下搭建过程。

以前的博客是使用vuepress搭建的，这次换成了vitepress，vitepress是vuepress的下一代，使用vite构建，性能更好，体验更好

缺点：`vitepress的插件生态还没有vuepress那么丰富，很多功能需要自己实现`

优点：`vitepress可配置项、api都比较多，大部分功能都能实现`

:::details 相关链接
[vuepress博客](https://lee-holden.github.io/vuepress-blog/)

[vuepress仓库地址](https://github.com/lee-holden/vuepress-blog)

[vitepress博客](https://dddhl.cn)

[vitepress仓库地址](https://github.com/lee-holden/blog)

[vitepress-blog-template](https://github.com/lee-holden/vitepress-blog-template)
:::

## 博客介绍

- 自定义首页
- 网站加载页
- 全文搜索
- 全文图片放大
- 网站访问量统计
- GitHub评论系统
- 自动配置侧边栏
- 自动打包部署GitHub Pages
- 自动统计文章字数/阅读时间/最近更新时间
- 未完待续......

## 1. 安装

[vite-press官方文档](https://vitepress.dev/zh/)

Node.js 18 及以上版本，推荐使用pnpm安装

::: code-group

```sh [npm]
# 初始化项目并安装 VitePress 依赖
npm init -y
npm install vitepress --save-dev

# 使用 VitePress CLI 初始化目录结构
npx vitepress init

```

```sh [yarn]
yarn init -y
yarn add -D vitepress

# 使用 VitePress CLI 初始化目录结构
yarn vitepress init

```

```sh [pnpm]
# 创建项目并安装 VitePress 依赖
pnpm init
pnpm add -D vitepress

# 使用 VitePress CLI 初始化目录结构
pnpm vitepress init

```

:::

```sh
┌ Welcome to VitePress!
│
◇ Where should VitePress initialize the config?
│ ./docs
│
◇ Site title:
│ My Awesome Project
│
◇ Site description:
│ A VitePress Site
│
◇ Theme:
│ ● Default Theme (Out of the box, good-looking docs)
│ ○ Default Theme + Customization
│ ○ Custom Theme
│
◇ Use TypeScript for config and theme files?
│  Yes
│
◆ Add VitePress npm scripts to package.json?
│  Yes
└
```

## 2. 运行

::: code-group

```sh [npm]
npm run docs:dev
```

```sh [yarn]
yarn docs:dev
```

```sh [pnpm]
pnpm docs:dev
```

:::

![运行效果](/img.png)

## 3. 结构

官方文档：[vitepress目录结构](https://vitepress.dev/zh/guide/getting-started#file-structure)

需要手动新建文件夹，我的目录结构如下：

```
.
├─ .github                # 配置GitHub Actions
├─ docs
│  ├─ .vitepress
│  │  ├─ components       # 自定义组件
│  │  ├─ plugins          # 自定义插件
│  │  ├─ theme            # 主题配置
│  │  ├─ utils            # 工具函数
│  │  └─ config.mts       # 配置文件
│  ├─ 2024
│  │  └─ xx.md            # 文章
│  ├─ img                 # 文章图片
│  ├─ pages               # 自定义页面
│  ├─ public              # 静态资源
│  └─ index.md            # 首页
└─ package.json
```

## 4. 导航栏

配置文件：`/docs/.vitepress/config.mts`

### 4.1 标题

官方文档：[vitepress站点标题和图标](https://vitepress.dev/zh/reference/default-theme-nav#site-title-and-logo)

<<< ./.vitepress/config.mts{ts}

### 4.2 搜索

官方文档：[vitepress搜索](https://vitepress.dev/zh/reference/default-theme-search)

有多种方式可以实现，我采用的是 [vitepress-plugin-pagefind](https://www.npmjs.com/package/vitepress-plugin-pagefind) 插件

该插件支持i18n，具体配置请查看文档

:::code-group

```sh [npm]
npm i vitepress-plugin-pagefind pagefind
```

```sh [yarn]
yarn add vitepress-plugin-pagefind pagefind
```

```sh [pnpm]
pnpm add vitepress-plugin-pagefind pagefind
```

:::

<<< ./.vitepress/config.mts{9 ts:line-numbers}

### 4.3 导航链接

官方文档：[vitepress导航链接](https://vitepress.dev/zh/reference/default-theme-nav#navigation-links)

配置中的link是md文件的地址，比如：`/pages/about` 对应 `docs/pages/about.md`

```ts{4-19}
export default defineConfig({
  themeConfig:{
   nav: [
      { text: '主页', link: '/' },
      { text: '闲聊', link: '/pages/comment' },
      { text: '关于', link: '/pages/about' },
      {
        text: '推荐',
        items: [
          {
            items: [
              { text: '实用网页', link: '/pages/webPage' },
              { text: '工具插件', link: '/pages/tools' },
            ],
          },
        ],
      },
    ],
  }
  // ...
})
```

## 7. 文章侧边栏

官方文档：[vitepress 侧边栏](https://vitepress.dev/zh/reference/default-theme-sidebar)

正常情况下，需要手动配置侧边栏

```ts
export default {
	themeConfig: {
		sidebar: [
			{
				text: 'Guide',
				items: [
					{text: 'Introduction', link: '/introduction'},
					{text: 'Getting Started', link: '/getting-started'},
					//...
				]
			}
		]
	}
}
```

### 7.1 使用插件

插件可以自动生成侧边栏并且根据文章名称日期排序

[vitepress-sidebar](https://vitepress-sidebar.cdget.com/)

::: code-group

```sh [npm]
npm i -D vitepress-sidebar
```

```sh [yarn]
yarn add -D vitepress-sidebar
```

```sh [pnpm]
pnpm add -D vitepress-sidebar
```

:::

`.vitepress/config.mts` 文件，具体配置请看官方文档



## 8. 访问统计

用的是 [busuanzi](https://busuanzi.ibruce.info/)

- 安装
  ::: code-group

  ```sh [pnpm]
  pnpm add -D busuanzi.pure.js
  ```

  ```sh [npm]
  npm i -D busuanzi.pure.js
  ```

  ```sh [yarn]
  yarn add -D busuanzi.pure.js
  ```

  :::

## 9. 图片放大

vitepress文章中，图片点击没有任何效果，可以使用 [vitepress-plugin-image-viewer](https://github.com/T-miracle/vitepress-plugin-image-viewer)
这个插件

- 安装
  ::: code-group

  ```sh [pnpm]
  # Tip: If you use pnpm to install, you need to install viewerjs additionally.
  pnpm add vitepress-plugin-image-viewer viewerjs
  ```

  ```sh [npm]
  npm i vitepress-plugin-image-viewer
  ```

  ```sh [yarn]
  yarn add vitepress-plugin-image-viewer
  ```

  :::

- `.vitepress/theme/index.ts` 文件

  ```ts{2-4,11,23-26}
  // ...
  import 'viewerjs/dist/viewer.min.css'
  import imageViewer from 'vitepress-plugin-image-viewer'
  import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue'

  // ...
  export default {
    extends: DefaultTheme,
    Layout: NaiveUIProvider,
    enhanceApp: ({ app, router }) => {
      app.component('ArticleHeader', ArticleHeader)
      app.component('vImageViewer', vImageViewer)
      if (import.meta.env.SSR) {
        const { collect } = setup(app)
        app.provide('css-render-collect', collect)
      }
      if (inBrowser) {
        router.onAfterRouteChanged = () => {
          busuanzi.fetch()
        }
      }
    },
    setup() {
      const route = useRoute()
      imageViewer(route)
    },
  }
  ```


