<template>
  <div class="be-content-login">
    <div class="be-card-login be-white">
      <div class="be-card-header">
        <div class="be-logo-service">
          <h1>PyCustomer</h1>
          <!-- <img
            src="@/assets/imgs/brands/logo.png"
            class="be-logo-service"
            alt="Logo Service"
          > -->
        </div>
      </div>
      <div class="be-card-body">
        <form class="be-form-group">
          <div class="be-input-group">
            <label class="be-label-text">Login</label>
            <be-input
              v-model="user.username"
              type="text"
              placeholder="Username"
              :autofocus="true"
            />
          </div>
          <div class="be-input-group">
            <label class="be-label-text">Senha</label>
            <be-input
              v-model="user.password"
              type="password"
              placeholder="********"
              :prepend-icon="iconInputPassword"
              @tabLeft="showPass"
            />
          </div>
          <be-btn
            descricao="Logar"
            color="primary be-w-100"
            @click.prevent="authLogin"
          />
          <div class="sub-links">
            <be-btn
              descricao="Recuperar senha"
              color="outline"
              class="be-w-100"
              @click.prevent="showModal = !showModal"
            />
          </div>
        </form>
        <BeResetPasswordModal v-if="showModal" />
      </div>
    </div>
  </div>
</template>

<script>
import BeResetPasswordModal from '@/components/BeResetPasswordModal/BeResetPasswordModal.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    BeResetPasswordModal
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      iconInputPassword: 'eye-outline',
      showModal: false
    }
  },
  methods: {
    ...mapActions({
      login: 'logIn'
    }),
    showPass (el) {
      el.Beinput.type = el.Beinput.type === 'text' ? 'password' : 'text'

      this.iconInputPassword = el.Beinput.type === 'text'
        ? 'eye-off-outline'
        : 'eye-outline'
    },
    authLogin (el) {
      this.login(this.user).then(res => {
        this.$router.push('home')
      }).catch(rej => {
        alert('email e/ou senha inválidos')
      })
    }
  }
}
</script>

<style scoped lang="scss">
//Content Login
.be-content-login {
  width: $be-width-full;
  background: $be-color-white;
  border-radius: $be-radius-m;
  padding: $be-p-l $be-p-xl;
  box-sizing: border-box;
  overflow: hidden;
  border: $be-bd-xxs solid $be-color-gray-100;
  @include shadow(card);

  //Logo service
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
.sub-links {
  margin-top: $be-m-xl;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  & > :nth-child(even) {
    margin-left: $be-m-xs;
  }
}
</style>
•••••••••••••••••••••••••
