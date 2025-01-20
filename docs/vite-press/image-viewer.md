---
title: 图像查看
description: 给文档添加图像查看功能
category: "vite-press"
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

修改 `.vitepress/theme/index.ts` 文件

  ```ts{2-3,22}
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

查看源代码，这个插件的实现原理是，在页面加载完成后或在路由切换后，通过`Viewer`构造函数创建一个`viewer`对象，并传入图片元素和配置选项。

```ts
import Viewer from 'viewerjs';
import { nextTick, onMounted, watch } from 'vue';
import type { Route } from 'vitepress';

let viewer: Viewer | null = null;

/**
 * 给图片添加预览功能
 */
const setViewer = (el: string = '.vp-doc', option?: Viewer.Options) => {
	console.log('setViewer');
	// 默认配置
	const defaultBaseOption: Viewer.Options = {
		navbar: false,
		title: false,
		toolbar: {
			zoomIn: 4,
			zoomOut: 4,
			prev: 4,
			next: 4,
			reset: 4,
			oneToOne: 4
		}
	}
	viewer = new Viewer(<HTMLElement>document.querySelector(el), {
		...defaultBaseOption,
		...option
	})
};

/**
 * set imageViewer
 * 设置图片查看器
 * @param route 路由
 * @param el The string corresponding to the CSS selector, the default is ".vp-doc img".
 * <br/>CSS选择器对应的字符串，默认为 ".vp-doc img"
 * @param option viewerjs options
 * <br/>viewerjs 设置选项
 */
const imageViewer = (route: Route, el?: string, option?: Viewer.Options) => {
	onMounted(() => {
		setViewer(el, option);
	})
	watch(() => route.path, () => nextTick(() => {
		viewer?.destroy();
		setViewer(el, option);
	}));
}

export default imageViewer;

```