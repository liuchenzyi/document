---
title: 'mermaid 插件配置'
date: '2025-03-10 22:19:57'
description: 在 vitepress 配置 中配置 mermaid 插件 绘制 流程图
tags:
    - vitepress
    - mermaid
---

# 在 vitepress 使用 mermaid 绘制图表

## 安装 插件

::: code-group

```shell [pnpm]
pnpm add mermaid

pnpm add vitepress-plugin-mermaid -d
```

:::

## 修改配置 config.mts 

::: code-group

```ts
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid'; // [!code ++]

export default defineConfig({
	// ... 其他配置
	markdown: {
		config(md) {
			md.use(groupIconMdPlugin) //代码组图标
			md.use(MermaidMarkdown); // [!code ++]
		},
	},
    
	vite: {
		ssr: {
			noExternal: ['naive-ui', 'date-fns', 'vueuc', 'mermaid'],
		},
        
		optimizeDeps: {
			include: ['mermaid'],
		},
        
		plugins: [
			// ...
			[MermaidPlugin()],	// [!code ++]
		],
	},
})

```

:::

## 使用示例

### 流程图

**输入**

```` markdown
```mermaid
flowchart LR
  Start --> Stop
```
````

**输出**

```mermaid
flowchart LR
  Start --> Stop
```

### 饼图

````markdown

**输入**

```mermaid
pie title Pets adopted by volunteers
"Dogs" : 386
"Cats" : 85
"Rats" : 15
```
````

**输出**

```mermaid
pie title Pets adopted by volunteers
"Dogs" : 386
"Cats" : 85
"Rats" : 15
```
## 更多 图表类型 参考
> [mermaid 中文文档](https://mermaid.nodejs.cn/)


> https://emersonbottero.github.io/vitepress-plugin-mermaid/
