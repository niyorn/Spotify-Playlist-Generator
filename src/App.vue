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
export default {}
</script>


<style lang="scss">
:root {
	--primary-color: #060625;
	--secondary-color: #88fff5;

	--box-shadow-hover: 0 19px 38px rgba(0, 0, 0, 0.2),
		0 15px 12px rgba(0, 0, 0, 0.1);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html,
body,
#app {
	height: 100%;
}

body {
	font-family: 'Ubuntu', sans-serif;
}

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
