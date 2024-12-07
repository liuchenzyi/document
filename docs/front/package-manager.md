---
title: node 包管理器 常用操作
tags :
  - node
  - npm
  - yarn
  - pnpm
---
# npm、yarn、pnpm 常用操作
## 1 镜像源
### 1.1镜像源选择
- 官方 `https://registry.npmjs.org/`
- 淘宝 `https://registry.npmmirror.com/`
- 腾讯 `https://mirrors.cloud.tencent.com/npm/`
- cnpm `https://r.cnpmjs.org/`

###  1.2 设置镜像源
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

# 清除缓存
pnpm store prune
```