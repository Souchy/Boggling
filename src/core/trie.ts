class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEndOfWord: boolean = false;
}

export class Trie {
    root = new TrieNode();

    insert(word: string) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.isEndOfWord = true;
    }

    contains(word: string): boolean {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) return false;
            node = node.children.get(char)!;
        }
        return node.isEndOfWord;
    }

    isPrefix(prefix: string): boolean {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) return false;
            node = node.children.get(char)!;
        }
        return true;
    }
}
