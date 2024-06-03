function generateLargeAllBooksString(numBooks, numPages, numWordsPerPage) {
    const allBooks = {};
    for (let i = 1; i <= numBooks; i++) {
        const book = {};
        for (let j = 1; j <= numPages; j++) {
            const page = [];
            for (let k = 1; k <= numWordsPerPage; k++) {
                // Generate random word (for simplicity, using a fixed set of words)
                const word = `word${Math.floor(Math.random() * 1000)}`;
                page.push(word);
            }
            book[j] = page;
        }
        allBooks[`book${i}`] = book;
    }
    return allBooks;
}



// Generate large allBooks string
const numBooks = 10; // Number of books
const numPages = 1000; // Number of pages per book
const numWordsPerPage = 500; // Number of words per page
const allBooks = generateLargeAllBooksString(numBooks, numPages, numWordsPerPage);


// Function to generate a large JSON string representing allBooks data
function generateLargeAllBooksString(numBooks, numPages, numWordsPerPage) {
    const allBooks = {};
    for (let i = 1; i <= numBooks; i++) {
        const book = {};
        for (let j = 1; j <= numPages; j++) {
            const page = [];
            for (let k = 1; k <= numWordsPerPage; k++) {
                // Generate random word (for simplicity, using a fixed set of words)
                const word = `word${Math.floor(Math.random() * 1000)}`;
                page.push(word);
            }
            book[j] = page;
        }
        allBooks[`book${i}`] = book;
    }
    return allBooks;
}



// Generate large allBooks string
const numBooks = 10; // Number of books
const numPages = 1000; // Number of pages per book
const numWordsPerPage = 500; // Number of words per page
const allBooks = generateLargeAllBooksString(numBooks, numPages, numWordsPerPage);


// Function to generate a large JSON string representing allBooks data
function generateLargeAllBooksString(numBooks, numPages, numWordsPerPage) {
    const allBooks = {};
    for (let i = 1; i <= numBooks; i++) {
        const book = {};
        for (let j = 1; j <= numPages; j++) {
            const page = [];
            for (let k = 1; k <= numWordsPerPage; k++) {
                // Generate random word (for simplicity, using a fixed set of words)
                const word = `word${Math.floor(Math.random() * 1000)}`;
                page.push(word);
            }
            book[j] = page;
        }
        allBooks[`book${i}`] = book;
    }
    return JSON.stringify(allBooks);
}

// Function to download a file with the specified content
function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

// Generate large allBooks string
const numBooks = 10; // Number of books
const numPages = 1000; // Number of pages per book
const numWordsPerPage = 500; // Number of words per page
const largeAllBooksString = generateLargeAllBooksString(numBooks, numPages, numWordsPerPage);

// Download the generated JSON file
const filename = 'large_all_books.json';
downloadFile(largeAllBooksString, filename);
