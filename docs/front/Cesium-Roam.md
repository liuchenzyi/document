---
title: Cesium 实现场景漫游
tags:
  - Cesium
date: '2024-12-21 22:29:52'
info: 在 Cesium 中实现场景漫游
---

# Cesium

## 准备 Cesium 开发环境

参考 [一分钟搭建 Vite + Cesium 开发环境](https://zhuanlan.zhihu.com/p/354856692) 来搭建 `Cesium` 开发环境。

在浏览器窗口可以显示 `Cesium` 示例。

在使用 `Cesium` 可能出现 如下错误
::: warning
Failed to load resource: the server responded with a status of 401 ()
:::

解决方式1：从 [cesium](https://cesium.com/) 官网获取 `Cesium` 访问 `Token`

登录 [cesium](https://cesium.com/ion/tokens) 官网后在 获取自己的Cesium访问Token（没有账号需要注册）

在初始化`Cesium`前添加如下代码

```js
Cesium.Ion.defaultAccessToken = 个人的CEsium中的Token;
```

解决方式2：初始化时替换掉默认的`ImageProvider`,如使用ArcGis地图服务,

```js
imageryProvider:new Cesium.ArcGisMapServerImageryProvider({
    url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer'
})

```

图片

## 加载模型并缩放到模型所在区域

## 需求

**思路**：标记选择视角，拖动视角，记录视角信息，将数据保存，读取数据，还原视角，在视角之前进行插值

手动选择部分点位和视角，作为漫游动画的 其中的帧，设置帧间隔，然后根据帧间隔，计算出每一帧的视角，然后进行插值，得到每一帧的视角，然后进行渲染。

实现

- 记录 视角与点位信息 并保存
- 开始播放动画 读取数据，视角移动到第一帧，然后根据帧间隔，在第一帧与第二帧之间，计算出每一帧的视角，然后进行插值，得到每一帧的视角，然后进行渲染。
- 到达第二帧后，将第二帧的视角设置为第一帧，然后根据帧间隔，在第二帧与第三帧之间，计算出每一帧的视角，然后进行插值，得到每一帧的视角，然后进行渲染。
- 循环播放

### 问题

在进行转向时，旋转的方向可能不正确，这里做一个简单的限制，计算两者之间的夹角，取旋转角度较小的方向进行旋转，若要旋转的角度过大，可以添加关键政帧
