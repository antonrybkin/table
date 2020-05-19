import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vSelect from 'vue-select'
import VCalendar from 'v-calendar';
import VueMoment from 'vue-moment'

Vue.config.productionTip = false

Vue.component('v-select', vSelect)

const moment = require('moment')
require('moment/locale/ru')
Vue.use(VueMoment, {
  moment
});

Vue.use(VCalendar);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
