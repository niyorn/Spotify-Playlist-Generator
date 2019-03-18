<template>
  <section class="container">
    <section class="container-intro">
      <section>
        <h1 class="title">Top tracks</h1>
        <p class="description">These are you top tracks from the last 4 weeks</p>
      </section>
      <section class="container-create-playlist">
        <button @click="createPlaylist" class="button-create-playlist">Create playlist</button>
        <button @click="createSimilarPlaylist" class="button-create-playlist">Create similar style playlist</button>
      </section>
    </section>
    <transition-group name="list" tag="section" class="track-container">
      <article v-for="track in topTracks" :key="track.id">
        <div>
          <a :href="track.href" class="link" target="_blank">
            <img :src="track.imageHref" class="image" :alt="track.name">
            <span class="title">{{track.name}}</span>
          </a>
        </div>
      </article>
    </transition-group>
  </section>
</template>

<script>
  export default {
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

      .image {
        width: 100%;
        height: 19.7rem;
        object-fit: cover;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 27px 27px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        transition: transform 0.2s ease-out;
      }

      .title {
        font-size: 1.1rem;
        margin-top: 1rem;
        color: black;
        text-align: left;
      }

			&:hover img {
			transform: scale(1.02);
			}
    }
  }

  .container-create-playlist {
    padding: 1rem 0;

    .button-create-playlist {
      padding: 1rem;
      margin: 0 1rem;
			margin-left: 0;
			background-color: #88fff5;
			border: solid #88fff5 0.1rem;
			transition: transform 0.4s;

			&:hover {
				cursor: pointer;
				transform: scale(1.02);
			}
    }
  }


	.container-intro {
		text-align: left;
		padding-left: 2rem;

		.title {
			font-size: 6rem;
		}

		.description {
			font-size: 2rem;
		}
	}



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