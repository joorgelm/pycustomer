<template>
  <b-modal
    centered
    content-class="shadow"
    hide-footer
    hide-header
    id="modal-no-backdrop"
    visible
  >
    <div>
      <b-form>
        <b-form-group
          class="mb-3"
          id="input-group-1"
          label="Nome de usuário"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            oninvalid="setCustomValidity('Campo obrigatório')"
            v-model="user.username"
            required
            type="username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="mb-3"
          oninvalid="setCustomValidity('Campo obrigatório')"
          id="input-group-2"
          label="Senha (6 ou mais caracteres)"
          label-for="input-2"
        >
          <b-form-input id="input-2" v-model="user.password" required type="password"></b-form-input>
        </b-form-group>

        <b-button class="mr-2" type="submit" variant="dark">Cadastrar</b-button>

        <b-button type="reset" variant="outline-primary">Limpar</b-button>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import api from '@/endpoints/atendente'
import { UNPROCESSABLE_ENTITY } from '@/constantes/http.js'

export default {
  name: 'CadastroAtendentesForm',

  data () {
    return {
      user: {
        username: '',
        password: ''
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
