'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"/"',
  VUE_APP_ROOT_API: '"https://sandbox.conexasaude.com.br/api"'
})
