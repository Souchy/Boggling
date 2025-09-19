import { bindable, IEventAggregator, inject } from "aurelia";
import { Cell, WordSelection } from "../../core/cell";


// Boggle game board
@inject(IEventAggregator)
export class Board {

	@bindable
	private grid: Cell[][];
	private selected: boolean[][] = [];
	private selectedWord: WordSelection = new WordSelection();
	private isSelecting = false;

	constructor(private ea: IEventAggregator) { }

	binded() {
		this.resetSelection();
	}

	resetSelection() {
		this.selected = this.grid.map(row => row.map(() => false));
		this.selectedWord = new WordSelection();
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
		this.selectedWord.addCell(this.grid[row][col]);
		this.selected = [...this.selected];
	}

	onMouseUp() {
		this.isSelecting = false;
		// Do something with currentWord (e.g., check validity)
		this.ea.publish('wordSelected', this.selectedWord.word());
		this.resetSelection();
	}

	onMouseLeave() {
		this.isSelecting = false;
	}

}
