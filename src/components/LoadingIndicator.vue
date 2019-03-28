<template>
  <div class="container-loader">
    <div class="loader"></div>
    <div class="loader"></div>
    <div class="loader"></div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .container-loader {
    display: flex;
    justify-content: center;
    padding: 2rem;
		position: fixed;
		top: 0;
		left: 0;
  }

  .loader {
    animation: loading 1s ease-in-out infinite alternate;
    background-color: #ffba64;
    height: 6rem;
    margin: 0 1rem;
    width: 1rem;
  }

  .observer .loader:nth-of-type(2) {
    animation-delay: .4s;
  }

  .observer .loader:nth-of-type(3) {
    animation-delay: .8s;
  }

  @keyframes loading {
    100% {
      transform: scaleY(.4);
    }
  }

</style>
