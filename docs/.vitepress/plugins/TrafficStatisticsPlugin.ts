import type { Plugin } from 'vite'
import matter from 'gray-matter';



export function TrafficStatisticsPlugin(): Plugin {
	return {
		name: 'statistics-plugin',
		enforce: 'pre',
		async transform(code: string, id: string) {
			if(!id.match(/\.md\b/)) return null

			const result = matter(code)

			const {data} = result
			const {statistic = true} = data


			if(statistic) {
				return `${code} \n\n <traffic-statistics />`
			} else {
				return code
			}
		},
	}
}
