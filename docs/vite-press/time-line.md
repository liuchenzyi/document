---
title: Time-Line 首页
tags:
  - vitepress
  - Naive-UI
  - Time-Line
description: 自定义首页
category: "vite-press"
date: '2024-12-14 21:26:46'
---


# 自定义首页 时间轴


## 获取数据

每篇文档的数据配置在对应 md 文件的 `frontmatter` 中

``` yaml
---
title: Time-Line 首页
tags:
  - vitepress
  - Naive-UI
  - Time-Line
description: 自定义首页
category: "vite-press"
date: '2024-12-14 21:26:46'
---
```

展示具体展示 文档的标签 时间 描述等信息

结合 `VitePress`  [createContentLoader](https://vitepress.dev/zh/guide/data-loading#createcontentloader) 文档，根据需求在获取数据



<<< @/.vitepress/components/posts.data.ts

## 编写首页组件

<<< @/.vitepress/components/HomeIndex.vue



- [vitepress-createContentLoader](https://vitepress.dev/zh/guide/data-loading#createcontentloader)
