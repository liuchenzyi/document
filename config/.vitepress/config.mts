import { defineConfig, UserConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { MermaidMarkdown } from 'vitepress-plugin-mermaid';
import viteConfig from './vite.config.mts'


// https://vitepress.dev/reference/site-config
const vitePressOptions: UserConfig = {
	title: "个人知识库",
	description: "A VitePress Site",
    lang: 'zh-Hans',
	lastUpdated: true, // 是否显示最后更新时间
	base: '/document/',
    srcDir: '../docs',

	markdown: {
		config(md) {
			md.use(groupIconMdPlugin) //代码组图标
			md.use(MermaidMarkdown);
		},
	},


	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{text: '首页', link: '/'},
			{text: '前端', link: '/front/'},
			{text: 'GIS开发', link: '/gis/'},
			{text: '博客搭建', link: '/vite-press/'}
		],
		sidebar: [],

		socialLinks: [
			{icon: 'github', link: 'https://github.com/liuchenzyi/document'}
		],
		editLink: {
			pattern: 'https://github.com/liuchenzyi/document/blob/main/docs/:path',
			text: '编辑此页面'
		},
		lastUpdated: {
			text: '更新时间',
			formatOptions: {
				dateStyle: 'short',
				// timeStyle: 'medium'
			}
		},
		lightModeSwitchTitle: "切换到浅色模式",
		darkModeSwitchTitle: "切换到深色模式",
		outline: {
			label: '目录',
			level: [2, 3],
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
	vite: viteConfig,
	outDir: "../dist",
}


const vitePressSidebarOptions = [
	{
		// VitePress Sidebar's options here...
		documentRootPath: '/docs',
		scanStartPath: "front",
		resolvePath: "/front/",
		collapsed: true,
		rootGroupText: "相关内容",
		debugPrint: true,
		useTitleFromFrontmatter: true,  //
		excludeFilesByFrontmatterFieldName: "exclude",
		useFolderLinkFromIndexFile: true,
		collapseDepth: 1,
		useFolderTitleFromIndexFile: true
	},
	{
		documentRootPath: '/docs',
		scanStartPath: "vite-press",
		resolvePath: "/vite-press/",
		collapsed: true,
		rootGroupText: "相关内容",
		debugPrint: false,
		useTitleFromFrontmatter: true,  //
		excludeFilesByFrontmatterFieldName: "exclude",
		useFolderLinkFromIndexFile: true,
		collapseDepth: 1,
		useFolderTitleFromIndexFile: true
	},
    {
        documentRootPath: '/docs',
        scanStartPath: "gis",
        resolvePath: "/gis/",
        collapsed: true,
        rootGroupText: "目录",
        debugPrint: false,
        useTitleFromFrontmatter: true,  //
        excludeFilesByFrontmatterFieldName: "exclude",
        useFolderLinkFromIndexFile: true,
        collapseDepth: 1,
        useFolderTitleFromIndexFile: true
    }
];

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
