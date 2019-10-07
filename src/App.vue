<template>
    <div id="app">
        <router-view />

        <p class="author">
            <a
                href="https://chana-portfolio.netlify.com/"
                title="Learn more about me"
                rel="author"
            >created by: Chanakarn Niyornram</a>
        </p>
    </div>
</template>

<script>
import '@/assets/GlobalStyle.scss'

export default {}
</script>

<style lang="scss">
.author {
	position: fixed;
	bottom: 1rem;
	right: 1rem;

	a {
		text-decoration: none;
		color: var(--primary-color);
		opacity: 0.7;
		font-size: 1em;
	}
}
</style>
