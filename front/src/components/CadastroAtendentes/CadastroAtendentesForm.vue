<template>
  <be-card bg>
    <template #header>
      <div class="be-page-body-header">
        <div class="be-page-context">
          <h2 class="be-title">
            Cadastro de Atendente
          </h2>
        </div>
      </div>
    </template>
    <template #body>
      <div class="form-wrap container">
        <div class="form-row be-w-50">
          <form @submit.prevent="submit">
            <div class="form-group">
              <label>Email:</label>
              <input
                v-model.trim="$v.email.$model"
                type="email"
              >
              <div
                v-if="!$v.email.$model"
                class="error"
              >
                Email é obrigatório
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="nome">Nome:</label>
                <input
                  v-model.trim="$v.nome.$model"
                  type="text"
                >
                <div
                  v-if="!$v.nome.$model"
                  class="error"
                >
                  Nome é obrigatório
                </div>
              </div>
            </div>
            <label for="password">Senha:</label>
            <input
              v-model="$v.password.$model"
              type="password"
              class="form-control"
              placeholder="*******"
              :prepend-icon="iconInputPassword"
            >
            <div
              v-if="!$v.password.$model"
              class="error"
            >
              Senha é obrigatória
            </div>
            <div class="form-group col-md-6">
              <label for="cpf">CPF:</label>
              <input
                v-model.trim="$v.cpf.$model"
                v-mask="'###.###.###-##'"
                class="form-group"
              >
              <div
                v-if="!$v.cpf.$model"
                class="error"
              >
                CPF é obrigatório
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="telefone">Telefone:</label>
              <input
                v-model.trim="$v.telefone.$model"
                v-mask="'(##) ####-####'"
                class="form-group"
              >
              <div
                v-if="!$v.telefone.$model"
                class="error"
              >
                Telefone é obrigatório
              </div>
            </div>
          </form>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="be-actions be-col-12 be-col-sm-12 be-my-0 text-right">
        <be-btn
          class="be-m-1"
          icon="eraser"
          :icon-l="true"
          descricao="Limpar"
          @click="limparDados()"
        />
        <be-btn
          class="btn btn-lg btn-success"
          icon="content-save"
          :icon-l="true"
          color="primary"
          descricao="Salvar"
          type="submit"
          @click="submit()"
        />
      </div>
      <be-success-modal v-if="showModal" />
    </template>
  </be-card>
</template>

<script>
import { mapGetters } from 'vuex'
import BeSuccessModal from '../BeSuccessModal/BeSuccessModal'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  components: {
    BeSuccessModal
  },
  mixins: [validationMixin],
  data () {
    return {
      showModal: false,
      nome: '',
      email: '',
      cpf: '',
      password: '',
      telefone: '',
      submitted: false,
      atendentes: [],
      iconInputPassword: 'eye-outline'
    }
  },
  validations: {
    nome: {
      required
    },
    password: {
      required
    },
    email: {
      required,
      email
    },
    cpf: {
      required
    },
    telefone: {
      required
    }
  },
  computed: {
    ...mapGetters(['getAtendentesList'])
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log('pendente')
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          console.log('ok')
          this.submitStatus = 'OK'
          this.showModal = true
          this.limparDados()
        }, 500)
      }
    },
    showPass (el) {
      el.Beinput.type = el.Beinput.type === 'text' ? 'password' : 'text'

      this.iconInputPassword =
        el.Beinput.type === 'text' ? 'eye-off-outline' : 'eye-outline'
    },
    limparDados () {
      this.nome = ''
      this.email = ''
      this.cpf = ''
      this.telefone = ''
      this.password = ''
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
