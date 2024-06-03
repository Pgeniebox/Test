function rebuildInvertedIndex(data) {
    const decodedData = atob(data); // Decode Base64 string
    const decompressedData = pako.inflate(decodedData, { to: 'string' }); // Decompress data
    const invertedIndex = JSON.parse(decompressedData); // Parse JSON string
    return invertedIndex;
}