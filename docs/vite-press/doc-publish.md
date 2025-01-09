---
title: 自动添加文档发布时间
date: '2024-12-10 23:25:02'
description: 自动给文档添加发布时间
category: "vite-press"
tags:
  - Git
  - Node
  - child_process
  - gray-matter

---

# 自动添加文档发布时间

背景：已经写了一些文档，打算根据文档创建时间生成 time-line 作为首页， 手动为每个文档手动添加发布时间，比较繁琐，打算使用文档的首次提交时间作为文档发布时间。

## 需要解决的问题

1. 如何拿到文档的发布时间
2. 获取对应目录下所有的 md 文件
3. 解析文件元数据，在元数据中添加发布时间

## 1 获取文档首次提交时间

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
- `.\docs\front\index.md`: 指定要查看的文件路径

**部分日期格式参考**

- %ai 作者日期（ISO 格式） 2023-01-01 12:00:00 +0800
- %ad 作者日期（默认格式） Mon Jan 1 12:00:00 2023 +0800
- %cd 提交日期（默认格式） Mon Jan 2 14:30:00 2023 +0800
- %ci 提交日期（ISO 格式） 2023-01-02 14:30:00 +0800

有些文件已经创建了，但是还没有提交，但是期望给其添加发布时间，可以使用使用文件的创建时间或当前时间作为发布时间

```ts
import fs from 'fs';
import dayjs from "dayjs";

/**
 * 获取文件的创建时间
 * 在某些系统上，文件的创建时间（birthtime）可能无法正确获取，因此使用当前时间作为为替代
 *
 * @param filePath 文件路径
 * @param format 日期格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
const getFileBirthtime = (filePath: string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
    try {
        const stat = fs.statSync(filePath);
        if (stat.birthtime.getFullYear() === 1970) {
            return dayjs().format(format)
        }
        return dayjs(stat.birthtime).format(format)
    } catch (e) {
        console.error(`Error getting birthtime`, e)
        return dayjs().format(format)
    }
}
```

## 2 使用 node 执行 shell 命令

我们可以使用 `child_process` 来执行 shell 命令

> `child_process` 是 Node.js 的一个内置模块，供了生成子进程的能力，可以用来执行Shell命令，通过这个模块，可以在 Node.js
> 应用中执行外部命令、与子进程通信等。

**参考代码**

```ts
import {execSync} from 'child_process';

const filePath = '.\\docs\\front\\index.md'  // 测试时可以使用绝对路径

// 解构 git log 输出的第一行
const [date = ''] = execSync(
    `git log --reverse --format=%ai -- ${filePath}`,
    {
        encoding: 'utf8'
    }
).split('\n')

console.log(date)

// 输出结果
// 2024-12-21 22:31:21 +0800
```

## 3 获取对应目录下所有的 md 文件

[glob npm 地址](https://www.npmjs.com/package/glob )

glob 是一个用于文件路径模式匹配的工具，它允许你使用简单的模式（类似于 shell 中的通配符）来匹配文件和目录。通过
glob，可以轻松地查找符合特定模式的所有文件或目录，而不需要手动遍历整个文件系统。

我们可以使用 glob 来获取对应目录下的所有 md 文件。

安装 glob

```shell [npm]
npm i glob -D
```

**参考代码**

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

`Glob` 详细使用 可以参考
> [前端工程化之强大的glob语法](https://juejin.cn/post/6876363718578405384)

## 4 解析与写入元数据
我们需要解析出文件的元数据，并在文件写入发布时间的时候，将这些数据一起写回文件，避免数据丢失，同时，对于已经添加过发布时间的文件，不进行修改。

[gray-matter npm 地址](https://www.npmjs.com/package/gray-matter)
> gray-matter是一个开源的 `Node.js` 库，用于解析字符串或文件中的前端元数据。它支持YAML、JSON、TOML和CoffeeScript等多种格式的元数据，并且提供了灵活的选项来设置自定义分隔符。

`gray-matter`的使用可以参考 npm 上的文档，写的比较详细。

### 4.1 解析元数据
`gray-matter` 提供 `matter`和`matter.read` 获取元数据， 区别是 `matter` 是解析字符串， `matter.read` 是解析文件。
由于这里还需要将 `gray-matter` 的元数据添加到文件中需要文件内容，所以这里使用 `matter`方法

```js
import matter from 'gray-matter';
import path from 'path';

const filePath = '.\\docs\\front\\index.md'// 文件路径

const content = fs.readFileSync(filePath, 'utf8');	// 读取文件内容

const {data} = matter(content)	// 解析文件元数据
console.log(data)
```

### 4.2 将元数据转化为字符串
`gray-matter` 提供了 `matter.stringify` 方法，可以将元数据和内容转化为字符串，添加到给定的字符串中。

下面是一个例子
```js
import matter from 'gray-matter';
console.log(matter.stringify('foo bar baz', {title: 'Home'}));
// 结果如下
// ---
// title: Home
// ---
// foo bar baz
```
我们还需要将这些添加了发布时间的数据写入文件中

```js
import fs from 'fs';
import matter from 'gray-matter';

const content = fs.readFileSync('.\\docs\\front\\index.md', 'utf8');	// 以字符串形式读取文件

const {data} = matter(content)	// 解析文件元数据

// 将数据添加到文件内容中
const newContent = matter.stringify(content, {...data, date: '2024-12-10'})

// 写入文件
fs.writeFile(filePath, newContent, 'utf8', err => {
	if (err) {
		console.error(`Error writing file ${filePath}:`, err);
	} else {
		console.log(`The published  time had been added to ${filePath}`);
	}
});
```

## 完整代码

<<< ../.vitepress/utils/getPublishTime.ts



