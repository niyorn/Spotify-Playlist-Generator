<template>
  <section :class="$style.container">
		<article v-for="track in topTracks" :key="track.id">
			<div>
				<a :href="track.href" :class="$style.link" target="_blank">
          <img :src="track.imageHref" :class="$style.image" :alt="track.name">
          <span :class="$style.title">{{track.name}}</span>
        </a>
			</div>
		</article>
  </section>
</template>

<script>
  export default {
    computed: {
      topTracks() {
        const tracks = this.$store.getters.topTracks
        return tracks
      }
    }
  }

</script>

<style module>
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit,minmax(15rem,1fr));
		grid-gap: 7rem;
    padding: 1.7rem;
	}

	.link {
		display: flex;
		flex-direction: column;
		text-decoration: none;
	}
	.link:hover img {
		transform: scale(1.02);
	}

	.image {
		width: 100%;
		height: 19.7rem;
		object-fit: cover;
		box-shadow: 0 4px 20px rgba(0,0,0,0.2), 0 27px 27px rgba(0,0,0,0.1);
		border-radius: 10px;
		transition: transform 0.2s ease-out;
	}

	.title{
		font-size: 1.1rem;
		margin-top: 1rem;
		color: black;
		text-align: left;
	}
</style>
