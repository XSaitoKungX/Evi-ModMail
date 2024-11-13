const colors = require('ansi-colors');

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            console.error(colors.red(`[INTERACTION CREATE] Command not found: ${commandName}`));
            return;
        }

        command.execute(interaction)
            .then(() => {
                console.log(colors.cyan(`[BOT] Command received: ${interaction.commandName}`));
            })
            .catch(error => {
                console.error(colors.red(`[INTERACTION CREATE] Error executing command '${commandName}':`), error);
                if (!interaction.replied && !interaction.deferred) {
                    interaction.reply({ content: 'There was an issue executing this command. Please try again later.', ephemeral: true })
                        .catch(replyError => console.error(colors.red(`[INTERACTION CREATE] Error sending error reply for command '${commandName}':`), replyError));
                }
            });
    },
};
