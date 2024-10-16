import React from 'react';
import './CSS/App.css';
import Navbar from './components/navbar';
import HomePage from './components/home_page';
import EpisodeCard from './components/episode_card';
import EpisodeDetail from './components/episode_detail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <HomePage />
        <Routes>
          {/* Ana sayfa, tüm bölümler burada gösterilecek */}
          <Route path="/" element={<EpisodeCard />} />
          {/* Seçilen bölüm detay sayfası */}
          <Route path="/episode/:id" element={<EpisodeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
