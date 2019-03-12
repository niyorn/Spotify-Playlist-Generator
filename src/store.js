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
      scope: 'user-top-read',
      redirectUrl: 'http://localhost:8080/home',
      showDialog: true
    },
    access: {
      accessToken: '',
      tokenType: '',
      expiresIn: ''
    },
    user: {
      userUrl: 'https://api.spotify.com/v1/me',
      scopeTopTracks: '/top/tracks',
      data: {},
      topTracks: {}
    }
  },


  mutations: {
    updateAccess(state, access) {
      state.access.accessToken = access.access_token
      state.access.tokenType = access.token_type
      state.access.expiresIn = access.expires_in
    },

    updateUserData(state, payload) {
      state.user.data = payload
    },

    updateUserTracks(state, payload) {
      state.user.topTracks = payload
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
    },
    user(state) {
      const user = {}
      user.name = state.user.data.id
      return user
    },
    topTracks(state) {
      const tracks = state.user.topTracks.items
      console.log('tracks: ', tracks);
    }
  },



  actions: {
    fetchUser(context) {
      const url = context.state.user.userUrl 
      const data = context.dispatch('fetchSpotify', url)
      data.then((data)=>{
        context.commit('updateUserData', data)
      })
    },

    fetchUserTopTracks(context) {
      const url = context.state.user.userUrl+context.state.user.scopeTopTracks 
      const data = context.dispatch('fetchSpotify', url)
      data.then(data => {
        context.commit('updateUserTracks', data)
      })
    },

    fetchSpotify(context, url) {
      let data = fetch(url, {
        headers: {
          'Authorization': `${context.state.access.tokenType} ${context.state.access.accessToken}`
        }
      })
      .then(response=> {
        return response.json()
      })
      
      return data
    },

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
