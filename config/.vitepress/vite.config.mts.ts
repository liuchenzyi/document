import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { HeaderPlugin } from './plugins/headerPlugin'
import {  groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import {  MermaidPlugin } from 'vitepress-plugin-mermaid';

import {resolve} from 'path'
const pathSrc = resolve(__dirname)
export default {
    ssr: {
        noExternal: ['naive-ui', 'date-fns', 'vueuc','mermaid'],
    },
    // 配置别名
    resolve: {
        alias: {
            '@': resolve(pathSrc),
            '@components': resolve(pathSrc,'components'),
        }
    },
    optimizeDeps: {
        include: ['mermaid'],
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
        groupIconVitePlugin(), //代码组图标
        MermaidPlugin(),	// mermaid
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
}