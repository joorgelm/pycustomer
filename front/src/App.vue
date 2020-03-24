<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      PyCustomer
      <v-spacer>
      </v-spacer>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
