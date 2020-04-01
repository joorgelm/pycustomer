<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>PyCustomer - Login</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid" @keyup.enter.native="validate" lazy-validation>
                        <v-text-field
                                label="Usuário"
                                name="login"
                                type="text"
                                v-model="user.username"
                                :rules="$props.formRules.username"
                                required
                        />
                        <v-text-field
                                id="password"
                                label="Senha"
                                name="password"
                                type="password"
                                v-model="user.password"
                                :rules="$props.formRules.password"
                                required
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn outlined color="primary" @click="openSignUpDialog">Cadastre-se</v-btn>
                    <v-btn color="primary" :disabled="!valid" @click="validate">Entrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'LoginSignInForm',
    props:{
        formRules:{
            type: Object,
            required: true
        },
    },
    data() {
        return {
            user: {
                username: null,
                password: null
            },
            valid: true
        }
    },
    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                this.$emit('login', this.user)
            }
        },
        openSignUpDialog() {
            this.$emit('signup')
        }
    }
}
</script>
