<template>
  <div
    class="input-group"
    :class="status"
  >
    <span
      v-if="appIcon"
      class="append-icon"
      @click="$emit('tabRight',$event.target.offsetParent)"
    >
      <be-icon
        :icon="appIcon"
        size="24"
      />
    </span>

    <input
      ref="Beinput"
      v-model="valueInput"
      class="be-input"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :autofocus="autofocus"
      @click="$emit('click',$refs)"
      @input="$emit('input',$event.target.value)"
      @keypress.enter="$emit('keypress-enter',valueInput)"
      @keypress="$emit('keypress',valueInput)"
    >
    <span
      v-if="prenIcon"
      class="prepend-icon"
      @click="$emit('tabLeft',$refs)"
    >
      <be-icon
        :icon="prenIcon"
        size="24"
      />
    </span>

    <transition
      name="be-slidedown"
      appear
      mode="out-in"
    >
      <span
        v-if="mensage.length !== 0"
        class="be-alert"
      >
        {{ mensage }}
      </span>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    appendIcon: { type: String, default: undefined },
    prependIcon: { type: String, default: undefined },
    color: { type: String, default: 'default' },
    placeholder: { type: String, default: '' },
    mensagers: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false }
  },
  data () {
    return {
      mess: this.mensagers,
      valueInput: this.value
    }
  },
  computed: {
    InputValue () {
      return this.valueInput
    },
    status () {
      return this.color
    },
    appIcon () {
      return this.appendIcon !== undefined && this.appendIcon !== ''
        ? this.appendIcon
        : ''
    },
    prenIcon () {
      return this.prependIcon !== undefined && this.prependIcon !== ''
        ? this.prependIcon
        : ''
    },
    mensage () {
      return this.mensagers
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 6px 0;
  justify-content: space-around;
  align-items: center;
  vertical-align: center;
  color: $be-color-gray-300;
  .be-alert{
    color:$be-color-gray-300;
  }
  &.dark {
    input {
      border-color: $be-color-gray-500;
      background: $be-color-white;
    }
    & > span {
      color: $be-color-gray-500;
    }
    & > .append-icon {
      z-index: $be-level-3;
      background: transparent;
      border-right-width: 0;
      color: currentColor;
      & + input {
        padding-left: 36px;
      }
    }
    & > .prepend-icon {
      z-index: $be-level-3;
      color: currentColor;
      background: $be-color-white;
      border-radius: 0px 4px 4px 0px;
      border-left-width: 0;
    }
    .be-alert{
      color:$be-color-gray-500;
    }
  }
  &.primary {
    input {
      border-color: $be-color-primary;
      background: $be-color-purple-500;
      color: $be-color-white !important;
      &::placeholder {
        color: $be-color-purple-700;
      }
    }
    .be-alert{
      color:$be-color-purple-700;
    }
    & > span {
      color: $be-color-primary;
    }
    & > .append-icon {
      z-index: $be-level-3;
      background: transparent;
      border-right-width: 0;
      & + input {
        padding-left: 36px;
      }
    }
    & > .prepend-icon {
      z-index: $be-level-3;
      background: $be-color-purple-500;
      border-radius: 0px 4px 4px 0px;
      border-left-width: 0;
    }
  }
  &.white {
    input {
      border-color: $be-color-gray-300;
      background: $be-color-gray-100;
      &::placeholder {
        color: $be-color-gray-100;
      }
    }
    .be-alert{
      color:$be-color-gray-300;
    }
    & > span {
      color: $be-color-gray-300;
    }
    & > .append-icon {
      z-index: $be-level-3;
      background: transparent;
      border-right-width: 0;
      & + input {
        padding-left: 36px;
      }
    }
    & > .prepend-icon {
      z-index: $be-level-3;
      background: $be-color-gray-100;
      border-radius: 0px 4px 4px 0px;
      border-left-width: 0;
    }
  }
  &.green {
    input {
      border-color: $be-color-success;
      background: $be-color-white;
      &::placeholder {
        color: darken($be-color-success, 15%);
      }
    }
    .be-alert{
      color:darken($be-color-success, 15%);
    }
    & > span {
      color: $be-color-success;
    }
    & > .append-icon {
      z-index: $be-level-3;
      background: transparent;
      border-right-width: 0;
      & + input {
        padding-left: 36px;
      }
    }
    & > .prepend-icon {
      z-index: $be-level-3;
      background: $be-color-white;
      border-radius: 0px 4px 4px 0px;
      border-left-width: 0;
    }
  }
  &.danger {
    input {
      border-color: $be-color-danger;
      background: $be-color-white;
    }
    .be-alert{
      color:darken($be-color-danger, 15%);
    }
    & > span {
      color: $be-color-danger;
    }
    & > .append-icon {
      z-index: 2;
      background: transparent;
      border-right-width: 0;
      & + input {
        padding-left: 36px;
      }
    }
    & > .prepend-icon {
      z-index: $be-level-3;
      background: $be-color-white;
      border-radius: 0px 4px 4px 0px;
      border-left-width: 0;
    }
  }
  &.warn {
    input {
      border-color: $be-color-warning;
      background: $be-color-white;
    }
    .be-alert{
      color:darken($be-color-warning, 15%);
    }
    & > span {
      color: $be-color-warning;
    }
    & > .append-icon {
      z-index: $be-level-3;
      background: transparent;
      border-right-width: 0;
      & + input {
        padding-left: 36px;
      }
    }
    & > .prepend-icon {
      z-index: $be-level-3;
      background: $be-color-white;
      border-radius: 0px 4px 4px 0px;
      border-left-width: 0;
    }
  }
  .append-icon {
    z-index: $be-level-3;
    padding: 4px;
    margin-right: -36px;
    margin-left: 5px;
    @include transition;
    color: currentColor;
    & + input {
      padding-left: 36px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .prepend-icon {
    z-index: $be-level-3;
    width: $be-m-l;
    padding: $be-p-none;
    margin-left: -40px;
    margin-right: 8px;
    @include transition;
    &:hover {
      cursor: pointer;
      color: $be-color-gray-500;
    }
  }
}
.be-input {
  font-family: $be-font-text;
  height: $be-input-height;
  width: $be-width-full;
  background: $be-color-white;
  color: $be-color-gray-500;
  border-radius: 4px;
  margin: 4px 0;
  text-align: left;
  padding: 13px 16px;
  border: solid 2px #e0e0e0;
  position: relative;
  color: #474747;
  &:focus {
    outline: none;
    border-color: $be-color-primary;
  }
  &::placeholder {
    color: #777777;
    //font-size:$be-font-size-l;‬
  }
  &span {
    color: $be-color-gray-500;
  }
}
.be-alert {
  user-select: none;
  position: absolute;
  max-width: 100%;
  left: $be-m-s;
  bottom:-$be-m-m;
  white-space: wrap;
  font-family:$be-font-text;
  font-size: $be-font-size-xs;
  @include d-flex;
  small {
    line-height: $be-font-size-xxs;
    display: flex;
    white-space: pre-wrap;
  }
}
</style>
