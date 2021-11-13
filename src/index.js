const { startBot, startListener } = require('./discord/bot');
const { botConfig } = require('./config/enviroment');


const client = startBot(botConfig.token);
startListener(client);
