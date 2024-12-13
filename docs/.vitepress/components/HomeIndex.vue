<script lang="ts" setup>
import { NTimeline, NTimelineItem, NIcon, NBackTop, NTag, NCard } from 'naive-ui'
import { useRouter } from 'vitepress'
import dayjs from 'dayjs'
import { EmailOutlined, DiscountOutlined } from '@vicons/material'
// @ts-ignore
import { data as posts } from './posts.data.ts'

const router = useRouter()

const jump = (path: string) => {
	router.go(`dist${ path }`)
}
</script>

<template>
	<div class="article-list">
		<section class="right-wrapper">
			<n-timeline size="large">
				<n-timeline-item v-for="item in posts" :time="dayjs(item.frontmatter.date).format('YYYY-MM-DD')"
								 line-type="dashed">
					<template #default>
						<n-card :title="item.frontmatter.title" hoverable @click="jump(item.url)">
							<div class="tags">
								<n-tag v-for="tagItem in item.frontmatter.tags" :bordered="false" type="info">
									{{ tagItem }}
									<template #icon>
										<n-icon :component="DiscountOutlined" :size="16"/>
									</template>
								</n-tag>
							</div>
							<div class="info">{{ item.frontmatter.info ?? '无简介' }}</div>
						</n-card>
					</template>
				</n-timeline-item>
			</n-timeline>
		</section>
		<n-back-top :right="10"/>
	</div>
</template>

<style lang="scss" scoped>
.article-list {
	width: 50%;
	margin: 3vh auto;
	height: 100%;
	color: var(--black-color-1);
	display: flex;

	min-width: 300px;


	:deep(.n-timeline-item-timeline__line) {
		background-color: var(--grey-color-2);
	}

	:deep(.n-timeline-item-content__content) {
		cursor: pointer;
	}


	.icon {
		width: 6px;
		height: 6px;
		position: relative;

		p {
			position: absolute;
			margin: 0;
			width: 130px;
			left: -140px;
			top: -2px;
			font-size: 12px;
			line-height: 12px;
			height: 12px;
			text-align: right;
		}
	}


	.tags {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;

	}

	.info {
		font-size: 14px;
		color: var(--grey-color-1);
		margin-top: 5px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

}
</style>