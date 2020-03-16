<template>
  <span class="type">
    <div
      :class="rate[valueSatisfacao]"
    >
      <span class="value" />
      <span class="tooltip">
        {{ writeValue }}
      </span>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      rate: ['none', 'pessimo', 'ruim', 'regular', 'bom', 'execelente']
    }
  },
  computed: {
    valueSatisfacao () {
      return this.value
    },
    writeValue () {
      return this.rate[this.valueSatisfacao].toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
    .type{
        @include d-flex(column,nowrap);
        justify-content: center;
        align-items: center;
        .tooltip{
          opacity: 0;
          z-index:-1;
          position: absolute;
          border-radius:$be-radius-s;
          top:50%;
          left:50%;
          transform: translate(-50%,-50%);
          color:$be-color-white;
          font-size:font-size(9);
          background:$be-color-dark;
          padding:$be-p-xs $be-p-xxs;
        }
        &:hover{
          &+.tooltip{
            opacity: 1;
            background: red;
            z-index:$be-level-4;
          }
        }

    }

    .type-defuatl{
        position: relative;
        width:$be-m-xl;
        height:$be-m-xl;
        border-radius:$be-radius-circle;
        background:transparent;
        border-color:transparent;
        border-width: $be-bd-xs;
        border-style: solid;
        color: transparent;
        @include shadow(button);
        &:before{
            content: '';
            color:currentColor;
            font-size:$be-font-size-m;
            font-weight: 700;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
        }
    }
    .none{
        @extend .type-defuatl;
        color:$be-color-gray-700;
        background:lighten($be-color-gray-700,25%);
        border-color:currentColor;
        &:before{
            content: 'N';
        }
    }
    .pessimo{
        @extend .type-defuatl;
        color:darken($be-color-danger,25%);
        background:lighten($be-color-danger,25%);
        border-color:currentColor;
        &:before{
            content: 'P';
        }
    }
    .ruim{
        @extend .type-defuatl;
        color:darken($be-color-danger,25%);
        background:lighten($be-color-danger,25%);
        border-color:currentColor;
        &:before{
            content: 'R';
        }
    }
    .regular{
        @extend .type-defuatl;
        color:darken($be-color-warning,10%);
        background:lighten($be-color-warning,25%);
        border-color:currentColor;
        &:before{
            content: 'R';
        }
    }
    .bom{
        @extend .type-defuatl;
        color:darken($be-color-success,10%);
        background:lighten($be-color-success,35%);
        border-color:currentColor;
        &:before{
            content: 'B';
        }
    }
    .execelente{
        @extend .type-defuatl;
        color:darken($be-color-success,10%);
        background:lighten($be-color-success,35%);
        border-color:currentColor;
        &:before{
            content: 'E';
        }
    }
</style>
