<template>
    <section class="top-artists">
        <h1>Artists</h1>

        <ul v-for="artist in artists" :key=artist.id>
            <li>
                <a :href="artist.href">
                    <img :src="artist.imageHref" :alt="artist.name">
                    <span>{{artist.name}}</span>
                </a>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    computed: {
        artists() {
            const artists = this.$store.getters.topArtists
            return artists
        }
    }
}
</script>

<style>

</style>
