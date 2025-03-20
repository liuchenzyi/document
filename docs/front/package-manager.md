---
title: Node 包管理器指南
tags:
  - node
  - npm
  - yarn
  - pnpm
date: '2024-12-06 18:50:39'
description: 整理 Node 包管理器的常用操作与实用技巧
category: "front"
---

# npm、yarn、pnpm 指南

## 核心功能

### 安装包管理器
包管理器是Node.js生态的核心工具，用于管理项目依赖。根据项目需求选择适合的包管理器：

::: code-group
```sh [yarn]
# 安装Yarn（Facebook开发的替代npm客户端）
npm install -g yarn
```
```sh [pnpm]
# 安装PNPM（高效磁盘空间利用的包管理器）
npm install -g pnpm
```
:::

选择建议：
- 新项目推荐使用PNPM节省磁盘空间
- 已有项目根据lock文件选择对应工具
- Yarn适合需要工作区功能的场景

### 版本查询
保持包管理器的最新版本可以确保获得最新功能和安全性更新：

::: code-group
```shell [npm]
# 查看NPM版本（Node.js内置版本）
npm -v
```
```shell [yarn]
# 查看Yarn版本（需单独安装）
yarn -v
```
```shell [pnpm]
# 查看PNPM版本（轻量级替代方案）
pnpm -v
```
:::

注意：各包管理器版本需与Node.js版本兼容，升级Node后建议同步更新包管理器

### 镜像源管理
国内用户建议使用镜像源提升下载速度，镜像源会定时与官方仓库同步：

#### 常用镜像源列表
- 官方源：`https://registry.npmjs.org/`（国际线路访问快）
- 淘宝源：`https://registry.npmmirror.com/`（国内推荐）
- 腾讯源：`https://mirrors.cloud.tencent.com/npm/` 
- cnpm源：`https://r.cnpmjs.org/`（阿里巴巴内部源）

#### 镜像源设置
配置镜像源后，所有包下载请求将指向指定服务器：
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

### 依赖管理
依赖管理是包管理器的核心功能，涵盖安装、更新、移除等操作：

#### 安装依赖
安装操作会根据package.json文件解析依赖关系：
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

#### 移除依赖
当不再需要某个依赖时，应及时清理以减少项目体积：
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

### 缓存管理
包管理器会缓存下载的依赖包以加速后续安装：
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

### 依赖查看
查看依赖关系可帮助分析项目结构，排查版本冲突：
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

### 配置管理
配置项影响包管理器的各种行为，建议了解常用配置：
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

### 依赖分析
分析第三方库的依赖关系有助于：
- 理解库的实现基础
- 排查依赖冲突
- 优化最终构建体积
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


### 包版本控制
语义化版本（SemVer）规范：
- MAJOR：不兼容的API修改
- MINOR：向下兼容的功能新增
- PATCH：向下兼容的问题修复

版本控制最佳实践：
::: code-group
```shell [npm]
# 升级主版本 (x.0.0)
npm version major

# 升级次版本 (0.x.0) 
npm version minor

# 升级补丁版本 (0.0.x)
npm version patch

# 指定具体版本号
npm version 1.2.3
```
```shell [yarn]
# 通过Yarn升级版本（需要安装version插件）
yarn version --major
yarn version --minor
yarn version --patch
yarn version 1.2.3
```
```shell [pnpm]
# 使用pnpm变更版本
pnpm version major
pnpm version minor
pnpm version patch
pnpm version 1.2.3
```
:::

新增注释说明：
1. 版本号遵循语义化版本规范 (SemVer): major.minor.patch
2. 执行版本升级命令会自动更新package.json并创建git tag
3. 使用前请确保已提交所有代码变更

## 进阶功能
以下高级功能可提升开发效率：

### 依赖更新
定期更新依赖可获取安全补丁和新功能：
::: code-group
```shell [npm]
# 检查过期依赖
npm outdated
# 交互式更新
npm update --save
```
```shell [yarn]
# 选择性升级
yarn upgrade-interactive
# 更新所有依赖
yarn upgrade --latest
```
```shell [pnpm]
# 更新指定依赖
pnpm update <package>
# 更新所有依赖
pnpm update --latest
```
:::

### 脚本执行
package.json中的scripts字段可定义自动化任务：
::: code-group
```shell [npm]
# 运行自定义脚本
npm run <script-name>
# 并行运行脚本
npm run dev & npm run serve
```
```shell [yarn]
# 运行脚本并传递参数
yarn run <script-name> -- --port=3000
```
```shell [pnpm]
# 过滤运行脚本
pnpm --filter <project> run build
```
:::

### 锁定文件管理
锁定文件（lockfile）确保跨环境安装一致性：
- 记录精确依赖版本
- 保持团队环境统一
- 建议提交到版本控制
::: code-group
```shell [npm]
# 生成锁定文件
npm shrinkwrap
# 强制重建 lockfile
rm -rf package-lock.json && npm i
```
```shell [yarn]
# 更新 yarn.lock
yarn import
```
```shell [pnpm]
# 修复锁定文件
pnpm install --fix-lockfile
```
:::

## 实用技巧
提升效率的进阶使用方法：

### 镜像源快速切换
使用nrm工具简化镜像源管理：
```shell
# 使用 nrm 管理镜像源
npm install -g nrm
nrm ls           # 列出可用源
nrm use taobao   # 切换淘宝源
nrm test taobao  # 测试源速度
```

### 依赖树可视化
可视化依赖关系有助于：
- 发现重复依赖
- 分析依赖层级
- 排查版本冲突
::: code-group
```shell [npm]
npm list --depth=5 | grep vue
```
```shell [yarn]
yarn list --pattern vue
```
```shell [pnpm]
pnpm why vue  # 显示依赖关系链
```
:::

### 多项目管理（Monorepo）
Monorepo适合管理：
- 多个相关项目
- 共享组件库
- 微服务架构
::: code-group
```shell [npm]
npm init -w packages/my-package
```
```shell [yarn]
yarn workspace <workspace-name> add <package>
```
```shell [pnpm]
pnpm add -w <package>  # 全局安装
pnpm --filter <package> add <dependency>  # 指定项目安装
```
:::

### 安全审计
定期审计可及时发现漏洞：
- 检查已知安全漏洞
- 查看修复建议
- 自动修复部分问题
::: code-group
```shell [npm]
npm audit
npm audit fix
```
```shell [yarn]
yarn audit
```
```shell [pnpm]
pnpm audit
```
:::

### 清理系统
定期清理可释放磁盘空间：
- 删除过期缓存
- 清理无效依赖
- 优化node_modules结构
::: code-group
```shell [npm]
npm cache clean --force && rm -rf node_modules
```
```shell [yarn]
yarn cache clean && rm -rf node_modules
```
```shell [pnpm]
pnpm store prune && pnpm rebuild
```
:::
