<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>



export default {
  data() {
    return {
      baseUrl: 'https://api.spotify.com',
      endPoint: '/v1/me/top/{type}',
      clientId: 'e21503efb7af4d09930b523b044396e6',
      authorizeUrl: 'https://accounts.spotify.com/authorize?',
      responseType: 'token',
      scope: 'user-read-recently-played',
      redirectUrl: 'http://localhost:8080'
    }
  },  

  methods: {
    authorize() {
      const url = `${this.authorizeUrl}client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&scope=${this.scope}&response_type=${this.responseType}`
      console.log('url: ', url);

      fetch(url)
      .then(response => {
        console.log(response)
      })
      .catch(error=> {
        console.log('error', error)
      })
    },

    getData() {
      const url = this.baseUrl + this.endPoint;
      console.log('url: ', url);
    }
  },


  created() {
    this.authorize()
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
