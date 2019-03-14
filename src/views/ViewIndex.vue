<template>
  <section>
    <h1>Hi welcome to Spotify Music Generator</h1>
    <p>With Spotify Music Generator you're able to generate a playlist from your most listened songs.</p>
    <p>To get your top songs, we need permission to acces your data.</p>

    <a :href="authorizeUrl">Authorize</a>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        authorizeUrl: 'getAuthorizeUrl'
      })
    }
  }

</script>

<style>

</style>
