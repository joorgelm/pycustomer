<template>
  <div class="be-obrigado-main">
    <nav class="be-nav be-obrigado-nav be-fixed">
      <img
        src="@/assets/imgs/brands/Brand.png"
        class="logoVivo"
        alt="Logo Brand"
      >
      <img
        src="@/assets/imgs/brands/copy-right.png"
        class="logoVivo"
        alt="Logo Brand"
      >
    </nav>
    <div class="be-obrigado">
      <ResetPasswordForm :token="token" />
    </div>
  </div>
</template>

<script>
import ResetPasswordForm from '@/components/Login/ResetPasswordForm'
import api from '@/endpoints/atendente'

export default {
  components: {
    ResetPasswordForm
  },
  data () {
    return {
      token: ''
    }
  },
  created () {
    this.validateHash()
  },
  methods: {
    storeHash () {
      let hash = this.$route.path.split('/')
      hash = hash[hash.length - 1]

      this.token = hash
    },
    validateHash () {
      this.storeHash()
      api.checkReset(this.token).catch(reject => {
        // return this.$router.push('/erro')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.be-obrigado-main {
  @include d-flex(column);
  justify-content: space-around;
  align-items: center;
}
.be-obrigado-nav {
  width: $be-width-full;
  height: $be-height-navegation;
  background: $be-color-primary;
  @include d-flex(row, nowrap);
  justify-content: space-between;
  align-items: center;
  padding-left: $be-p-xl;
  padding-right: $be-p-xl;

  .logoVivo{
      max-width: 130px;
  }
}
.be-obrigado {
  background-color: white;
  margin-top:  $be-m-xl;
  width: 50%;
  border-radius: $be-radius-ml;
  @include d-flex(column);
  justify-content: space-around;
  align-items: center;
  margin-bottom: $be-m-xl;

  h2 {
    margin: $be-m-l;
    font-family: $be-font-title;
    font-size: $be-font-size-l;
  }
  img{
    margin: $be-m-xxl;
  }
}
</style>
