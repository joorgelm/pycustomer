import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import satisfacao from './modules/satisfacao/satisfacao'
import dashboard from './modules/dashboard/dashboard'
import atendente from './modules/atendente/atendente'
import cliente from './modules/cliente/cliente'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    satisfacao,
    dashboard,
    atendente,
    cliente
  }
})
