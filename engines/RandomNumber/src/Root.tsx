import {random} from 'remotion'
import {Composition} from 'remotion';
import {
	MainComposition,
	MainCompositionSchema,
} from './compositions/MainComposition';
import './style.css';
import {VIDEO_FADE_IN_TIME, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH} from './config';
import { RetrieveTTS } from './API/TTS';

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
                    message: {content: "I'm so silly"},
					numberToRender: 0,
                    audioUrl: ""
				}}
				calculateMetadata={async ({ props }) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const newNumber = Math.floor(9874568446 * random(props.message.content))

                    const {file, length} = await RetrieveTTS(`${newNumber}`);

					return {
						durationInFrames: Math.ceil((VIDEO_FADE_IN_TIME * VIDEO_FPS) + (length * VIDEO_FPS)),
						props: {
                            message: props.message,
                            numberToRender: newNumber,
                            audioUrl: file
						},
					};
				}}
			/>
		</>
	);
};
