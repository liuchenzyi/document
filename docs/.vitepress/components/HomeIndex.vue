<script lang="ts" setup>
import { NTimeline, NTimelineItem, NIcon, NBackTop, NTag, NCard,NEllipsis } from 'naive-ui'
import { useRouter } from 'vitepress'
import dayjs from 'dayjs'
import { EmailOutlined, DiscountOutlined } from '@vicons/material'
// @ts-ignore
import { data as posts } from './posts.data.ts'

const router = useRouter()

const jump = (path: string) => {
	router.go(path)
}
</script>

<template>
	<section class="article-list">
		<n-timeline size="large">
			<n-timeline-item v-for="item in posts" :time="dayjs(item.frontmatter.date).format('YYYY-MM-DD')"
							 line-type="dashed">
				<template #default>
					<n-card :title="item.frontmatter.title" hoverable @click="jump(item.url)">
						<div class="tags">
							<n-tag v-for="tagItem in item.frontmatter.tags"  type="info">
								{{ tagItem }}
								<template #icon>
									<n-icon :component="DiscountOutlined" :size="16"/>
								</template>
							</n-tag>
						</div>
						<n-ellipsis :line-clamp="1">
							{{ item.frontmatter.info ?? '无简介' }}
						</n-ellipsis>
					</n-card>
				</template>
			</n-timeline-item>
		</n-timeline>
	</section>
	<n-back-top :right="10"/>
</template>

<style lang="scss" scoped>
.article-list {
	width: 60%;
	margin: 3vh auto;
	height: 100%;

	min-width: 300px;


	:deep(.n-timeline-item-content__content) {
		cursor: pointer;
	}


	.tags {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;

		margin: 0 0 10px 0;

	}
}
</style>