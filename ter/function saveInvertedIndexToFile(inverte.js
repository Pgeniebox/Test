function saveInvertedIndexToFile(invertedIndex, filename) {
    const invertedIndexJson = JSON.stringify(invertedIndex);
    const chunkSize = 512 * 512; // 1 MB chunk size
    const chunks = [];
    for (let i = 0; i < invertedIndexJson.length; i += chunkSize) {
        const chunk = invertedIndexJson.substring(i, i + chunkSize);
        const compressedData = pako.deflate(chunk); // Compress chunk
        const base64Data = btoa(String.fromCharCode.apply(null, compressedData)); // Encode compressed data to Base64
        chunks.push(base64Data);
    }
    const blob = new Blob(chunks, { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}



function saveInvertedIndexToFile(invertedIndex, filename) {
    const invertedIndexJson = JSON.stringify(invertedIndex);
    const chunkSize = 1024 * 1024; // 1 MB chunk size
    const chunks = [];
    for (let i = 0; i < invertedIndexJson.length; i += chunkSize) {
        const chunk = invertedIndexJson.substring(i, i + chunkSize);
        const compressedData = pako.deflate(chunk); // Compress chunk
        const base64Data = btoa(String.fromCharCode.apply(null, compressedData)); // Encode compressed data to Base64
        chunks.push(base64Data);
    }
    const blob = new Blob(chunks, { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}


function saveInvertedIndexToFile(invertedIndex, filename) {
    const invertedIndexJson = JSON.stringify(invertedIndex);
    const compressedData = pako.deflate(invertedIndexJson); // Using pako.js library for compression
    const base64Data = btoa(String.fromCharCode.apply(null, compressedData)); // Encode compressed data to Base64

    const blob = new Blob([base64Data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}


// Function to save inverted index to a file with compression and Base64 encoding
function saveInvertedIndexToFile(invertedIndex, filename) {
    const invertedIndexJson = JSON.stringify(invertedIndex);
    const compressedData = pako.deflate(invertedIndexJson); // Using pako.js library for compression
    const base64Data = btoa(String.fromCharCode.apply(null, compressedData)); // Encode compressed data to Base64

    const blob = new Blob([base64Data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

// Example usage:
const invertedIndex = buildInvertedIndex(allBooks);
const invertedIndexFilename = 'inverted_index.json';
saveInvertedIndexToFile(invertedIndex, invertedIndexFilename);