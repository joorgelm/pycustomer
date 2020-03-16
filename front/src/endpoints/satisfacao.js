import http from '@/plugins/axios.js'

export default {

  hashApi (hash) {
    return http.get(`/pesquisa/check?hash=` + hash)
  },
  satisfacoesNaoRespondidas (params) {
    return http.get(`pesquisa/filtra`, { params })
  },
  salva (data) {
    return http.post(`pesquisa/create`, data)
  },
  geraHash (data) {
    return http.post(`pesquisa/hash`, data)
  },
  todasMelhorias () {
    return http.get(`pesquisa/melhorias`)
  },
  deletarUmaSatisfacao (data) {
    return http.delete(`pesquisa/` + data)
  }
}
