// Function to search books using inverted index for a phrase
function searchBooksByPhrase(phrase, invertedIndex, books) {
    const searchResults = [];
    const searchWords = phrase.toLowerCase().split(/\s+/);

    // Iterate over each word in the phrase
    for (let i = 0; i <= searchWords.length - 1; i++) {
        const word = searchWords[i];
        if (invertedIndex[word]) {
            // For each occurrence of the current word, check if the subsequent words match
            invertedIndex[word].forEach(({ bookId, page }) => {
                const content = books[bookId][page].join(' ').toLowerCase();
                const startIndex = content.indexOf(word);
                if (startIndex !== -1) {
                    let match = true;
                    // Check subsequent words in the phrase
                    for (let j = 1; j < searchWords.length; j++) {
                        const nextWord = searchWords[i + j];
                        const nextIndex = content.indexOf(nextWord, startIndex + 1);
                        if (nextIndex === -1 || nextIndex !== startIndex + nextWord.length + 1) {
                            match = false;
                            break;
                        }
                    }
                    // If all words in the phrase match consecutively, add to search results
                    if (match) {
                        searchResults.push({ bookId, page, content: books[bookId][page] });
                    }
                }
            });
        }
    }
    return searchResults;
}

// Example usage:
const phraseSearchTerm = 'lorem ipsum';
const phraseSearchResults = searchBooksByPhrase(phraseSearchTerm, invertedIndex, allBooks);
console.log('Phrase Search Results:', phraseSearchResults);