// posts.data.js
import dayjs from 'dayjs'
import { createContentLoader } from 'vitepress'


export default createContentLoader(
	['**/*.md', '!**/index.md'],
	/* options */
	{
		render: false,
		excerpt: false,
		transform(rawData) {
			// console.log(rawData.length)
			return rawData
				.filter(item => item.url.includes('.html'))
				.map(item => {
					// item.frontmatter.title = item.frontmatter.title || item.url.replace(/\.html$/, '')
					// 			.*\/: 匹配任意字符（除了换行符）直到最后一个斜杠 /。
					// ([^/]+): 捕获最后一个斜杠 / 和 .html 之间的部分。[^/]+ 表示匹配一个或多个非斜杠字符。
					// \.html$: 匹配 .html 结尾的部分。
					// $1: 替换为捕获的第一个组，即最后一个斜杠 / 和 .html 之间的部分。
					item.frontmatter.title = item.frontmatter.title || item.url.replace(/.*\/([^/]+)\.html$/, '$1');
					return {
						...item,
						// 若不含 title 属性，使用 filename 代替
					}
				})
				// .filter(item => item.frontmatter.title)

				.sort((a, b) => {
					// @ts-ignore
					return dayjs(b.frontmatter.date) - dayjs(a.frontmatter.date)
				})
		}
	}
)