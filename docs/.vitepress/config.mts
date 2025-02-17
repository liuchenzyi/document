import {defineConfig} from 'vitepress'
import {withSidebar} from 'vitepress-sidebar';
import {pagefindPlugin} from 'vitepress-plugin-pagefind'
import {HeaderPlugin} from "./plugins/headerPlugin";
import { TrafficStatisticsPlugin } from "./plugins/TrafficStatisticsPlugin";

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
    title: "个人知识库",
    description: "A VitePress Site",
    // lang: 'zh_CN',
    lastUpdated: true, // 是否显示最后更新时间
    base: '/document/',

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: '前端', link: '/front/'},
            {text: '博客搭建', link: '/vite-press/'}
        ],
        sidebar: [],

        socialLinks: [
            // {icon: 'gitea', link: 'http://10.126.126.1/liuchen/document'},
            {icon: 'github', link: 'https://github.com/liuchenzyi/document'}
        ],
        editLink: {
            // pattern: 'http://10.126.126.1/liuchen/document/_edit/main/docs/:path',
            pattern: 'https://github.com/liuchenzyi/document/blob/main/docs/:path',
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
    vite: {
        ssr: {
            noExternal: ['naive-ui', 'date-fns', 'vueuc'],
        },
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
                        // .replace(/[\u4E00-\u9FA5]/g, ' $& ')
                        .replace(/\s+/g, ' ')  // 将 多个 空白字符串替换为单个空格
                        .trim()
                },
            }),
            HeaderPlugin(),
			TrafficStatisticsPlugin()
        ],

        // 设置scss的api类型为modern-compiler
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler'
                }
            }
        },

        build: {
            target: 'esnext'
        },
        server: {
            host: '0.0.0.0',
            port: 5000,
            // 是否开启 https
            https: false,
        },
    },
    outDir: "../dist",
}


const vitePressSidebarOptions = [
    {
        // VitePress Sidebar's options here...
        documentRootPath: '/docs',
        scanStartPath: "front",
        resolvePath: "/front/",
        collapsed: true,
        debugPrint: false,
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
        debugPrint: false,
        useTitleFromFrontmatter: true,  //
        excludeFilesByFrontmatterFieldName: "exclude",
        useFolderLinkFromIndexFile: true,
        collapseDepth: 1,
        useFolderTitleFromIndexFile: true
    }
];

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));