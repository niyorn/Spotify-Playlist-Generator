import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import LoadingIndicator from '@/components/LoadingIndicator'

Vue.component('LoadingIndicator', LoadingIndicator)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  LoadingIndicator,
  render: h => h(App)
}).$mount('#app')
