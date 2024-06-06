function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('fs', 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore('handles', { keyPath: 'id' });
        };

        request.onsuccess = event => resolve(event.target.result);
        request.onerror = event => reject(event.target.error);
    });
}

// Store the directory handle in IndexedDB
async function storeDirectoryHandle(handle) {
    const db = await openDB();
    const tx = db.transaction('handles', 'readwrite');
    const store = tx.objectStore('handles');
    await store.put({ id: 'directory', handle });
    await tx.complete;
    db.close();
}

// Retrieve the directory handle from IndexedDB
async function getStoredDirectoryHandle() {
    const db = await openDB();
    const tx = db.transaction('handles', 'readonly');
    const store = tx.objectStore('handles');
    const request = store.get('directory');
    const entry = await new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
    db.close();
    return entry ? entry.handle : null;
}

async function postF() {
try {
        let directoryHandle = await getStoredDirectoryHandle();
        dir = directoryHandle;
        if (!directoryHandle) {
            directoryHandle = await window.showDirectoryPicker();
            await storeDirectoryHandle(directoryHandle);
        }
        const fileHandle = await directoryHandle.getFileHandle('sample.txt', { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write('Hello, this is a sample text file.');
        await writable.close();
        alert('File created successfully!');
    } catch (error) {
        console.error('Error creating file:', error);
        alert('Failed to create file.');
    }
}

    async function getF() {
        try {
        let directoryHandle = await getStoredDirectoryHandle();
        if (!directoryHandle) {
            directoryHandle = await window.showDirectoryPicker();
            await storeDirectoryHandle(directoryHandle);
        }
        const fileHandle = await directoryHandle.getFileHandle('sample.txt');
        const file = await fileHandle.getFile();
        const content = await file.text();
console.log(content);
    } catch (error) {
        console.error('Error reading file:', error);
        alert('Failed to read file.');
    }}
