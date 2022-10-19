const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/'
  }
})
