<template>
  <div class="be-filter-back">
    <div class="header-filter">
      <div>
        <h2
          class="be-page-title"
        >
          <be-icon
            icon="filter"
            size="24"
          />
          Filtrar Avaliações
        </h2>
        <be-btn
          icon="window-close"
          class="be-text-dark"
          icon-size="24"
          :icon-l="true"
          color="none"
          @click="$emit('fechar')"
        />
      </div>
      <p>
        Selecione pelo menos um dos itens abaixo
        para filtrar os resultados.
      </p>
    </div>

    <div class="be-filter-form">
      <div class="col">
        <b-button
          v-b-toggle.date
          class="btn d-flex justify-content-between align-items-center"
          @click="optionsIcons.periodo = !optionsIcons.periodo"
        >
          Período
          <be-icon
            v-if="optionsIcons.periodo"
            icon="chevron-up"
          />
          <be-icon
            v-else
            icon="chevron-down"
          />
        </b-button>
        <b-collapse
          id="date"
          class="col"
        >
          <b-card
            class="card"
          >
            <label class="be-label-text">De</label>
            <be-input
              v-model="selected.dataInicio"
              type="date"
              placeholder="data"
            />
            <label class="be-label-text">Até</label>
            <be-input
              v-model="selected.dataTermino"
              type="date"
              placeholder="data"
            />
          </b-card>
        </b-collapse>
        <b-button
          v-b-toggle.satisfacao
          class="btn d-flex justify-content-between align-items-center"
          @click="optionsIcons.rate = !optionsIcons.rate"
        >
          Nível de Avaliação
          <be-icon
            v-if="optionsIcons.rate"
            icon="chevron-up"
          />
          <be-icon
            v-else
            icon="chevron-down"
          />
        </b-button>
        <b-collapse
          id="satisfacao"
          class="col"
        >
          <b-card class="card">
            <b-form-group>
              <b-form-checkbox-group
                v-model="selected.rate"
                class="check"
                name="rate-group"
                :options="optionsRate"
              />
            </b-form-group>
          </b-card>
        </b-collapse>
        <b-button
          v-b-toggle.status
          class="btn d-flex justify-content-between align-items-center"
          @click="optionsIcons.status = !optionsIcons.status"
        >
          Status
          <be-icon
            v-if="optionsIcons.status"
            icon="chevron-up"
          />
          <be-icon
            v-else
            icon="chevron-down"
          />
        </b-button>
        <b-collapse
          id="status"
          class="col"
        >
          <b-card class="card">
            <b-form-group>
              <b-form-checkbox-group
                v-model="selected.status"
                class="check"
                :options="optionsStatus"
                name="status-gorup"
              />
            </b-form-group>
          </b-card>
        </b-collapse>
        <b-button
          v-b-toggle.atend
          class="btn d-flex justify-content-between align-items-center"
          @click="optionsIcons.atendente = !optionsIcons.atendente"
        >
          Atendente
          <be-icon
            v-if="optionsIcons.atendente"
            icon="chevron-up"
          />
          <be-icon
            v-else
            icon="chevron-down"
          />
        </b-button>
        <b-collapse
          id="atend"
          class="col"
        >
          <b-card class="card">
            <div class="be-input-group">
              <model-list-select
                v-model="selected.atendente_id"
                class="selected-filter"
                :list="getAtendentesList"
                option-value="id"
                option-text="nome"
                placeholder="Digite o nome"
              />
            </div>
          </b-card>
        </b-collapse>
        <b-button
          v-b-toggle.client
          class="btn d-flex justify-content-between align-items-center"
          @click="optionsIcons.cliente = !optionsIcons.cliente"
        >
          Cliente
          <be-icon
            v-if="optionsIcons.cliente"
            icon="chevron-up"
          />
          <be-icon
            v-else
            icon="chevron-down"
          />
        </b-button>
        <b-collapse
          id="client"
          class="col"
        >
          <b-card class="card">
            <div class="be-input-group">
              <model-list-select
                v-model="selected.cliente_id"
                class="selected-filter"
                :list="getClientesList"
                option-value="id"
                option-text="nome"
                placeholder="Digite o nome"
                @searchchange="busca"
              />
            </div>
          </b-card>
        </b-collapse>
      </div>
    </div>
    <div class="footer-filter">
      <be-btn
        icon="reload"
        class="be-text-danger"
        icon-size="24"
        :icon-l="true"
        color="none"
        descricao="Limpar campos"
        @click="limpar"
      />
      <be-btn
        class="submit"
        color="primary"
        descricao="Ver Resultados"
        @click="onSubmit"
      />
    </div>
  </div>
</template>
<script>
import { ModelListSelect } from 'vue-search-select'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BeFilter',
  components: {
    ModelListSelect
  },
  data () {
    return {
      atendentes: [],
      clientes: [],
      selected: {
        dataInicio: null,
        dataTermino: null,
        rate: null,
        status: null,
        atendente_id: {},
        cliente_id: {}
      },
      optionsIcons: {
        periodo: false,
        rate: false,
        status: false,
        atendente: false,
        cliente: false
      },
      optionsRate: [
        { value: 1, text: 'Achei péssimo!' },
        { value: 2, text: 'Achei ruim!' },
        { value: 3, text: 'Achei regular!' },
        { value: 4, text: 'Achei bom!' },
        { value: 5, text: 'Achei excelente!' }
      ],
      optionsStatus: [
        { value: 0, text: 'Aguardando.' },
        { value: 1, text: 'Finalizada.' },
        { value: 2, text: 'Expirado.' }
      ]
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
    onSubmit () {
      this.$emit('submitFilter', this.selected)
    },
    limpar () {
      this.selected.dataInicio = null
      this.selected.dataTermino = null
      this.selected.rate = null
      this.selected.status = null
      this.selected.atendente_id = {}
      this.selected.cliente_id = {}

      this.$emit('submitFilter', this.selected)
    },
    busca (texto) {
      if (texto.length === 0) return

      if (texto.length > 2) {
        this.pesquisaCliente(texto)
      } else {
        this.popularClientes()
      }
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
.be-filter-back{
  width: 100%;
  height:90%;
  @include d-flex(column, nowrap);
  align-items: center;
}
.header-filter{
  font-family: $be-font-text;
  div{
    @include d-flex(row, nowrap);
    align-items:flex-end;
    width: 100%;
    h2{
      margin-top: 5%;
      margin-left: 2%;
      font-size: 23px;
    }
  }
  p{
    font-size: $be-font-size-xs;
    color: $be-color-gray-500;
    margin-bottom: 5%;
    margin-left: 5%
  }
}
.be-filter-form{
  font-family: $be-font-text;
  width: 100%;
  height: 100%;
  @include d-flex(row, nowrap);
  align-items: flex-start;
  background: $be-color-white;
  color: $be-color-gray-500;
  overflow-y: auto;
   .col{
     @include d-flex(column, nowrap);
     align-items: center;
     width: 100%;
   }
   .card{
     width: 95%;
     border: none;
   }
    .btn{
      width: 100%;
      text-align: left;
       &:focus {
        color: $be-color-gray-700;
        outline: none;
        border-color: $be-color-primary;
      }
   }
   .selected-filter{
      width: 90%;
      margin-top: 5%;
      text-align: left;
       &:focus {
        outline: none;
        border-color: $be-color-primary;
       }
   }
   .check{
      @include d-flex(column, nowrap);
   }
   label{
     margin-top: 5%;
   }
}
.footer-filter{
  margin-top: 10%;
  width: 100%;
  position: relative;
  bottom: 3%;
  @include d-flex(column, nowrap);
  align-items:center;
}
</style>
