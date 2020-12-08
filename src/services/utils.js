/*
  Hummingbot Utils
*/
const lodash = require('lodash')

export const statusMessages = {
  ssl_cert_required: 'SSL Certificate required',
  ssl_cert_invalid: 'Invalid SSL Certificate',
  operation_error: 'Operation Error',
  no_pool_available: 'No Pool Available',
  invalid_token_symbol: 'Invalid Token Symbol',
}

export const latency = (startTime, endTime) => parseFloat((endTime - startTime) / 1000)

export const isValidParams = (params) => {
  const values = Object.values(params)
  for (let i = 0; i < values.length; i++) { // DO NOT use forEach, it returns callback without breaking the loop
    if (typeof values[i] === 'undefined') {
      throw new Error('Invalid input params')
    }
  }
  return true
}

export const isValidData = (data, format) => {
  if (typeof data !== 'undefined' && Object.keys(data).length !== 0 && lodash.isEqual(Object.keys(data).sort(), format.sort())) {
    return true
  }
  return false
}

export const getParamData = (data, format = null) => {
  const dataObject = {}
  if (format !== null) {
    if (isValidData(data, format)) {
      format.forEach((key, index) => {
        dataObject[key] = data[key]
      })
    }
  } else {
    Object.keys(data).forEach((key, index) => {
      dataObject[key] = data[key]
    })
  }
  return dataObject
}

export const splitParamData = (param, separator = ',') => {
  const dataArray = param.split(separator)
  return dataArray
}

export const getSymbols = (tradingPair) => {
  const symbols = tradingPair.split('-')
  const baseQuotePair = {
    base: symbols[0].toUpperCase(),
    quote: symbols[1].toUpperCase()
  }
  return baseQuotePair
}

export const reportConnectionError = (res, error) => {
  res.json({
    error: error.errno,
    code: error.code,
  })
}

export const strToDecimal = (str) => parseInt(str) / 100;

export const getHummingbotMemo = () => {
  const prefix = 'hbot'
  const clientId = process.env.HUMMINGBOT_CLIENT_ID || ''
  return [prefix, clientId].join('-')
}

export const loadConfig = () => {
  const config = {
    ethereum_rpc_url: process.env.ETHEREUM_RPC_URL,
    ethereum_chain: process.env.ETHEREUM_CHAIN,
    exchange_proxy: process.env.EXCHANGE_PROXY,
    react_app_subgraph_url: process.env.REACT_APP_SUBGRAPH_URL,
    uniswap_router: process.env.UNISWAP_ROUTER,
    terra_lcd_url: process.env.TERRA_LCD_URL,
    terra_chain: process.env.TERRA_CHAIN
  }
  return config
}
