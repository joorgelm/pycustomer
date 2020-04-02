<template>
    <v-content class="background-login-color">
        <v-container class="fill-height" fluid>
            <login-sign-in-form
                :form-rules="{username: nameRules, password: passwordRules}"
                @login="loginUser"
                @signup="signDialog = true"
            />

            <login-sign-up-dialog
                :visible="signDialog"
                :form-rules="{username: nameRules, password: passwordRules}"
                @closed="signDialog = false"
                @save="saveUser"
            />
            <v-row justify="center">
                <v-col cols="1" md="auto">
                    <v-btn outlined small color="secondary" >Esqueceu a senha?</v-btn>
                </v-col>
            </v-row>
            <v-snackbar v-model="snackbar">
                Usuário e/ou senha inválidos
                <v-btn color="pink" text @click="snackbar = false">Fechar</v-btn>
            </v-snackbar>
        </v-container>
    </v-content>
</template>
<script>
import { mapActions } from 'vuex'
import LoginSignUpDialog from './LoginSignUpDialog'
import LoginSignInForm from './LoginSignInForm'

export default {
    name: 'Login',
    components: {LoginSignInForm, LoginSignUpDialog},
    comments: {
        LoginSignUpDialog,
        LoginSignInForm
    },
    data() {
        return {
            user: {
                username: null,
                password: null
            },
            maxCharacters: 20,
            valid: true,
            nameRules: [
                v => !!v || 'Usuário é requerido',
                v => (v || '').indexOf(' ') < 0 || 'Espaços não são permitidos',
                v => (v || '').length <= this.maxCharacters || 'Limite de caracteres excedido'
            ],
            passwordRules: [
                v => !!v || 'Senha é requerida',
                v => (v || '').indexOf(' ') < 0 || 'Espaços não são permitidos',
                v => (v || '').length <= this.maxCharacters || 'Limite de caracteres excedido'
            ],
            snackbar: false,
            signDialog: false
        }
    },
    methods: {
        ...mapActions({
            login: 'login',
            sign: 'sign'
        }),
        loginUser(user) {
            this.login(user)
                .then(() => {
                    this.$router.push('home')
                })
                .catch(() => {
                    this.snackbar = true
                })
        },
        saveUser(user) {
            this.signDialog = false
            this.sign(user).then(() => {
                this.$router.push('home')
            })
        }
    }
}
</script>
