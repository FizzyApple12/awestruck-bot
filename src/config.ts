import {WebpackOverrideFn} from '@remotion/bundler';
import {Message, User} from 'discord.js';
import {RenderMediaOptions} from '@remotion/renderer';

import 'dotenv/config';

// Grab the credentials for Discord from the .env file (MAKE SURE TO HAVE THIS!)

export const CLIENT_ID: string = process.env.CLIENT_ID ?? '';
export const TOKEN: string = process.env.TOKEN ?? '';

// For the Local API server

export const LOCAL_API_PORT: number = parseInt(process.env.LOCAL_API_PORT ?? '3198');

export const TTS_COMMAND: string = process.env.TTS_COMMAND ?? '';
export const TTS_RETURN_TYPE: string = process.env.TTS_RETURN_TYPE ?? '';

// If you need to add config parameters to the botrender.ts file, do that here
export type RenderConfig = {
	templateName: string;
	compositionName: string;
	entryPoint: string;
	renderOptions: Omit<
		RenderMediaOptions,
		'composition' | 'serveUrl' | 'codec' | 'outputLocation' | 'inputProps' // Remember to add any preset options inside the bot to this exclusion list to avoid conflicts
	>;
	webpackOverride: WebpackOverrideFn;
};

// Use this to configure the struct to pass in to the remotion video renderer
export type VideoInputProps = {
	message: Message<boolean>;
    author: User;
};

// Available Render Engines:

import FiberOpticCableCoreConfig from '../engines/FiberOpticCableCore/botrender';
import RandomNumberConfig from '../engines/RandomNumber/botrender';

export const Engines: RenderConfig[] = [
	// Make sure to add your rendering engine here otherwise the bot won't know about it!
	FiberOpticCableCoreConfig,
    RandomNumberConfig
];
