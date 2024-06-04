// No types are available for this module, lets make some!
declare module 'parts-of-speech' {
	// Lexer
	export type RegExpDB = {[key: string]: RegExp};
	export const re: RegExpDB;

	export class LexerNode {
		string: string;
		children: LexerNode[];

		constructor(string: string, regex: RegExp, regexs: RegExpDB);

		fillArray: (array: LexerNode[]) => void;
		toString: () => string;
	}

	export class Lexer {
		regexs: RegExpDB;

		constructor();

		lex: (string: string) => LexerNode[];
	}

	// Tagger
	export type PartOfSpeech =
		| 'CC'
		| 'CD'
		| 'DT'
		| 'EX'
		| 'FW'
		| 'IN'
		| 'JJ'
		| 'JJR'
		| 'JJS'
		| 'LS'
		| 'MD'
		| 'NN'
		| 'NNP'
		| 'NNPS'
		| 'NNS'
		| 'POS'
		| 'PDT'
		| 'PP'
		| 'PRP'
		| 'RB'
		| 'RBR'
		| 'RBS'
		| 'RP'
		| 'SYM'
		| 'TO'
		| 'UH'
		| 'VB'
		| 'VBD'
		| 'VBG'
		| 'VBN'
		| 'VBP'
		| 'VBZ'
		| 'WDT'
		| 'WP'
		| 'WP'
		| 'WRB'
		| ','
		| '.'
		| ':'
		| '$'
		| '#'
		| '"'
		| '('
		| ')';

	export type Lexicon = {[key: string]: PartOfSpeech[]};

	export type TaggedSentence = [string, PartOfSpeech][];

	export class Tagger {
		lexicon: Lexicon;

		constructor();

		wordInLexicon: (word: string) => boolean;
		tag: (words: LexerNode[]) => TaggedSentence;
		prettyPrint: (taggedWords: TaggedSentence) => void;
		extendLexicon: (lexicon: Lexicon) => void;
	}
}
