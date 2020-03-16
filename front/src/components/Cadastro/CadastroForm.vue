<template>
  <be-card :bg="true">
    <template #header>
      <div class="be-page-body-header">
        <div class="be-page-context">
          <h2 class="be-title">
            Cadastro de Avaliação
          </h2>
        </div>
      </div>
    </template>
    <template #body>
      <div>
        <form>
          <div class="be-col-12 be-px-0">
            <legend>Dados relevantes para o cadastro</legend>
          </div>
          <div class="be-col-12 be-px-0 be-mb-0">
            <div class="be-col-6 be-col-sm-12">
              <div>
                <label class="be-label-text">Atendente</label>
                <model-list-select
                  v-model="selected.atendente_id"
                  :list="getAtendentesList"
                  option-value="id"
                  option-text="nome"
                  placeholder="Digite o nome"
                  @searchchange="buscaAtend"
                />
              </div>
            </div>
            <div class="be-col-6 be-col-sm-12">
              <div class="be-input-group">
                <label class="be-label-text">Cliente</label>
                <model-list-select
                  v-model="selected.cliente_id"
                  :list="getClientesList"
                  option-value="id"
                  option-text="nome"
                  placeholder="Digite o nome"
                  @searchchange="busca"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </template>
    <template #footer>
      <b-alert
        v-model="showAlert"
        dismissible
        variant="danger"
      >
        <p>Os campos Atendente e Cliente são obrigatórios</p>
      </b-alert>
      <div class="be-information be-col-6 be-col-sm-12 be-my-0">
        <small class="be-small">Informações serão exibidas na Avaliação.</small>
      </div>
      <div class="be-actions be-col-6 be-col-sm-12 be-my-0 text-right">
        <be-btn
          class="be-m-1"
          icon="eraser"
          :icon-l="true"
          descricao="Limpar"
        />
        <be-btn
          icon="content-save"
          :icon-l="true"
          color="primary"
          descricao="Salvar"
          @click="create"
        />
      </div>
    </template>
  </be-card>
</template>

<script>

import { ModelListSelect } from 'vue-search-select'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ModelListSelect
  },
  data () {
    return {
      atendentes: [],
      clientes: [],
      selected: {
        atendente_id: 0,
        cliente_id: 0
      },
      checkMulti: {
        id: 0,
        tag: 'select1',
        text: 'Selecionar todos'
      },
      status: false,
      showAlert: false
    }
  },
  computed: {
    ...mapGetters(['getAtendentesList', 'getClientesList'])
  },
  created () {
    this.popularAtendentes()
  },
  methods: {
    ...mapActions({
      popularAtendentes: 'consultarAtendentes',
      popularClientes: 'consultarClientes',
      pesquisaCliente: 'buscaClientes'
    }),
    dataStatus (status) {
      this.status = status
    },
    create () {
      if (this.selected.atendente_id === 0 || this.selected.cliente_id === 0) {
        this.showAlert = true
        return
      }
      this.$emit('salveForm', this.selected)
    },
    busca (texto) {
      if (texto.length === 0) return

      if (texto.length > 2) {
        this.pesquisaCliente(texto)
      } else {
        this.popularClientes()
      }
    },
    buscaAtend (texto) {
      this.popularAtendentes()
    },
    data () {
      return {
        dataMult: this.checkMulti,
        check: this.check
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
