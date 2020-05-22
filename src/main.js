import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vSelect from 'vue-select'
import VCalendar from 'v-calendar';
import VueMoment from 'vue-moment'

Vue.config.productionTip = false

// Компонент-селектор
Vue.component('v-select', vSelect)

// Для вывода дат
const moment = require('moment')
require('moment/locale/ru')
Vue.use(VueMoment, {
  moment
});

// Календарь для выбора даты
Vue.use(VCalendar);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
