<template>
    <a :href="href" class="button">
        <slot>Button</slot>
    </a>
</template>

<script>
import './ButtonStyle.scss'

export default {
    name: 'ButtonLink',
    props: {
        href: {
            type: String
        }
    }
}
</script>

<style>
</style>
