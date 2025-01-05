<script lang="ts" setup>
import { NTimeline, NTimelineItem, NIcon, NBackTop, NTag, NCard, NEllipsis, NTabs, NTab, NEmpty } from 'naive-ui'
import { useRouter } from 'vitepress'
import dayjs from 'dayjs'
import { DiscountOutlined } from '@vicons/material'
import { computed, ref, toRaw } from 'vue'
// @ts-ignore
import { data } from './posts.data.ts'

const router = useRouter()

const jump = (path: string) => {
	router.go(path)
}

const tab = ref('all')

const posts = computed(() => {
	if(tab.value === 'all') {
		return data
	} else if(tab.value === 'other') {
		return data.filter(item => !item.frontmatter.category )
	} else {
		return data.filter(item => item.frontmatter.category === tab.value)
	}

})
</script>

<template>
	<section class="article-list">
		<n-tabs v-model:value="tab" size="large" style="margin-bottom: 20px" type="bar">
			<n-tab name="all" tab="所有"></n-tab>
			<n-tab name="front" tab="前端"></n-tab>
			<n-tab name="backend" tab="后端"></n-tab>
			<n-tab name="vite-press" tab="vite-press"></n-tab>
			<n-tab name="other" tab="其他"></n-tab>
		</n-tabs>
		<n-timeline v-if="posts.length >0" size="large">
			<n-timeline-item v-for="item in posts" :time="dayjs(item.frontmatter.date).format('YYYY-MM-DD')"
							 line-type="dashed">
				<template #default>
					<n-card :title="item.frontmatter.title" hoverable @click="jump(item.url)">
						<div class="tags">
							<n-tag v-for="tagItem in item.frontmatter.tags" type="info">
								{{ tagItem }}
								<template #icon>
									<n-icon :component="DiscountOutlined" :size="16"/>
								</template>
							</n-tag>
						</div>
						<n-ellipsis :line-clamp="1">
							{{ item.frontmatter.description ?? '无简介' }}
						</n-ellipsis>
					</n-card>
				</template>
			</n-timeline-item>
		</n-timeline>

		<n-empty v-else description="该分类暂无数据">

		</n-empty>
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