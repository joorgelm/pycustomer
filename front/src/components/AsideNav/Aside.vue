<template>
  <aside
    class="be-aside"
    :class="{ active: !minimizar}"
  >
    <div class="be-aside-group">
      <ul class="be-navegation-in">
        <router-link
          tag="li"
          class="be-navegation-item"
          to="/home/dashboard"
          exact
        >
          <a
            class="be-navegation-link"
          >
            <be-icon
              icon="account"
              size="24"
            />
            <span
              v-show="minimizar"
              class="text"
            >Home</span>
          </a>
        </router-link>
        <router-link
          tag="li"
          class="be-navegation-item"
          to="/home/cadastro"
        >
          <a
            class="be-navegation-link"
          >
            <be-icon
              icon="book-plus"
              size="24"
            />
            <span
              v-show="minimizar"
              class="text"
            >Cadastro Avaliações</span>
          </a>
        </router-link>
        <router-link
          tag="li"
          class="be-navegation-item"
          to="/home/listagem"
        >
          <a
            class="be-navegation-link"
          >
            <be-icon
              icon="format-list-bulleted"
              size="24"
            />
            <span
              v-show="minimizar"
              class="text"
            >Avaliações</span>
          </a>
        </router-link>
      </ul>
      <ul
        class="be-navegation-out"
        @click="logOut"
      >
        <router-link
          tag="li"
          class="be-navegation-item"
          to="/"
          exact
        >
          <a
            class="be-navegation-link"
          >
            <be-icon
              icon="power"
              size="24"
            />
            <span
              v-show="minimizar"
              class="text"
            >Sair</span>
          </a>
        </router-link>
      </ul>
    </div>
    <div
      v-show="minimizar"
      class="be-aside-about"
    >
      <span class="be-about__copyright">
        <img
          src="@/assets/imgs/brands/copy-right-about.png"
          class="be-about-copyright"
        >
      </span>
    </div>
  </aside>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  props: {
    minimizar: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions(['logOut'])
  }
}
</script>

<style lang="scss" scoped>
.be-aside {
  position: fixed;
  bottom: $be-m-none;
  width: 224px;
  height: calc(100vh - #{$be-height-navegation});
  background: $be-color-black;
  @include d-flex(column, nowrap);
  justify-content: flex-start;
  justify-items: stretch;
  align-items: center;
  @include viewport(sm) {
    @include animated(asideOut);
  }
  &.active{
    @include viewport(sm){
      position: absolute;
      top:58px;
      display: flex;
      opacity: 1 !important;
      z-index:$be-level-5;
      transform: none;
      width: calc( #{$be-width-full} - 50%);
    }
    width: 60px;
    .be-navegation-in .be-navegation-item .be-navegation-link{
        grid-template-columns: 1fr;
        .icons{
          margin-left: $be-m-l;
        }
    }
    .be-navegation-out .be-navegation-item .be-navegation-link{
        grid-template-columns: 1fr;
        .icons{
          margin-left: $be-m-l;
        }
    }
  }
  .be-aside-group {
    width: $be-width-full;
    height: 100%;
    @include d-flex(column, nowrap);
    justify-content: space-between;
    align-items: flex-start;
  }
  .be-navegation-item {
    .text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 120px;
    }
  }
  .be-aside-about {
    margin-top: $be-m-xl;
    margin-bottom: $be-m-xl;
    @include d-flex();
    .be-about__copyright {
      max-width: 90px;
      height: auto;
      .be-about-copyright {
        width: $be-width-full;
        height: auto;
        object-fit: cover;
      }
    }
  }
}

.be-navegation-in {
  width: $be-width-full;
  .be-navegation-item {
    width: $be-width-full;
    height: 56px;
    @include d-flex(row, wrap);
    justify-content: center;
    align-items: center;
    .be-navegation-link {
      display: grid;
      grid-template-areas: "icons text";
      grid-template-columns: $be-m-xl 1fr;
      grid-auto-flow: row;
      grid-column-gap: $be-p-l;
      justify-content: center;
      align-items: center;
      width: $be-width-full;
      height: 100%;
      .icons {
        grid-area: icons;
        margin-left: $be-m-xl;
      }
      .text {
        grid-area: text;
        margin-left: $be-m-m;
      }
      &:hover {
        color: $be-color-light;
        background: $be-color-dark;
      }
    }
  }
}

.be-navegation-out {
  width: $be-width-full;
  .be-navegation-item {
    width: $be-width-full;
    height: 56px;
    @include d-flex(row, wrap);
    justify-content: center;
    align-items: center;
    .be-navegation-link {
      display: grid;
      grid-template-areas: "icons text";
      grid-template-columns: $be-m-xl 1fr;
      grid-auto-flow: row;
      grid-column-gap: $be-p-l;
      justify-content: center;
      align-items: center;
      width: $be-width-full;
      height: 100%;
      .icons {
        grid-area: icons;
        margin-left: $be-m-xl;
      }
      .text {
        grid-area: text;
        margin-left: $be-m-m;
      }
      &:hover {
        color: $be-color-light;
        background: $be-color-dark;
      }
    }
  }
}

.router-link-active .be-navegation-link {
  border-left: $be-bd-l solid $be-color-purple-700;
  color: $be-color-purple-400;
  background: $be-color-gray-900;
}
</style>
