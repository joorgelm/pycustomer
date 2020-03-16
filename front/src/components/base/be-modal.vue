<template>
  <span>
    <transition
      name="be-fade"
      appear
    >
      <div
        v-if="show"
        class="be-modal-container"
        @click="$emit('showModal',!show)"
      />
    </transition>
    <transition
      name="be-pop"
      appear
    >
      <div
        v-if="show"
        class="be-modal"
      >
        <div class="be-modal-header">
          <slot name="header" />
          <div
            v-if="close"
            class="close"
          >
            <be-btn
              icon="window-close"
              class="be-text-dark"
              icon-size="24"
              :icon-l="true"
              color="none"
              @click="$emit('showModal',!show)"
            />
          </div>
        </div>
        <div class="be-modal-body">
          <slot name="body" />
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.be-modal-container {
  transform-origin: center;
  position: absolute;
  z-index: $be-level-5;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: transparentize($be-color-dark, 0.4);
}
.be-modal {
  position: absolute;
  width: 600px;
  overflow: hidden;
  padding: $be-p-l $be-p-xl;
  transform-origin: center center;
  margin: $be-m-none auto;
  top: 35%;
  background: $be-color-white;
  border: $be-bd-xxs solid $be-color-gray-100;
  @include shadow(card);
  border-radius: $be-radius-s;
  z-index: $be-level-5;
  @include viewport(sm){
    transform:translateX(0);
    top: 10%;
    left: 0;
    width: $be-width-full;
  }
  .be-modal-header {
    @include d-flex(row, nowrap);
    justify-content: space-between;
    align-items: center;
    padding-bottom: $be-p-s;
    .close{
      align-self: flex-start;
    }
  }
  .be-modal-body {
    @include d-flex(row, nowrap);
    justify-content: space-around;
    align-items: center;
    padding-bottom: $be-p-s;
  }
  .be-modal-footer {
    @include d-flex(row, nowrap);
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
