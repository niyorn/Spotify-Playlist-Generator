<template>
  <section>
    <h1>Hi welcome to Spotify Music Generator</h1>
    <p>With Spotify Music Generator you're able to generate a playlist from your most listened songs.</p>
    <p>To get your top songs, we need permission to acces your data.</p>

    <authorizeButton/>
  </section>
</template>

<script>
  import authorizeButton from '@/components/authorizeButton'

  export default {
    components: {
      authorizeButton
    }
  }

</script>

<style>

</style>
