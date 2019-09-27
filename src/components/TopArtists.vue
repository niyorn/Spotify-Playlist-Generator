<template>
  <section class="container">

    <LoadingIndicator v-if="loading" />

    <ContainerIntro
			title="Top Artist"
			@createPlaylist="createPlaylist"
      @createSimilarPlaylist="createSimilarPlaylist"
		/>

    <section class="container-top-artist">
      <article v-for="artist in artists" :key=artist.id>
        <div>
          <a :href="artist.href" class="link" target="_blank">
            <img :src="artist.imageHref" :alt="artist.name" class="image">
            <span class="name">{{artist.name}}</span>
          </a>
          <button @click="createArtistPlaylist" :data-artist-name="artist.name" :data-artist-id="artist.id"
            type="button" class="button">Create playlist</button>
        </div>
      </article>
    </section>

		<PlaylistLink v-if="playlistLink" :playlistLink="playlistLink"/>
  </section>
</template>

<script>
import ContainerIntro from '@/components/ContainerIntro'
import PlaylistLink from '@/components/PlaylistLink'

export default {
  components: {
    ContainerIntro,
    PlaylistLink
  },

  data () {
    return {
      playlistLink: ''
    }
  },


  computed: {
    loading () {
      return this.$store.state.loading
    },

    artists () {
      const artists = this.$store.getters.topArtists
      return artists
    }
  },


  watch: {
    playlistLink (value) {
      if (value) {
        setTimeout(() => {
          this.playlistLink = ''
        }, 4000)
      }
    }
  },


  methods: {
    async createPlaylist () {
      await this.$store.dispatch('createAllTopArtistPlaylist')
      this.getPlaylistLink()
    },

    async createSimilarPlaylist () {
      const test = await this.$store.dispatch('createSimilarArtistPlaylist')
      this.getPlaylistLink()
    },

    async createArtistPlaylist (event) {
      const artist = {
        id: event.target.dataset.artistId,
        name: event.target.dataset.artistName
      }

      await this.$store.dispatch('createArtistTopTracksPlayList', artist)
      this.getPlaylistLink()
    },

    async getPlaylistLink () {
      const link = await this.$store.getters.getPlaylistLink

      this.playlistLink = link
    }
  }
}
</script>


<style scoped lang="scss">
	.container-top-artist {
	  display: grid;
	  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	  grid-column-gap: 4rem;
	  grid-row-gap: 5rem;
	  padding: 1.7rem;

		div {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

	  .link {
	    display: flex;
	    flex-direction: column;
	    text-decoration: none;
			text-align: center;

	    &:hover img {
	      transform: scale(1.02);
	    }

			.image {
				width: 100%;
				height: 17rem;
				width: 17rem;
				object-fit: cover;
				box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 27px 27px rgba(0, 0, 0, 0.1);
				border-radius: 10px;
				transition: transform 0.2s ease-out;
				border-radius: 50%;
			}

			.name {
			  font-size: 1.1rem;
			  margin-top: 1rem;
			  color: black;
			}
	  }

		.button {
			margin-top: 1rem;
			padding: 0.7rem;
			border: none;
			background-color: #88fff5;
			transition: all 0.4s ease-out;

			&:hover, &:focus {
				cursor: pointer;
        box-shadow: 0 19px 38px rgba(0,0,0,0.2), 0 15px 12px rgba(0,0,0,0.1);
			}
		}
	}
</style>
