<template>
    <section class="container">
        <ContainerIntro
            title="Top Tracks"
            @createPlaylist="createPlaylist"
            @createSimilarPlaylist="createSimilarPlaylist"
        />

        <LoadingIndicator v-if="loading" />

        <section class="track-container">
            <article v-for="track in topTracks" :key="track.id">
                <div>
                    <a :href="track.href" class="link" target="_blank">
                        <img :src="track.imageHref" class="image" :alt="track.name" />
                        <span class="meta-data title">{{track.name}}</span>
                        <p>
                            <span
                                v-for="artist in track.artists"
                                :key="artist.id"
                                class="meta-data artists"
                            >{{artist.name}}</span>
                        </p>
                    </a>

                    <Button
                        @clicked="createSimilarTrackPlaylist({trackId: track.id, name: track.name})"
                        :id="track.id"
                        :name="track.name"
                    >Create Playlist</Button>
                </div>
            </article>
        </section>

        <PlaylistLink v-if="playlistLink" :playlistLink="playlistLink" />
    </section>
</template>

<script>
import ContainerIntro from '@/components/ContainerIntro.vue'
import PlaylistLink from '@/components/PlaylistLink'
import Button from '@/components/atom/button/Button'

export default {
	components: {
		ContainerIntro,
		PlaylistLink,
		Button
	},

	data() {
		return {
			playlistLink: ''
		}
	},

	computed: {
		loading() {
			return this.$store.state.loading
		},

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
			const data = e
			this.$store.dispatch('createSimilarPlaylist', data)
		},

		playlistLink(value) {
			if (value) {
				setTimeout(() => {
					this.playlistLink = ''
				}, 4000)
			}
		}
	},

	methods: {
		createPlaylist() {
			this.$store.dispatch('createTopPlaylist')
			this.getPlaylistLink()
		},

		createSimilarPlaylist() {
			this.$store.dispatch('fetchSimilarTracks')
			this.getPlaylistLink()
		},

		createSimilarTrackPlaylist({ trackId, name }) {
			const track = {
				id: trackId,
				name: name
			}

			this.$store.dispatch('createSimilarTrackPlaylist', track)
			this.getPlaylistLink()
		},

		async getPlaylistLink() {
			const link = await this.$store.getters.getPlaylistLink

			this.playlistLink = link
		}
	}
}
</script>

<style scoped lang="scss">
.track-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	grid-column-gap: 4rem;
	grid-row-gap: 5rem;
	padding: 1.7rem;
	margin-top: 1rem;

	.link {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: black;

		.image {
			width: 100%;
			height: 19.7rem;
			object-fit: cover;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2),
				0 27px 27px rgba(0, 0, 0, 0.1);
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

	.button {
		margin-top: 1rem;
		padding: 0.7rem;
		border: none;
		background-color: #88fff5;
		transition: all 0.4s ease-out;

		&:hover,
		&:focus {
			cursor: pointer;
			box-shadow: 0 19px 38px rgba(0, 0, 0, 0.2),
				0 15px 12px rgba(0, 0, 0, 0.1);
		}
	}
}
</style>
