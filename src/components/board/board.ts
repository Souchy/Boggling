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
	}

	isSelectedCell(row: number, col: number) {
		if (!this.selected || !this.selected[row]) return false;
		return this.selected[row][col];
	}

	onCellMouseDown(row: number, col: number) {
		this.isSelecting = true;
		this.resetSelection();
		this.onCellMouseOver(row, col);
	}

	onCellMouseOver(row: number, col: number) {
		if (!this.isSelecting || this.selected[row][col])
			return;
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
