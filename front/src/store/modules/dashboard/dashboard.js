import http from '@/plugins/axios.js'

export default {
  state: {
    satisfacaoFinais: 0,
    satisfacaoAguardo: 0,
    satisfacaoExpirada: 0,
    satisfacaoTotal: 0,
    satisfacaoMedia: 0,
    fases: {
      expirada: 2,
      finalizada: 1,
      pendente: 0
    }
  },
  getters: {
    getSatisfacaoFinais: (state) => {
      return state.satisfacaoFinais
    },
    getSatisfacaoAguardo: (state) => {
      return state.satisfacaoAguardo
    },
    getSatisfacaoExpirada: (state) => {
      return state.satisfacaoExpirada
    },
    getSatisfacaoMedia: (state) => {
      return state.satisfacaoMedia
    },
    getSatisfacaoTotal: (state) => {
      const total = state.satisfacaoFinais + state.satisfacaoAguardo
      state.satisfacaoTotal = total
      return state.satisfacaoTotal
    }
  },
  mutations: {
    setSatisfacaoTotal: (state, payload) => {
      state.satisfacaoTotal = payload
    },
    setSatisfacaoAguardo: (state, payload) => {
      state.satisfacaoAguardo = payload
    },
    setSatisfacaoFinais: (state, payload) => {
      state.satisfacaoFinais = payload
    },
    setSatisfacaoExpiradas: (state, payload) => {
      state.satisfacaoExpirada = payload
    },
    setSatisfacaoMedia: (state, payload) => {
      state.satisfacaoMedia = payload
    }
  },
  actions: {
    addSatisfacao: ({ state, commit }) => {
      http.get(`dashboard/quantidade`).then(resolve => {
        let unidade = resolve.data

        commit('setSatisfacaoTotal', unidade['qtd_total_pesquisas'])
        commit('setSatisfacaoMedia', unidade['media_pesquisas'])

        unidade['pesquisas_por_fase'].forEach(el => {
          switch (el.fase) {
            case state.fases.pendente:
              commit('setSatisfacaoAguardo', el.qtd)
              break

            case state.fases.finalizada:
              commit('setSatisfacaoFinais', el.qtd)
              break

            case state.fases.expirada:
              commit('setSatisfacaoExpiradas', el.qtd)
              break
          }
        })
      })
    }
  }
}
