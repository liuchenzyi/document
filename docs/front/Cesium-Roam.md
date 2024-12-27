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

let viewer = new Cesium.Viewer("map", {
	infoBox: false, // 禁用沙箱，解决控制台报错
	selectionIndicator: false, //选择指示器
	timeline: false, // 时间轴
	animation: false, // 动画小组件
	geocoder: false, // 地理编码（搜索）组件
	homeButton: false, // 首页，点击之后将视图跳转到默认视角
	sceneModePicker: false, // 投影方式，切换 2D、3D 和 Columbus View (CV) 模式。
	baseLayerPicker: false, // 底图组件，选择三维数字地球的底图（imagery and terrain）。
	navigationHelpButton: false, // 帮助按钮
	fullscreenButton: false, // 全屏按钮
	scene3DOnly: true, // 每个几何实例将只能以 3D 渲染以节省 GPU 内存
	sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
	imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
		url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer'
	})
})

```

图片

## 加载模型并缩放到模型所在区域

```js

const tileSet = await Cesium.Cesium3DTileset.fromUrl("http://192.168.1.101:8228/gateway-service/fileStatic/3dmap/xrkc/tileset.json")
viewer.scene.primitives.add(tileSet)
viewer.zoomTo(tileSet, new Cesium.HeadingPitchRange(-0.5, -0.5, 800)) // 缩放到模型所在区域

```

## 漫游动画

**思路：** 
1. 根据漫游路线，选择漫游需要途径的一些关键点位，将点位的坐标与视角以及到达该点的时间记录下来；
2. 将相机调整为记录的第一个点位的位置和视角，并记录当前时间戳；
3. 开启动画帧，每次执行时获取当前时间戳，计算出当前时间与记录的第一个点位的时间差，根据时间差通过插值的方法计算出当前位置和视角，将相机设置为该位置和视角；
4. 重复步骤2和步骤3，直到所有点位都执行完毕，暂停动画帧，完成漫游动画。



### 定义动画帧数据结构
先定义好动画帧数据的数据结构
```ts
// 漫游点 对象数据结构
interface Capture {
	timeframe: number;  // 时间帧
	position: {
		longitude: number; // 经度
		latitude: number;  // 纬度
		height: number;    // 高程
	};
	orientation: {
		heading: number; // 航向角
		pitch: number; // 俯仰角
		roll: number;// 翻滚角
	};
}

```

### 定义辅助函数

- 获取当前的位置和视角

```js
// 获取当前相机位置和视角
const getCaptureView = () => {
	const camera = viewer.camera;  // 获取相机对象
	const position = camera.positionCartographic; // 使用 Cartographic 表示 
	
	// 将 笛卡尔坐标转化为经纬度
	const longitude = Cesium.Math.toDegrees(position.longitude);
	const latitude = Cesium.Math.toDegrees(position.latitude);
	const height = position.height;
	
	// 将视角转化为角度制
	const heading = Cesium.Math.toDegrees(camera.heading); //  航向角
	const pitch = Cesium.Math.toDegrees(camera.pitch); // 俯仰角
	const roll = Cesium.Math.toDegrees(camera.roll); // 翻滚角
	return {
		position: { longitude, latitude, height },
		orientation: { heading, pitch, roll },
		timeframe: 0
	}
}
```
- 设置相机位置和视角
```ts
// 设置 相机位置和视角
const setCaptureView = (capture: Capture) => {
	viewer.camera.setView({
		destination: capture.position,
		orientation: capture.orientation,
	})
}
```
- 将经纬度转化为 `Cesium.Cartesian3` 坐标点位
```js

const WGS84_to_Cartesian3 = ({ latitude, longitude, height }) => {
    return Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
}
```
- 计算插值
```js
const interpolateView = (startView, endView, t)=> {
    const position = Cesium.Cartesian3.lerp(WGS84_to_Cartesian3(startView.position), WGS84_to_Cartesian3(endView.position), t, new Cesium.Cartesian3());

	let s = startView.orientation.heading
	let e = endView.orientation.heading
	
    const heading = Cesium.Math.toRadians(Cesium.Math.lerp(s, e, t));
    let pitch = Cesium.Math.toRadians(Cesium.Math.lerp(startView.orientation.pitch, endView.orientation.pitch, t));
	
    return {
        position: position,
        orientation: {
            heading: heading,
            pitch: pitch,
            roll: 0
        }
    };
}
```
## 完整代码

GitHub 地址：[https://github.com/xrkffgg/Cesium-Roam](https://github.com/xrkffgg/Cesium-Roam)

## 注意事项 

### 航向角度问题

航向角度问题：在对航向角进行插值时，由于角度范围是 0 到 360，插值的方向有顺时针和逆时针两种

如：359 -> 41 度 插值方式可以有以下两种情况：

- 359 - 358 - ... - 200 - ... - 42 - 41   
- 359 - 360 - 1 - ... - 42 - 41

需要考虑插旋转的方向，否则旋转的方向可能与预想的旋转方向不一致


### 翻滚角度问题
- 因为在制作漫游动画时，翻滚角基本上用不到，所以我将翻滚角度设置为 0


