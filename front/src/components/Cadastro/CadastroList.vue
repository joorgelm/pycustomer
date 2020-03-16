<template>
  <base-main>
    <template #header>
      <div class="be-context">
        <h1 class="be-page-title">
          Listagem Avaliações Pendentes
        </h1>
        <be-breakcrumb :map-routes="breakcrumb" />
      </div>
      <div class="be-actions">
        <be-btn
          icon="reload"
          :icon-r="true"
          color="none"
          descricao="Atualizar Lista"
          @click="changePage(numPag)"
        />
        <be-btn
          icon="plus"
          :icon-l="true"
          color="primary"
          descricao="Nova Avaliação"
          @click="routeNovoCadastro"
        />
      </div>
    </template>
    <template #body>
      <be-table
        :heads="getSatisfacaoHeadList"
        :data-list="getSatisfacaoDataItems"
        :listagem-cadastro="true"
        :actions="true"
        :options="links"
      />
    </template>
    <template #footer>
      <b-pagination
        class="mr-2"
        align="right"
        :per-page="meta['paginacao.por_pagina']"
        :total-rows="meta['paginacao.total_itens']"
        @click="changePage($event)"
      />
    </template>
    <template #actions>
      <be-load-modal v-if="showModal" />
    </template>
  </base-main>
</template>

<script>
// Components
import BaseMain from '@/layouts/Main/Main'
import BeLoadModal from '@/components/BeLoadModal/BeLoadModal.vue'

// Store
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    BaseMain,
    BeLoadModal
  },
  data () {
    return {
      numPag: 1,
      showModal: false,
      meta: {},
      breakcrumb: [],
      header: ['CÓDIGO', 'DATA', 'CLIENTE', 'ATENDENTE', 'LINK', 'STATUS'],
      links: [
        {
          icon: 'delete-outline',
          desc: 'Deletar',
          to: 'delete'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getSatisfacaoHeadList', 'getSatisfacaoDataItems', 'getSatisfacaoMetaItens'])
  },
  created () {
    this.showModal = true
    const route = this.$router.currentRoute.path.slice(0).split('/')
    route.shift()
    this.breakcrumb = [...route]
  },
  mounted () {
    this.setTableHeader(this.header)
    this.getListagem({
      ativo: 1,
      fase: [0],
      pagina: 1
    }).then(() => {
      this.meta = this.getSatisfacaoMetaItens
      this.showModal = false
    })
  },
  beforeDestroy () {
    this.clearDataItens({ data: [] })
  },
  methods: {
    ...mapMutations({
      clearDataItens: 'setdataItems',
      setTableHeader: 'setHeadsList'
    }),
    ...mapActions({
      getListagem: 'listarSatisfacoesPendentes'
    }),
    changePage (pageNum) {
      this.numPag = pageNum
      this.showModal = true
      this.getListagem({
        ativo: 1,
        fase: [0],
        pagina: pageNum
      }).then(() => {
        this.showModal = false
      })
    },
    routeNovoCadastro (event) {
      this.$router.push('/cadastro')
    }
  }
}
</script>

<style>
</style>
