import satisfacaoAPI from '@/endpoints/satisfacao.js'

export default {
  state: {
    headsList: [],
    dataItems: [],
    hash: '',
    meta: {
      'paginacao.itens': 0,
      'paginacao.pagina_atual': 0,
      'paginacao.por_pagina': 0,
      'paginacao.primeira_pagina': 0,
      'paginacao.total_itens': 0,
      'paginacao.ultima_pagina': 0
    },
    satisfaction: {}
  },
  mutations: {
    setSatisfacion (state, payload) {
      state.satisfaction = payload
    },
    setMetaItens (state, payload) {
      state.meta = payload.meta
    },
    setdataItems (state, payload) {
      state.dataItems = payload.data
    },
    setHash (state, data) {
      state.hash = data
    },
    setHeadsList (state, data) {
      state.headsList = data
    }
  },
  actions: {
    checkHash ({ state }) {
      return satisfacaoAPI.hashApi(state.hash)
    },
    listarSatisfacoesPendentes ({ commit }, params = null) {
      return satisfacaoAPI.satisfacoesNaoRespondidas(
        params).then(resolve => {
        commit('setdataItems', resolve.data)
        commit('setMetaItens', resolve.data)
      })
    },
    listarSatisfacoesFiltradas ({ commit }, params = null) {
      return satisfacaoAPI.satisfacoesNaoRespondidas(params).then(resolve => {
        commit('setdataItems', resolve.data)
        commit('setMetaItens', resolve.data)
      })
    }
  },
  getters: {
    getSatisfacaoMetaItens: (state) => {
      return state.meta
    },
    getSatisfacaoHeadList: (state) => {
      return state.headsList
    },
    getSatisfacaoDataItems: (state) => {
      return state.dataItems
    },
    getHash: (state) => {
      return state.hash
    },
    getSatisfaction: (state) => {
      return state.satisfaction
    }
  }
}
