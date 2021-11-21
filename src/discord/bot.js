const { Client, Intents } = require('discord.js');
const { getCoinList, getCoinInCoinList, getCoinById } = require('../externalApis/coingecko');

module.exports={
    startBot(botToken) {
        const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        client.login(botToken);

        handleCoinListCache(client);

        return client;
    },
    startListener(client) {
        client.on('message', (message) => {
            const prefix = '!';
            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;
          
            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.split(' ');
            const command = args.shift().toLowerCase();
            handleCommand(command, args, message, client);
        });
    }
}

async function handleCoinListCache(client) {
    const isCached = await client.channels.cache.get('coins');
    
    if (isCached) {
        return;
    }

    const coinList = await getCoinList();

    client.channels.cache.set('coins', coinList);
}

async function handleCommand(command, args, message, client){
    const [coinSymbol] = args;

    const coinList = await client.channels.cache.get('coins');
        
    switch(command){
        case 'ping':
            message.channel.send('Pong!');
            break;
        case 'help':
            message.channel.send('Avaiable commands: !coin {coin name}\n Examples: \n !coin bcoin  ');
            break;
        case 'coin':
            const chosenCoin = await getCoinInCoinList(coinSymbol, coinList);
            
            if (!chosenCoin) {
                message.channel.send('We dont have this coin in our database.');
                
                break;
            }
        
            const coin = await getCoinById(chosenCoin.id);
            
            const messageFormated = formatMessage(coin.market_data.current_price, coinSymbol);
            message.channel.send('' + messageFormated);

            break;
        default:
            message.channel.send(`Unrecognized command: ${command}`);
            break;
    }
}

function formatMessage(coinPrice, coinName){
    const message=
    `
    Coin: ${coinName}
        BRL: R$ ${coinPrice.brl}
        USD: $ ${coinPrice.usd}
    `
    return message;
}
