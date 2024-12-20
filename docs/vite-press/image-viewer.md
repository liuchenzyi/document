---
title: 图像查看
tags:
  - viewerjs
  - vitepress
  - vitepress-plugin-image-viewer
date: '2024-12-12 22:13:18'
---

# 添加图像查看插件

vitepress 文档中，图片点击没有任何效果，
可以使用 [vitepress-plugin-image-viewer](https://github.com/T-miracle/vitepress-plugin-image-viewer)

## 介绍

`vitepress-plugin-image-viewer`是一个基于`viewerjs`的插件，用于在VitePress文档中添加图像查看功能。

`viewerjs` 是一个非常优秀的开源库，它提供了丰富的功能，如图片查看、缩放、旋转、翻页等。

## 使用


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

  ```ts{2-3,12,22-23}
  // ...
  import 'viewerjs/dist/viewer.min.css'
  import imageViewer from 'vitepress-plugin-image-viewer'

  // ...
  export default {
    extends: DefaultTheme,
    Layout: NaiveUIProvider,
    enhanceApp: ({ app, router }) => {
      app.component('ArticleHeader', ArticleHeader)
      if (import.meta.env.SSR) {
        const { collect } = setup(app)
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

## 原理解析
