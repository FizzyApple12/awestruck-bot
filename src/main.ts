import {
	REST,
	Routes,
	Client,
	GatewayIntentBits,
	ApplicationCommandType,
	ContextMenuCommandBuilder,
	AttachmentBuilder,
    InteractionResponse,
} from 'discord.js';
import {CLIENT_ID, TOKEN, Engines, RenderConfig, VideoInputProps} from './config';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderMedia, RenderMediaOptions, selectComposition} from '@remotion/renderer';
import { StartAPIServer } from './server';

// Lets start by making a map of the valid rendering engines turn them in to commands for Discord as well as a map we can reference when we recieve a command

type EngineMap = {[key: string]: RenderConfig};

// Map the Discord comamnd name as the key and the render config as the value
const commandNames: EngineMap = Engines.reduce((previous, current) => {
	let engineEntry: EngineMap = {};
	engineEntry[`Generate ${current.templateName}`] = current;

	Object.assign(previous, engineEntry);

	return previous;
}, {});

// Create the command builders and build them
const commands = Object.keys(commandNames).map((engineName) =>
	new ContextMenuCommandBuilder()
		.setName(engineName)
		.setDMPermission(true)
		.setType(ApplicationCommandType.Message)
		.toJSON()
);

// Create the REST API client as well as the websocket client

const rest = new REST({version: '10'}).setToken(TOKEN);
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// Get Remotion rocking and rolling to speed up render time

const chromiumOptions = {
    ignoreCertificateErrors: true,
    disableWebSecurity: true,
    headless: true,
    enableMultiProcessOnLinux: true,
};

openBrowser('chrome', {
	chromiumOptions
});

// A function to wrap rendering a remotion video and return a buffer with the contents in mp4 format (for max compatability)
const RenderRemotionVideo = async (inputProps: VideoInputProps, renderConfig: RenderConfig): Promise<Buffer | null> => {
    // Grab the project from the config
    const bundled = await bundle({
        entryPoint: renderConfig.entryPoint,
        webpackOverride: renderConfig.webpackOverride,
    });

    // Grab all valid environment variables that we need to run the video generator
    const validEnvironmentVariables: Record<string, string> = Object.keys(process.env).reduce((previous, current) => {
        const environmentVariableValue = process.env[current];

        if (environmentVariableValue) {
            let engineEntry: Record<string, string> = {};
            engineEntry[current] = environmentVariableValue;
    
            Object.assign(previous, engineEntry);
        }
    
        return previous;
    }, {});

    // Find the target composition from the config
    const composition = await selectComposition({
        serveUrl: bundled,
        id: renderConfig.compositionName,
        inputProps,
        envVariables: validEnvironmentVariables,
        chromiumOptions
    });

    // Create the base render options
    const videoRenderOptions: RenderMediaOptions = {
        composition,
        serveUrl: bundled,
        codec: 'h264',
        outputLocation: null,
        inputProps,
        envVariables: validEnvironmentVariables,
        chromiumOptions
    };

    // Add any optional render options to the base render options
	Object.assign(videoRenderOptions, renderConfig.renderOptions);

    try {
        // Render to a memory buffer so we can avoid file operations.
        const rendered = await renderMedia(videoRenderOptions);

        // Give back either a Buffer (on success) or null (on failure)
        return rendered.buffer;
    } catch (e) {
        // Some critical error occured, simply say that no video was rendered
        console.error("110: ", e)
        return null;
    }
}

// Let the log know that we are ready to go
client.on('ready', () => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    // Check if we're processing a menu command, just in case
    if (!interaction.isMessageContextMenuCommand()) return;

    let waitingMessage: InteractionResponse<boolean> | null = null;

	try {
        // Grab the active render config and the data needed for rendering
		let renderConfig = commandNames[interaction.commandName];
		let message = interaction.options.data[0].message;

        // Check that we do have a valid render config and message
		if (renderConfig && message) {
            // Let the user know we're doing something
			waitingMessage = await interaction.reply({
				content: `Generating the ${renderConfig.templateName} video...`,
				ephemeral: true,
			});

            // Render the video
			let videoBuffer = await RenderRemotionVideo({
                message,
                author: message.author
            }, renderConfig);

			if (videoBuffer) {
				try {
                    // Try to send the video in reply to the target message
					await message.reply({
                        content: `Generated by <@${interaction.user.id}>`,
						files: [
							new AttachmentBuilder(videoBuffer)
								.setName(`${message.id}.mp4`)
								.setSpoiler(false),
						],
					});

                    // Automatically attempt to clean up chat for the user
                    try {
                        await waitingMessage.delete();
                    } catch (e) {
                        // Message was probably already deleted
                    }
				} catch (e) {
					try {
                        // As a backup, send the message to the user only, perhaps the bot is lacking permissions to send a message?
						await waitingMessage.edit({
							files: [
								new AttachmentBuilder(videoBuffer)
									.setName(`${message.id}.mp4`)
									.setSpoiler(false),
							],
						});
					} catch (e) {
                        // Last ditch warning in case the video is too big or another error
                        console.error("175: ", e)
						await waitingMessage.edit({
							content:
								'There was an error sending the video, perhaps your message is too long?',
						});
					}
				}
			} else {
                // Oops, the engine failed to render the video!
				await waitingMessage.edit({
					content:
						'There was an error generating the video, please try again later.',
				});
			}
		} else {
            // The bot doesn't recognise the selected render engine or the target message was deleted at the perfect time to cause a problem
			await interaction.reply({
				content:
					'There was an error generating the video, please try again later.',
				ephemeral: true,
			});
		}
	} catch (e) {
		// Don't let the bot crash in case of an edge case I forgot :)
        console.error("199: ", e)

        try {
            if (waitingMessage) {
                // Try to edit the message
                await waitingMessage.edit({
                    content:
                        'There was an error generating the video, please try again later.',
                });
            } else {
                // Otherwise try to send a reply
                await interaction.reply({
                    content:
                        'There was an error generating the video, please try again later.',
                    ephemeral: true,
                });
            }
        } catch (e) {
            // Everything has failed, stop trying
        }
	}
});

// Log in to Discord (we can't use top level async statements so this is the next best thing)
(async () => {
    await StartAPIServer();

	await rest.put(Routes.applicationCommands(CLIENT_ID), {body: commands});
    await client.login(TOKEN);
})();