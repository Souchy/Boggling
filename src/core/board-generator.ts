import { Cell } from "./cell";

export class BoardGenerator {

	static generateRandomBoard(size: number): string[][] {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const board: string[][] = [];
		for (let i = 0; i < size; i++) {
			board[i] = [];
			for (let j = 0; j < size; j++) {
				let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
				if (letter === 'Q') letter = 'Qu'; // Special case for Q
				board[i][j] = letter;
			}
		}
		return board;
	}
	
	static generateStandardBoard4x4Cells(): Cell[][] {
		let scores = {
			'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4,
			'G': 2, 'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1,
			'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Qu': 10, 'R': 1,
			'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8,
			'Y': 4, 'Z': 10
		};
		let dices = [
			"ETUKNO", "EVGTIN", "DECAMP", "IELRUW",
			"EHIFSE", "RECALS", "ENTDOS", "OFXRIA",
			"NAVEDZ", "EIOATA", "GLENYU", "BMAQJO",
			"TLIBRA", "SPULTE", "AIMSOR", "ENHRIS"
		];
		// Shuffle dices
		for (let i = dices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[dices[i], dices[j]] = [dices[j], dices[i]];
		}
		// Roll dices and create board
		let id: number = 0;
		const board: Cell[][] = [];
		for (let i = 0; i < 4; i++) {
			board[i] = [];
			for (let j = 0; j < 4; j++) {
				const die = dices[i * 4 + j];
				let letter = die[Math.floor(Math.random() * die.length)];
				if (letter === 'Q') letter = 'Qu'; // Special case for Q
				const cell = new Cell();
				cell.id = id++;
				cell.row = i;
				cell.col = j;
				cell.letter = letter;
				cell.letterScore = scores[letter];
				cell.letterMultiplier = 1;
				cell.wordMultiplier = 1;
				board[i][j] = cell;
			}
		}
		return board;
	}

	static addWordMultipliers(board: Cell[][], count: number, multiplier: number): void {
		const size = board.length;
		let placed = 0;
	}

}
