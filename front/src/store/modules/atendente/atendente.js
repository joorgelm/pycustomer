import atendenteAPI from '@/endpoints/atendente.js'
import http from '@/plugins/axios.js'

export default {
  state: {
    atendente: getSavedState('atendente')
  },
  mutations: {
    setAtendentes (state, payload) {
      state.atendentes = payload
    },
    setAtendenteLogado (state, novoAtendente) {
      state.atendente = novoAtendente
      saveState('atendente', novoAtendente)
      setDefaultAuthHeaders(state)
    }
  },
  actions: {
    consultarAtendentes ({ commit }, params = null) {
      atendenteAPI.todosAtendentes(params).then(resolve => {
        commit('setAtendentes', resolve.data.itens)
      })
    },
    logIn ({ commit }, data = null) {
      return atendenteAPI.login(data).then(response => {
        commit('setAtendenteLogado', response.data)
      })
    },
    logOut ({ commit }) {
      // atendenteAPI.logout().then(() => {
        window.localStorage.removeItem('atendente')
        commit('setAtendenteLogado', null)
      // })
    },
    refreshSession ({ commit }) {
      atendenteAPI.renovaSessao().then(response => {
        commit('setAtendenteLogado', response.data)
      })
    }
  },
  getters: {
    getAtendentesList: (state) => {
      return state.atendentes
    }
  }
}

function getSavedState (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState (key, state) {
  state['timestamp'] = Math.floor(Date.now() / 1000)
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders (state) {
  http.defaults.headers.common.Authorization = state.atendente.token
    ? `Token ${state.atendente.token}`
    : ''
}
