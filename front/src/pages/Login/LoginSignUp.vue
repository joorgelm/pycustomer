<template>
    <v-row justify="center">
        <v-dialog :value="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Cadastro</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="sgform" v-model="valid" @keyup.enter.native="validate" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="1" md="6">
                                    <v-text-field
                                        v-model="user.username"
                                        label="Usuário*"
                                        :rules="$props.formRules.username"
                                        required
                                    />
                                </v-col>
                                <v-col cols="1" md="6">
                                    <v-text-field
                                        v-model="user.password"
                                        label="Senha*"
                                        :rules="$props.formRules.password"
                                        type="password"
                                        required
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                    <small>*Informações obrigatórias</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="validate">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'LoginSignUp',
    props:{
        formRules:{
            type: Object,
            required: true
        },
        visible: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        visible() {
            this.dialog = this.$props.visible
        }
    },
    data() {
        return {
            valid: true,
            dialog: false,
            user: {
                username: null,
                password: null
            },
        }
    },
    methods: {
        close () {
            this.dialog = false
            this.$emit('closed')
        },
        validate() {
            if (this.$refs.sgform.validate()) {
                this.dialog = false
                this.$emit('save', this.user)
            }
        }
    }
}
</script>

<style scoped>

</style>