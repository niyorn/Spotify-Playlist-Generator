<template>
  <section class="container">
    <ContainerIntro
      title="Top Tracks"
      @createPlaylist="createPlaylist" 
      @createSimilarPlaylist="createSimilarPlaylist"
    />
    <transition-group name="list" tag="section" class="track-container">
      <article v-for="track in topTracks" :key="track.id">
        <div>
          <a :href="track.href" class="link" target="_blank">
            <img :src="track.imageHref" class="image" :alt="track.name">
            <span class="meta-data title">{{track.name}}</span>
            <p>
            <span 
              v-for="artist in track.artists" 
              :key="artist.id"
              class="meta-data artists">
              {{artist.name}}
            </span>
            </p>
          </a>

          <button @click="createSimilarTrackPlaylist" :id="track.id" :name="track.name">Create playlist</button>
        </div>
      </article>
    </transition-group>
  </section>
</template>

<script>
  import ContainerIntro from '@/components/ContainerIntro.vue'

  export default {
    components: {
      ContainerIntro
    },

    computed: {
      topTracks() {
        const tracks = this.$store.getters.topTracks
        return tracks
			},
			
			similarTracks: function() {
				return this.$store.getters.getSimilarTrackUri
			}
		},

		watch: {
			similarTracks: function(e) {
				const data = e;
				this.$store.dispatch('createSimilarPlaylist', data)
			}
		},

    methods: {
      createPlaylist() {
				console.log('create')
        this.$store.dispatch('createTopPlaylist')
      },

      createSimilarPlaylist() {
				console.log('createSimilarTracks')
				this.$store.dispatch('fetchSimilarTracks')
      },

      createSimilarTrackPlaylist(e) {
        const track = {
          id: e.target.id,
          name: e.target.name
        }
        
        this.$store.dispatch('createSimilarTrackPlaylist', track)
      }
    },
  }
</script>

<style scoped lang="scss">
  .track-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-column-gap: 4rem;
		grid-row-gap: 5rem;
    padding: 1.7rem;

    .link {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: black;

      .image {
        width: 100%;
        height: 19.7rem;
        object-fit: cover;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 27px 27px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        transition: transform 0.2s ease-out;
      }

      .title {
        font-size: 1.2rem;
        margin-top: 1rem;
        color: black;
      }

      .artists {
        color: rgb(73, 73, 73);
      }

			&:hover img {
			transform: scale(1.02);
			}
    }
  }

  //Animation
  .list {
    transition: all 2s;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter,
  .list-leave-to .list-move {
    opacity: 1;
    transition: all 0.5s;
  }
</style>