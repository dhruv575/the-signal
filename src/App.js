import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/General/Navbar';
import Footer from './Components/General/Footer';
import AntiResume from './Pages/AntiResume';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import About from './Pages/About';
import Confessions from './Pages/Confessions';
import Articles from './Pages/Articles';
import ArticleDetail from './Pages/ArticleDetail';
import BlogInstructions from './Pages/BlogInstructions';
import PennThroughMyEyes from './Pages/PennThroughMyEyes';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/antiresume" element={<AntiResume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/throughmyeyes" element={<PennThroughMyEyes />} />
        <Route path="/about" element={<About />} />
        <Route path="/confessions" element={<Confessions />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/blog-instructions" element={<BlogInstructions />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

