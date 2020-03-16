<template>
  <div
    ref="becheckbox"
    class="be-input-group"
  >
    <label class="be-label-text be-color-primary">{{ label }}</label>
    <div class="be-input-check">
      <input
        :id="data.tag"
        v-model="allValue"
        class="be-input-checkbox"
        type="checkbox"
        :valeu="data.tag"
        :name="data.tag"
      >
      <label :for="data.tag">{{ data.text }}</label>
    </div>
    <div
      v-show="data.subdata != undefined || data.subdata != null"
      class="be-input-group be-pt-2 be-pl-2"
    >
      <label class="be-label-text be-color-dark">{{ data.subdata.label }}</label>
      <div
        v-for="sub in data.subdata.options"
        :key="sub.id"
        class="be-input-check"
      >
        <input
          :id="sub.tag"
          v-model="subValue"
          class="be-input-checkbox"
          type="checkbox"
          :name="sub.tag"
          :value="sub"
        >
        <label :for="sub.tag">{{ sub.text }}</label>
      </div>
    </div>
    <transition
      name="be-fade"
      appear
      mode="out-in"
    >
      <span
        v-if="msg.length !== 0"
        class="be-alert-c"
      >
        {{ msg }}
      </span>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    data: {
      type: Object
    }
  },
  data () {
    return {
      allValue: false,
      subValue: [],
      msg: ''
    }
  },
  watch: {
    subValue () {
      return this.$emit('actionChebox', this.subValue)
    },
    allValue () {
      if (this.allValue) {
        this.subValue = this.data.subdata.options
      } else {
        this.subValue = []
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.be-input-check {
  user-select: none;
  @include d-flex(row, wrap);
  justify-content: flex-start;
  align-items: center;
  margin-top: $be-m-s;
  font-family: $be-font-text;
  label {
    &:hover {
      cursor: pointer;
    }
  }
  input {
    margin-right: $be-m-s;
  }
}
.be-alert-c{
  user-select: none;
  font-family: $be-font-text;
  @include d-flex(row,wrap);
  justify-content: center;
  align-items: center;
  width:$be-width-full;
  height:auto;
  color:$be-color-warning;
  padding:$be-p-s $be-p-m;
  border:$be-bd-xxs solid currentColor;
  background: lighten($be-color-warning, 30%);
  border-radius:$be-radius-s;
}
.be-input-checkbox {
  &[type="checkbox"] {
    @include d-flex(row, nowrap);
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    &:focus {
      border-color: $be-color-gray-500;
    }
    &:checked {
      @include d-flex(row, nowrap);
      font-family: $be-font-icons;
      border-color: $be-color-purple-700;
      background: $be-color-primary;
      font-weight: bold;
      &:before {
        @include d-flex(row, nowrap);
        content: "\fe6e";
        font-size: $be-font-size-s;
        color: $be-color-white;
        margin-top: -1px;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
