import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/ViewIndex.vue'
import Home from '@/views/ViewHome.vue'
import Check from '@/views/ViewCheck.vue'
import UserTracks from '@/components/TopTracks.vue'
import UserArtists from '@/components/TopArtists.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },

    {
      path: '/check',
      name: "Check",
      component: Check
    },

    {
      path: '/home',
      name: "Home",
      component: Home,
      children: [{
        path: 'tracks',
        name: 'Tracks',
        component: UserTracks
      },{
        path: 'artists',
        name: 'Artists',
        component: UserArtists
      }

      ]
    }
  ]
})
