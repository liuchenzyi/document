import DefaultTheme from 'vitepress/theme';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';

import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import codeblocksFold from 'vitepress-plugin-codeblocks-fold'; // 导入方法
import 'vitepress-plugin-codeblocks-fold/style/index.css'; // 导入样式
import { useRoute,useData } from 'vitepress';
import type {EnhanceAppContext} from "vitepress/client";

export default {
    ...DefaultTheme,
    enhanceApp(ctx:EnhanceAppContext) {
        DefaultTheme.enhanceApp(ctx);
        // 注册全局组件，如果你不想使用也可以不添加
        ctx.app.component('vImageViewer', vImageViewer);
        // ...
    },
    setup() {
        // 获取路由
        const route = useRoute();
        // 使用 imageViewer 插件
        imageViewer(route);

        // 获取前言和路由
        const { frontmatter } = useData();
       
        // codeblocks 代码折叠插件
        codeblocksFold({ route, frontmatter }, true, 200);
    }
};