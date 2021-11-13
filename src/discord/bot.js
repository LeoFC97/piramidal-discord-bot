const { Client, Intents } = require('discord.js');
const { getCoinPrice } = require('../externalApis/coingecko');

module.exports={
    startBot(botToken) {
        const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        client.login(botToken);
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
            handleCommand(command, args, message);
        });
    }
}

async function handleCommand(command, args, message){
    switch(command){
        case 'ping':
            message.channel.send('Pong!');
            break;
        case 'help':
            message.channel.send('Avaiable commands: !token {token name}\n !coin {coin name}\n Examples: \n !token bcoin \n !coin brl ');
            break;
        case 'coin':
            const coinPrice = await handleCoin(args);
            const messageFormated = formatMessage(coinPrice, args);
            message.channel.send('' + messageFormated);
            break;
        default:
            message.channel.send(`Unrecognized command: ${command}`);
            break;
    }
}

async function handleCoin(coin){
    const coinPrice = await getCoinPrice(coin);
    console.log(`coinPrice`);
    console.log(coinPrice);
    console.log('coinPrice');
    if(!coinPrice){
        return 'Coin not found';
    }
    return coinPrice;
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
