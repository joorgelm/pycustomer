<template>
  <span class="icons">
    <i
      class="mdi"
      :class="['mdi-'+size+'px','mdi-'+icon]"
    />
  </span>
</template>

<script>
export default {
  name: 'BeIcon',
  props: {
    icon: { type: String, default: '' },
    size: { type: String, default: '12' }
  }
}
</script>

<style lang="scss" scoped>
</style>
