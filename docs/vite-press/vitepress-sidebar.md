---
title: 自动生成侧边栏
description: 使用 vitepress-sidebar 自动生成侧边栏
category: "vite-press"
tags:
  - vitepress
  - vitepress-sidebar
date: '2024-12-12 22:03:26'
---

# 使用 vitepress-sidebar 自动生成侧边栏

## 介绍

功能强大的自动侧边栏生成器
文档地址：

- [文档地址](https://vitepress-sidebar.cdget.com/)
- [GitHub 仓库地址](https://github.com/jooy2/vitepress-sidebar)

### 安装插件

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

- `glob` 主要用于匹配文件路径
- `gray-matter` 用于解析字符串或文件中的前端元数据

> VitePress Sidebar 会根据您在项目文件夹中指定的文件夹路径（documentRootPath），分层扫描您的文件夹和标记文件。
> 然后，它会根据您的设置对某些文件进行排除、排序和格式化，读取侧边栏菜单的标题，最后根据 VitePress 要求的侧边栏规范输出设置数据。


