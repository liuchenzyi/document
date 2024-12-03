import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';
import { pagefindPlugin } from 'vitepress-plugin-pagefind'


// https://vitepress.dev/reference/site-config
const vitePressOptions = {
	title: "个人知识库",
	description: "A VitePress Site",
	// lang: 'zh_CN',
	lastUpdated: true, // 是否显示最后更新时间

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{text: '首页', link: '/'},
			{text: 'Examples', link: '/markdown-examples'}
		],
		sidebar: [],

		socialLinks: [
			{icon: 'gitea', link: 'http://10.126.126.1:3000/liuchen/document'}
		],
		editLink: {
			pattern: 'http://10.126.126.1:3000/liuchen/document/_edit/main/docs/:path',
			text: '编辑此页面'
		},
		lastUpdated: {
			text: '最后更新时间',
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'medium'
			}
		},
		lightModeSwitchTitle: "切换到浅色模式",
		darkModeSwitchTitle: "切换到深色模式",
		outline: {
			label: '页面导航',
		},
		// 文章翻页
		docFooter: {
			prev: '上一篇',
			next: '下一篇'
		}
	},
	locales: {
		zh: {
			lang: 'zh-cn',
			label: '简体中文',
		},
	},
	vite: {
		plugins: [
			pagefindPlugin({
				forceLanguage: 'zh-cn',
				btnPlaceholder: '搜索',
				placeholder: '搜索文档',
				emptyText: '空空如也',
				heading: '共: {{searchResult}} 条结果',
				toSelect: '选择',
				toNavigate: '切换',
				toClose: '关闭',
				searchBy: '搜索',
				customSearchQuery(input: string) {
					return input
						.replace(/[\u4E00-\u9FA5]/g, ' $& ')
						.replace(/\s+/g, ' ')
						.trim()
				},
			}),
		]
	},
	outDir: "./dist",
}


const vitePressSidebarOptions = {
	// VitePress Sidebar's options here...
	documentRootPath: '/docs',
	collapsed: false,
	capitalizeFirst: true,
	debugPrint: false,
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));