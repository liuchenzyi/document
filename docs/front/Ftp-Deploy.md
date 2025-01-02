---
title: 通过 Ftp 部署前端项目
tags:
  - Ftp
  - Deploy
date: '2024-12-26 22:53:24'
---

# 通过 Ftp 部署前端项目

在进行前端项目部署时，通常是自己打包，然后将打包好的文件发送给后端的同事，然后由后端将文件部署到服务器上。
但是这样部署的方式感觉比较麻烦，所以就想尝试通过 ftp 部署前端项目。

## 前提条件

服务器开启了 ftp 服务，且具有操作文件的权限。
这里使用的是 window server 操作系统，可以通过 IIS 来开启 ftp 服务
具体操着步骤可以参考 [Windows Server 2019 搭建FTP站点](https://www.cnblogs.com/wencg/p/13450938.html)

::: danger 注意
为了安全起见，设置好Ftp 服务器的密码
:::

## 思路

先梳理一下我们部署的操作步骤：

1. 对服务器上当前的包进行备份
2. 将本地打包好的文件上传到服务器上

使用 `basic-ftp` 来实现对服务器包的备份与新包的上传。

## 实现打包

### 1、安装 `basic-ftp`

`basic-ftp` 是一个 Node.js 的 ftp 客户端库，它提供了一种简单的方式来与 ftp 服务器进行交互。

::: code-group

```shell [npm]
npm install basic-ftp --save -D
```

```shell [yarn]
yarn add basic-ftp --save -D
```

```shell [pnpm]
pnpm install basic-ftp --save -D
```

:::

### 2、测试 ftp 连接

直接打开window 资源管理器，直接输入 `ftp://ip:端口号`，查看是否可以正常连接，若可以正常连接会看到 服务器对应目录下的文件

使用 `basic-ftp` 来连接 `ftp` 服务器,具体代码如下

```js
import {Client} from 'basic-ftp'

// 测试 FTP

const test = async () => {
	const client = new Client()
	client.ftp.verbose = true  //所有套接字通信的调试级日志记录
	try {
		await client.access({
			host: "******",
			user: "******",
			password: "******",
			secure: true
		})
		const result = await client.list()
		console.log(result)
	} catch (err) {
		console.log(err)
	}
	client.close()
}

test()
```

运行成功后会输出 ftp 服务器上的文件列表，如下所示

```
 [ FileInfo {
    name: '.pnpm-store',
    type: 2,
    size: 0,
    rawModifiedAt: '07-23-24 04:38PM',
    modifiedAt: undefined,
    permissions: undefined,
    hardLinkCount: undefined,
    link: undefined,
    group: undefined,
    user: undefined,
    uniqueID: undefined
  }]
```
若未能成功运行，先排查账号密码是否正确，是否开启 ftp 服务，若这些内容没有问题，更具报错结果进一步排查。

### 3、备份与上传文件

**包备份**即将当前服务器上的包进行重命名,可以调用 `rename` 来完成

`Client. rename(srcPath: string, destPath: string): Promise<FTPResponse>`

**上传包** 即将本地的文件夹上传到服务器

`Client. uploadFromDir(localDirPath: string, remoteDirPath?: string): Promise<void>`

### 4、添加打印信息与进度显示

日志要打印的信息

- 所有文件大小
- 已上传的文件大小
- 百分比
- 上传结果

获取当前目录里边所有文件大小

```ts
/**
 * 递归计算目录的总大小
 * @param dirPath 目录路径 - 指定要计算大小的目录
 * @returns {number} 返回目录的总大小（以字节为单位）
 */
const getDirSize = (dirPath: string) => {
        // 读取目录中的所有文件和子目录
        const files = fs.readdirSync(dirPath)
        let size = 0
        files.forEach(file => {
            const filePath = path.join(dirPath, file)
            // 获取文件或子目录的元数据
            const stat = fs.statSync(filePath)
            if (stat.isFile()) {
                size += stat.size
            } else if (stat.isDirectory()) {
                size += getDirSize(filePath)
            }
        })
        return size
    }

```

获取已经上传的文件大小

`basic-ftp` 提供了 `trackProgress` 方法，该方法接受一个回调函数，该回调函数会在每次上传或下载时调用，并传入一个对象，该对象包含当前上传或下载的字节数、总字节数和百分比。

百分比可以通过已上传的文件大小和总文件大小计算得到。

输出结果 可以统计用时，上传的文件数量，等信息

当文件较多时，输出的日志会比较多，不美观，做一些优化

- 进度等信息在同一行输出
- 添加 loading
- 给打印的结果使用颜色区分
  要实现这些内容，需要用到 `progress.stdout`

编写一个在同一行打印的函数，

```ts
const log = (content: string) => {
    process.stdout.clearLine(0);  // 清除当前行
    process.stdout.cursorTo(0);   // 将光标移回到行首
    process.stdout.write(content);  // 每次从最右侧输出
}
```

参考网上的一些资料,如`cli-spinners`，loading 可以使用 一些特殊的字符来完成，每次打印时，切换为下一个字符，

```ts
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
```

要使 打印的结果颜色不同，可以使用 ANSI 转义码来设置控制台输出的文字颜色，详细内容可以参考
> [使用 ANSI 转义码随心所欲地操纵你的终端(改变输出文字颜色、彩虹渐变色、高亮、加粗、移动光标、隐藏光标等)](https://blog.csdn.net/Blaze_dL/article/details/142767515)

以下是一些常见的颜色代码:

| 背景色 | 前景色 |        代码         |
|:---:|:---:|:-----------------:|
| 黑色  | 黑色  | \x1B[30m \x1B[40m |
| 红色  | 红色  | \x1B[31m \x1B[41m |
| 绿色  | 绿色  | \x1B[32m \x1B[42m |
| 黄色  | 黄色  | \x1B[33m \x1B[43m |
| 蓝色  | 蓝色  | \x1B[34m \x1B[44m |
| 紫色  | 紫色  | \x1B[35m \x1B[45m |
| 青色  | 青色  | \x1B[36m \x1B[46m |
| 白色  | 白色  | \x1B[37m \x1B[47m |
| 重置  | 重置  |      \x1B[0m      |

具体使用方法 在要打印的文本前面加上对应的颜色代码，例如：

```js
console.log('\x1B[31m 红色  \x1B[32m 绿色 \x1B[33m 黄色 \x1B[34m蓝色 \x1B[35m 紫色 \x1B[36m 青色 \x1B[37m 白色')
console.log('\x1B[41m 红色  \x1B[42m 绿色 \x1B[43m 黄色 \x1B[44m蓝色 \x1B[45m 紫色 \x1B[46m 青色 \x1B[47m 白色')
console.log('\x1B[33m \x1B[44m 背景蓝色文字黄色 \x1B[36m \x1B[41m 背景红色文字青色')
```

**输出:**
![打印结果](../public/log-with-color.png)
添加回调

记录文件个数

格式化输出
开始上传
loading 百分比 共 已上传 当前处理的文件
上传结束

结果 成功上传 多少个文件，失败多少个

获取本地文件加大小

### 5、添加 npm 脚本命令

### 接下来

- 制作成 vite 插件 发布在 npm
- 打包，直接执行 js 文件

编写 `vite` 的插件，通过 `vite` 的钩子，在打包完成后，执行上述的步骤。(不建议) 有时打包不需要上传
建议配置一个单独的启动脚本，来完成打包并部署

