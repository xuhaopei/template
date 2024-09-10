<script setup lang="ts">
import { ref, computed, reactive } from "vue";

defineProps<{
	msg: string,
	num: number
}>();
let count = ref<number>(0);
const list = ref<Array<number>>([1, 2, 3, 4])
const classH1 = reactive({
	active: true,
	'text-danger': true,
})
const length = computed(() => {
	return list.value.length
})
const handleAdd = () => {
	count.value++
}
const handeAddlist = () => {
	list.value.push(2)
}
</script>

<template>
	<h1>{{ msg }}</h1>
	<h2 @click="handleAdd">{{ count }}</h2>
	<h2 class="read-the-docs" :class="classH1" @click="handeAddlist">{{ list }} {{length }}</h2>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
.active {
	font-size: 55px;
}
</style>
