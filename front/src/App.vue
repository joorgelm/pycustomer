<template>
  <v-app>
    <router-view/>
    <loader/>
    <snack-bar/>
  </v-app>
</template>

<script>

import SnackBar from './components/SnackBar'
import Loader from './components/Loader'

export default {
    name: 'App',

    components: {
        SnackBar, Loader
    },

    data: () => ({
    //
    }),
}
</script>
