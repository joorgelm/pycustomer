<template>
   <v-content>
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
                <v-form>
                  <v-text-field
                    label="Usuário"
                    name="login"
                    type="text"
                    v-model="user.username"
                  />
                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    type="password"
                    v-model="user.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="loginUser">Entrar</v-btn>
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
                username: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions({
          login: 'login'
        }),
        loginUser () {
          this.login(this.user).then(() => {
            // todo: redirect to another page
            window.alert('TAFAREEEEEEEEEEEEEEEEEEEEEL')
          })
        }
    }
}
</script>