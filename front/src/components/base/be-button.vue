<template>
  <button
    class="be-btn-default"
    :class="'be-btn-'+cor"
    @click="$emit('click',$event)"
  >
    <be-icon
      v-if="iconL"
      :icon="icon"
      :size="iconSize"
    />
    {{ descricao }}
    <be-icon
      v-if="iconR"
      :icon="icon"
      :size="iconSize"
    />
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    descricao: {
      type: String,
      default: ''
    },
    iconR: {
      type: Boolean,
      default: false
    },
    iconL: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String
    },
    color: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cor: this.color
    }
  },
  computed: {
    status () {
      return this.color
    }
  }
}
</script>

<style lang="scss" scoped>

button {
  @extend %be-font-text;
  font-weight: bold;
  white-space: nowrap;
  letter-spacing: 0.05rem;
  border-radius: $be-radius-l;
  padding: $be-p-xs $be-p-m;
  color: $be-color-gray-700;
  background: $be-color-gray-100;
  border: border-default($be-color-gray-300);
  @include shadow(button);
  @include transition;
  &:focus {
    outline: none;
  }
  &:hover {
    transform: translateY(1px);
    @include shadow;
    background: $be-color-gray-300;
    border: border-default($be-color-gray-300);
    cursor: pointer;
  }
  &[disabled] {
    background: $be-color-gray-100;
    color: $be-color-gray-400;
    &:hover {
      background: $be-color-gray-100;
      color: $be-color-gray-400;
    }
  }
}

@each $name, $value in $colors {
  .be-btn-#{$name} {
    @extend button;
    background: #{$value};
    color: $be-color-white;
    border: border-default($value);
    &:hover {
      background: lighten($value, 10%);
      border: border-default(lighten($value, 10%));
    }
    &:active {
      background: lighten($value, 15%);
    }
  }
}

.be-btn-outline {
  background: transparent;
  border:$be-bd-xxs solid $be-color-gray-300;
  &:hover {
    background: $be-color-white;
    border-color:$be-color-gray-100;
  }
}

.be-btn-circle {
  border-radius: $be-radius-circle;
}

.be-btn-none {
  border-width: $be-bd-none;
  background: transparent;
  box-shadow: none;
  &:hover {
    border-width: $be-bd-none;
    background: transparent;
    color: $be-color-primary;
    box-shadow: none;
  }
}

</style>
