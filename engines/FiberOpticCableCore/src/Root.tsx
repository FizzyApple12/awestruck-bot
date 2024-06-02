import {Composition} from 'remotion';
import {MainComposition, MainCompositionSchema} from './Composition';
import './style.css';

const TestMessage = {
	channelId: '515203893412626439',
	guildId: '515203893412626435',
	id: '1246680141116084365',
	createdTimestamp: 1717302107839,
	type: 0,
	system: false,
	content: "i'm now rendering videos with tailwind",
	author: {
		id: '313385355049041921',
		bot: false,
		system: false,
		flags: { bitfield: 128 },
		username: 'fizzyapple12',
		globalName: 'FizzyApple12',
		discriminator: '0',
		avatar: '318edd79887cd6ca8e5bfeac638313c2',
		banner: undefined,
		accentColor: undefined,
		avatarDecoration: null,
	},
	pinned: false,
	tts: false,
	nonce: null,
	embeds: [],
	components: [],
	attachments: {},
	stickers: {},
	position: null,
	roleSubscriptionData: null,
	resolved: null,
	editedTimestamp: null,
	reactions: {},
	mentions: {
		everyone: false,
		users: { },
		roles: { },
		_members: null,
		_channels: null,
		_parsedUsers: null,
		crosspostedChannels: {},
		repliedUser: null,
	},
	webhookId: null,
	groupActivityApplication: null,
	applicationId: null,
	activity: null,
	flags: { bitfield: 0 },
	reference: null,
	interaction: null,
	poll: null,
};

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MainComposition}
				durationInFrames={240}
				fps={60}
				width={1280}
				height={720}
				schema={MainCompositionSchema}
				defaultProps={{
					message: TestMessage,
				}}
			/>
		</>
	);
};
