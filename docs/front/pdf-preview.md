---
title: pdf 预览
tags:
  - pdf
  - pdf.js
date: '2024-12-17 23:04:35'
info: pdf.js 预览pdf文件
---

# 使用 pdf.js 预览 pdf 文件


问题：跨域问题
`Refused to display 'http://localhost:8080/' in a frame because it set 'X-Frame-Options'。`

尝试使用 浏览器原生支持解决

## PDF.js 库简介和功能概述
PDF.js 是一个由 Mozilla 开发的 JavaScript 库，用于在 Web 上显示 PDF 文件。它具有以下功能：

- 在浏览器中原生渲染 PDF：PDF.js 可以直接在浏览器中渲染 PDF 文件，无需依赖外部插件或软件。
- 支持基本的查看和导航功能：PDF.js 提供了一些基本的查看和导航功能，如缩放、翻页、搜索等。
- 自定义样式和交互：PDF.js 允许开发者通过 API 自定义 PDF 文件的显示样式和交互行为。
- 跨平台支持：PDF.js 可以在各种现代浏览器和操作系统上运行，包括桌面和移动设备。

## 下载

[官方下载地址](https://mozilla.github.io/pdf.js/getting_started/#download)


```
├── build/
│   ├── pdf.js                             - display layer
│   ├── pdf.js.map                         - display layer's source map
│   ├── pdf.worker.js                      - core layer
│   └── pdf.worker.js.map                  - core layer's source map
├── web/
│   ├── cmaps/                             - character maps (required by core)
│   ├── compressed.tracemonkey-pldi-09.pdf - PDF file for testing purposes
│   ├── debugger.js                        - helpful debugging features
│   ├── images/                            - images for the viewer and annotation icons
│   ├── locale/                            - translation files
│   ├── viewer.css                         - viewer style sheet
│   ├── viewer.html                        - viewer layout
│   ├── viewer.js                          - viewer layer
│   └── viewer.js.map                      - viewer layer's source map
└── LICENSE
```

原理：如何解决跨域问题

## 测试

## 修改代码 





                           

## mjs mime type 问题

```
Failed to load module script: The server responded with a non-JavaScript MIME type of "application/octet-stream".
Strict MIME type checking is enforced for module scripts per HTML spec.
```

由于nginx无法识别mjs文件，从而在http header中错误的使用 Content-Type:application/octet-stream 来传输mjs文件，导致浏览器端认为它不是一个合法的js脚本，