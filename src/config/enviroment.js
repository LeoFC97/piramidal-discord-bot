require('dotenv').config();

module.exports = {
    botConfig: {
        token: process.env.BOT_TOKEN || '',
    },
    coingecko: {
        baseUrl: 'https://api.coingecko.com/api/v3',
    },
    networks: {
        binanceSmartChain: 'binance-smart-chain' 
    } 
}
