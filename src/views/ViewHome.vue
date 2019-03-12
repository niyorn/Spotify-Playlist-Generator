<template>
  <section>
    <h1>Hi, {{user.name}}</h1>

    <ul v-for="track in topTracks" :key=track.key>
      <li>
        <a :href="track.href">
          {{track.name}}
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  // import UserHeader from '@/components/UserHeader'

  export default {
    components: {},


    computed: {
      getHash() {
        const hash = this.$route.hash
        return hash
      },
      user() {
        return this.$store.getters.user
      },
      topTracks() {
        let topTracks = this.$store.state.user.topTracks.items
        if (topTracks != undefined) {
          let transFormTracks = topTracks.map((i) => {
            const track = {
              name: i.name,
              href: i.external_urls.spotify
            }
            return track
          })
          return transFormTracks
        }
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
      this.$store.dispatch('fetchUser')
      this.$store.dispatch('fetchUserTopTracks')
    }
  }

</script>

<style>

</style>
