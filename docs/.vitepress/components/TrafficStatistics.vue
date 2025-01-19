<script setup lang="ts">
import {  ref,onMounted } from 'vue'
import { NStatistic} from 'naive-ui'


onMounted(async ()=>{
	const baseUrl = 'https://events.vercount.one';
	const apiUrl = `${baseUrl}/log?jsonpCallback=VisitorCountCallback`;
	try {

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url: window.location.href }),
		});
		const data = await response.json();
		const { site_uv, site_pv, page_pv } = data;
		statistics.value = {
			site_uv,
			site_pv,
			page_pv
		}
	} catch (error) {
		console.error("Error fetching visitor count:", error);
	}
})

const statistics = ref({
	site_uv: 0,
	site_pv: 0,
	page_pv: 0
})
</script>

<template>
	<div class="statistic">
		<n-statistic label="本文总阅读量" :value="statistics.page_pv" />

		<n-statistic label="本站总访问量" :value="statistics.site_pv" />

		<n-statistic label="本站总访客数" :value="statistics.site_uv" />
	</div>

</template>

<style scoped lang="scss">
.statistic{
	display: flex;
	justify-content: space-around;

	border-top: 1px solid var(--vp-c-divider);
	padding-top: 24px;

}
</style>