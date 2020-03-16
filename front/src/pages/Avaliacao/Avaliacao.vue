<template>
  <div class="be-avaliacao">
    <nav class="be-nav be-navegation be-fixed">
      <div class="be-nav-content-brand">
        <img
          src="../../assets/imgs/brands/Brand.png"
          class="be-nav-brand"
          alt="Logo Brand"
        >
      </div>
    </nav>
    <div class="be-avaliacao-main">
      <div class="be-avaliacao-satisfacao">
        <rate
          :length="5"
          :value="satisfacao.rate"
          :ratedesc="ratedesc"
          @input="setRate"
        />
      </div>
      <div class="be-avaliacao-melhora">
        <h3>O que podemos melhorar?</h3>
        <div class="be-avaliacao-tipos">
          <be-checkbox-avaliacao
            v-for="melhoria in melhorias"
            :id="melhoria.id"
            :key="melhoria.id"
            :label="melhoria.nome"
            @checked="appendTags(melhoria.id)"
          />
        </div>
      </div>
      <div class="be-avaliacao-comentario">
        <h3>Compartilhe mais detalhes da sua experiência com a gente:</h3>
        <textarea
          id
          v-model="satisfacao.mensagem"
          placeholder="Estamos aqui para ouvi-los!"
          name="comentario"
          cols="30"
          rows="7"
          maxlength="320"
        />
      </div>
      <div class="be-avaliacao__action text-right be-mt-3">
        <be-btn
          icon="send"
          descricao="Enviar"
          color="primary"
          @click="send()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import rate from '@/components/BeRate/Rate'
import { mapMutations, mapActions } from 'vuex'
import api from '@/endpoints/satisfacao'

export default {
  components: {
    rate
  },
  data () {
    return {
      satisfacao: {
        hash: '',
        rate: 0,
        mensagem: '',
        tags: []
      },
      ratedesc: [
        'Achei péssimo!',
        'Achei ruim!',
        'Achei regular!',
        'Achei bom!',
        'Achei excelente!'
      ],
      melhorias: []
    }
  },
  created () {
    this.validateHash()
    this.tags()
  },
  methods: {
    ...mapMutations(['setHash']),
    ...mapActions(['checkHash']),

    storeHash () {
      let hash = this.$route.path.split('/')
      hash = hash[hash.length - 1]

      this.satisfacao.hash = hash

      this.setHash(hash)
    },
    validateHash () {
      this.storeHash()

      this.checkHash()
        .catch(reject => {
          if (reject.response.status === 423) {
            return this.$router.push('/final')
          }
          this.$router.push('/erro')
        })
    },
    setRate (value) {
      this.satisfacao.rate = value
    },
    send () {
      api.salva(this.satisfacao).then(resolve => {
        this.$router.push('/final')
      }).catch(reject => {
        alert('Falha ao salvar avaliação')
      })
    },
    tags () {
      api.todasMelhorias().then(resolve => {
        this.melhorias = resolve.data
      })
    },
    appendTags (id) {
      let flag = this.satisfacao.tags.includes(id)

      if (!flag) {
        this.satisfacao.tags.push(id)
      } else {
        let index = this.satisfacao.tags.indexOf(id)
        this.satisfacao.tags.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.be-navegation {
  width: $be-width-full;
  height: $be-height-navegation;
  background: $be-color-primary;
  @include d-flex(row, nowrap);
  justify-content: space-between;
  align-items: center;
  padding-left: $be-p-xl;
  padding-right: $be-p-xl;

  .be-nav-content-brand {
    @include d-flex;
    justify-content: center;
    align-items: center;
    max-width: 130px;
    height: auto;
    .be-nav-brand {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
}

.be-fixed {
  position: fixed;
  top: $be-m-none;
  left: $be-m-none;
  z-index: $be-level-5;
}

.be-avaliacao {
  margin: 0 auto;
  margin-top: ($be-height-navegation + $be-m-l);
  &-main {
    transform-origin: center 0;
    perspective-origin: top;
    transform: perspective(500px) translate3d(0, 100px, -100px);
    animation: initAvaliacao $timeTransition 400ms both ease-in-out;
    border-radius: $be-radius-l;
    background: $be-color-white;
    height: auto;
    padding: $be-p-xl;
    width: $be-width-default;
    margin: $be-m-none auto;
    @include viewport(sm) {
      width: $be-width-full;
      height: calc(100% - #{$be-height-navegation});
      padding: $be-p-xs $be-p-m;
    }
  }
  @include viewport(sm) {
    margin-top: $be-height-navegation;
  }
}
.be-avaliacao-main {
  .be-avaliacao-satisfacao {
    @include d-flex(column);
    justify-content: space-around;
    align-items: center;
    margin-bottom: $be-m-l;
    h2 {
      font-family: $be-font-title;
      font-size: $be-font-size-l;
    }
  }
}
.be-avaliacao-melhora {
  @include d-flex(column, nowrap);
  h3 {
    font-family: $be-font-text;
    color: $be-color-gray-700;
    font-size: $be-font-size-s;
  }
}
.be-avaliacao-tipos {
  @include d-flex(row, wrap);
  margin-top: $be-m-l;
}

.be-avaliacao-comentario {
  @include d-flex(column, nowrap);
  h3 {
    font-family: $be-font-text;
    color: $be-color-gray-700;
    font-size: $be-font-size-s;
  }
  textarea {
    width: $be-width-full;
    font-family: $be-font-text;
    font-size: $be-font-size-xs;
    border: $be-bd-xs solid $be-color-gray-100;
    border-radius: $be-radius-l;
    margin-top: $be-m-m;
   padding:$be-p-m;
    resize: none;
    @include transition;
    &:focus {
      outline: none;
      border-color: $be-color-purple-700;
    }
  }
}
</style>
