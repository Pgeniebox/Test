// Assume invertedIndex is an object containing the inverted index data

// Function to reconstruct the content of a specific book referenced in the inverted index
function reconstructBookFromIndex(bookId, invertedIndex) {
    const bookContent = [];
    // Check each entry in the inverted index
    for (const term in invertedIndex) {
        for (const entry of invertedIndex[term]) {
            if (entry.bookId === bookId) {
               
                bookContent.push(term);
            }
        }
    }
    return bookContent;
}

// Example usage:
const bookId = "book1"; // Replace with the ID of the book you want to reconstruct
const reconstructedBook = reconstructBookFromIndex(bookId, invertedIndex);
console.log("Reconstructed Book:", reconstructedBook);

//////////////
const phraseSearchTerm = 'word0';
const phraseSearchResults = searchBooksByPhrase(phraseSearchTerm, invertedIndex, allBooks);
console.log('Phrase Search Results:', phraseSearchResults);

/////////////
