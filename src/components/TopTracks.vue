<template>
  <section class="container-trop-tracks">
    <ul v-for="track in topTracks" :key="track.id">
      <li>
        <a :href="track.href" target="_blank">
          <img :src="track.imageHref" alt="album-cover">
          <span>{{track.name}}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    computed: {
      topTracks() {
        const tracks = this.$store.getters.topTracks
        return tracks
      }
    }
  }

</script>

<style>

</style>
