import { IEventAggregator, inject } from "aurelia";
import { BoardGenerator } from "./core/board-generator";
import { Dictionary } from "./core/dictionary";
import { BoardSolver } from "./core/board-solver";
import { Cell, Word } from "./core/cell";

@inject(Dictionary, IEventAggregator)
export class Boggling {
	public message = 'Hello World!';

	private grid: Cell[][];
	private loadedPromise: Promise<void>;
	private foundWords: Map<string, number> = new Map<string, number>;
	private possibleWords: Set<string> = new Set<string>();

	constructor(private dictionary: Dictionary, private ea: IEventAggregator) {
		this.loadedPromise = dictionary.load("fr");
		this.ea.subscribe('wordSelected', (word: Word) => this.handleOnWordSelected(word));
	}

	public handleOnWordSelected(word: Word) {
		if (!word.isValid() || !this.dictionary.words.has(word.text)) {
			this.message = `${word.text} is not a valid word.`;
			return;
		}
		this.message = `You found a valid word: ${word.text}`;
		if (!this.foundWords.has(word.text) || this.foundWords.get(word.text) < word.score) {
			this.foundWords.set(word.text, word.score);
		}
	}

	public async play() {
		await this.loadedPromise;
		this.foundWords.clear();
		this.grid = BoardGenerator.generateStandardBoard4x4Cells();
		this.possibleWords = BoardSolver.findWords(this.grid, this.dictionary.trie);
	}

	public get totalScore(): number {
		let total = 0;
		for (let score of this.foundWords.values()) {
			total += score;
		}
		return total;
	}

}
