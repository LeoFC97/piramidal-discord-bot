const axios = require('axios')
const { coingecko } = require('../config/enviroment')

module.exports={
  async getCoinList() {
    const response = await axios.get(`${coingecko.baseUrl}/coins/list`)
    return response.data
  },

  getCoinInCoinList(symbol, coinList) {
    return coinList.find((coin) => coin.symbol === symbol);
  },

  async getCoinById(id) {
    const response = await axios.get(`${coingecko.baseUrl}/coins/${id}`);
    
    return response.data; 
  }
}
