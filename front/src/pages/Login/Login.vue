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
            <login-reset-password
                :visible="resetDialog"
                @closed="resetDialog = false"
            />
            <v-row v-show="false" justify="center">
                <v-col cols="1" md="auto">
                    <v-btn outlined small color="secondary" @click="resetDialog = true">Esqueceu a senha?</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>
<script>
import { mapActions } from 'vuex'
import LoginSignUpDialog from './LoginSignUpDialog'
import LoginSignInForm from './LoginSignInForm'
import LoginResetPassword from './LoginResetPassword'

export default {
    name: 'Login',
    components: {LoginSignInForm, LoginSignUpDialog, LoginResetPassword},
    data() {
        return {
            user: {
                username: null,
                password: null
            },
            maxCharacters: 20,
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
            signDialog: false,
            resetDialog: false
        }
    },
    methods: {
        ...mapActions({
            login: 'login',
            sign: 'sign',
            showLoading: 'showLoading',
            hideLoading: 'hideLoading'
        }),
        loginUser(user) {
            this.showLoading()
            this.login(user)
                .then(() => {
                    this.$router.push('home')
                })
                .catch(() => {
                    this.hideLoading()
                })
        },
        saveUser(user) {
            this.showLoading()
            this.signDialog = false
            this.sign(user).then(() => {
                this.$router.push('home')
            })
        }
    }
}
</script>
