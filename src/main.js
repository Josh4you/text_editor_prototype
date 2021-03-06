import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

window.$ = require('jquery');
window.jQuery = require('jquery');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
