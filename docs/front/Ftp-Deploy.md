---
title: 通过 Ftp 部署前端项目
tags:
  - Ftp
  - Deploy
date: '2024-12-26 22:53:24'
---

# 通过 Ftp 部署前端项目

在进行前端项目部署时，通常是自己打包，然后将打包好的文件发送给后端的同事，然后由后端将文件部署到服务器上。
但是这样部署的方式感觉比较麻烦，所以就想通过 ftp 部署前端项目。

## 前提条件

服务器开启了 ftp 服务，且具有操作文件的权限。
这里使用的是 window server 操作系统，可以通过 IIS 来开启 ftp 服务

先整理一下我们部署的操作步骤：

1. 对服务器上当前的包进行备份
2. 将本地打包好的文件上传到服务器上

## 步骤

### 1、安装 `basic-ftp`

`basic-ftp` 是一个 Node.js 的 ftp 客户端库，它提供了一种简单的方式来与 ftp 服务器进行交互。

::: code-group

```npm
npm install basic-ftp --save -D
```

```yarn
yarn add basic-ftp --save -D
```

```pnpm
pnpm install basic-ftp --save -D
```

:::

### 2、测试 ftp 连接
```js
import {Client} from 'basic-ftp'

// 测试 FTP

const test = async () => {
    const client = new Client()
    client.ftp.verbose = true  //所有套接字通信的调试级日志记录
    try {
        await client.access({
            host: "server",
            // user: "very",
            // password: "password",
            // secure: true
        })
        // console.log(await client.list())
        // await client.downloadTo("local.config", "output/web.config")
        // await client.uploadFrom("local.config", "output/web-copy.config")
        await client.uploadFromDir("../../dist", "output/dist2")
    } catch (err) {
        console.log(err)
    }
    client.close()
}

test()
```

### 3、备份与上传文件


### 4、添加打印日志


### 5、添加进度最终

### 6、添加 npm 脚本命令


### 接下来

编写 `vite` 的插件，通过 `vite` 的钩子，在打包完成后，执行上述的步骤。(不建议)
