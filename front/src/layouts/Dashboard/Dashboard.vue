<template>
  <base-main>
    <template #header>
      <div class="be-context">
        <h1 class="be-page-title">
          Bem-vindo ao Pycustomer
        </h1>
        <be-breakcrumb :map-routes="breakcrumb" />
      </div>
    </template>
    <template #body>
      <be-card
        :bg="false"
        class="be-col-12 be-p-0"
      >
        <template #body>
          <div class="be-col-12 be-p-0">
            <div
              class="be-col-7  be-card-status be-bl-success"
            >
              <div class="be-card-status-main">
                <div class="statistics ">
                  <span class="be-text-dark">
                    <be-icon
                      icon="account-circle"
                      size="36"
                    />
                    {{ getSatisfacaoFinais }}
                  </span>
                  <span class="media">
                    <p>{{ parseFloat(getSatisfacaoMedia).toFixed(2) }}</p>
                    <div class="stars">
                      <span
                        v-for="(star,i) in estrelasPreenchida"
                        :key="i"
                      >
                        <be-icon
                          icon="star"
                          size="20"
                          class="be-text-warning"
                        />
                      </span>
                      <span
                        v-for="(starOutline, i) in estrelasVazias"
                        :key="i - parseInt(getSatisfacaoMedia)"
                      >
                        <be-icon
                          icon="star-outline"
                          size="20"
                          class="be-text-warning"
                        />
                      </span>
                    </div>
                  </span>
                </div>
                <div class="context">
                  AVALIAÇÕES FINALIZADAS
                </div>
              </div>
            </div>
            <div class="be-col-4 be-col-sm-12 be-card-status be-bl-gray">
              <div class="be-card-status-main">
                <div class="statistics">
                  <span class="be-text-dark">{{ getSatisfacaoAguardo }}</span>
                </div>
                <div class="context">
                  AVALIAÇÕES EM AGUARDO
                </div>
              </div>
            </div>
            <div class="be-col-4 be-col-sm-12 be-card-status be-bl-blue">
              <div class="be-card-status-main">
                <div class="statistics">
                  <span class="be-text-dark">{{ getSatisfacaoExpirada }}</span>
                </div>
                <div class="context">
                  AVALIAÇÕES EXPIRADAS
                </div>
              </div>
            </div>
            <div class="be-col-7 be-col-sm-12 be-card-status be-bl-warning">
              <div class="be-card-status-main">
                <div class="statistics">
                  <span class="be-text-dark">{{ getSatisfacaoTotal }}</span>
                </div>
                <div class="context">
                  TOTAL DE AVALIAÇÕES
                </div>
              </div>
            </div>
          </div>
        </template>
      </be-card>
    </template>
  </base-main>
</template>

<script>
// Layout
import BaseMain from '@/layouts/Main/Main'

// Store
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BaseMain
  },
  data () {
    return {
      breakcrumb: []
    }
  },
  computed: {
    ...mapGetters([
      'getSatisfacaoFinais',
      'getSatisfacaoAguardo',
      'getSatisfacaoTotal',
      'getSatisfacaoExpirada',
      'getSatisfacaoMedia'
    ]),
    estrelasPreenchida () {
      return parseInt(this.getSatisfacaoMedia)
    },
    estrelasVazias () {
      return 5 - parseInt(this.getSatisfacaoMedia)
    }
  },
  mounted () {
    this.addSatisfacao()
  },
  created () {
    const route = this.$router.currentRoute.path.slice(0).split('/')
    route.shift()
    this.breakcrumb = [...route]
  },
  methods: {
    ...mapActions(['addSatisfacao'])
  }
}
</script>

<style scoped lang="scss">
.statistics{
  max-width: 100%;
   @include d-flex(row);
}
.media{
  max-width: 210px;
  max-height: 60px;
  margin-left: 180px;
  @include d-flex(col);
  p{
    width: 100%;
    font-size: $be-font-size-xl;
    text-align: right;
  }

}
</style>
