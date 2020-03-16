import http from '@/plugins/axios.js'

export default {
  todosClientes (params) {
    return http.get(`/cliente/all`, { params })
  },

  buscaCliente (params) {
    return http.get(`/cliente/busca/` + params)
  }
}
