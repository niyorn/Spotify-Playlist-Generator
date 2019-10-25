<template>
    <button @click="click" class="button">
        <slot>Button</slot>
    </button>
</template>

<script>
export default {
    name: 'Button',
    methods: {
        click() {
            this.$emit('clicked')
        }
    }
}
</script>

<style scoped lang="scss">
@import './ButtonStyle.scss';
</style>
