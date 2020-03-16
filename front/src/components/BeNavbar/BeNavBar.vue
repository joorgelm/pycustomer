<template>
  <nav class="be-nav be-navegation be-fixed">
    <div class="be-menu">
      <div class="menu">
        <be-btn
          :icon-l="true"
          icon="menu"
          color="none"
          icon-size="36"
          @click="$emit('actionMenu',false)"
        />
      </div>
      <div class="be-nav-content-brand">
        <img
          src="../../assets/imgs/brands/logo-white.png"
          class="be-nav-brand"
          alt="Logo Brand"
        >
      </div>
    </div>
    <div class="be-nav-user">
      <div class="be-user-avatar">
        <span class="icons">
          <be-icon
            icon="account"
            size="36"
          />
        </span>
        <label class="be-user-text">{{ atendente.nome }}</label>
      </div>
    </div>
  </nav>
</template>

<script>
import atendenteAPI from '../../endpoints/atendente'

export default {
  data () {
    return {
      atendente: {}
    }
  },
  mounted () {
    this.getAtendente()
  },
  methods: {
    getAtendente () {
      atendenteAPI.getAtendente().then(res => {
        this.atendente = res.data
      })
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

  .be-menu{
    margin-left:-#{$be-m-xl};
    @include d-flex;
    justify-content: flex-start;
    align-items: center;
    .menu{
        &>button{
          @include d-flex;
          justify-content:center;
          align-items: center;
          color:$be-color-purple-500;
          &:hover{
            color:$be-color-purple-dark;
          }
          &:nth-child(1){
            margin-top:-#{$be-m-xs};
          }
        }
      }

      .be-nav-content-brand {
        @include d-flex;
        justify-content:center;
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
  }

.be-fixed {
  position: fixed;
  top: $be-m-none;
  left: $be-m-none;
  z-index: $be-level-5;
}

.be-user-avatar {
  user-select: none;
  max-width: auto;
  padding: 0 $be-m-l;
  background: $be-color-purple-dark;
  border-radius: $be-radius-l;
  border: $be-bd-xs solid transparent;
  color: $be-color-purple-500;
  @include d-flex();
  justify-content: flex-start;
  align-items: center;
  @include transition;
  transition: all $timeAnimated ease-in-out;
  box-shadow: 0 0px 15px transparent;
  .icons {
    margin-left: -4px;
    margin-right: $be-m-xxs;
  }
  label {
    -webkit-appearance: none;
  }
  .be-user-text {
    color: $be-color-purple-500;
    text-align: left;
    white-space: nowrap;
    font-size: $be-font-size-l;
    @include transition;
    &:hover {
      cursor: pointer;
    }
  }
  &:hover {
    cursor: pointer;
    background: $be-color-purple-700;
    color: $be-color-white;
    border: $be-bd-xs solid $be-color-purple-500;
    .be-user-text {
      color: $be-color-white;
    }
    box-shadow: 0 10px 15px $be-color-purple-500;
  }
}

</style>
