<template>
   <v-content class="bg-full">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    label="Usuário"
                    name="login"
                    type="text"
                    v-model="user.username"
                    :rules="nameRules"
                    required
                  />
                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    type="password"
                    v-model="user.password"
                    :rules="passwordRules"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :disabled="!valid" @click="validate">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>
<script>

import { mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                username: null,
                password: null
            },
          valid: true,
          nameRules: [
            v => !!v || 'Usuário é requerido'
          ],
          passwordRules: [
            v => !!v || 'Senha é requerida'
          ],
        }
    },
    methods: {
        ...mapActions({
          login: 'login'
        }),
        loginUser () {
          this.login(this.user).then(() => {
            this.$router.push('home')
          })
        },
      validate () {
        if (this.$refs.form.validate()) {
          this.loginUser()
        }
      },
    }
}
</script>
<style>
.bg-full {
  width: 100%;
  height: 100vh;
  position: relative;
  background: linear-gradient(to top, #999999, #1976d2);
  background-size: 100% 100%, 100% 100% !important;
}
</style>