---
title: 添加文档访问量统计
description: 使用 Vercount 统计文档访问量
category: "vite-press"
date: '2025-01-19 14:00:23'
tags:
  - Vercount
  - vitepress
---

# 添加文档访问量统计

> [Vercount 作者的博客](https://ohevan.com/vercount-website-counter-busuanzi-alternative.html)

> [vercount 官网](https://vercount.one/)

## 获取访问量数据
结合 [源码](https://github.com/EvanNotFound/vercount/blob/main/src/lib/client.js) 分析

```js
  visitorCounterCaller = {
	fetch: async function (callback) {
		const baseUrl = getBaseUrl();
		const apiUrl = `${baseUrl}/log?jsonpCallback=VisitorCountCallback`;
		try {
			visitorCounterDisplay.hideAll();

			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({url: window.location.href}),
			});
			const data = await response.json();
			documentReady(() => {
				callback(data);
				localStorage.setItem("visitorCountData", JSON.stringify(data));
				visitorCounterDisplay.showAll();
			});
		} catch (error) {
			console.error("Error fetching visitor count:", error);
			visitorCounterDisplay.hideAll();
		}
	},
};
```

统计数据主要来自 `log` 接口，参数为 `window.location.href`


## 编写组件
编写一个组件用于展示访问量数据

<<< @/.vitepress/components/TrafficStatistics.vue


## 编写插件

编写一个 `vite` 插件，用于在文档中插入组件

<<< @/.vitepress/plugins/TrafficStatisticsPlugin.ts

**注册全局组件**

在 theme/index.ts 文件中注册全局组件

```ts
import ArticleHeader from '../components/ArticleHeader.vue'
import TrafficStatistics from '../components/TrafficStatistics.vue' // [!code ++]

export default {
	// ...
	enhanceApp(ctx:EnhanceAppContext) {
		DefaultTheme.enhanceApp(ctx);
		
		ctx.app.component('ArticleHeader', ArticleHeader);
		ctx.app.component('TrafficStatistics', TrafficStatistics); // [!code ++]

		// ...
	}
};
```

在配置中启用插件
```ts
import { TrafficStatisticsPlugin } from "./plugins/TrafficStatisticsPlugin"; // [!code ++]

const vitePressOptions = {
	//...
	vite: {
		plugins: [
			// ...
			TrafficStatisticsPlugin() // [!code ++]
		],
	},
	//...
}
```

