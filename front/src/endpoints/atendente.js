import http from '@/plugins/axios.js'

export default {
  todosAtendentes (params) {
    return http.get(`/atendente/all`, { params })
  },
  login (params) {
    console.log(http.baseURL)
    return http.post(`/auth/`, params)
  },
  renovaSessao () {
    return http.post(`/atendente/refresh`)
  },
  logout () {
    return http.post(`/atendente/sair`)
  },
  novaSenha (data) {
    return http.post('atendente/nova_senha', data)
  },
  checkReset (data) {
    return http.get('atendente/nova_senha/' + data)
  },
  reset (data) {
    return http.post('atendente/nova_senha/reset', data)
  },
  getAtendente (data) {
    return http.get('atendente/self')
  }

}
