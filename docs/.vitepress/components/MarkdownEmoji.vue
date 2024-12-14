<script setup lang="ts">
import data from './emoji'

const dataSource = Object.entries(data).map(([key, value]) => ({
	label: key,
	value: value
}))
</script>

<template>
<section class="emoji-section">
	<div v-for="(item, index) in dataSource" :key="index" class="emoji">

		<div>{{item.value}}</div>
		<div>{{item.label}}</div>
	</div>
</section>
</template>

<style scoped lang="scss">
.emoji-section{
	display: flex;
	flex-wrap: wrap;
	gap: 10px;

	&>.emoji{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: max-content;
		//height: 100px;
		//line-height: 40px;
		//text-align: center;
		padding: 5px;
		//border-radius: 50%;
		background: #f5f5f5;
		color: #666;
		//font-size: 24px;
		cursor: pointer;
		transition: all .3s;
		&:hover{
			background: #ddd;
		}
	}
}
</style>