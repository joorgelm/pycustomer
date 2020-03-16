<template>
  <base-main>
    <template #header>
      <div class="be-context">
        <h1 class="be-page-title">
          Avaliações
        </h1>
        <be-breakcrumb :map-routes="breakcrumb" />
      </div>
      <div class="be-actions">
        <be-btn
          icon="reload"
          color="none"
          :icon-r="true"
          descricao="Atualizar Lista"
          @click="changePage(filtro.pagina)"
        />
        <be-btn
          icon="filter"
          color="primary"
          :icon-l="true"
          descricao="Filtro"
          :class="{'acitve': showFilter }"
          @click="showFilter = !showFilter"
        />
      </div>
    </template>
    <template #body>
      <be-table
        :heads="getSatisfacaoHeadList"
        :data-list="getSatisfacaoDataItems"
        :listagem-satisfacoes="true"
        :actions="true"
        :options="links"
        @actionItem="routerDetails"
        @clickDelete="changePage(filtro.pagina)"
      />
    </template>
    <template #footer>
      <b-pagination
        class="mr-2"
        align="right"
        :per-page="meta['paginacao.por_pagina']"
        :total-rows="meta['paginacao.total_itens']"
        @change="changePage($event)"
      />
    </template>
    <template #actions>
      <transition
        name="be-slideleft"
        appear
        mode="out-in"
      >
        <div
          v-if="showFilter"
          class="be-filter"
        >
          <BeFilter
            @fechar="showFilter = !showFilter"
            @submitFilter="pageFilter($event)"
          />
        </div>
      </transition>
      <be-load-modal v-if="showModal" />
    </template>
  </base-main>
</template>

<script>
// Components
import formatTimestampDate from '../../date/formatTimes'
import BaseMain from '@/layouts/Main/Main'
import BeLoadModal from '@/components/BeLoadModal/BeLoadModal.vue'
import BeFilter from '../../components/BeFilter/BeFilter'

// Store
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    BaseMain,
    BeLoadModal,
    BeFilter
  },
  data () {
    return {
      showModal: false,
      breakcrumb: [],
      meta: {},
      showFilter: false,
      filtro: {
        items_pagina: 20,
        pagina: 1,
        data_inicio: null,
        data_termino: null,
        rate: [],
        fase: [],
        atendente_id: null,
        cliente_id: null
      },
      header: ['CÓDIGO', 'DATA', 'CLIENTE', 'ATENDENTE', 'AVALIAÇÃO', 'STATUS'],
      links: [
        {
          icon: 'delete-outline',
          desc: 'Deletar',
          to: 'delete'
        }
      ]
    }
  },
  mounted () {
    this.showModal = true
    this.setTableHeader(this.header)
    this.getListFilter().then(() => {
      this.meta = this.getSatisfacaoMetaItens
      this.showModal = false
    })
  },
  computed: {
    ...mapGetters(['getSatisfacaoHeadList', 'getSatisfacaoDataItems', 'getSatisfacaoMetaItens']),
    getLastPage () {
      return this.meta['paginacao.ultima_pagina']
    }
  },
  created () {
    const route = this.$router.currentRoute.path.slice(0).split('/')
    route.shift()
    this.breakcrumb = [...route]
  },
  beforeDestroy () {
    this.clearDataItens({ data: [] })
  },
  methods: {
    ...mapMutations({
      setTableHeader: 'setHeadsList',
      clearDataItens: 'setdataItems',
      setSatisfacion: 'setSatisfacion'
    }),
    ...mapActions({
      getListFilter: 'listarSatisfacoesFiltradas'
    }),
    changePage (pageNum) {
      this.filtro.pagina = pageNum
      this.showModal = true
      this.getListFilter(this.filtro).then(() => {
        this.meta = this.getSatisfacaoMetaItens
        this.showModal = false
      })
    },
    routerDetails (params) {
      this.setSatisfacion(params)
      this.$router.push({ name: 'detalhe' })
    },
    pageFilter (params) {
      this.showModal = true

      this.filtro.data_inicio = formatTimestampDate(params.dataInicio)
      this.filtro.data_termino = formatTimestampDate(params.dataTermino)
      this.filtro.rate = params.rate
      this.filtro.fase = params.status
      this.filtro.atendente_id = params.atendente_id.id
      this.filtro.cliente_id = params.cliente_id.id

      this.getListFilter(this.filtro).then(() => {
        this.meta = this.getSatisfacaoMetaItens
        this.showFilter = false
        this.showModal = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.be-actions .acitve {
  border-color: lighten($be-color-primary, 25%);
  background: lighten($be-color-primary, 15%);
  box-shadow: 0 6px 9px transparentize(lighten($be-color-primary, 25%), 0.5);
}
.be-filter {
  z-index: 1095;
  width: 300px;
  height: 100%;
  top: 58px;
  right: 0;
  transition: all $timeAnimated ease-in-out;
  background: #fff;
  @include d-flex(column, nowrap);
  align-items: center;
  position: fixed;
  box-shadow: 0 6px 15px rgba(130, 130, 130, 0.4);
}
</style>
