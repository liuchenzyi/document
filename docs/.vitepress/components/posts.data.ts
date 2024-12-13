// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('**/*.md',
	/* options */
	{
		render:false,
		excerpt:true,
		transform(rawData) {
			// console.log(rawData)
			return rawData.map(item => {
				return {
					...item
				}
			}).filter(item => item.frontmatter.title)
		}
	}
)