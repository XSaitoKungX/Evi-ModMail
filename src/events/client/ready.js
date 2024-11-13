const colors = require('ansi-colors');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(colors.green(`[BOT] Bot is ready! Logged in as ${client.user.username}`));
    },
};
