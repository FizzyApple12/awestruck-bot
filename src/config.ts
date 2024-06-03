import {WebpackOverrideFn} from '@remotion/bundler';
import {Message} from 'discord.js';

import 'dotenv/config';

// Grab the credentials for Discord from the .env file (MAKE SURE TO HAVE THIS!)

export const CLIENT_ID: string = process.env.CLIENT_ID ?? '';
export const TOKEN: string = process.env.TOKEN ?? '';

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
};

// Available Render Engines:

import FiberOpticCableCoreConfig from '../engines/FiberOpticCableCore/botrender';
import {RenderMediaOptions} from '@remotion/renderer';

export const Engines: RenderConfig[] = [
	// Make sure to add your rendering engine here otherwise the bot won't know about it!
	FiberOpticCableCoreConfig,
];
