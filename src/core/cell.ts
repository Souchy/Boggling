
export class Cell {
	public id: number;
	public row: number;
	public col: number;
	public letter: string;
	public letterScore: number = 1;
	public letterMultiplier: number = 1;
	public wordMultiplier: number = 1;
}

export class WordSelection {
	private text: string = "";
	private cells: Set<Cell> = new Set<Cell>();
	public addCell(cell: Cell) {
		this.text += cell.letter.toLowerCase();
		this.cells.add(cell);
	}
	public isValid(): boolean {
		return this.cells.size >= 3;
	}
	public score(): number {
		if (!this.isValid()) return 0; // Minimum word length is 3
		let total = 0;
		let wordMultiplier = 1;
		for (let cell of this.cells) {
			total += cell.letterScore * cell.letterMultiplier;
			wordMultiplier *= cell.wordMultiplier;
		}
		total = Math.max(1, total - 2); // Remove 2 so that 3 letters = 1 point, but minimum score is 1
		return total * wordMultiplier;
	}
	public word(): Word {
		return new Word(this.text, this.score());
	}
}

export class Word {
	constructor(public text: string, public score: number) { }
	public isValid(): boolean {
		return this.score > 0;
	}
}
