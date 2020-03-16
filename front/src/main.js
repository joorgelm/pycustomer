import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import VueTheMask from 'vue-the-mask'
import Vuelidade from 'vuelidate'

import 'vue-search-select/dist/VueSearchSelect.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store/store'

import beBreakcrumb from './components/base/be-breakcrumb.vue'
import beCard from './components/base/be-card.vue'
import beCheckbox from './components/base/be-checkbox.vue'
import beStatus from './components/base/be-status.vue'
import beTable from './components/base/be-table.vue'
import beIcon from './components/base/be-icons.vue'
import beInput from './components/base/be-input.vue'
import beModal from './components/base/be-modal.vue'
import beLottie from './components/base/be-lottie.vue'
import beTypeSatisfacao from './components/base/be-typesatisfacao.vue'
import beMenuTable from './components/base/be-menu.vue'
import beButton from './components/base/be-button.vue'
import beCheckboxAvaliacao from './components/base/be-checkboxAvaliacao.vue'

// Import Pluggis
import './plugins/axios'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.component('be-icon', beIcon)
Vue.component('be-breakcrumb', beBreakcrumb)
Vue.component('be-card', beCard)
Vue.component('be-checkbox', beCheckbox)
Vue.component('be-status', beStatus)
Vue.component('be-table', beTable)
Vue.component('be-input', beInput)
Vue.component('be-modal', beModal)
Vue.component('be-lottie', beLottie)
Vue.component('be-type-satisfacao', beTypeSatisfacao)
Vue.component('be-menu', beMenuTable)
Vue.component('be-btn', beButton)
Vue.component('be-checkbox-avaliacao', beCheckboxAvaliacao)

Vue.use(BootstrapVue)
Vue.use(VueTheMask)
Vue.use(Vuelidade)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
