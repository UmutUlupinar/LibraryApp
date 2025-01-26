const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL('http://localhost:3000'); // React uygulaması
});

ipcMain.on('save-book', (event, bookData) => {
    // "Data" klasörüne dosya kaydetme yolu
    const dirPath = path.join(__dirname, 'Data');
    const filePath = path.join(dirPath, 'books.json');

    // "Data" klasörünün var olup olmadığını kontrol et, yoksa oluştur
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    let books = [];
    // "books.json" dosyasını oku, varsa mevcut verileri al
    if (fs.existsSync(filePath)) {
        books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    books.push(bookData);

    // Yeni veriyi dosyaya yaz
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
    event.reply('book-saved', 'Kitap başarıyla kaydedildi!');
});

app.on('ready', () => {
    // Electron penceresini oluştur
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Preload scriptini bağla
        },
    });

    // React uygulamasını yükle
    // 1. Geliştirme ortamında:
    mainWindow.loadURL('http://localhost:3000'); // React geliştirme sunucusu
    // 2. Üretim ortamında (React build):
     //mainWindow.loadFile(path.join(__dirname, 'build/index.html'));
});

// Uygulama kapandığında ana pencereyi temizle
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
