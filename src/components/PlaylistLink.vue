<template>
  <transition name="fade">
    <section class="container-playlist-link">
      <a :href="playlistLink" class="playlist-link" target="_blank">
        Success! View Playlist
      </a>
    </section>
  </transition>
</template>

<script>
export default {
  props: {
    playlistLink: {
      type: String
    }
  }

}
</script>

<style scoped lang="scss">
    .container-playlist-link {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    animation: slide 1s ease-out;

    .playlist-link {
    padding: 1rem;
    text-decoration: none;
    font-weight: bold;
    background-color: rgb(34, 116, 34);
    color: white;
    border-radius: 0.7rem 0.7rem 0 0;
    }
    }

    .fade-enter-active, .fade-leave-active {
    transition: all 0.7s ease-out;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
		transform: translateY(4rem)
    }
</style>
