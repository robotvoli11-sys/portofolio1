import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/ThemeContext';
import { ToastProvider } from './components/Toast';
import { PortfolioProvider } from './utils/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Certificate from './components/Certificate';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Experience />
        <Certificate />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PortfolioProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<PortfolioPage />} />
            </Routes>
          </BrowserRouter>
        </PortfolioProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}


