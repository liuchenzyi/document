import DefaultTheme from 'vitepress/theme';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';

import { useRoute } from 'vitepress';
import type {EnhanceAppContext} from "vitepress/client";

import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider } from 'naive-ui'
import { defineComponent, h, inject, onMounted } from 'vue'
const { Layout } = DefaultTheme
// @ts-ignore
import ArticleHeader from '../components/ArticleHeader.vue'

import '../styles/global.scss'


const CssRenderStyle = defineComponent({
	setup() {
		const collect = inject('css-render-collect') as ()=> string
		return {
			style:  collect()
		}
	},
	render() {
		return h('css-render-style', {
			innerHTML: this.style
		})
	}
})
const VitepressPath = defineComponent({
	setup() {
		const route = useRoute()
		return () => {
			return h('vitepress-path', null, [route.path])
		}
	}
})

const NaiveUIProvider = defineComponent({
	render() {
		return h(
			NConfigProvider,
			{ abstract: true, inlineThemeDisabled: true },
			{
				default: () => [
					h(Layout, null, { default: this.$slots.default?.() }),
					import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
				]
			}
		)
	}
})



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


        // ...
    },
    setup() {
        // 获取路由
        const route = useRoute();
        // 使用 imageViewer 插件
        imageViewer(route);

		onMounted(() => {
			// 获取当前页面的标题
			// console.log(route.data.title);
		});
    }
};