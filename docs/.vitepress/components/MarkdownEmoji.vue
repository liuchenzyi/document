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
	justify-content: space-between;
	gap: 10px;

	&>.emoji{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: max-content;

		padding: 5px;

		cursor: pointer;
		transition: all .3s;
		&:hover{
			box-shadow:  0 0 10px #ccc;
		}
	}
}
</style>