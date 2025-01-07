---
title: 自动添加文件发布时间
date: '2024-12-10 23:25:02'
description: 自动给文档添加发布时间
category: "vite-press"
tags:
  - Git
  - javascript
  - Node

---

# 自动添加文件发布时间

背景：写了一些文档，打算根据文档创建时间生成 time-line 页面，但不想手动为每个文件添加其发布时间。

## 需要解决的问题

1. 如何拿到文件的创建时间
2. 使用 node 来进行操作
3. 获取对应目录下所有的 md 文件
4. 解析文件元数据，在元数据中添加发布时间
5. 将数据写回源文件

## 获取文档创建时间

我们可以从 git 历史提交记录拿到对应文件的所有提交记录，从中找到第一次提交时间，将其作为文件的创建时间。

> [超级详细Git操作 之git log 命令的参数详解](https://blog.csdn.net/hlsxjh/article/details/135532818)

可以使用如下命令来获取文件的提交记录（只输出时间）
**输入**

```shell
git log  --reverse --format=%ai   -- .\docs\front\index.md
```

**输出**

```
2024-12-21 22:31:21 +0800
2024-12-23 21:04:07 +0800
2024-12-23 22:50:58 +0800
2024-12-25 18:21:25 +0800
2024-12-26 22:52:19 +0800
2024-12-27 23:24:37 +0800
2025-01-05 23:16:10 +0800
```

参数解析：

- `---reverse`: 反转 git log 输出的顺序，从最早的提交开始显示。
- `--format=%ai`: 用于格式化显示每次提交的日期
- `.\docs\front\Cesium-Roam.md`: 指定要查看的文件路径

**部分日期格式参考**

- %ai 作者日期（ISO 格式） 2023-01-01 12:00:00 +0800
- %ad 作者日期（默认格式） Mon Jan 1 12:00:00 2023 +0800
- %cd 提交日期（默认格式） Mon Jan 2 14:30:00 2023 +0800
- %ci 提交日期（ISO 格式） 2023-01-02 14:30:00 +0800

## 获取需要添加发布时间的文件

使用 `glob` 模块可以帮助我们快速获取目录下所有 `md`文件

```js
const files = await glob('**/*.md', {cwd: directoryPath})
```

- `directoryPath` 要进行搜索的目录路径
- `**/*.md` glob 匹配模式，表示匹配当前目录以及子目录下的所有 .md 文件。

**输出**

```
[ 
  'index.md',
  'vite-press\\VitePress.md',
  'vite-press\\vitepress-sidebar.md',
  'vite-press\\time-line.md',
  'vite-press\\naive-ui.md',
  'vite-press\\markdown.md',
  'vite-press\\index.md',
  // ...
]  
```

需要找到目录下所有 .md 文件，这里使用 glob 模块来实现

## 解析与写入元数据

我们可以使用 `gary-matter` 来解析与输出数据
我们需要获取文件中的元数据，判断是否已经添加过发布时间，如果没有则添加发布时间

解析元数据：

```js
import matter from 'gray-matter';

const filePath = path.join(directoryPath, path);	// 拼接完整路径

const content = fs.readFileSync(filePath, 'utf8');	// 以字符串形式读取文件

const {data} = matter(content)	// 解析文件元数据
```

**输出**

```
{}
```

**写入发布时间**

```js
import fs from 'fs';
import matter from 'gray-matter';
const content = fs.readFileSync(filePath, 'utf8');	// 以字符串形式读取文件

const {data} = matter(content)	// 解析文件元数据

// 将数据添加到文件内容中
const newContent = matter.stringify(content, {...data, date:'2024-12-10'})

// 写入文件
fs.writeFile(filePath, newContent, 'utf8', err => {
	if (err) {
		console.error(`Error writing file ${filePath}:`, err);
	} else {
		console.log(`File ${filePath} has been updated.`);
	}
});
```

## 完整代码


<<< ../.vitepress/utils/getPublishTime.ts



