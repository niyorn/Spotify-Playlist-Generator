<template>
    <section class="container-intro">
        <section>
            <h1 class="title">{{title}}</h1>
            <p class="description">These are you {{title}} from the last 4 weeks</p>
        </section>
        <section class="container-create-playlist">
            <Button @clicked="$emit('createPlaylist')" class="button">Create playlist</Button>
            <Button
                @clicked="$emit('createSimilarPlaylist')"
                class="button"
            >Create similar style playlist</Button>
        </section>
    </section>
</template>

<script>
import Button from '@/components/atom/button/Button'

export default {
    components: {
        Button
    },
    props: {
        title: {
            type: String,
            required: true
        }
    },

    computed: {
        loading() {
            return this.$store.state.loading
        }
    },

    methods: {
        createSimilarPlaylist(event) {
            this.$emit('createSimilarPlaylist')
        }
    }
}
</script>

<style scoped lang="scss">
.container-intro {
    text-align: left;
    padding-left: 2rem;

    .title {
        font-size: 6rem;
    }

    .description {
        font-size: 2rem;
    }

    .container-create-playlist {
        padding: 1rem 0;

        .button {
            margin: 0 2rem 0 0;
        }
    }
}
</style>
