import { Trie } from "./trie";
import * as fs from 'fs';

export class Dictionary {

	public words: Set<string>;
	public trie: Trie;

	constructor() {
	}

	public async load(lang: string) {
		this.words = await this.loadWords(`dictionaries/${lang}.txt`);
		this.trie = this.trieWords(this.words);
	}

	async loadDictionaryFromPublic(filename: string): Promise<string[]> {
		const response = await fetch(`/${filename}`);
		if (!response.ok) throw new Error("Failed to load dictionary file");
		const text = await response.text();
		// Split into trimmed, non-empty lines
		return text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
	}

	private async loadWords(filePath: string): Promise<Set<string>> {
		const words = new Set<string>();
		// const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
		const lines = await this.loadDictionaryFromPublic(filePath);

		for (const line of lines) {
			const word = line.trim().toLowerCase();
			if (word) words.add(word);
		}
		return words;
	}

	private trieWords(words: Set<string>): Trie {
		const trie = new Trie();
		for (const word of words) {
			trie.insert(word);
		}
		return trie;
	}

}
