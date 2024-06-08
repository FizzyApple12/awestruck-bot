import {Audio, useVideoConfig, Sequence} from 'remotion';
import {FC} from 'react';

export type TTSAudioProps = {
	text: string;
    audioUrl: string;

	offset: number;
	length: number;

	speed: number;
};

export const TTSAudio: FC<TTSAudioProps> = ({text, audioUrl, offset, length, speed}) => {
	const {fps} = useVideoConfig();

	return (
		<Sequence
			name={`TTS Audio: "${text}"`}
			from={offset * fps}
			durationInFrames={length * fps}
		>
			<Audio src={audioUrl} playbackRate={speed} />
		</Sequence>
	);
};
