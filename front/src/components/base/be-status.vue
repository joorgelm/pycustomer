<template>
  <div class="be-input-status">
    <div class="status-title">
      <label>{{ label }}</label>
    </div>
    <div class="input-status-group">
      <span
        class="input-status"
        :class="{status:'actived','desabilited':!status}"
        @click="$emit('upDateStatus',!status)"
      >
        <span class="input-boolean" />
      </span>
      <label for>{{ status ? 'Ativado': 'Desativado' }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.be-input-status {
  @include d-flex(column, nowrap);
  .status-title {
    font-size: $be-font-size-s;
    font-weight: bold;
    padding-bottom: $be-p-xxs;
    padding-left: $be-p-xs;
    color: $be-color-gray-500;
  }
  .input-status-group {
    user-select: none;
    @include d-flex;
    justify-content: flex-start;
    align-items: center;
  }
  .input-status {
    &:hover {
      cursor: pointer;
    }
    @include d-flex;
    width: 46px;
    height: 24px;
    padding: $be-bd-xs;
    margin-right: $be-m-xs;
    overflow: hidden;
    border-radius: $be-radius-xxl;
    .input-boolean {
      width: 20px;
      height: 20px;
      border-radius: $be-bd-xl;
    }
    &.actived {
      background: $be-color-primary;
      .input-boolean {
        animation: statusActived 0.12s both ease-in;
        border-radius: $be-bd-xl;
        background: $be-color-light;
      }
      & + label {
        color: $be-color-primary;
        animation: statusActivedLabel 0.12s both ease-in;
      }
    }
    &.desabilited {
      background: $be-color-gray-400;
      .input-boolean {
        animation: statusDesabilited 0.12s both ease-in;
        border-radius: $be-bd-xl;
        background: $be-color-gray-500;
      }
      & + label {
        color: $be-color-gray-400;
        animation: statusDesabilitedLabel 0.12s both ease-in;
      }
    }
  }
}

</style>
