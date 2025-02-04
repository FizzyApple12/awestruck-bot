import {RetrievePhoto} from './API/Photos';
import {RetrieveTTS} from './API/TTS';
import {VIDEO_FADE_TIME} from './config';

import {Lexer, PartOfSpeech, Tagger} from 'parts-of-speech';

export enum PatternPartType {
	Read,
	StockImage,
}

export type ReadPattern = {
	part: PatternPartType.Read;
	words: string;
	length: number;
	offset: number;
	audioFile: string;
};

export type StockImagePattern = {
	part: PatternPartType.StockImage;
	words: string;
	length: number;
	offset: number;
	audioFile: string;
	imageUrl: string;
};

export type PatternPart = ReadPattern | StockImagePattern;

export type Pattern = PatternPart[];

export const GeneratePattern = async (
	message: string
): Promise<{pattern: Pattern; length: number}> => {
	const speechSplitMessage: {part: PatternPartType; words: string}[] = [];

	const words = new Lexer().lex(message);
	const taggedWords = new Tagger().tag(words);

	let inImageWordSegment: boolean = false;
	let wordSegment: string = '';
	let imageWordSegment: string = '';

	const partsOfSpeechToBreakOn: PartOfSpeech[] = [
		// 'JJ',
		// 'JJR',
		// 'JJS',
		'NN',
		'NNP',
		'NNPS',
		'NNS',
	];

	for (const pair of taggedWords) {
		const word = pair[0];
		const tag = pair[1];

		if (inImageWordSegment) {
			if (!partsOfSpeechToBreakOn.includes(tag)) {
				speechSplitMessage.push({
					part: PatternPartType.Read,
					words: wordSegment,
				});
				speechSplitMessage.push({
					part: PatternPartType.StockImage,
					words: imageWordSegment,
				});

				wordSegment = '';
				imageWordSegment = '';

				inImageWordSegment = false;

				wordSegment += `${word} `;

				continue;
			}

			wordSegment += `${word} `;
			imageWordSegment += `${word} `;
		} else {
			if (partsOfSpeechToBreakOn.includes(tag)) {
				wordSegment += `${word} `;
				imageWordSegment += `${word} `;

				inImageWordSegment = true;

				continue;
			}

			wordSegment += `${word} `;
		}
	}

	if (inImageWordSegment) {
		if (wordSegment) {
			speechSplitMessage.push({
				part: PatternPartType.Read,
				words: wordSegment,
			});
		}
		if (imageWordSegment) {
			speechSplitMessage.push({
				part: PatternPartType.StockImage,
				words: imageWordSegment,
			});
		}
	} else if (wordSegment) {
		speechSplitMessage.push({
			part: PatternPartType.Read,
			words: wordSegment,
		});
	}

	const finalPattern: Pattern = [];
	let currentOffset = 0;

	for (const segment of speechSplitMessage) {
		const {file, length} = await RetrieveTTS(
			segment.words.replace(/"/g, '\\"')
		);

		switch (segment.part) {
			case PatternPartType.Read:
				finalPattern.push({
					part: segment.part,
					words: segment.words,
					length,
					offset: currentOffset,
					audioFile: file,
				});

				currentOffset += length + VIDEO_FADE_TIME * 2;
				break;
			case PatternPartType.StockImage:
				finalPattern.push({
					part: segment.part,
					words: segment.words,
					length: length * 3,
					offset: currentOffset,
					audioFile: file,
					imageUrl: await RetrievePhoto(segment.words),
				});

				currentOffset += length * 3 + VIDEO_FADE_TIME * 2;
				break;

			default:
				break;
		}
	}

	return {
		pattern: finalPattern,
		length: currentOffset,
	};
};
