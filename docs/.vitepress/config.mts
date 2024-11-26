import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';


// https://vitepress.dev/reference/site-config
const vitePressOptions = {
	title: "My Awesome Project",
	description: "A VitePress Site",
	lastUpdated: true, // 是否显示最后更新时间
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{text: 'Home', link: '/'},
			{text: 'Examples', link: '/markdown-examples'}
		],

		search: {
			provider: 'local'
		},

		sidebar: [
			// {
			//   text: 'Examples',
			//   items: [
			//     { text: 'Markdown Examples', link: '/markdown-examples' },
			//     { text: 'Markdown Examples', link: '/markdown-examples' },
			//     { text: '测试', link: '/测试' }
			//   ]
			// }
		],

		socialLinks: [
			{icon: 'github', link: 'https://github.com/vuejs/vitepress'}
		],
		editLink: {
			pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
			text: '编辑此页面'
		},
		lastUpdated: {
			text: '最后更新时间',
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'medium'
			}
		},
		outline: {
			label: '页面导航',
		}
	}
}


const vitePressSidebarOptions = {
	// VitePress Sidebar's options here...
	documentRootPath: '/docs',
	collapsed: false,
	capitalizeFirst: true,
	debugPrint: true
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));