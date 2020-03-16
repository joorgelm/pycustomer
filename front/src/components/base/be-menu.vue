<template>
  <li class="be-menu-item">
    <a
      class="be-menu-link"
      @click="$emit('actionLink',$el)"
    >
      <be-icon
        :icon="icon"
        size="24"
      />
      <p class="desc">{{ desc }}</p>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'account'
    },
    to: {
      type: String,
      defautl: '#'
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.be-menu {
  position: absolute;
  max-width: 190px;
  width: 160px;
  top: -#{$be-m-l};
  right: 0;
  background: $be-color-white;
  border-radius: $be-radius-s;
  box-shadow: 9px 0 15px rgba(0, 0, 0, 0.1), 0 6px 9px rgba(0, 0, 0, 0.04);
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
    .be-menu-item {
      @include d-flex(row, nowrap);
      justify-content: center;
      align-items: center;
      .be-menu-link {
        @include d-flex(row, nowrap);
        justify-content: flex-start;
        align-items: center;
        width: $be-width-full;
        font-size: $be-font-size-s;
        font-weight: 300;
        padding: $be-p-xs $be-p-s;
        color: $be-color-gray-500;
        &:hover {
          color: $be-color-gray-700;
        }
        .desc {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis !important;
          max-width: 140px;
          margin: $be-m-none;
          margin-left: $be-m-xs;
        }
      }
    }
  }
}
</style>
