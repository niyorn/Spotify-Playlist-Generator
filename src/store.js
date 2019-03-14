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
      scopePlayListModifyPrivate: 'playlist-modify-private',
      scopePlayListModifyPublic: 'playlist-modify-private',
      redirectUrl: 'http://localhost:8080/check',
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
      scopeTopArtists: '/top/artists',
      data: {},
      topTracks: {},
      topArtists: {}
    },
    createPlay: {
      data: {}
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
    },

    updateUserArtists(state, payload) {
      state.user.topArtists = payload
    },

    updateCreatePlaylist(state, payload) {
      state.createPlay.data = payload
    }
  },


  getters: {
    getAuthorizeUrl(state) {
      const authorize = state.authorize
      let url = `${authorize.authorizeUrl}`
      url += `client_id=${authorize.clientId}`
      url += `&redirect_uri=${authorize.redirectUrl}`
      url += `&scope=${authorize.scope} ${authorize.scopePlayListPrivate}` 
      url += `&response_type=${authorize.responseType}`
      url += `&show_dialog=${authorize.showDialog}`

      return url
    },

    user(state) {
      const user = {}
      user.name = state.user.data.display_name
      return user
    },

    topTracks(state) {
      let topTracks = state.user.topTracks.items
      if (topTracks !== undefined) {
        let transFormTracks = topTracks.map((i) => {
          const track = {
            name: i.name,
            href: i.external_urls.spotify,
            imageHref: i.album.images[0].url
          }
          return track
        })

        return transFormTracks
      }
    },

    topArtists(state) {
      const topArtists = state.user.topArtists.items
      console.log('topArtists: ', topArtists);

      if (topArtists !== undefined) {
        let transformTopArtists = topArtists.map((i) => {
          const artists = {
            name: i.name,
            href: i.external_urls.spotify,
            imageHref: i.images[0].url
          }
          return artists
        })

        return transformTopArtists
      }
    }
  },



  actions: {
    fetchUser(context) {
      const url = context.state.user.userUrl
      const data = context.dispatch('fetchSpotify', url)
      data.then((data) => {
        context.commit('updateUserData', data)
      })
    },

    fetchUserTopTracks(context) {
      const url = context.state.user.userUrl + context.state.user.scopeTopTracks
      const data = context.dispatch('fetchSpotify', url)
      data.then(data => {
        context.commit('updateUserTracks', data)
      })
    },

    fetchUserTopArtists(context) {
      const url = context.state.user.userUrl + context.state.user.scopeTopArtists
      const data = context.dispatch('fetchSpotify', url)
      data.then(data => {
        context.commit('updateUserArtists', data)
      })
    },

    fetchSpotify(context, url) {
      let data = fetch(url, {
          headers: {
            'Authorization': `${context.state.access.tokenType} ${context.state.access.accessToken}`
          }
        })
        .then(response => {
          return response.json()
        })

      return data
    },

    getAccess({state}) {
      const authorize = state.authorize
      const url = `${authorize.authorizeUrl}client_id=${authorize.clientId}&redirect_uri=${authorize.redirectUrl}&scope=${authorize.scope}&response_type=${authorize.responseType}`
    },

    addAccess({commit}, access) {
      commit('updateAccess', access)
    },


    createPlaylist(context) {
      const userId = context.state.user.data.id
      const  url= `https://api.spotify.com/v1/users/${userId}/playlists`
      const playList = {
        "name": "New Playlist",
        "description": "New playlist description",
      }
      
      const option = {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization":`${context.state.access.tokenType} ${context.state.access.accessToken}` ,
        },
        body: JSON.stringify(playList),
      }

      fetch(url, option)
      .then(response=> {
        return response.json()
      })
      .then(data=> {
        context.commit('updateCreatePlaylist', data)
      })
      .catch(error=>{
        console.log('error: ', error);
      })
    }
  }
})
