<template>
  <v-app>
    <router-view/>
    <snack-bar/>
  </v-app>
</template>

<script>

import SnackBar from './components/SnackBar'

export default {
    name: 'App',

    components: {
        SnackBar
    },

    data: () => ({
    //
    }),
}
</script>
