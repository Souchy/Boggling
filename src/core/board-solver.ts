import { Cell } from "./cell";
import { Trie } from "./trie";

const directions = [
	[-1, -1], [-1, 0], [-1, 1],
	[0, -1], [0, 1],
	[1, -1], [1, 0], [1, 1]
];

export class BoardSolver {

	static findWords(board: Cell[][], trie: Trie): Set<string> {
		const found = new Set<string>();
		const size = board.length;
		const visited = Array.from({ length: size }, () => Array(size).fill(false));

		function dfs(x: number, y: number, prefix: string) {
			if (
				x < 0 || y < 0 || x >= size || y >= size ||
				visited[x][y]
			) return;

			const word = prefix + board[x][y].letter.toLowerCase();
			if (!trie.isPrefix(word)) return;

			visited[x][y] = true;
			if (word.length >= 3 && trie.contains(word)) found.add(word);

			for (const [dx, dy] of directions) {
				dfs(x + dx, y + dy, word);
			}
			visited[x][y] = false;
		}

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				dfs(i, j, "");
			}
		}
		return found;
	}
	
}
