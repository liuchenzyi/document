import type { Plugin } from 'vite'
import matter from 'gray-matter';


import { getReadingTime } from '../utils/getReadingTime'

export function HeaderPlugin():Plugin {
    return {
        name: 'header-plugin',
        enforce: 'pre',
        async transform(code: string, id:string) {

            if (!id.match(/\.md\b/)) return null

            const result = matter(code)

            const {content = "",data} = result
            const {header = true} = data
            // console.log(JSON.stringify(result))
            // console.log(code,id)

            if(header){

                // 获取阅读时间和字数
                const { readTime, words } = getReadingTime(content)

                // 插入组件到文章中
                return insertReadingTimeAndWords(
                    `<ArticleHeader readTime="${readTime}" words="${words}" />`,
                    code
                )
            }else {
                return code
            }
        },
    }
}


// 插入目标字符串到第一个一级标题后
function insertReadingTimeAndWords(target: string, source: string) {
    const headerRegex = /(^#\s.+$)/m
    return source.replace(headerRegex, `$1\n\n${target}`)
}

// /**
//  * 清除Markdown内容中的YAML前缀
//  *
//  * 该函数的主要作用是移除Markdown文本开头的YAML前缀部分YAML前缀通常用于指定Markdown文档的元数据，
//  * 如标题、标签、日期等在处理某些Markdown文档时，可能需要去除这些元数据，只保留正文内容
//  *
//  * @param content Markdown文本内容
//  * @returns 返回移除YAML前缀后的Markdown文本
//  */
// function cleanMarkdownContent(content: string): string {
//     return content.replace(/^---[\s\S]+?---\n+/g, '').trim()
// }