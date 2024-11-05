import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/General/Navbar';
import Footer from './Components/General/Footer';
import AntiResume from './Pages/AntiResume';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import About from './Pages/About';
import Confessions from './Pages/Confessions';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/antiresume" element={<AntiResume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/confessions" element={<Confessions />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

