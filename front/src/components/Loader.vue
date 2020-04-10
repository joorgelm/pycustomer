<template>
    <div class="text-center">
        <v-overlay :value="getLoadingStatus.visible">
            <v-container>
                <v-layout row justify-center>
                    <v-progress-circular indeterminate size="72"></v-progress-circular>
                </v-layout>
                <v-layout row justify-center>
                    {{ getLoadingStatus.text }}
                </v-layout>
            </v-container>
        </v-overlay>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Loader',
    watch: {
        getLoadingStatus() {
            return this.getLoadingStatus
        }
    },
    computed: {
        ...mapGetters(['getLoadingStatus'])
    }
}
</script>