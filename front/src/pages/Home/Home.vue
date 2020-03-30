<template>
  <v-app>
    <py-nav-drawer
      :items="navigationDrawerItems"
      :visible="drawer"
      :bottomitem="logoutBtn"
      @bottom-click="sair"
    />
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <!-- todo -->
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import PyNavDrawer from "@/components/PyNavDrawer";

export default {
  name: "Home",
  components: {
    PyNavDrawer
  },
  data: () => ({
    drawer: null,
    navigationDrawerItems: [
      { icon: "mdi-home", text: "Inicio" },
      { icon: "mdi-log-out", text: "Respostas" }
    ],
    logoutBtn: {
      icon: "mdi-home",
      text: "sair"
    }
  }),
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    sair() {
      this.logout()
      this.$router.push("login");
    }
  }
};
</script>

<style scoped>
</style>