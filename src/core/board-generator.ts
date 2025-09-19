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

	static generateStandardBoard4x4(): string[][] {
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
		const board: string[][] = [];
		for (let i = 0; i < 4; i++) {
			board[i] = [];
			for (let j = 0; j < 4; j++) {
				const die = dices[i * 4 + j];
				let letter = die[Math.floor(Math.random() * die.length)];
				if (letter === 'Q') letter = 'Qu'; // Special case for Q
				board[i][j] = letter;
			}
		}
		return board;
	}

}
