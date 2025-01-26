const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// JSON verilerini parse etmek için middleware
app.use(express.json());

// Veriyi kaydetmek için bir API
app.post('/save-book', (req, res) => {
    const bookData = req.body;

    // Dosya yolu
    const filePath = path.join(__dirname, 'books.json');

    // Mevcut dosyayı oku ve yeni veriyi ekle
    fs.readFile(filePath, 'utf-8', (err, data) => {
        let books = [];
        if (!err && data) {
            books = JSON.parse(data); // Var olan verileri oku
        }
        books.push(bookData); // Yeni kitabı ekle

        // Dosyaya yaz
        fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Veri kaydedilemedi' });
            }
            res.status(200).json({ message: 'Veri başarıyla kaydedildi' });
        });
    });
});

// Server başlat
app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
