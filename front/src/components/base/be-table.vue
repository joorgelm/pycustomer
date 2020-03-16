<template>
  <div class="table-content">
    <be-modal
      :show="modal.active"
      :close="false"
      @showModal="showModal"
    >
      <template #header>
        <div class="be-modal-header">
          <h2>{{ modal.mensagem }}</h2>
        </div>
      </template>
      <template #body>
        <div class="be-modal-body">
          <be-btn
            v-if="modal.botaoDel"
            class="btn"
            color="primary"
            descricao="Deletar"
            @click="deletarUmaSatisfacao()"
          />
          <be-btn
            descricao="Fechar"
            @click="showModal(false)"
          />
        </div>
      </template>
    </be-modal>

    <table class="be-table">
      <thead>
        <tr>
          <th
            v-for="(item,id) in heads"
            :key="id"
          >
            {{ item }}
          </th>
          <th v-if="actions" />
        </tr>
      </thead>
      <transition-group
        v-if="listagemSatisfacoes && dataList.length !== 0"
        name="be-fadeup"
        appear
        mode="out-in"
        tag="tbody"
        class="tbody"
      >
        <tr
          v-for="(item,id) in dataList"
          :key="item.id"
        >
          <template>
            <td @click="$emit('actionItem',{item,id})">
              {{ item.id }}
            </td>
            <td @click="$emit('actionItem',{item,id})">
              {{ item.updated_at | formatDate }}
            </td>
            <td @click="$emit('actionItem',{item,id})">
              {{ item.cliente.cpf }}
            </td>
            <td @click="$emit('actionItem',{item,id})">
              {{ item.atendente.cpf }}
            </td>
            <td @click="$emit('actionItem',{item,id})">
              <be-type-satisfacao :value="item.rate" />
            </td>
            <td>
              <span
                v-if="item.fase === fase.finalizada"
                class="success"
              >FINALIZADA</span>
              <span
                v-else-if="item.fase === fase.expirada"
                class="secondary"
              >EXPIRADA</span>
              <span
                v-else
                class="secondary"
              >AGUARDANDO</span>
            </td>
          </template>
          <td
            v-if="actions"
            class="be-table-actions text-right"
          >
            <be-btn
              icon="dots-vertical"
              color="none"
              :icon-l="true"
              icon-size="24"
              @click="menu(item.id)"
            />
            <transition
              name="be-slideleft"
              appear
              mode="out-in"
            >
              <span
                v-if="showMenu === item.id"
                class="be-menu"
              >
                <ul class="be-menu-group">
                  <be-menu
                    v-for="(link, i) in options"
                    :key="i"
                    :icon="link.icon"
                    :desc="link.desc"
                    :to="link.to"
                    @actionLink="optionLink(item, link)"
                  />
                </ul>
              </span>
            </transition>
          </td>
        </tr>
      </transition-group>
      <transition-group
        v-if="listagemCadastro && dataList.length !== 0"
        name="be-fadeup"
        appear
        mode="out-in"
        tag="tbody"
        class="tbody"
      >
        <tr
          v-for="item in dataList"
          :key="item.id"
        >
          <template>
            <td>{{ item.id }}</td>
            <td>{{ item.created_at | formatDate }}</td>
            <td>{{ item.cliente.cpf }}</td>
            <td>{{ item.atendente.cpf }}</td>
            <td @click="copyToClipboard(item.hash)">
              <be-icon
                icon="content-copy"
              />
            </td>
            <td>
              <span
                class="secondary"
              >AGUARDANDO</span>
            </td>
          </template>
          <td
            v-show="actions"
            class="be-table-actions text-right"
          >
            <be-btn
              icon="dots-vertical"
              color="none"
              :icon-l="true"
              icon-size="24"
              @click="menu(item.id)"
            />
            <transition
              name="be-slideleft"
              appear
              mode="out-in"
            >
              <span
                v-if="showMenu === item.id"
                class="be-menu"
              >
                <ul class="be-menu-group">
                  <be-menu
                    v-for="(link, i) in options"
                    :key="i"
                    :icon="link.icon"
                    :desc="link.desc"
                    :to="link.to"
                    @actionLink="optionLink(item, link.to)"
                  />
                </ul>
              </span>
            </transition>
          </td>
        </tr>
      </transition-group>
    </table>
    <transition
      name="be-slideup"
      appear
      mode="out-in"
    >
      <span
        v-if="dataList.length === 0"
        class="alert"
      >
        <h3>Desculpe, nenhum item encontrado.</h3>
      </span>
    </transition>
  </div>
</template>

<script>
import satisfacaoAPI from '../../endpoints/satisfacao'
import formatDate from '@/date/date'

export default {
  filters: {
    formatDate
  },
  props: {
    heads: {
      type: Array
    },
    listagemSatisfacoes: {
      type: Boolean,
      defualt: false
    },
    actions: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array
    },
    listagemCadastro: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array
    }
  },
  data () {
    return {
      modal: {
        active: false,
        mensagem: '',
        itemDelete: 0,
        botaoDel: true
      },
      showMenu: NaN,
      fase: {
        aguardando: 0,
        finalizada: 1,
        expirada: 2
      }
    }
  },
  methods: {
    copyToClipboard (hash) {
      let textArea = document.createElement('textarea')
      textArea.value = process.env.VUE_APP_RESPONSE_URL + '/pesquisa/' + hash
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        if (document.execCommand('copy')) {
          alert('Link copiado')
        }
      } catch (err) {
        alert('Tente novamente')
      }

      document.body.removeChild(textArea)
    },
    status (el) {
      if (el === '0' && el !== '1') {
        return true
      }
    },
    menu (id) {
      id === this.showMenu ? this.showMenu = false : this.showMenu = id
    },
    showModal (el) {
      this.modal.active = el
    },
    optionLink (item, link) {
      if (link.desc === 'Deletar') {
        this.showModal(true)
        this.modal.botaoDel = true
        this.modal.mensagem = 'Deseja apagar essa avaliação?'
        this.modal.itemDelete = item
      }
    },
    deletarUmaSatisfacao () {
      satisfacaoAPI.deletarUmaSatisfacao(this.modal.itemDelete.id).then(res => {
        this.modal.mensagem = res.data
      })
      this.$emit('clickDelete')
      this.modal.botaoDel = false
    }
  }
}
</script>

<style lang="scss" scoped>

.table-content {
  height: calc(100vh - 262px);
  overflow-y: scroll;
  padding: 0 $be-p-xxs;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-track {
    border-radius: $be-radius-xxl;
  }
  &::-webkit-scrollbar-thumb {
    background: $be-color-gray-300;
    border-radius: $be-radius-xxl;
    @include transition;
    &:hover {
      background: $be-color-gray-500;
    }
  }
  &::-webkit-resizer {
    display: none;
    opacity: 0;
  }
  @include viewport(sm) {
    overflow: scroll;
    width: $be-width-full;
    padding-left: $be-p-xxs;
    padding-right: $be-p-xxs;
    margin: $be-m-none;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      border-radius: $be-radius-xxl;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-track {
      //background:$be-color-light;
      border-radius: $be-radius-xxl;
    }
    &::-webkit-scrollbar-thumb {
      background: $be-color-gray-300;
      border-radius: $be-radius-xxl;
      transition: all 200ms ease-in-out;
      &:hover {
        background: $be-color-gray-500;
      }
    }
    &::-webkit-resizer {
      display: none;
      opacity: 0;
    }
    &::-webkit-scrollbar-track-piece {
      border-radius: $be-radius-xxl;
    }
  }
}
.be-table {
  width: $be-width-full;
  border-collapse: separate;
  border-spacing: 0px $be-p-xs;
  thead {
    user-select: none;
    width: $be-width-full;
    tr:first-child th {
      background: $be-color-body;
      position: sticky;
      top: 0;
      z-index: $be-level-2;
      padding-bottom: $be-p-m;
    }
    tr {
      width: $be-width-full;
      th {
        font-family: $be-font-text;
        font-weight: 500;
        text-transform: uppercase;
        color: $be-color-gray-400;
        font-size: $be-font-size-xxs;
        text-align: left;
        padding: $be-p-xxs $be-p-s;
        @include transition;
        &:hover {
          cursor: pointer;
          color: $be-color-gray-500;
        }
      }
    }
  }
  tbody {
    width: $be-width-full;
    tr {
      user-select: none;
      background: $be-color-white;
      box-shadow: 0 6px 9px rgba(0, 0, 0, 0.08);
      border-radius: $be-radius-xl;
      transition: all 400ms ease-in-out;
      width:$be-width-full;
      height:$be-m-xxl;
      &:hover {
        background: darken($be-color-white, 3%);
        box-shadow: 0 9px 15px rgba(0, 0, 0, 0.08);
        cursor: pointer;
      }
      &:nth-child(even) {
        background: darken($be-color-white, 2%);
      }
      td {
        border-top: 1px solid $be-color-gray-300;
        border-bottom: 1px solid $be-color-gray-300;
        font-family: $be-font-text;
        font-size: $be-font-size-xs;
        font-weight: 600;
        color: $be-color-gray-700;
        padding: $be-p-xs $be-p-m;
        padding-top: $be-p-none;
        padding-bottom: $be-p-none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 130px;
        &:nth-child(7) {
          overflow: visible;
        }
        &:first-child {
          border-left: 1px solid $be-color-gray-300;
          border-top-left-radius: $be-radius-ml;
          border-bottom-left-radius: $be-radius-ml;
          padding-left: $be-p-m;
        }
        &:last-child {
          border-right: 1px solid $be-color-gray-300;
          border-top-right-radius: $be-radius-ml;
          border-bottom-right-radius: $be-radius-ml;
          padding-right: $be-p-m;
          padding-top:$be-p-none;
          padding-bottom:$be-p-none;
          overflow: visible;
        }
      }
    }
  }
}

.alert{
  width:$be-width-full;
  padding:$be-p-xs $be-p-none;
    h3{
      font-family: $be-font-text;
      user-select: none;
      font-size:$be-font-size-l;
      color:$be-color-gray-300;
      text-align:center;
    }
}

.success, .secondary {
  display: flex;
  align-items: center;
  justify-content: center;
}

.success {
  background: $be-color-success;
  padding: $be-p-s $be-p-m;
  color: $be-color-white;
  border-radius: $be-radius-s;
}
.secondary {
  background: $be-color-gray-500;
  padding: $be-p-s $be-p-m;
  color: $be-color-white;
  border-radius: $be-radius-s;
}
.be-table-actions {
  position: relative;
  button{
    padding:$be-p-xs $be-p-xxs;
  }
}

.be-menu {
  position: absolute;
  max-width: 190px;
  width: 160px;
  top: -#{$be-m-s};
  right: 0;
  background: $be-color-white;
  border-radius: $be-radius-s;
  box-shadow: 9px 0 15px rgba(0, 0, 0, 0.1), 0 6px 9px rgba(0, 0, 0, 0.08);
  z-index: $be-level-3;
  transform: translateX(-35%) scale(1, 1);
  padding: $be-p-xs;
  &:before {
    content: "";
    position: absolute;
    top: $be-m-xl;
    right: -10px;
    transform: rotate(45deg);
    z-index: $be-level-1;
    width: $be-m-l;
    height: $be-m-l;
    border-radius: $be-radius-m;
    border-bottom-left-radius: $be-radius-circle;
    background: $be-color-white;
  }
  .be-menu-group {
    @include d-flex(column, nowrap);
    padding-bottom: $be-m-xxs;
  }
}
.be-modal-body{
  .btn{
    margin: 10px
  }
}
</style>
