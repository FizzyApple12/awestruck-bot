import {interpolate, useCurrentFrame} from 'remotion'
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {z} from 'zod';
import {FC} from 'react';
import { TTSAudio } from '../sequences/TTSAudio';
import { VIDEO_FADE_IN_TIME } from '../config';

export const MainCompositionSchema = z.object({
	numberToRender: z.number(),
    audioUrl: z.string()
});

export const MainComposition: FC<z.infer<typeof MainCompositionSchema>> = ({
	numberToRender,
    audioUrl
}) => {
    const { fps, durationInFrames } = useVideoConfig();

    const frame = useCurrentFrame();

	const fadeInOpacity = interpolate(frame, [0, VIDEO_FADE_IN_TIME * fps], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			<TTSAudio text={`${numberToRender}`} audioUrl={audioUrl} offset={VIDEO_FADE_IN_TIME} length={durationInFrames / fps} speed={1.0}/>

            <p style={{ 
                opacity: fadeInOpacity,
                transform: "scaleX(0.17)",
                fontSize: "110vh"
            }}>
                {`${numberToRender}`}
            </p>
		</AbsoluteFill>
	);
};
