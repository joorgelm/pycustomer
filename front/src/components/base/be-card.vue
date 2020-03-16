<template>
  <div
    class="be-card"
    :class="{'be-card-white': bg}"
  >
    <div class="be-card-header">
      <div class="be-col-12">
        <slot name="header" />
      </div>
    </div>
    <div class="be-card-body">
      <div class="be-col-12">
        <slot name="body" />
      </div>
    </div>
    <div class="be-card__footer">
      <div class="be-col-12 be-my-0">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bg: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.be-card {
  @include d-flex(column, nowrap);
  width: $be-width-full;
  position: relative;
  height: auto;
  border-radius: $be-radius-l;
  padding: $be-p-m;
  @include transition;

  &.be-card-header {
    width: $be-width-full;
    height: auto;
    @include d-flex;
    justify-content: center;
    align-items: center;
  }

  &.be-card-body {
    width: $be-width-full;
    height: auto;
    @include d-flex;
    justify-content: center;
    align-items: center;
  }

  &.be-card__footer {
    width: $be-width-full;
    height: auto;
    @include d-flex(row, nowrap);
    justify-content: center;
    align-items: center;
    .be-information {
      height: 100%;
      @include d-flex(row, wrap);
      justify-content: flex-start;
      align-items: center;
    }
  }
}

.be-card-white {
  background: $be-color-white;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
}

.be-card-status {
  background: $be-color-white;
  border-radius: $be-radius-l;
  @include shadow;
  @include transition;
  @include d-flex(row, wrap);
  margin-right: $be-m-s;
  .be-card-status-main {
    @include d-flex(column, nowrap);
    padding-top: $be-p-s;
    padding-bottom: $be-p-s;
    font-family: $be-font-text;
    color: $be-color-gray-500;
    .statistics {
      font-weight: lighter;
      font-size: $be-font-size-xxl;
    }
    .context {
      margin-top: $be-m-xs;
      font-size: $be-font-size-xs;
    }
  }
}
</style>
