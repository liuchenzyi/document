---
title: css 常用属性关键字
date: '2025-03-17 19:47:35'
tags:
    - css
description: 记录一些 css 属性关键字
---

<script setup>
import CurrentColor from '../../components/CurrentColor.vue';
</script>

# CSS 全局关键字属性详解

在开发过程中，我们经常会在浏览器开发者工具中看到各种CSS关键字值。这些值具有特定的含义和作用，掌握它们能帮助我们更好地控制样式表现。

## 1. 继承相关关键字

### 1.1 inherit 继承
```css
.child {
  color: inherit;
}
```
- 继承父元素对应属性的计算值
- 如果父元素没有显式定义该属性，会继续向上级元素查找
- 最终未找到则使用浏览器默认样式
- 适用场景：需要强制子元素继承特定样式时

### 1.2 unset 未设置
```css
.element {
  margin: unset;
}
```
- 智能重置属性值：
- 对可继承属性（如`color`）表现为`inherit`
- 对不可继承属性（如`margin`）表现为`initial`
- 优势：根据属性特性自动选择重置方式

## 2. 重置相关关键字

### 2.1 initial 初始值
```css
.box {
  display: initial; /* 等价于 inline */
}
```
- 将属性重置为CSS规范定义的初始值
- 注意：初始值可能与浏览器默认样式不同
- 典型应用：清除第三方库的样式影响

### 2.2 revert 恢复
```css
h1 {
  font-size: revert; /* 恢复为user-agent样式 */
}
```
- 将属性值还原为：
  - 浏览器默认样式（user-agent stylesheet）
  - 或CSS规范定义的初始值（当没有浏览器默认时）
- 与initial的区别：更贴近浏览器原生表现

### 2.3 revert-layer 回滚层
```css
@layer base {
  h2 { color: blue; }
}

h2 {
  color: revert-layer; /* 回滚到base层的颜色定义 */
}
```
- 回退到上一个层叠层（cascade layer）的定义
- 需要配合@layer规则使用
- 浏览器支持：Chrome 99+、Firefox 97+

## 3. 特殊值关键字

### 3.1 currentColor 当前颜色

- 表示当前元素的`color`属性值
- 实现颜色继承的一致性
- 支持属性：`border-color`、`background-color`、`box-shadow`等

::: code-group
```vue [vue]
<script setup>
import { ref } from 'vue'

const colors = ref(['#2196f3', '#e91e63', '#4caf50'])
const currentColor = ref(colors.value[0])
</script>

<template>
    <div class="color-picker">
        <button
            v-for="color in colors"
            :key="color"
            :style="{ backgroundColor: color }"
            @click="currentColor = color"
        />
    </div>
    <div class="demo-box" :style="{ color: currentColor }">
        <svg class="icon">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <p>动态颜色演示</p>
    </div>
</template>

<style>
.demo-box {
    padding: 1rem;
    border: 2px solid currentColor;
    margin: 1rem 0;
}

.icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
}

.color-picker button {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border: 2px solid #fff;
    cursor: pointer;
}
</style>
```
:::


**动态演示效果**：

<CurrentColor />

### 3.2 auto 自动计算
```css
.container {
  width: auto; /* 默认值 */
  margin: 0 auto; /* 水平居中 */
}
```
- 浏览器根据上下文自动计算值
- 不同属性有不同表现：
  - `width`：可用空间宽度
  - `margin`：水平方向居中
  - `height`：内容高度

### 3.3 none 无
```css
.modal-backdrop {
  /* 隐藏元素并从渲染树移除 */
  display: none;
  /* 移除背景图像和颜色 */
  background: none;
  /* 去掉默认边框 */
  border: none; 
}

/* 清除列表样式 */
ul.clean-list {
  list-style: none;
  padding-left: 0;
}
```





- 表示"无"或"关闭"状态
- 常见使用场景：
  - 隐藏元素（`display: none`）
  - 移除装饰（`border: none`）
  - 清除背景（`background: none`）
  - 去除列表样式（`list-style: none`）
- 注意事项：
  - `display: none` 会从渲染树中移除元素
  - `visibility: hidden` 仅隐藏元素但保留布局空间
  - `opacity: 0` 保持元素交互性但完全透明

## 4. 全局重置属性

### 4.1 all 属性
```css
.reset-box {
  all: unset; /* 可搭配其他关键字使用 */
}
```
- 一次性重置所有属性
- 可用值：initial | inherit | unset | revert
- 注意：慎用该属性，可能造成意外样式重置

## 5. 优先级控制关键字

### 5.1 !important
```css
.alert-text {
  color: red !important;
}
```
- 强制提升样式规则的优先级
- 覆盖其他所有类型的样式声明
- 最佳实践：
  - 尽量通过选择器特异性控制样式
  - 仅用于覆盖第三方样式等特殊场景
  - 避免在全局样式中使用

## 6. CSS 函数值

### 6.1 var() 变量
```css
:root {
  --primary-color: #2196f3;
}

.button {
  background-color: var(--primary-color);
}
```
- 使用自定义属性值
- 支持回退机制：var(--color, blue)
- 适用于主题切换和样式复用

### 6.2 calc() 计算
```css
.sidebar {
  width: calc(100% - 280px);
}
```
- 支持混合单位运算
- 常用于响应式布局
- 运算符前后必须保留空格

## 使用建议

1. 优先使用现代规范推荐的关键字（如revert）替代过时写法
2. 使用currentColor保持颜色系统的统一性
3. 调试时可通过unset快速隔离样式问题
4. 使用all属性时要特别注意作用范围

> 注意：部分关键字（如revert-layer）需要确认目标浏览器支持情况
