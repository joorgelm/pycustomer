<template>
  <div
    v-if="length > 0"
    class="rate"
  >
    <svg
      style="position: absolute; width: 0; height: 0;"
      width="0"
      height="0"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol
          id="icon-star-full"
          viewBox="0 0 32 32"
        >
          <title>star-full</title>
          <path
            d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"
          />
        </symbol>
      </defs>
    </svg>
    <input
      v-model="rate"
      type="hidden"
      :name="name"
      :required="required"
    >
    <template v-for="n in length">
      <button
        :key="n"
        type="button"
        :class="{'rate-star': true, 'hover': n <= over, 'filled': (n <= rate || isFilled(n))}"
        :disabled="disabled"
        @mouseover="onOver(n)"
        @mouseout="onOut(n)"
        @click="setRate(n)"
        @keyup="onOver(n)"
        @keyup.enter="setRate(n)"
      >
        <svg class="icon">
          <use xlink:href="#icon-star-full" />
        </svg>
      </button>
    </template>
    <div
      class="rate-view"
      :class="{disabled: disabled}"
    >
      <span
        v-if="showcount"
        class="count"
      >{{ over }}</span>
      <h4
        v-if="ratedesc.length > 0"
        class="desc"
      >
        {{ ratedesc[over - 1] }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rate',
  props: {
    value: { type: [Number, String] },
    name: { type: String, default: 'rate' },
    length: { type: Number },
    showcount: { type: Boolean },
    required: { type: Boolean },
    ratedesc: {
      type: Array,
      default () {
        return []
      }
    },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false }
  },
  data () {
    return {
      over: 0,
      rate: 0
    }
  },
  watch: {
    value (val) {
      this.rate = this.convertValue(this.value)
      this.over = this.convertValue(this.value)
    }
  },
  created () {
    if (this.value >= this.length) {
      this.value = this.length
    } else if (this.value < 0) {
      this.value = 0
    }
    this.rate = this.convertValue(this.value)
    this.over = this.convertValue(this.value)
  },
  methods: {
    convertValue (value) {
      if (value >= this.length) {
        value = this.length
      } else if (value < 0) {
        value = 0
      }
      return value
    },
    onOver (index) {
      if (!this.readonly) this.over = index
    },
    onOut () {
      if (!this.readonly) this.over = this.rate
    },
    setRate (index) {
      if (this.readonly) return false

      this.rate = index
      this.$emit('input', this.rate)
    },
    isFilled (index) {
      return index <= this.over
    },
    isEmpty (index) {
      return index > this.over || (!this.value && !this.over)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  width: $be-m-xxl;
  height: $be-m-xxl;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  vertical-align: middle;
  top: -2px;
  position: relative;
  margin: 0 $be-m-xxs;
  @include viewport(sm) {
    width: $be-m-xl;
    height: $be-m-xl;
  }
}
.rate {
  cursor: default;
}
.rate-star {
  color: $be-color-gray-100;
  display: inline-block;
  padding: $be-p-xs;
  text-decoration: none;
  cursor: pointer;
  background: transparent none;
  border: 0;
  height: 86px;
}
.rate-star .icon {
  top: 0;
  vertical-align: middle;
}
.rate-star.hover {
  color: $be-color-warning;
}
.rate-star.filled {
  color: $be-color-warning;
}
.rate-star:hover,
.rate-star:focus {
  text-decoration: none;
  background: none;
}
.rate-view {
  height: $be-m-l;
  margin-top: $be-m-l;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.rate-view .count,
.rate-view .desc {
  font-size: $be-font-size-l;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding: $be-p-xs;
}
.rate.has-error .rate-star {
  color: $be-color-danger;
}
.rate.has-error .rate-star.hover {
  color: $be-color-warning;
}
.rate.has-error .rate-star.filled {
  color: $be-color-warning;
}
.rate-star[disabled] {
  opacity: 0.8;
}
.rate-star.hover[disabled],
.rate-star.filled[disabled] {
  color: $be-color-warning;
  opacity: 0.6;
}
.rate-view.disabled .count,
.rate-view.disabled .desc {
  color: $be-color-gray-100;
}
</style>
