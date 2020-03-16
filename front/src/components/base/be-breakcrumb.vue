<template>
  <transition
    appear
    name="slide-fade"
    mode="out-in"
  >
    <ul class="be-breadcrumb">
      <router-link
        v-for="(link,id) in mapRoutes"
        :key="id"
        tag="li"
        class="be-breadcrumb-item"
        :to="'/'+link"
      >
        <a class="be-breadcrumb-link">{{ link }}</a>
      </router-link>
    </ul>
  </transition>
</template>

<script>
export default {
  props: {
    mapRoutes: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.be-breadcrumb {
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  .be-breadcrumb-item {
    .be-breadcrumb-link {
      font-size: $be-font-size-xs;
      padding: $be-p-xxs 0;
      margin-right: 0;
      text-decoration: none;
    }
    &:nth-child(1) {
      &::before {
        content: "";
        margin-left: $be-m-none;
        margin-right: $be-m-none;
      }
    }
    &:last-child {
      .be-breadcrumb-link {
        color: $be-color-gray-300;
      }
    }
    &::before {
      content: "/";
      font-size: 0.98rem;
      color: $be-color-gray-400;
      font-weight: bold;
      margin-left: $be-m-xs;
      margin-right: $be-m-xs;
      margin-top: $be-m-s;
    }
  }
}
</style>
