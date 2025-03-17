---
title: css 属性关键字
date: '2025-03-17 19:47:35'
tags:
    - css
description: 记录一些 css 属性关键字
---

# css 一些属性关键字

在 控制台 修改样式时 经常会出现这些值 这些值究竟有什么含义

## inherit 继承
继承父元素、父元素没有相关属性就去一级一级向上查找，直到找到根元素依然没有找到可以继承的属性之后，就会用浏览器默认样式表

## initial 初始值

属性的初始值，这个值和浏览器无关
这个初始值我们之前也知道了，和浏览器没有关系，和浏览器默认样式也没有关系。



## revert 恢复

使用浏览器的默认样式

## revert-layer

## unset 未设置

CSS属性分为可继承和不可继承
可继承的属性，如color，对一个元素设置了，就会影响他的子孙后代。
不可继承的属性，如果设置了，只会对他自己有用。
unset更像是前面两个关键字的集合，综合，
对于可继承元素，unset==inherit；
对于不可继承的元素，unset==initial



inherit initial revert revert-layer unset