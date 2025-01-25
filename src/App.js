import React from 'react';
import './App.css';

function App() {
  const handleNavigate = (url) => {
    window.location.href = url;
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Kitap Yönetim Sistemi</h1>
          <div>
            <button
                onClick={() => handleNavigate('AddBookModule.html')}
                className="App-button"
            >
              Kitap Ekle
            </button>
            <button
                onClick={() => handleNavigate('ListBookModule.html')}
                className="App-button"
            >
              Kitapları Listele
            </button>
            <button
                onClick={() => handleNavigate('CategorizeLibraryModule.html')}
                className="App-button"
            >
              Kategorileri Ayarla
            </button>
          </div>
        </header>
      </div>
  );
}

export default App;
