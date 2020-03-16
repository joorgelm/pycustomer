<template>
  <base-main>
    <template #actions>
      <be-modal
        :show="modal.active"
        :close="true"
        @showModal="showModal"
      >
        <template #header>
          <span class="be-modal-link">
            <be-icon
              icon="check-circle"
              size="48"
              class="be-text-success"
            />
            <div class="be-modal-h">
              <h2 class="be-modal-title be-text-primary">Geramos um link para sua avaliação!</h2>
              <small class="be-modal-subtitle be-text-gray-600">
                Esse link é único e será enviado automaticamente para o e-mail do usuário cadastrado para que ele responda a avaliação.
              </small>
            </div>
          </span>
        </template>
        <template #body>
          <div class="be-col-12 be-m-0">
            <be-input
              type="text"
              append-icon="link"
              prepend-icon="content-copy"
              :value="url"
              :placeholder="url"
              color="green"
              :disabled="true"
              @tabLeft="copyLink($event)"
            />
          </div>
        </template>
        <template #footer>
          <be-btn
            icon="window-close"
            class="be-text-dark"
            descricao="Fechar"
            :icon-l="true"
            @click="showModal(false)"
          />
        </template>
      </be-modal>
    </template>
    <template #header>
      <div class="be-context">
        <h1 class="be-page-title">
          Cadastro
        </h1>
        <be-breakcrumb :map-routes="breakcrumb" />
      </div>
      <div class="be-actions">
        <be-btn
          icon="format-list-bulleted"
          :icon-l="true"
          color="primary"
          descricao="Listar avaliações pendentes"
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
import BeCadastro from '@/components/Cadastro/CadastroForm'
import satisfacaoAPI from '@/endpoints/satisfacao.js'

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
      breakcrumb: [],
      satisfacao: {}
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
