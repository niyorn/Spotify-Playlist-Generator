<template>
    <div class="container-loader">
        <div class="loader"></div>
        <div class="loader"></div>
        <div class="loader"></div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container-loader {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	/* background-color: white; */
}

.loader {
	animation: loading 1s ease-in-out infinite alternate;
	background-color: #ffba64;
	height: 70%;
	max-height: 6rem;
	margin: 0 1rem;
	width: 1rem;
}

.loader:nth-of-type(2) {
	animation-delay: 0.4s;
}

.loader:nth-of-type(3) {
	animation-delay: 0.8s;
}

@keyframes loading {
	100% {
		transform: scaleY(0.4);
	}
}
</style>
