import './firebase'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import axios from 'axios'
import VueAxios from 'vue-axios'

//import VueFire from 'vuefire'
//Vue.use(VueFire);

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
