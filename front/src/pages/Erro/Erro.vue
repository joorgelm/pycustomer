<template>
  <div class="be-erro-main">
    <nav class="be-nav be-erro-nav be-fixed">
      <img src="../../assets/imgs/brands/Brand.png" class="logo-vivo" alt="Logo Brand" />
    </nav>
    <div class="be-erro">
      <div>
        <img src="../../assets/imgs/illustrations/error_page.svg" alt="error" />
      </div>
      <h2 class="be-erro-text">Pagina não encontrada! :(</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.be-erro-main {
  @include d-flex(column);
  justify-content: space-around;
  align-items: center;
}
.be-erro-nav {
  width: $be-width-full;
  height: $be-height-navegation;
  background: $be-color-primary;
  @include d-flex(row, nowrap);
  justify-content: space-between;
  align-items: center;
  padding-left: $be-p-xl;
  padding-right: $be-p-xl;
  .logo-vivo{
    max-width: 130px;
  }
}
.be-erro-text {

    display: flex;
    align-items: center;
    justify-content: center;
}
.be-erro {
  background-color: white;
  margin-top: $be-m-xl;
  width: 60%;
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
  img {
    margin: $be-m-xxl;
  }
}
</style>
