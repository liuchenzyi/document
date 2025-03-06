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
// import TrafficStatistics from '../components/TrafficStatistics.vue'

import { darkTheme } from 'naive-ui'
import './style/index.scss'
import { inBrowser } from 'vitepress'

// 进度条
import { NProgress } from 'nprogress-v2/dist/index.js'
// 样式
import 'nprogress-v2/dist/index.css'

import 'virtual:group-icons.css' //代码组图标样式 //



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
		const { router,app} = ctx
		app.component('ArticleHeader', ArticleHeader);
		// app.component('TrafficStatistics', TrafficStatistics);

		if (import.meta.env.SSR) {
			const { collect } = setup(app)
			app.provide('css-render-collect', collect)
		}

		app.provide('ver-count-url', import.meta.env.SSR? 'https://liuchennan.github.ssr' : 'https://liuchennan.github.dev')
		
		


		// 导航切换 进度条
		if (inBrowser) {
			NProgress.configure({ showSpinner: false })
			router.onBeforeRouteChange = () => {
				NProgress.start() // 开始进度条
			}
			router.onAfterRouteChange = () => {
				NProgress.done() // 停止进度条
			}
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
