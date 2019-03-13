<template>
  <section>
    <h1>Hi, {{user.name}}</h1>
    <router-link :to="{name:'Tracks'}">Top tracks</router-link>
    <router-link :to="{name:'Artists'}">Top Artists</router-link>
    <router-view></router-view>
  </section>
</template>

<script>
  import TopTracks from '@/components/TopTracks'


  export default {
    components: {
      TopTracks
    },


    computed: {
      user() {
        return this.$store.getters.user
      }
    }
  }

</script>

<style>

</style>
