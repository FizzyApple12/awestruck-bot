import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {z} from 'zod';
import {FC} from 'react';
import {ReadSequence} from '../sequences/Read';
import {StockImage} from '../sequences/StockImage';
import { TTSAudio } from '../sequences/TTSAudio';
import { PatternPart, PatternPartType } from '../PatternGenerator';
import { VIDEO_FADE_TIME } from '../config';

export const MainCompositionSchema = z.object({
	message: z.any(),
	author: z.any(),
    pattern: z.any()
});

export const MainComposition: FC<z.infer<typeof MainCompositionSchema>> = ({
	message,
	author,
    pattern
}) => {
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			<Audio volume={0.25} src={staticFile('music.mp3')} />

			{pattern.map((patternPart: PatternPart) => {
				switch (patternPart.part) {
					case PatternPartType.Read:
						return (
                            <TTSAudio text={patternPart.words} audioUrl={patternPart.audioFile} offset={patternPart.offset + VIDEO_FADE_TIME} length={patternPart.length} speed={1.0}/>
						);
					case PatternPartType.StockImage:
						return (
                            <TTSAudio text={patternPart.words} audioUrl={patternPart.audioFile} offset={patternPart.offset + VIDEO_FADE_TIME} length={patternPart.length} speed={0.25}/>
						);
					default:
						return null;
				}
			})}

			{pattern.map((patternPart: PatternPart) => {
				switch (patternPart.part) {
					case PatternPartType.Read:
						return (
							<ReadSequence
								message={message}
								author={author}
								pattern={patternPart}
							/>
						);
					case PatternPartType.StockImage:
						return <StockImage pattern={patternPart} />;
					default:
						return null;
				}
			})}
		</AbsoluteFill>
	);
};
