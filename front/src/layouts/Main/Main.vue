<template>
  <transition
    appear
    mode="out-in"
    name="slide-fade"
  >
    <keep-alive>
      <div class="be-page">
        <div class="be-page-main">
          <div class="be-page-actions">
            <slot name="actions" />
          </div>
          <div class="be-page-header">
            <slot name="header" />
          </div>

          <div class="be-page-body">
            <slot name="body" />
          </div>
          <div class="be-page-footer">
            <transition
              name="be-fade"
              appear
              mode="out-in"
            >
              <slot
                name="footer"
              />
            </transition>
          </div>
        </div>
      </div>
    </keep-alive>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.be-page {
  width: $be-width-full;
  height: $be-width-full;
  padding-top: $be-m-xl;
  @include d-flex(column, nowrap);
  justify-content: space-between;
  .be-page-main {
    width: $be-width-full;
    height: auto;
  }
  .be-page-header {
    @include d-flex();
    justify-content: space-between;
    align-items: center;
  }
  .be-page-body {
    margin-top: $be-m-l;
    width: $be-width-full;
    padding-bottom:$be-p-xxl;
  }
  .be-page-footer {
    position: fixed;
    width: calc(#{$be-width-full} - 224px);
    height: 58px;
    margin-top: $be-m-l;
    z-index: $be-level-5;
    bottom: 0;
    right: 0;
    transform: translateY($be-width-full);
    opacity: 0;
    @include transition;
    animation: initFooter $timeAnimated 1s both ease-in-out;
    @include viewport(sm){
      width:$be-width-full;
    }
  }
}
@keyframes initFooter {
  to {
    height: 58px;
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
