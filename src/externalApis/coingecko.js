const axios = require('axios')
const { coingecko } = require('../config/enviroment')
const { getContactByCoinName }  = require('../utils/contract')


module.exports={
  async getCoinPrice(coin, currencies=['usd','brl']){
    const contract = getContactByCoinName(coin)
    if(!contract){
      return false;
    }
    const htmlParsed = await axios.get(
        `${coingecko.baseUrl}/simple/token_price/binance-smart-chain/?contract_addresses=${contract}&vs_currencies=${currencies}`
    ).then((response) => {
      return response.data[contract];
    })
    .catch((error) => {
      console.log(error)
      return false;
    })
    return htmlParsed
  },
}
