---
title: 前端常用 npm 包
date: '2024-12-01 14:51:20'
tags:
  - npm
  - javascript
description: 分享在前端开发中一些常用的 npm 包
category: "front"
---

# 前端常用工具包汇总

平时开发时用到的`npm`包，分享一下

## dayjs

一个极简的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持一样, 但体积仅有 2KB。

**demo**

```js
var dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015

dayjs().format() // 2020-09-08T13:42:32+08:00
dayjs().format('YYYY-MM-DD') // 2020-09-08
dayjs().format('YYYY-MM-DD HH:mm:ss') // 2020-09-08 13:47:12
dayjs(1318781876406).format('YYYY-MM-DD HH:mm:ss') // 2011-10-17 00:17:56
```

更多使用方法请看官网：[官网地址](https://dayjs.fenxianglu.cn/)

## nanoid

生成 uuid

**demo**

```javascript
// 导入
import {nanoid} from 'nanoid'

let id1 = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
//也可以指定生成字符串的长度
let id2 = nanoid(5)
```

## animate.css

强大的跨平台的预设 css3 动画库，内置了很多典型的 css3 动画，兼容性好使用方便

**demo**

```vue

<script>
	// 引入
	import 'animate.css'
</script>
<template>
	// 使用方法
	<h1 class="animate__animated animate__bounce">An animated element</h1>

	// Vue使用方法
	<transition-group
		appear
		name="animate__animated animate__bounce"
		enter-active-class="xxx"
		leave-active-class="xxx"
	>
		......
	</transition-group>
</template>
```

更多使用方法请看官网：[官网地址](https://animate.style/)

## animejs

一个轻量的 JavaScript 动画库， 拥有简单而强大的 API。 可对 CSS 属性、 SVG、 DOM 和 JavaScript 对象进行动画。

**demo**

```vue

<template>
	<div class="ball" style="width: 50px; height: 50px; background: blue"></div>
</template>
<script>
	import anime from 'animejs/lib/anime.es.js'

	// 页面渲染完成之后执行
	anime({
		targets: '.ball',
		translateX: 250,
		rotate: '1turn',
		backgroundColor: '#F00',
		duration: 800,
	})
</script>
```

## nprogress

请求进度条。这是一个类似 youtube、Medium 等网站上的小进度条插件。纳米级的进度条，涓涓细流动画告诉你的用户，一些事情正在发生！

**demo**

```js
import nprogress from "nprogress"
import "nprogress/nprogress.css"
// 开始
nprogress.start()
// 结束
nprogress.done()
// 改样式
#nprogress.bar
{
	background:xxx
	!important
}
```

更多使用方法请看官网：[官网地址](https://madewith.cn/23)

## qs

[qs](https://github.com/ljharb/qs)是一个流行的查询参数序列化和解析库。可以将一个普通的 object
序列化成一个查询字符串，或者反过来将一个查询字符串解析成一个 object，而且支持复杂的嵌套。

[npm 库地址](https://www.npmjs.com/package/qs)

[中文网](https://storm4542.github.io/archives/7b89c88d.html)

**demo**

```js
import qs from 'qs'

qs.parse('user=tom&age=22') // => { user: "tom", age: "22" }
qs.stringify({user: 'tom', age: '22'}) // => user=tom&age=22
```

## flv.js

哔哩哔哩开源的播放器

[github 文档地址](https://github.com/bilibili/flv.js/blob/master/docs/api.md)

[npm 库地址](https://www.npmjs.com/package/flv.js)
**demo**

```vue

<template>
	<video autoplay controls width="100%" height="500" id="myVideo"></video>
</template>

<script>
	import flvjs from 'flv.js'
	// 页面渲染完成后执行
	if (flvjs.isSupported()) {
		const myVideo = document.getElementById('myVideo')
		const flvPlayer = flvjs.createPlayer({
			type: 'flv',
			url: 'http://localhost:8080/test.flv', // 视频 url 地址
		})
		flvPlayer.attachMediaElement(myVideo)
		flvPlayer.load()
		flvPlayer.play()
	}
</script>
```


## swiper

Swiper是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端。

[swiper 中文网](https://swiper.com.cn/)
[swiper 官网](https://swiperjs.com/)

## js 加密

jsencrypt就是一个基于rsa加解密的js库，使用时需要安装



## jessibuca

纯H5低延迟直播流播放器
[jessibuca](https://jessibuca.com/)