<template>
  <section>
    <h1>You're logged in</h1>
  </section>
</template>

<script>
  export default {
    computed: {
      getHash() {
        const hash = this.$route.hash
        return hash
      }
    },


    methods: {
      transformHash(hash) {
        //Get access token from hash
        //source: source: https://github.com/spotify/web-api-auth-examples/blob/master/implicit_grant/public/index.html
        const hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
          q = hash.substring(1);
        while (e = r.exec(q)) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        return hashParams;
      },

      updateAccessToken() {
        const hash = this.getHash
        const accessToken = this.transformHash(hash)
        this.$store.dispatch('addAccess', accessToken)
      }
    },


    created() {
      this.updateAccessToken()
    }
  }

</script>

<style>

</style>
