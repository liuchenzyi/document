---
title: 集成 Naive UI
description: 在 vitepress 中集成 Naive UI
category: "vite-press"  
date: '2024-12-14 13:21:12'
tags:
  - naive ui
  - vitepress
---

# 在 vitepress 中集成 Naive UI


> 参考 [Naive UI 官方文档](https://www.naiveui.com/zh-CN/os-theme/docs/vitepress)

## 安装依赖
::: code-group
```bash [npm]
npm install --save-dev @css-render/vue3-ssr
npm install --save-dev naive-ui
````
```bash [pnpm]
pnpm install --save-dev @css-render/vue3-ssr
pnpm install --save-dev naive-ui
```
:::

## 配置 vitepress

在 `.vitepress/theme/index.js` 添加以下代码

- 定义 `NaiveUIProvider` 组件用于 包裹 vitepress 的 Layout 组件
- 使用 `@css-render/vue3-ssr` 搜集 naive-ui 的样式
::: code-group
```ts [.vitepress/theme/index.js]
import { setup } from '@css-render/vue3-ssr'
import type { EnhanceAppContext } from "vitepress/client";
import DefaultTheme from 'vitepress/theme';
import { NConfigProvider } from 'naive-ui'
import { defineComponent, h } from 'vue'

const NaiveUIProvider = defineComponent({
    setup(props, {slots}) {
        return () => h(
            NConfigProvider,
            {abstract: true, inlineThemeDisabled: true},
            {
                default: () => [
                    h(Layout, null, {default: slots.default?.()}),
                ]
            }
        );
    }
});

export default {
    ...DefaultTheme,
    Layout: NaiveUIProvider,
    enhanceApp(ctx: EnhanceAppContext) {
        DefaultTheme.enhanceApp(ctx);
        const { app} = ctx
        if(import.meta.env.SSR) {
            setup(app)
        }
    }
};
```

:::

## 在 markdown 中使用 naive-ui 组件
::: code-group
```markdown [markdown]
<script setup>
import { NButton } from 'naive-ui'
</script>

<NButton>Hello World</NButton>
```
:::
<script setup>
import { NButton } from 'naive-ui'
</script>

<NButton>Hello World</NButton>

## 将 vitepress 主题与 Naive UI 关联

作完上边的配置后，就可以在 markdown 中使用 naive-ui 组件了，但在使用过程中发现 naive-ui 组件的主题与不会跟随 vitepress 主题变化

在配置中添加 `theme` 属性，值为 `isDark.value ? darkTheme : undefined` 将解决这个问题

::: code-group
```typescript [.vitepress/theme/index.mts ]
import { setup } from '@css-render/vue3-ssr'
import type { EnhanceAppContext } from "vitepress/client";
import DefaultTheme from 'vitepress/theme';
import { NConfigProvider } from 'naive-ui'
import { defineComponent, h } from 'vue'
import { useData } from 'vitepress'; // [!code ++]
const NaiveUIProvider = defineComponent({
    setup(props, {slots}) {
        const {isDark} = useData();// [!code ++]
        return () => h(
            NConfigProvider,
            {abstract: true, inlineThemeDisabled: true},// [!code --]
            {abstract: true, inlineThemeDisabled: true, theme: isDark.value ? darkTheme : undefined},// [!code ++]
            {
                default: () => [
                    h(Layout, null, {default: slots.default?.()}),
                ]
            }
        );
    }
});


```

## 报错解决

Hydration completed but contains mismatches

::: details 参考链接
- [Hydration completed but contains mismatches](https://github.com/vitejs/vitepress/issues/1168)

:::


## 注意
该文档教官方文档 省略 了部分操作 实测对于打包后的效果没有影响就没有添加 