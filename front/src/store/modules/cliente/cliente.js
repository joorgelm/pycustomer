import clienteAPI from '@/endpoints/cliente.js'

export default {
  state: {
    clientes: []
  },
  mutations: {
    setClientes (state, payload) {
      state.clientes = payload
    }
  },
  actions: {
    consultarClientes ({ commit }, params = null) {
      clienteAPI.todosClientes(params).then(resolve => {
        commit('setClientes', resolve.data.itens)
      })
    },
    buscaClientes ({ commit }, params = '') {
      clienteAPI.buscaCliente(params).then(resolve => {
        commit('setClientes', resolve.data)
      })
    }
  },
  getters: {
    getClientesList: (state) => {
      return state.clientes
    }
  }
}
