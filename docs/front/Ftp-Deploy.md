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
这里使用的是 window server 操作系统，可以通过 IIS 来开启 ftp 服务 具体操着步骤参考 [Windows Server 2019 搭建FTP站点](https://www.cnblogs.com/wencg/p/13450938.html)


::: danger 注意
为了安全起见，一定要设置密码
:::

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
直接打开window 资源管理器，直接输入 `ftp://ip:端口号`，查看是否可以正常连接，若可以正常连接会看到 服务器对应目录下的文件


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

### 3、备份与上传文件

**包备份**及将当前服务器上的包进行重命名

备份包的名称规则一般为 日期-版本号 支持回调函数，package.json 的版本号



**上传包**


### 4、添加打印信息与追踪显示

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

编写 `vite` 的插件，通过 `vite` 的钩子，在打包完成后，执行上述的步骤。(不建议) 有时打包不需要上传
建议配置一个单独的启动脚本，来完成打包并部署

支持 `ssh2` 使用ssh 部署

[前端自动化部署之ssh2和ssh2-sftp-client](https://blog.csdn.net/cuijiying/article/details/144568558)
[ssh2-sftp-client实现前端项目自动部署](https://blog.csdn.net/qq_63358859/article/details/133880096)