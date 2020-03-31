<template>
  <v-app>
    <home-nav-drawer
      :items="navigationDrawerItems"
      :visible="drawer"
      :bottomitem="logoutBtn"
      @bottom-click="sair"
    />
    <py-main>
      <template #header>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>
    </py-main>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <!-- todo -->
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PyMain from '@/layouts/Main'
import { mapActions } from 'vuex'
import HomeNavDrawer from './HomeNavDrawer'

export default {
    name: 'Home',
    components: {
        HomeNavDrawer,
        PyMain
    },
    data: () => ({
        drawer: null,
        navigationDrawerItems: [
            { icon: 'mdi-home', text: 'Inicio' },
            { icon: 'mdi-log-out', text: 'Respostas' }
        ],
        logoutBtn: {
            icon: 'mdi-home',
            text: 'sair'
        }
    }),
    methods: {
        ...mapActions({
            logout: 'logout'
        }),
        sair() {
            this.logout()
            this.$router.push('login')
        }
    }
}
</script>

<style scoped>
</style>