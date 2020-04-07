<template>
    <v-row justify="center">
        <v-dialog :value="visible" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Recuperar senha</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="resetform" v-model="valid" @keyup.enter.native="validate" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        label="Digite seu usuário*"
                                        :rules="[v => !!v || 'Usuário é obrigatório']"
                                        required
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                <small>*Informações obrigatórias</small>
                </v-card-text>
                <v-card-actions class="mx-3">
                    <v-btn color="blue darken-1" text @click="$emit('closed')">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="validate">Enviar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'LoginResetPassword',
    props:{
        visible: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        visible() {
            return this.$props.visible
        }
    },
    methods: {
        validate() {
            if (this.$refs.resetform.validate()) {
                this.$emit('closed')
            }
        }
    }
}
</script>

<style scoped>

</style>