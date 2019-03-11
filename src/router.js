import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/ViewIndex.vue'
import Home from '@/views/ViewHome.vue'

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
      path: '/home',
      name: "Home",
      component: Home,
      props: (route)=> {
        {
          hash: route.hash
        }
      }
    }
  ]
})
