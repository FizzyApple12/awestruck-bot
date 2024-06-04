import {useVideoConfig} from 'remotion';
import {Sequence, interpolate} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {FC} from 'react';
import {MessageComponent} from '../components/Message';
import {AuthorType, MessageType} from '../Root';
import {ReadPattern} from '../PatternGenerator';
import { VIDEO_FADE_TIME } from '../config';

export type ReadSequenceProps = {
	message: MessageType;
	author: AuthorType;

	pattern: ReadPattern;
};

export const ReadSequence: FC<ReadSequenceProps> = ({
	message,
	author,
	pattern,
}) => {
	const {fps} = useVideoConfig();

	return (
		<Sequence
            name={`Reading: "${pattern.words}"`}
			from={pattern.offset * fps}
			durationInFrames={(pattern.length + 2) * fps}
		>
			<ReadSequenceRenderer
				message={message}
				author={author}
				pattern={pattern}
			/>
		</Sequence>
	);
};

export type ReadSequenceRendererProps = {
	message: MessageType;
	author: AuthorType;

	pattern: ReadPattern;
};

const ReadSequenceRenderer: FC<ReadSequenceRendererProps> = ({
	message,
	author,
	pattern,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const fadeInOpacity = interpolate(frame, [0, VIDEO_FADE_TIME * fps], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const fadeOutOpacity = interpolate(
		frame,
		[(VIDEO_FADE_TIME * fps) + (fps * pattern.length), (2 * VIDEO_FADE_TIME * fps) + (fps * pattern.length)],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div
			style={{opacity: fadeInOpacity - fadeOutOpacity}}
			className="flex flex-row text-5xl font-bold leading-relaxed"
		>
			<MessageComponent
				content={message.content}
				username={author.globalName ?? author.username}
				avatar={author.displayAvatarURL ?? author.avatarURL}
			/>
		</div>
	);
};
