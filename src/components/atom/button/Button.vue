<template>
    <button @click="click" class="button">
        <slot>Button</slot>
    </button>
</template>

<script>
import './ButtonStyle.scss'

export default {
	name: 'Button',
	methods: {
		click() {
			this.$emit('click')
		}
	}
}
</script>

<style>
</style>
