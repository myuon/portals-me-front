module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/global.scss";`
      }
    }
  }
};
