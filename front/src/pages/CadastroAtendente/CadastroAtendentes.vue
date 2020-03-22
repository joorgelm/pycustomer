<template>
  <base-main>
    <template #header>
      <div class="be-context">
        <h1 class="be-page-title">
          Cadastro
        </h1>
        <be-breakcrumb :map-routes="breakcrumb" />
      </div>
      <div class="be-actions">
        <be-btn
          icon="file"
          :icon-l="true"
          color="primary"
          descricao="Listagem"
          @click="routeCadastro"
        />
      </div>
    </template>
    <template #body>
      <be-cadastro @salveForm="salvarCadastro" />
    </template>
    <template #footer />
  </base-main>
</template>

<script>

import BaseMain from '@/layouts/Main/Main'
import BeCadastro from '@/components/CadastroAtendentes/CadastroAtendentesForm'
import satisfacaoAPI from '@/endpoints/satisfacao.js'
// import BeLoadModal from '@/components/BeLoadModal/BeLoadModal.vue'

export default {
  components: {
    BaseMain,
    BeCadastro
  },
  data () {
    return {
      url: '',
      modal: {
        active: false
      },
      breakcrumb: []
    }
  },
  mounted () {
    const route = this.$router.currentRoute.path.slice(0).split('/')
    route.shift()
    this.breakcrumb = [...route]
  },
  methods: {
    showModal (el) {
      this.modal.active = el
    },
    copyLink (event) {
      let textArea = document.createElement('textarea')
      textArea.value = this.url
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        if (document.execCommand('copy')) {
          alert('Link copiado')
        }
      } catch (err) {
        alert('Tente novamente')
      }

      document.body.removeChild(textArea)
    },
    salvarCadastro (event) {
      satisfacaoAPI.geraHash(event).then(res => {
        this.url = process.env.VUE_APP_RESPONSE_URL + '/pesquisa/' + res.data
        this.showModal(true)
      })
    },
    routeCadastro (event) {
      this.$router.push('cadastro/listagem')
    }
  }
}
</script>

<style lang="scss" scoped>
.be-modal {
  position: absolute;
  width: 600px;
  min-height: 140px;
  padding: $be-p-xl;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  margin: $be-m-none auto;
  background: $be-color-white;
  border-radius: $be-radius-s;
  &:before {
    content: "";
    width: $be-width-full;
    height: 100%;
    background: $be-color-gray-100;
  }
}
.be-modal-link {
  @include d-flex(row, nowrap);
  justify-content: flex-start;
  align-items: center;
}

.be-modal-h {
  @include d-flex(column, nowrap);
  justify-content: flex-start;
  align-items: flex-start;
  padding: $be-p-xxs $be-p-xs;
  text-align: left;
  align-self: flex-start;
  .be-modal-title {
    width: $be-width-full;
    padding-bottom: $be-p-xs;
  }
  .be-modal-subtitle {
    text-align: left;
    white-space: pre-line;
  }
}
</style>
