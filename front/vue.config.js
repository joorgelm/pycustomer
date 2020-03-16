module.exports = {

  filenameHashing: false,

  devServer: {
    proxy: 'http://localhost:8000'
  },

  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/style/sass/index.scss";`
      }
    },
    extract: false
  },
  outputDir: '../public',

  indexPath: process.env.NODE_ENV === 'production'
    ? '../resources/views/index.blade.php'
    : 'index.html'
}
