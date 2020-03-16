<template>
  <div class="be-content-login">
    <div class="be-card-login be-white">
      <div class="be-card-header">
        <div class="be-logo-service">
          <img
            src="@/assets/imgs/brands/logo.png"
            class="be-logo-service"
            alt="Logo Service"
          >
          <h2 class="be-mb-2">
            Restabelecer Senha
          </h2>
        </div>
      </div>
      <div class="be-card-body">
        <form class="be-form-group">
          <div class="be-input-group">
            <label class="be-label-text">Por favor insira o email cadastrado:</label>
            <be-input
              v-model="user.email"
              type="text"
              placeholder="Email"
              :autofocus="true"
            />
          </div>
          <div class="form">
            <div class="be-input-group">
              <label class="be-label-text">Nova senha:</label>
              <be-input
                v-model="user.password"
                type="password"
                placeholder="********"
                :prepend-icon="iconInputPassword"
                @tabLeft="showPass"
              />
            </div>
            <div class="be-input-group">
              <label class="be-label-text">Confirme a nova senha:</label>
              <be-input
                v-model="user.confirm_password"
                type="password"
                placeholder="********"
                :prepend-icon="iconInputPassword"
                @tabLeft="showPass"
              />
            </div>
          </div>
          <be-btn
            descricao="Enviar"
            color="primary be-w-100"
            @click.prevent="validate"
          />
        </form>
        <BeResetPasswordModal v-if="showModal" />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/endpoints/atendente'
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from '@/constantes/http.js'

export default {
  name: 'ResetPasswordForm',
  props: {
    token: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
        confirm_password: ''
      },
      iconInputPassword: 'eye-outline',
      showModal: false
    }
  },
  methods: {

    showPass (el) {
      el.Beinput.type = el.Beinput.type === 'text' ? 'password' : 'text'

      this.iconInputPassword = el.Beinput.type === 'text'
        ? 'eye-off-outline'
        : 'eye-outline'
    },
    authLogin () {
      let aux = {
        'email': this.user.email,
        'password': this.user.confirm_password,
        'token': this.token
      }
      api.reset(aux).then(resolve => {
        alert('Senha alterada com sucesso!!')
        return this.$router.push('/')
      }).catch(reject => {
        if (reject.response.status === NOT_FOUND) {
          alert('Falha ao alterar a senha!')
          return this.$router.push('/')
        }
        if (reject.response.status === UNPROCESSABLE_ENTITY) {
          alert('Preencha corretamente os campos!')
        }
      })
    },
    validate () {
      if (this.user.password !== this.user.confirm_password) {
        alert('As senhas estão diferentes.')
      } else {
        this.authLogin()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.be-content-login {
  width: $be-width-full;
  background: $be-color-white;
  border-radius: $be-radius-m;
  padding: $be-p-l $be-p-xl;
  box-sizing: border-box;
  overflow: hidden;
  border: $be-bd-xxs solid $be-color-gray-100;
  @include shadow(card);
  .be-logo-service {
    width: $be-width-full;
    height: auto;
    text-align: center;
    margin-bottom: $be-m-l;
    .be-logo-service {
      max-width: 168px;
      height: auto;
      object-fit: cover;
    }
  }
}
.form {
  margin-top: $be-m-xl;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  & > :nth-child(even) {
    margin-left: $be-m-xs;
  }
}
</style>
