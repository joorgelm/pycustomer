<template>
  <div class="be-admin">
    <be-navbar @actionMenu="menuMini" />
    <main class="be-main">
      <be-aside :minimizar="menumini" />
      <div
        class="be-container"
        :class="{ active: !menumini }"
      >
        <div
          class="be-content"
          :class="{ active: !menumini }"
        >
          <transition
            appear
            mode="out-in"
            name="slide-fade"
          >
            <router-view />
          </transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BeAside from '@/components/AsideNav/Aside'
import BeNavbar from '@/components/BeNavbar/BeNavBar.vue'
export default {
  components: {
    BeAside,
    BeNavbar
  },
  data () {
    return {
      menumini: true
    }
  },
  methods: {
    menuMini (el) {
      this.menumini = !this.menumini
    }
  }
}
</script>

<style lang="scss">
.be-admin {
  width: $be-width-full;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: $be-height-navegation;
  .be-nav {
    grid-area: nav;
  }
}
.be-main {
  position: relative;
  padding-top: $be-height-navegation;
  height: 100%;
  @include d-flex(row, nowrap);
  justify-content: flex-start;
  align-items: flex-start;
}
.be-content{
  &.active{
    width:$be-width-default;
    @include viewport(sm){
      width:$be-width-full;
    }
  }
}
.be-container{
  &.active{
    margin-left: 60px;
    width: calc(100% - 60px);
    .be-page-footer{
      width:calc( #{$be-width-full} - 60px) !important;
      left:60px;
      right:0;
      @include viewport(sm){
        width:$be-width-full;
      }
    }
  }
}
</style>
