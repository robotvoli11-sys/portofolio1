import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Download, Code2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';
import { useToast } from './Toast';
import { usePortfolio } from '../utils/PortfolioContext';

const NAV_ITEMS = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang Saya', href: '#about' },
  { label: 'Skill', href: '#skills' },
  { label: 'Portofolio', href: '#portfolio' },
  { label: 'Pengalaman', href: '#experience' },
  { label: 'Sertifikat', href: '#certificates' },
  { label: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const { personalInfo } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80; // Navbar offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleDownloadCV = () => {
    addToast(`Mengunduh CV ${personalInfo.name}...`, 'success');
    const link = document.createElement('a');
    link.href = '#';
    link.download = `CV_${personalInfo.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    setTimeout(() => {
      document.body.removeChild(link);
    }, 500);
  };

  const firstName = personalInfo.name ? personalInfo.name.split(' ')[0] : 'Denish';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 glass-nav shadow-lg border-b border-slate-800/50' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label={`Beranda ${personalInfo.name}`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-blue-400 group-hover:text-cyan-300 transition-colors">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white dark:text-white light:text-slate-900 leading-tight">
              {firstName}<span className="text-blue-500">.dev</span>
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 tracking-wider uppercase font-medium">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200/80 backdrop-blur-md p-1.5 rounded-full border border-slate-800/80 dark:border-slate-800/80 light:border-slate-300/80">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-md shadow-blue-500/20 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Dark mode toggle, Admin link & CV button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="/admin"
            className="px-3 py-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-cyan-400 border border-blue-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            title="Panel Admin Portfolio"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </a>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-slate-900/80 dark:bg-slate-800/80 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-cyan-400 border border-slate-800 dark:border-slate-700 light:border-slate-300 transition-all hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Ganti Tema Dark/Light"
            title={theme === 'dark' ? 'Ganti ke Moda Terang' : 'Ganti ke Moda Gelap'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={handleDownloadCV}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Unduh CV</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="/admin"
            className="p-2 rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/30 text-xs font-semibold flex items-center gap-1"
          >
            <ShieldCheck className="w-4 h-4" />
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700"
            aria-label="Ganti Tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-700 focus:outline-none"
            aria-label="Toggle Menu Mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass-panel border-t border-slate-800/80 mt-3 px-4 pt-3 pb-6 mx-4 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md'
                        : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                  </a>
                );
              })}

              <a
                href="/admin"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-cyan-400 bg-blue-500/10 border border-blue-500/30 mt-2"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Panel Admin Portfolio</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
                <button
                  onClick={handleDownloadCV}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh CV Lengkap</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

