import {Composition} from 'remotion';
import {
	MainComposition,
	MainCompositionSchema,
} from './compositions/MainComposition';
import './style.css';
import {GeneratePattern} from './PatternGenerator';
import {VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH} from './config';

export const TestMessage = {
	channelId: '584003057314955276',
	guildId: '515203893412626435',
	id: '1246967574957133924',
	createdTimestamp: 1717370637407,
	type: 0,
	system: false,
	content: 'Make sure your website gets a healthy amount of sunlight',
	authorId: '313385355049041921',
	pinned: false,
	tts: false,
	nonce: null,
	embeds: [],
	components: [],
	attachments: [],
	stickers: [],
	position: null,
	roleSubscriptionData: null,
	resolved: null,
	editedTimestamp: null,
	mentions: {
		everyone: false,
		users: [],
		roles: [],
		crosspostedChannels: [],
		repliedUser: null,
		members: [],
		channels: [],
	},
	webhookId: null,
	groupActivityApplicationId: null,
	applicationId: null,
	activity: null,
	flags: 0,
	reference: null,
	interaction: null,
	poll: null,
	cleanContent: 'Make sure your website gets a healthy amount of sunlight',
};

export const TestAuthor = {
	id: '313385355049041921',
	bot: false,
	system: false,
	flags: 128,
	username: 'fizzyapple12',
	globalName: 'FizzyApple12',
	discriminator: '0',
	avatar: '318edd79887cd6ca8e5bfeac638313c2',
	banner: undefined,
	accentColor: undefined,
	avatarDecoration: null,
	createdTimestamp: 1494787291062,
	defaultAvatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
	hexAccentColor: undefined,
	tag: 'fizzyapple12',
	avatarURL:
		'https://cdn.discordapp.com/avatars/313385355049041921/2ca46b5853fbdc245c547efe876cf25e.webp?size=4096',
	displayAvatarURL:
		'https://cdn.discordapp.com/avatars/313385355049041921/2ca46b5853fbdc245c547efe876cf25e.webp?size=4096',
	bannerURL: undefined,
};

export type MessageType = typeof TestMessage;
export type AuthorType = typeof TestAuthor;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MainComposition"
				component={MainComposition}
				durationInFrames={1620}
				fps={VIDEO_FPS}
				width={VIDEO_WIDTH}
				height={VIDEO_HEIGHT}
				schema={MainCompositionSchema}
				defaultProps={{
					message: TestMessage,
					author: TestAuthor,
				}}
				calculateMetadata={async ({props}) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const message: any = props.message as any;
					const {pattern, length} = await GeneratePattern(
						message.content
					);

					return {
						durationInFrames: Math.ceil(length * VIDEO_FPS),
						props: {
							...props,
							pattern,
						},
					};
				}}
			/>
		</>
	);
};
