function buildInvertedIndex(books) {
    const invertedIndex = {};
    for (const bookId in books) {
        const content = books[bookId];
        for (const page in content) {
            const words = content[page].join(' ').toLowerCase().split(/\s+/);
            for (const word of words) {
                if (!invertedIndex[word]) {
                    invertedIndex[word] = [];
                }
                invertedIndex[word].push({ bookId, page });
            }
        }
    }
    return invertedIndex;
}
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
const invertedIndex = buildInvertedIndex(allBooks);

/////////////////
const book1 = {
    "0": ["Lorem", "ipsum", "dolor", "sit", "amet"],
    "1": ["consectetur", "adipiscing", "elit"],
    "2": ["Sed", "do", "eiusmod", "tempor"]
};

const book2 = {
    "0": ["Ut", "enim", "ad", "minim", "veniam"],
    "1": ["quis", "nostrud", "exercitation", "ullamco"]
};

const book3 = {
    "0": ["Duis", "aute", "irure", "dolor", "in", "reprehenderit"],
    "1": ["voluptate", "velit", "esse", "Lorem", "dolore"]
};

const book4 = {
    "0": ["Excepteur", "sint", "occaecat", "cupidatat", "non", "proident"],
    "1": ["sunt", "in", "culpa", "qui", "officia"]
};

function buildInvertedIndex(books) {
    const invertedIndex = {};
    for (const bookId in books) {
        const content = books[bookId];
        for (const page in content) {
            const words = content[page].join(' ').toLowerCase().split(/\s+/);
            for (const word of words) {
                if (!invertedIndex[word]) {
                    invertedIndex[word] = [];
                }
                invertedIndex[word].push({ bookId, page });
            }
        }
    }
    return invertedIndex;
}
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
const allBooks = {
    "book1": book1,
    "book2": book2,
    "book3": book3,
    "book4": book4
};

// Example usage:
const invertedIndex = buildInvertedIndex(allBooks);


//////////////

function buildInvertedIndex(books) {
    const invertedIndex = {};
    for (const bookId in books) {
        const content = books[bookId];
        for (const page in content) {
            const words = content[page].join('');
            for (const word of words) {
                if (!invertedIndex[word]) {
                    invertedIndex[word] = [];
                }
                invertedIndex[word].push({ bookId, page });
            }
        }
    }
    return invertedIndex;
}
const book1 = {
    "0": ["Lorem", "ipsum", "dolor", "sit", "amet"],
    "1": ["consectetur", "adipiscing", "elit"],
    "2": ["Sed", "do", "eiusmod", "tempor"]
};

const book2 = {
    "0": ["Ut", "enim", "ad", "minim", "veniam"],
    "1": ["quis", "nostrud", "exercitation", "ullamco"]
};

const book3 = {
    "0": ["Duis", "aute", "irure", "dolor", "in", "reprehenderit"],
    "1": ["voluptate", "velit", "esse", "Lorem", "dolore"]
};

const book4 = {
    "0": ["Excepteur", "sint", "occaecat", "cupidatat", "non", "proident"],
    "1": ["sunt", "in", "culpa", "qui", "officia"]
};
const allBooks = {
    "book1": book1,
    "book2": book2,
    "book3": book3,
    "book4": book4
};
const invertedIndex = buildInvertedIndex(allBooks);