<template>
  <div class="be-full">
    <div class="be-login">
      <div class="be-login-brand">
        <!-- <img
          src="@/assets/imgs/brands/Brand.png"
          class="be-login-brand"
          alt="Logotipo Vivo"
        > -->
      </div>
      <login />
      <div class="be-login-copyright">
        <!-- <img
          src="@/assets/imgs/brands/copy-right.png"
          class="be-login-copyright-img"
          alt="Copyright 2019 Before"
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import login from '@/components/Login/Login'

export default {
  components: {
    login
  }
}
</script>

<style lang="scss">
.be-full {
  width: 100%;
  height: 100vh;
  position: relative;
  background: linear-gradient(to top, #058101f3, #009908ea),
    url("../../assets/imgs/backgrounds/bg-login.png") no-repeat !important;
  background-size: 100% 100%, 100% 100% !important;
}
.be-login {
  //Defualt Style
  margin-top: 5%;
  max-height: 50%;
  max-width: 412px;
  margin: 0 auto;
  @include animated(initLogin);
  animation-delay: 200ms;

  //Viewport mobile sm
  @include viewport(sm) {
    @include animated(none);
    transform: translateY(0%);
  }

  //Logo brand
  .be-login-brand {
    text-align: center;
    width: 100%;
    height: auto;
    padding-bottom: $be-p-s;
    box-sizing: content-box;
    //Style Brand
    .be-login-brand {
      width: 148px;
      max-width: 148px;
      max-height: $be-height-navegation;
      user-select: none;
    }
  }

  //Copyright
  .be-login-copyright {
    text-align: center;
    width: 100%;
    height: auto;
    padding-top: $be-m-xl;
    box-sizing: content-box;

    //Style Copyright
    .be-login-copyright-img {
      width: 149px;
      max-width: 149px;
      max-height: 18px;
      user-select: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .be-full {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
}
</style>
