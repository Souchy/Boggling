import { IEventAggregator, inject } from "aurelia";
import { BoardGenerator } from "./core/board-generator";
import { Dictionary } from "./core/dictionary";
import { BoardSolver } from "./core/board-solver";

@inject(Dictionary, IEventAggregator)
export class Boggling {
	public message = 'Hello World!';

	private grid: string[][];
	private loadedPromise: Promise<void>;
	private foundWords: Set<string> = new Set<string>();
	public possibleWords: Set<string> = new Set<string>();

	constructor(private dictionary: Dictionary, private ea: IEventAggregator) {
		this.loadedPromise = dictionary.load("fr");
		this.ea.subscribe('wordSelected', (word: string) => this.handleOnWordSelected(word));
	}

	public handleOnWordSelected(word: string) {
		if (this.dictionary.words.has(word.toLowerCase())) {
			this.message = `You found a valid word: ${word}`;
			this.foundWords.add(word.toLowerCase());
		} else {
			this.message = `${word} is not a valid word.`;
		}
	}

	public async play() {
		await this.loadedPromise;
		this.foundWords.clear();
		this.grid = BoardGenerator.generateStandardBoard4x4();
		this.possibleWords = BoardSolver.findWords(this.grid, this.dictionary.trie);
	}

}
