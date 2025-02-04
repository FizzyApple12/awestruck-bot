import {useVideoConfig, Img, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {FC} from 'react';
import {StockImagePattern} from '../PatternGenerator';
import { VIDEO_FADE_TIME } from '../config';

export type StockImageProps = {
	pattern: StockImagePattern;
};

export const StockImage: FC<StockImageProps> = ({pattern}) => {
	const {fps} = useVideoConfig();

	return (
		<Sequence
			name={`Stock Image: "${pattern.words}"`}
			from={pattern.offset * fps}
			durationInFrames={(pattern.length + 2) * fps}
		>
			<StockImageRenderer pattern={pattern} />
		</Sequence>
	);
};

export type StockImageRendererProps = {
	pattern: StockImagePattern;
};

const StockImageRenderer: FC<StockImageRendererProps> = ({
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
		<Img
			style={{
				opacity: fadeInOpacity - fadeOutOpacity,
			}}
			className="object-contain absolute top-0 left-0 w-full h-full saturate-125 brightness-150 blur-[2px]"
			src={pattern.imageUrl}
		/>
	);
};
