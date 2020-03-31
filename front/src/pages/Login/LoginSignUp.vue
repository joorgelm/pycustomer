<template>
    <v-row justify="center">
        <v-dialog :value="true" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Cadastro</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="1" sm="12" md="6">
                                <v-text-field label="Usuário*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field label="Senha*" type="password" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*Informações obrigatórias</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'LoginSignUp',
    computed: {
        validate: function () {

            const re = new RegExp('\\w')

            if (re.test(this.user.username) && re.test(this.user.password))
                return true

            return false
        }
    },
    data() {
        return {
            user: {
                username: null,
                password: null
            },
        }
    },
    methods: {
        close () {
            this.$emit('closed')
        }
    }
}
</script>

<style scoped>

</style>