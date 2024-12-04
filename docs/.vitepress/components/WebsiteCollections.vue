<script lang="ts" setup>
import { NTabs, NTabPane, NAvatar } from 'naive-ui'
import {ref} from 'vue'

import dataSource from './data'
const value = ref('主页')
</script>

<template>
	<n-tabs animated type="segment" v-model:value="value">
		<n-tab-pane v-for="({name, children},index) in dataSource" :key="index" :name="name" :tab="name">
			<div class="website-collection">
				<div v-for="{name,target,bgImage,bgText} in children" :key="name" class="website">
					<n-avatar
						:src="bgImage"
						size="small"
					>
						<!--					<template #fallback>-->
						<!--						{{ bgText }}1-->
						<!--					</template>-->

					</n-avatar>
					<a :href="target" target="_blank">{{ name }}</a>
				</div>
			</div>

		</n-tab-pane>
	</n-tabs>
</template>

<style lang="css" scoped>
.website-collection {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;

	height: 30vh;
}

.website {
	display: flex;
	align-items: center;
	gap: 10px;
	flex-direction: column;
}
</style>