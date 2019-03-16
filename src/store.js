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
      scopePlayListModifyPublic: 'playlist-modify-public',
      redirectUrl: 'https://sporator.netlify.com/check',
      showDialog: true
    },
    access: {
      accessToken: '',
      tokenType: '',
      expiresIn: ''
    },
    user: {
      userUrl: 'https://api.spotify.com/v1/me',
      scopeTopTracks: '/top/tracks?',
      scopeTopArtists: '/top/artists?',
      timeRange: 'short_term',
      data: {},
      topTracks: {},
      topArtists: {}
    },
    createPlaylist: {
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
      state.createPlaylist.data = payload
    }
  },


  getters: {
    getAuthorizeUrl(state) {
      const authorize = state.authorize
      let url = `${authorize.authorizeUrl}`
      url += `client_id=${authorize.clientId}`
      url += `&redirect_uri=${authorize.redirectUrl}`
      url += `&scope=${authorize.scope} ${authorize.scopePlayListModifyPublic}` 
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
            imageHref: i.album.images[0].url,
            id: i.id
          }
          return track
        })

        return transFormTracks
      }
    },

    topArtists(state) {
      const topArtists = state.user.topArtists.items

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
    },
    //spotify:track:1uIPtWQmmoTJ8u0EVq7I8r
    getTrackUri(state) {
      const tracks = state.user.topTracks.items
      let trackUri = []

      for(let track of tracks){
        trackUri.push(track.uri)
      }

      return trackUri
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
      const timeRange = 'time_range=short_term'
      const url = context.state.user.userUrl 
        + context.state.user.scopeTopTracks 
        + `time_range=${context.state.user.timeRange}`
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
        console.log(data)
        const playlistId = data.id
        return playlistId
      })
      .then((id)=>{
        context.dispatch('addSongToPlaylist',id)
      })
      .catch(error=>{
        console.log('error: ', error);
      })
    },

    addSongToPlaylist({state, commit, dispatch,getters}, playlistId) {
      const userId = state.user.data.id
      // const playListId = state.playlist.data.id
      const tokenType = state.access.tokenType
      const accessToken = state.access.accessToken
      const trackUri = getters.getTrackUri
      const track = {"uris": trackUri}
      const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`
      const options = {
        method: 'Post',
        headers: {
          'Authorization': `${tokenType} ${accessToken}`
        },
        body: JSON.stringify(track)
      }
      fetch(url, options)
      .then(response=> {
        console.log(response)
        response.json()
      })
      .then(data=> {
        console.log(data)
      })
    },

    // test(context) {
    //   console.log(context)
    //   let lol = context.getters.getTrackId
    //   console.log('lol: ', lol);
    // }
  }
})
