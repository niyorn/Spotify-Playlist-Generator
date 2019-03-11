// eslint-disable-next-line
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorize: {
      clientId: 'e21503efb7af4d09930b523b044396e6',
      authorizeUrl: 'https://accounts.spotify.com/authorize?',
      responseType: 'token',
      scope: 'user-read-recently-played',
      redirectUrl: 'http://localhost:8080/home',
      showDialog: true
    },
    access: {
      accessToken: '',
      tokenType: '',
      expiresIn: ''
    }
  },


  mutations: {
    updateAccess(state, access) {
      state.access.accessToken = access.access_token
      state.access.tokenType = access.token_type
      state.access.expiresIn = access.expires_in
    }
  },


  getters: {
    getAuthorizeUrl(state) {
      const authorize = state.authorize
      let url = `${authorize.authorizeUrl}`
      url+= `client_id=${authorize.clientId}`
      url+= `&redirect_uri=${authorize.redirectUrl}`
      url+= `&scope=${authorize.scope}`
      url+= `&response_type=${authorize.responseType}`
      url+= `&show_dialog=${authorize.showDialog}`
      
      return url
    }
  },



  actions: {
    getAccess({state}) {
      const authorize = state.authorize
      const url = `${authorize.authorizeUrl}client_id=${authorize.clientId}&redirect_uri=${authorize.redirectUrl}&scope=${authorize.scope}&response_type=${authorize.responseType}`

      fetch(url)
        .then(response => {
          console.log(response)
        })
    },

    addAccess({commit}, access) {
      commit('updateAccess', access)
    }
  }
})
