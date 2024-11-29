import './App.css';

import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './pages/Admin/Dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      Hai
      <Footer />
    </div>
  );
};

export default App;
