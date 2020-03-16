<template>
  <b-modal
    id="modal-no-backdrop"
    visible
    centered
    content-class="shadow"
    hide-header
    hide-footer
  >
    <div
      v-if="formEmail"
      class="d-flex justify-content-center "
    >
      <h2 class="be-mb-5">
        Recuperar Senha
      </h2>
      <label class="be-mr-5">Por favor insira o endereço de email cadastrado abaixo:</label>
      <be-input
        v-model="user.email"
        type="text"
        placeholder="Email"
        :autofocus="true"
      />
      <be-btn
        descricao="Enviar"
        color="primary be-w-50"
        class="be-mt-2"
        @click.prevent="nova_senha"
      />
    </div>

    <div
      v-if="load"
      class="d-flex justify-content-center align-items-center"
    >
      <b-spinner
        class="mr-2 be-color-purple"
        type="grow"
        label="Spinning"
      />
      <strong class="be-color-purple"> {{ loadmessage }} </strong>
    </div>

    <div
      v-if="response"
      class="be-modal-col"
    >
      <h2>Recuperar Senha</h2>
      <div class="be-modal be-m-3">
        <be-icon
          icon="check-circle"
          size="48"
          class="be-text-success "
        />

        <p class="be-modal be-ml-3">
          {{ message }}
        </p>
      </div>
    </div>
  </b-modal>
</template>

<script>
import api from '@/endpoints/atendente'
import { UNPROCESSABLE_ENTITY } from '@/constantes/http.js'

export default {
  name: 'BeResetPasswordModal',

  data () {
    return {
      user: {
        email: ''
      },
      formEmail: true,
      response: false,
      message: 'Enviamos ao email cadastrado um link para recuperar sua senha!',

      load: false,
      loadmessage: 'Carregando...'
    }
  },
  methods: {

    nova_senha () {
      this.load = true
      this.formEmail = false

      api.novaSenha(this.user).then(resolve => {
        this.load = false
        this.response = true
      }).catch(reject => {
        if (reject.response.status === UNPROCESSABLE_ENTITY) {
          alert('O email deve ser preenchido corretamente.')
          this.load = false
          this.formEmail = true
        } else {
          this.load = false
          this.response = true
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.be-modal {
  @include d-flex(row, nowrap);
  justify-content: flex-start;
  align-items: center;
}
.be-modal-col {
  @include d-flex(column, nowrap);
  justify-content: flex-start;
  align-items: center;

}
</style>
