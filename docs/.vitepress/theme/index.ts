import DefaultTheme from 'vitepress/theme';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';

import { useRoute } from 'vitepress';
import { useData } from 'vitepress'

import type {EnhanceAppContext} from "vitepress/client";

import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider } from 'naive-ui'
import { defineComponent, h, onMounted } from 'vue'
const { Layout } = DefaultTheme
// @ts-ignore
import ArticleHeader from '../components/ArticleHeader.vue'

import { darkTheme } from 'naive-ui'



const NaiveUIProvider = defineComponent({
	setup(props, { slots }) {
		const { isDark } = useData();
		return () => h(
			NConfigProvider,
			{ abstract: true, inlineThemeDisabled: true, theme: isDark.value ? darkTheme : undefined },
			{
				default: () => [
					h(Layout, null, { default: slots.default?.() }),
				]
			}
		);
	}
});


export default {
    ...DefaultTheme,
	Layout: NaiveUIProvider,
    enhanceApp(ctx:EnhanceAppContext) {
        DefaultTheme.enhanceApp(ctx);

		// 注册全局组件，如果你不想使用也可以不添加
		// ctx.app.component('vImageViewer', vImageViewer);
		ctx.app.component('ArticleHeader', ArticleHeader);

		if (import.meta.env.SSR) {
			const { collect } = setup(ctx.app)
			ctx.app.provide('css-render-collect', collect)
		}
	},
	setup() {
		// 获取路由
		const route = useRoute();
		// 使用 imageViewer 插件
		imageViewer(route);

		// const { isDark } = useData()

		onMounted(() => {
			// 获取当前页面的标题
			// console.log(route.data.title);
		});
    }
};