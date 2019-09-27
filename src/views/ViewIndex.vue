<template>
  <section class="headline-container">
    <section class="play-container">
      <div class="album-container">
        <img class="album-cover" src="@/assets/trapart-cover.jpg" alt />

        <div class="decoration"></div>
      </div>
      <div class="decoration"></div>
    </section>
    <main class="jumbo-tron-container">
      <h1 class="title">Sporator</h1>
      <p class="under-title">Spotify playlist generator</p>
      <p class="description">
        Sporator will generate a playlist from your most listened songs, instead of you wasting
        your time selecting the songs on your own. So start listen to your favorite songs now.
      </p>
      <a class="login" :href="authorizeUrl">Generate playlist</a>
    </main>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            authorizeUrl: 'getAuthorizeUrl'
        })
    }
}
</script>

<style lang="scss" scoped>
.headline-container {
	display: grid;
	grid-template-areas: 'play jumbo-tron';
	grid-template-columns: 50vw 50vw;
	height: 100%;
	overflow: hidden;

	.play-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		.album-container {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			animation: slide-in 0.4s ease-out;

			.album-cover {
				width: 60%;
				border-radius: 50%;
				animation: spinning 40s infinite linear;
				box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2),
					0 15px 40px rgba(0, 0, 0, 0.1);
			}

			@keyframes spinning {
				to {
					transform: rotate(360deg);
				}
			}

			.decoration {
				position: absolute;
				height: 4rem;
				width: 4rem;
				background-color: white;
				left: initial;
				top: initial;
				z-index: 1;
				border-radius: 50%;
			}
		}

		.decoration {
			content: '';
			background-color: var(--primary-color);
			height: 100%;
			width: 50%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
		}
	}

	.jumbo-tron-container {
		padding: 2rem;
		padding-top: 7rem;

		.title {
			font-size: 10vw;
			font-weight: bold;
			text-transform: capitalize;
			color: var(--primary-color);
			animation: slide-in 0.7s ease-out forwards;
			animation-delay: 0.2s;
			opacity: 0;
		}

		.under-title {
			font-size: 2vw;
			color: #777;
			animation: slide-in 0.7s ease-out forwards;
			animation-delay: 0.4s;
			opacity: 0;
		}

		.description {
			font-size: 1.4vw;
			line-height: 1.9;
			padding-top: 4rem;
			width: 70%;
			animation: slide-in 0.7s ease-out forwards;
			animation-delay: 0.6s;
			opacity: 0;
		}

		.login {
			margin-top: 4rem;
			padding: 1rem 2rem 1rem 2rem;
			font-size: 2vw;
			background-color: var(--secondary-color);
			text-decoration: none;
			color: black;
			display: inline-block;
			transition: 0.7s ease-out;
			animation: slide-in 0.7s ease-out forwards;
			animation-delay: 0.7s;
			opacity: 0;

			&:hover {
				box-shadow: var(--box-shadow-hover);
			}
		}
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(4rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
}
</style>
