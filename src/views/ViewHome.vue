<template>
  <section>
    <h1>Hi, {{user.name}}</h1>

    <section :class="$style.linkContainer">
    <router-link :to="{name:'Tracks'}">Top tracks</router-link>
    <router-link :to="{name:'Artists'}">Top Artists</router-link>
    </section>
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

<style module>
  .linkContainer {
    display: flex;
    justify-content: center;
  }

  .linkContainer a {
    margin: 1rem;
    text-decoration: none;
    background-color: rgb(43, 92, 184);
    color: white;
    padding: 1rem 1.2rem;
    border-radius: 0.4rem;
  }

  .router-link-active {
    position: relative;
  }
  router-link-active:after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: black;
  }
</style>
