<template>
  <section class="container-intro">
    <section>
      <h1 class="title">{{title}}</h1>
      <p class="description">These are you {{title}} from the last 4 weeks</p>
    </section>
    <section class="container-create-playlist">
      <button @click="$emit('createPlaylist')" class="button-create-playlist">        <span>Create playlist</span>
      </button>
      <button @click="createSimilarPlaylist" class="button-create-playlist">
        <span>{{playlistId}}</span>
        <span>Create similar style playlist</span>
      </button>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      playlistId: ''
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },
    test () {
      const lol = this.$store.getters.getPlaylistId

      return lol
    }
  },

  methods: {
    createSimilarPlaylist (event) {
      this.$emit('createSimilarPlaylist')
    }
  }
}
</script>

<style scoped lang="scss">
  .container-intro {
    text-align: left;
    padding-left: 2rem;

    .title {
      font-size: 6rem;
    }

    .description {
      font-size: 2rem;
    }

    .container-create-playlist {
      padding: 1rem 0;

      .button-create-playlist {
        padding: 1rem;
        margin: 0 1rem;
        margin-left: 0;
        background-color: #88fff5;
        border: solid #88fff5 0.1rem;
        transition: all 0.4s ease-out;

        &:hover, &:focus {
          cursor: pointer;
          box-shadow: 0 19px 38px rgba(0,0,0,0.2), 0 15px 12px rgba(0,0,0,0.1);
        }
      }
    }
  }
</style>
