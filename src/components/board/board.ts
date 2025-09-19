import { bindable, IEventAggregator, inject } from "aurelia";


// Boggle game board
@inject(IEventAggregator)
export class Board {

	@bindable
	private grid: string[][];
	private selected: boolean[][] = [];
	private selectedWord = '';
	private isSelecting = false;

	constructor(private ea: IEventAggregator) { }

	binded() {
		this.resetSelection();
	}

	resetSelection() {
		this.selected = this.grid.map(row => row.map(() => false));
		this.selectedWord = '';
		console.log("selected:");
		console.log(this.selected);
	}

	isSelectedCell(row: number, col: number) {
		if (!this.selected || !this.selected[row]) return false;
		return this.selected[row][col];
	}

	// get currentWord() {
	// 	const word: string[] = [];
	// 	for (let i = 0; i < this.grid.length; ++i) {
	// 		for (let j = 0; j < this.grid[i].length; ++j) {
	// 			if (this.selected[i][j]) word.push(this.grid[i][j]);
	// 		}
	// 	}
	// 	return word.join('');
	// }

	onCellMouseDown(row: number, col: number) {
		console.log(`Mouse down on cell (${row}, ${col})`);
		this.isSelecting = true;
		this.resetSelection();
		this.onCellMouseOver(row, col);
	}

	onCellMouseOver(row: number, col: number) {
		if (!this.isSelecting || this.selected[row][col])
			return;
		console.log(`Mouse over cell (${row}, ${col}) = ${this.grid[row][col]}`);
		// Optionally: check adjacency here
		this.selected[row][col] = true;
		this.selectedWord += this.grid[row][col];
	}

	onMouseUp() {
		this.isSelecting = false;
		// Do something with currentWord (e.g., check validity)
		this.ea.publish('wordSelected', this.selectedWord);
		this.resetSelection();
	}

	onMouseLeave() {
		this.isSelecting = false;
	}

}
