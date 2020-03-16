<template>
  <base-main>
    <template #header>
      <div class="be-context">
        <h1
          class="be-page-title"
          @click.prevent="id"
        >
          Detalhes
        </h1>
        <be-breakcrumb :map-routes="breakcrumb" />
      </div>
    </template>
    <template #body>
      <div class="be-indentity">
        <div class="be-card-atendente">
          <div class="be-card-atendente-header">
            <h4>Atendente</h4>
          </div>
          <div class="be-card-atendente-body">
            <span class="be-card-atendente-body-title">
              <h4>Dados do Atendente</h4>
            </span>
            <div class="be-card-atendente-body-controls">
              <div class="be-card-atendente-body-controls-informations">
                <label class="data-label">CPF</label>
                <p class="data-descrition">
                  {{ data.atendente.cpf }}
                </p>
              </div>
              <div class="be-card-atendente-body-controls-informations">
                <label class="data-label">Nome Completo</label>
                <p class="data-descrition">
                  {{ data.atendente.nome }}
                </p>
              </div>
              <div class="be-card-atendente-body-controls-informations">
                <label class="data-label">Sexo</label>
                <p class="data-descrition">
                  {{ data.atendente.sexo }}
                </p>
              </div>
              <div class="be-card-atendente-body-controls-informations">
                <label class="data-label">Telefone de contato</label>
                <p class="data-descrition">
                  {{ data.atendente.telefone }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="be-card-atendente">
          <div class="be-card-atendente-header">
            <h4>Cliente</h4>
          </div>
          <div class="be-card-atendente-body">
            <span class="be-card-atendente-body-title">
              <h4>Dados do cliente</h4>
            </span>
            <div class="be-card-atendente-body-controls">
              <div class="be-card-atendente-body-controls-informations">
                <label class="data-label">CPF</label>
                <p class="data-descrition">
                  {{ data.cliente.cpf }}
                </p>
              </div>
              <div class="be-card-atendente-body-controls-informations">
                <label class="data-label">Nome Completo</label>
                <p class="data-descrition">
                  {{ data.cliente.nome }}
                </p>
              </div>
              <div class="be-card-atendente-body-controls-informations">
                <label class="data-label">Sexo</label>
                <p class="data-descrition">
                  {{ data.cliente.sexo }}
                </p>
              </div>
              <div class="be-card-atendente-body-controls-informations">
                <label class="data-label">Telefone de contato</label>
                <p class="data-descrition">
                  {{ data.cliente.telefone }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="data.fase === 1"
        class="be-detalhe"
      >
        <div class="be-detalhe-wapper">
          <div class="be-detalhe-qualificacao">
            <h4 class="be-text-gray-400 font">
              Qualificação do atendimento
            </h4>
            <div class="stars">
              <span class="star">
                <template v-for="(star,i) in data.rate">
                  <be-icon
                    :key="i++"
                    icon="star"
                    size="36"
                    class="be-text-warning"
                  />
                </template>
              </span>
              <h1>{{ frase[data.rate] }}!</h1>
            </div>
            <div class="data-avaliacao">
              <div class="data-data">
                <label class="data-label">Data da Avaliação</label>
                <p class="data-descrition">
                  {{ data.updated_at | formatDate }}
                </p>
              </div>
            </div>
          </div>
          <div class="be-detalhe-comentario">
            <h4>Comentário</h4>
            <p>{{ data.mensagem }}</p>
          </div>
        </div>
        <div class="be-detalhe-tipos">
          <h4>Tipos de Avaliações</h4>
          <p v-if="!data.melhorias.length">
            Nenhuma melhoria selecionada
          </p>
          <div
            v-else
            class="tags"
          >
            <span
              v-for="melhoria in data.melhorias"
              :key="melhoria.id"
              class="tag"
            >{{ melhoria.nome }}</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="be-detalhe"
      >
        <b-alert
          show
          variant="light"
        >
          <div class="d-flex justify-content-center align-items-center">
            <strong> Avaliação não respondida </strong>
          </div>
        </b-alert>
      </div>
    </template>
    <template #footer>
      <div class="be-fotter-detalhe">
        <be-btn
          :icon-l="true"
          icon="chevron-left"
          descricao="Voltar"
          @click="backListagem"
        />
      </div>
    </template>
  </base-main>
</template>

<script>

import Main from '@/layouts/Main/Main'

import formatDate from '@/date/date'

import { mapGetters } from 'vuex'

export default {
  beforeRouteEnter (to, from, next) {
    if (
      from.fullPath === '/' &&
      to.fullPath === '/home/listagem/detalhe') {
      window.history.back()
    } else {
      next()
    }
  },

  components: {
    'base-main': Main
  },
  filters: {
    formatDate
  },
  data () {
    return {
      data: {},
      frase: ['', 'Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente']
    }
  },
  computed: {
    ...mapGetters(['getSatisfaction'])
  },
  created () {
    const route = this.$router.currentRoute.path.slice(0).split('/')
    route.shift()
    this.breakcrumb = [...route]
    this.data = this.getSatisfaction.item
  },
  methods: {
    backListagem (event) {
      this.$router.push('/listagem')
    }
  }
}
</script>

<style lang="scss" scoped>
.be-indentity {
  @include d-flex(row, nowrap);
  @include viewport(sm) {
    flex-direction: column;
    max-height: 100%;
  }
}
.be-card-atendente {
  position: relative;
  @include d-flex(column);
  align-items: stretch;
  width: $be-width-full;
  height: 100%;
  border-radius: $be-radius-l;
  overflow: hidden;
  margin-right: $be-m-m;
  @include shadow;
  &:last-child {
    margin-right: $be-m-none;
  }
  @include viewport(sm) {
    &:last-child {
      margin-top: $be-m-m;
    }
  }
  &-header {
    @include d-flex(row, nowrap);
    justify-content: flex-start;
    align-items: center;
    background: $be-color-primary;
    height: 48px;
    padding: $be-p-s $be-p-xl;
    h4 {
      text-transform: uppercase;
      font-family: $be-font-text;
      font-size: $be-font-size-xs;
      color: $be-color-light;
    }
  }
  &-body {
    flex: 1 1 220px;
    padding: $be-p-s $be-p-xl;
    background: $be-color-white;
    &:empty {
      height: 200px;
      background: $be-color-white;
    }
    &-title {
      @include d-flex;
      padding-bottom: $be-p-s;
      h4 {
        white-space: nowrap;
        font-size: $be-font-size-s;
      }
    }
    &-controls {
      user-select: none;
      @include d-flex(row, wrap);
      height: 100%;
      flex-flow: row wrap;
      align-items: stretch;
      justify-content: flex-start;
      &-informations {
        min-width: 190px;
        max-width: 200px;
        height: auto;
        margin-bottom: $be-m-l;
        .data-label {
          color: $be-color-gray-400;
        }
        .data-descrition {
          margin: $be-m-xxs 0;
          font-size: $be-font-size-s;
          color: $be-color-dark;
          font-weight: bold;
        }
      }
    }
  }
}

.be-detalhe {
  width: $be-width-full;
  height: auto;
  margin-top: $be-m-l;
  background: $be-color-white;
  border-radius: $be-radius-l;
  overflow: hidden;
  @include d-flex(column);
  @include shadow;
  justify-content: space-between;
  user-select: none;
  &-wapper {
    padding: $be-p-xl;
    @include d-flex(row, wrap);
    justify-content: flex-start;
    align-content: stretch;
    max-height: 200px;
    @include viewport(sm) {
      flex-direction: column;
      max-height: 100%;
    }
    .be-detalhe-qualificacao {
      flex: 1;
      width: $be-width-full;
      h4 {
        font-family: $be-font-text;
        font-size: $be-font-size-xs;
        color: $be-color-gray-400;
        padding-bottom: $be-p-m;
      }
      .stars {
        @include d-flex(row, nowrap);
        justify-content: flex-start;
        align-items: center;
        margin-bottom: $be-m-l;
        h1 {
          margin-left: $be-m-l;
        }
      }
      .data-avaliacao {
        &-data {
          &-label {
            color: $be-color-gray-400;
          }
          &-descrition {
            margin: $be-m-xxs 0;
            color: $be-color-gray-700;
          }
        }
      }
    }
    .be-detalhe-comentario {
      flex: 1;
      width: $be-width-full;
      @include viewport(sm) {
        margin-top: $be-m-m;
      }
      h4 {
        font-family: $be-font-text;
        font-size: $be-font-size-xs;
        color: $be-color-gray-400;
        padding-bottom: $be-p-m;
      }
      p {
        color: $be-color-gray-700;
      }
    }
  }
  &-tipos {
    width: $be-width-full;
    padding: $be-p-xl;
    padding-top: $be-p-none;
    h4 {
      font-family: $be-font-text;
      font-size: $be-font-size-xs;
      color: $be-color-gray-400;
      padding-bottom: $be-p-xxs;
    }
    .tags {
      @include d-flex(row, wrap);
      justify-content: flex-start;
      &:last-child {
        margin-right: 0;
      }
      .tag {
        font-family: $be-font-text;
        padding: $be-p-xs $be-p-m;
        border-radius: $be-radius-m;
        border: solid $be-bd-xs $be-color-gray-100;
        color: $be-color-gray-700;
        margin-right: $be-m-xs;
        margin-top: $be-m-xs;
        @include transition;
      }
    }
  }
}
.be-fotter-detalhe {
  position: fixed;
  overflow: hidden;
  right: 0;
  bottom: 0;
  z-index: $be-level-5;
  width: $be-width-full;
  height: 58px;
  padding: $be-p-xxs $be-p-s;
  background: $be-color-white;
  box-shadow: -15px 0 25px rgba(0, 0, 0, 0.4);
}
</style>
