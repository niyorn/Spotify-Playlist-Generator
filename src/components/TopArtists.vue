<template>
  <section class="container">
		<ContainerIntro
			title="Top Artist"
			@createPlaylist="createPlaylist"
			@createSimilarPlaylist="createSimilarPlaylist"
		/>

		<section class="container-top-artist">
			<article 
				v-for="artist in artists" 
				:key=artist.id
    	>
				<div>
					<a :href="artist.href" class="link" target="_blank">
						<img :src="artist.imageHref" :alt="artist.name" class="image">
						<span class="name">{{artist.name}}</span>
					</a>
					<button @click="createArtistPlaylist" :data-artist-name="artist.name" :data-artist-id="artist.id" type="button">Create playlist</button>
				</div>
    	</article>
		</section>
  </section>
</template>

<script>
	import ContainerIntro from '@/components/ContainerIntro'

  export default {
		components: {
			ContainerIntro
		},

    computed: {
      artists() {
        const artists = this.$store.getters.topArtists
        return artists
      }
		},
		
		methods: {
			createPlaylist() {
				this.$store.dispatch('createAllTopArtistPlaylist')
			},

			createSimilarPlaylist() {
				console.log('similar')
			},

			createArtistPlaylist(event) {
				const artist = {
					id: event.target.dataset.artistId,
					name: event.target.dataset.artistName
				}

				this.$store.dispatch('createArtistTopTracksPlayList', artist)
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

	  .link {
	    display: flex;
	    flex-direction: column;
	    text-decoration: none;

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
			  text-align: left;
			}
	  }
	}
</style>
