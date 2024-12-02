import {defineConfig} from 'vitepress'
import {withSidebar} from 'vitepress-sidebar';
import { pagefindPlugin } from 'vitepress-plugin-pagefind'


// https://vitepress.dev/reference/site-config
const vitePressOptions = {
	lang: 'cn',
    title: "个人知识库",
    description: "A VitePress Site",
    lastUpdated: true, // 是否显示最后更新时间
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: 'Examples', link: '/markdown-examples'}
        ],
		sidebar: [],

		socialLinks: [
			{icon: 'github', link: 'http://10.126.126.1:3000/liuchen/document'}
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
		outline: {
			label: '页面导航',
		},
		// 文章翻页
		docFooter: {
			prev: '上一篇',
			next: '下一篇'
		},
        search: {
            provider: 'local',
			// 配置中文
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
									closeText: '关闭'
                                }
                            }
                        }
                    }
                },
            }
        },
    },
	vite:{
		plugins:[
			pagefindPlugin({
				btnPlaceholder: '搜索',
				placeholder: '搜索文档',
				emptyText: '空空如也',
				heading: '共: {{searchResult}} 条结果',
				customSearchQuery(input) {
					return input
						.replace(/[\u4E00-\u9FA5]/g, ' $& ')
						.replace(/\s+/g, ' ')
						.trim()
				},
			}),
		]
	},
    outDir: "./dist",
	locales: {
		root: { label: '简体中文',  },
	}
}


const vitePressSidebarOptions = {
    // VitePress Sidebar's options here...
    documentRootPath: '/docs',
    collapsed: false,
    capitalizeFirst: true,
    debugPrint: false,
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));