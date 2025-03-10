---
title: node 包管理器 常用操作
tags:
  - node
  - npm
  - yarn
  - pnpm
date: '2024-12-06 18:50:39'
description: 记录 一些 node 包管理器的常用操作命令
category: "front"
---

# npm、yarn、pnpm 常用操作

## yarn、pnpm 安装

::: code-group

```sh [yarn]
npm install -g yarn

npm i -g yarn
```

```sh [pnpm]
npm install -g pnpm

npm i -g pnpm
```

:::

## 查看版本号
::: code-group
```shell [npm]
npm -v
```
```shell  [pnpm]
yarn -v
```
```shell [pnpm]
pnpm -v
```
:::

## 镜像源

### 国内常用镜像源

- 官方 `https://registry.npmjs.org/`
- 淘宝 `https://registry.npmmirror.com/`
- 腾讯 `https://mirrors.cloud.tencent.com/npm/`
- cnpm `https://r.cnpmjs.org/`

### 设置镜像源

::: code-group

```sh [npm]
# 查询当前使用的镜像源
npm get registry

# 设置为淘宝镜像源
npm config set registry https://registry.npmmirror.com/

# 还原为官方镜像源
npm config set registry https://registry.npmjs.org/
```

```sh [yarn]
# 查询当前使用的镜像源
yarn config get registry

# 设置为淘宝镜像源
yarn config set registry https://registry.npmmirror.com/
 
# 还原为官方镜像源
yarn config set registry https://registry.yarnpkg.com/

```

```sh [pnpm]
# 查询当前使用的镜像源
pnpm get registry
 
# 设置为淘宝镜像源
pnpm config set registry https://registry.npmmirror.com/
 
# 还原为官方镜像源
pnpm config set registry https://registry.npmjs.org/
```

:::

## 安装包

::: code-group

```sh [npm]
# 安装项目所需的全部依赖（根据package.json文件）
npm install

# 安装指定名称的包
npm install <包名>

# 全局安装一个包
npm install -g <包名>

# 安装指定名称的包并作为开发依赖
npm install vue -D

```

```sh [yarn]
# 安装项目所需的全部依赖（根据package.json文件）
yarn install

# 安装指定名称的包
yarn add <包名>

# 全局安装一个包
yarn global add <包名>

# 安装指定名称的包并作为开发依赖
yarn add vue -D
```

```sh [pnpm]
# 安装项目所需的全部依赖（根据package.json文件）
pnpm install

# 安装指定名称的包
pnpm add <包名>

# 全局安装一个包
pnpm add -g <包名>

# 安装指定名称的包并作为开发依赖
pnpm add vue -D
```

:::

## 移除包

:::code-group

```sh [npm]
npm uninstall <包名>
```

```sh [yarn]
yarn remove <包名>
```

```sh [pnpm]
pnpm remove  <包名>
```

:::

## 缓存相关

::: code-group

```sh [npm]
# 查询缓存目录
npm config get cache

# 清除缓存
npm cache clean --force
```

```sh [yarn]
# 查看缓存列表
yarn cache list

# 查询缓存目录
yarn cache dir

# 清除缓存
yarn cache clean
```

```sh [pnpm]
# 查询缓存目录
pnpm store path

# 设置缓存目录
pnpm config set cache-dir D:\node\pnpm\cache

# 清除缓存
pnpm store prune
```

:::

## 查看依赖

:::code-group

```sh [npm]
#查看本地安装的依赖：
npm list
npm ls

#查看全局安装的依赖：
npm list -g
npm ls -g

#检查过期的依赖：
npm outdated
```

```sh [yarn]
# 查看本地安装的依赖：
yarn list
yarn list --depth=0

# 查看全局安装的依赖：
yarn global list
yarn global list --depth=0

# 检查过期的依赖：
yarn outdated
```

```sh [pnpm]
# 查看本地安装的依赖：
pnpm list
pnpm ls

# 查看全局安装的依赖：
pnpm list --global
pnpm ls --g

# 查看全局安装的包及其路径：
pnpm list --global --long

#检查过期的依赖：
pnpm outdated
```

:::

## 查看配置信息

::: code-group

```shell [npm]
# 查看所有配置设置
npm config list

# 查看所有配置设置（包含默认设置）
npm config list -l
```

```shell [yarn]
# 查看所有配置设置
yarn config list
```

```shell [pnpm]
# 查看所有配置设置
pnpm config list

# 查看所有配置设置（包含默认设置）
pnpm config list
```

:::

## 查看第三方库使用的依赖
::: code-group
```bash [npm]
# 查看依赖
npm view <package-name> dependencies
 
# 查看依赖
npm view <package-name> dependencies --json

# 查看开发依赖
npm view <package-name> devDependencies --json
```

```bash [yarn]
# 查看依赖
yarn info <package-name> dependencies
 
# 查看所有依赖
yarn info <package-name> --json | grep dependencies
```
```bash [pnpm]
# 查看依赖
pnpm info <package-name> dependencies

# 查看所有依赖（包括开发依赖）:
pnpm info <package-name> allDependencies
```
:::


##  变更版本号

::: code-group
```shell [npm]
# 修改主版本号 + 1
npm version major
# 修改次版本号 + 1
npm version minor
# 修改补丁版本号 + 1
npm version patch
```
:::
