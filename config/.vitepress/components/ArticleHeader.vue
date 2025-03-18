<script setup lang="ts">
import {
	AccessTimeFilled,
	ArticleOutlined,
	DiscountOutlined,
	BorderColorOutlined,
	UpdateOutlined
} from '@vicons/material'
import {NIcon, NTag} from 'naive-ui'
import dayjs from 'dayjs'
import {useData} from 'vitepress'
const {frontmatter,page} = useData()
defineProps<{
	readTime: string
	words: string
}>()
</script>

<template>
	<div class="header">
		<section class="info">
			<div class="read">
				<NIcon :size="20">
					<AccessTimeFilled/>
				</NIcon>
				阅读时间:
				<p>{{ readTime }}</p>
				分钟
			</div>
			<div class="words">
				<NIcon :size="20">
					<ArticleOutlined/>
				</NIcon>
				文章字数:
				<p>{{ words }}</p>
				字
			</div>
			<div class="write" v-if="frontmatter.date">
				<NIcon :size="18">
					<BorderColorOutlined />
				</NIcon>
				发布日期:
				<p>{{ dayjs(frontmatter.date).format('YYYY-MM-DD') }}</p>
			</div>
			<div class="update">
				<NIcon :size="20">
					<UpdateOutlined />
				</NIcon>
				最近更新:
				<p>{{ dayjs(page.lastUpdated).format('YYYY-MM-DD') }}</p>
			</div>
		</section>
		<section class="tags">
			<n-tag :bordered="false" type="info" v-for="item in frontmatter.tags">
				{{ item }}
				<template #icon>
					<n-icon :size="16" :component="DiscountOutlined"/>
				</template>
			</n-tag>
		</section>
	</div>
</template>

<style scoped lang="css">
.header {
	width: 100%;
	margin-top: 1vh;
	.info {
		width: 100%;
		display: flex;
		margin-top: 5px;
		margin-bottom: 5px;
		flex-wrap: wrap;
		font-size: 14px;
		
		justify-content: space-between;
		--grey-color-1: rgb(134, 144, 156);
		color: var(--grey-color-1);
		
		.read,
		.words,
		.write,
		.update {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 8px;
			
			p {
				margin: 0 5px;
			}
			
			i {
				margin-right: 2px;
			}
		}
	}
	
	.tags {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 1vh;
		
	}
}
</style>