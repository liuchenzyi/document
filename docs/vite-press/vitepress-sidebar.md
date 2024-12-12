---
title: 自动生成侧边栏
tags:
  - vitepress
  - vitepress-sidebar
date: '2024-12-12 22:03:26'
---
# 使用 vitepress-sidebar 自动生成侧边栏
## 介绍
插件 扫描本地文件夹，自动生成侧边栏，并且根据文章名称日期排序
文档地址：
- [文档地址](https://vitepress-sidebar.cdget.com/)
- [GitHub 仓库地址](https://github.com/jooy2/vitepress-sidebar)

###  安装插件


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


## 原理解析
vitepress-sidebar 依赖：
- `glob`
- `gray-matter`
