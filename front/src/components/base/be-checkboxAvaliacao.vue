<template>
  <div class="input-controls">
    <input
      :id="id"
      class="be-input-avaliacao-tipos"
      type="checkbox"
      @click="check"
    >
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    check () {
      this.$emit('checked')
    }
  }
}
</script>

<style lang="scss" scoped>
.input-controls {
  margin-right: $be-m-m;
  margin-bottom: $be-m-xl;
  position: relative;
  @include viewport(sm) {
    margin-right: $be-m-xxs;
  }
  &:last-child {
    margin-right: 0;
  }
  label {
    margin: 0;
  }
  .be-input-avaliacao-tipos {
    -webkit-appearance: none;
    position: absolute;
    top: -10px;
    right: 2px;
    border-radius: $be-radius-xxl;
    background: transparent;
    border: none;
    display: none;
    &:checked {
      background: transparent;
      border: none;
    }
    &:checked + label {
      border: $be-bd-xs solid $be-color-primary;
      background: $be-color-primary;
      color: $be-color-white;
      border-color: $be-color-purple-900;
      &:hover {
        border-color: $be-color-purple-700;
      }
    }
  }
  .be-input-avaliacao-tipos + label {
    user-select: none;
    font-family: $be-font-text;
    font-size: $be-font-size-s;
    border-radius: $be-radius-l;
    color: $be-color-gray-500;
    padding: $be-p-xs $be-p-m;
    border: 2px solid $be-color-gray-100;
    @include transition;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @include viewport(sm) {
      font-size: $be-font-size-xs;
    }
    &:hover {
      cursor: pointer;
      border-color: $be-color-gray-300;
    }
  }
}
</style>
