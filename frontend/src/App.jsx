import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { AppProvider } from './context/AppContext';
import './styles/variables.css';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app-layout">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
