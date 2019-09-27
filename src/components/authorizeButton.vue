<template>
    <a :href="authorizeUrl">Authorize</a>
</template>

<script>
import { mapGetters } from 'vuex'

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
