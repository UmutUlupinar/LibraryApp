const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveBook: (book) => ipcRenderer.send('save-book', book),
    onBookSaved: (callback) => ipcRenderer.on('book-saved', (_, message) => callback(message)),
});
