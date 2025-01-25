const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // İsteğe bağlı
            nodeIntegration: true, // Node.js modüllerine erişim
        },
    });

    mainWindow.loadURL('http://localhost:3000'); // React dev server
    // Build sonrası şu şekilde değiştirebilirsiniz:
    // mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
