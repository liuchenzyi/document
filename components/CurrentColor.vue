<script setup>
import { ref } from 'vue'

const colors = ref(['#2196f3', '#e91e63', '#4caf50'])
const currentColor = ref(colors.value[0])
</script>

<template>
    <div class="color-picker">
        <button
            v-for="color in colors"
            :key="color"
            :style="{ backgroundColor: color }"
            @click="currentColor = color"
        />
    </div>
    <div class="demo-box" :style="{ color: currentColor }">
        <svg class="icon">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <p>动态颜色演示</p>
    </div>
</template>

<style>
.demo-box {
    padding: 1rem;
    border: 2px solid currentColor;
    margin: 1rem 0;
}

.icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
}

.color-picker button {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border: 2px solid #fff;
    cursor: pointer;
}
</style>