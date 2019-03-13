<template>

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
				return this.$store.dispatch('addAccess', accessToken)
			},
			
			async fetchUserData() {
				await this.updateAccessToken()
				await this.$store.dispatch('fetchUser')
				await this.$store.dispatch('fetchUserTopTracks')
				await this.$store.dispatch('fetchUserTopArtists')	
			},

			redirectView() {
				this.$router.push({name: 'Tracks'})
			}
    },


    created() {
			this.fetchUserData()
			.then(this.redirectView)
    }
  }

</script>

<style>

</style>
