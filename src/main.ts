import { REST, Routes, Client, GatewayIntentBits, ApplicationCommandType, ContextMenuCommandBuilder, AttachmentBuilder } from 'discord.js';
import { CLIENT_ID, TOKEN, Engines } from './config';

const commands = [
    new ContextMenuCommandBuilder()
        .setName("generate")
        .setDMPermission(true)
        .setType(ApplicationCommandType.Message)
        .toJSON()
];

const rest = new REST({ version: '10' }).setToken(TOKEN);
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const RegisterSlashCommands = async () => {
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    
        console.log('Successfully created application commands.');
    } catch (error) {
        console.error(error);
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    // if (!interaction.isChatInputCommand()) return;
    if (!interaction.isMessageContextMenuCommand()) return;

    if (interaction.commandName === 'generate') {
        let message = interaction.options.data[0].message;

        if (message) {
            console.log(message);
    
            let waitingMessage = await interaction.reply({ content: 'Generating the video...', ephemeral: true });

            let file = Engines[0].generateVideo(message); // TODO: Select engine from user input (?)

            await message.reply({
                files: [
                    new AttachmentBuilder(file.data)
                        .setName(`${message.id}.${file.extension}`)
                        .setSpoiler(false)
                ]
            });

            await waitingMessage.delete();
        }
    }
});

RegisterSlashCommands();
client.login(TOKEN);
