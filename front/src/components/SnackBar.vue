<template>
    <v-snackbar
      v-model="snack.show"
      :color="snack.color"
      @input="closed"
      :timeout="4000"
      right
      top
      multi-line
    >
      {{ snack.text }}
      <v-btn
        dark
        text
        @click="snack.show = false"
      >
        Fechar
      </v-btn>
    </v-snackbar>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'SnackBar',
    watch: {
        getNotification() {
            this.snack = this.getNotification
        }
    },
    computed: {
        ...mapGetters(['getNotification'])
    },
    data () {
        return {
            snack: {
                show: false,
                text: '',
                color: 'success'
            }
        }
    },
    methods: {
        ...mapActions({
            clear: 'clearNotification',
        }),
        closed (event) {
            if (!event) {
                this.snack.show = false
                this.clear()
            }
        }
    }
}
</script>

<style scoped>

</style>