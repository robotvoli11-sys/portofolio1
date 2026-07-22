import React from 'react';
import { motion } from 'motion/react';
import { Download, Send, Sparkles, ArrowDown, Code, CheckCircle, Github, Linkedin, Instagram, User } from 'lucide-react';
import { usePortfolio } from '../utils/PortfolioContext';
import { useToast } from './Toast';

export default function Hero() {
  const { addToast } = useToast();
  const { personalInfo: PERSONAL_INFO } = usePortfolio();

  const handleDownloadCV = () => {
    addToast(`Mengunduh CV ${PERSONAL_INFO.name}...`, 'success');
  };


  const handleContactClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Glowing Ambient Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/20 light:bg-blue-400/10 rounded-full blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-300/10 rounded-full blur-[120px] pointer-events-none animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-medium mb-6 shadow-lg shadow-cyan-500/10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{PERSONAL_INFO.availability}</span>
            </motion.div>

            {/* Main Greeting Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 leading-tight mb-4">
              Halo, Saya <br className="hidden sm:inline" />
              <span className="text-gradient hover:brightness-110 transition-all">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Profession Title */}
            {PERSONAL_INFO.title && (
              <h2 className="text-lg sm:text-2xl font-semibold text-blue-400 dark:text-blue-400 light:text-blue-600 mb-6 flex items-center gap-2 justify-center lg:justify-start">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span>{PERSONAL_INFO.title}</span>
              </h2>
            )}

            {/* Bio Description */}
            <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-2xl mb-8 leading-relaxed">
              {PERSONAL_INFO.bioShort}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={handleContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                <span>Hubungi Saya</span>
              </a>

              <button
                onClick={handleDownloadCV}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 glass-panel border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/80 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Unduh CV</span>
              </button>
            </div>

            {/* Social Icons Links */}
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-400 light:text-slate-600">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Sosial:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-panel hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-110 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-panel hover:text-blue-400 hover:border-blue-500/40 hover:scale-110 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-panel hover:text-rose-400 hover:border-rose-500/40 hover:scale-110 transition-all"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

          </motion.div>

          {/* Right Profile Picture & Floating Glass Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96">
              {/* Animated Outer Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 animate-pulse" />

              {/* Main Avatar Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden glass-panel p-2 border-2 border-cyan-500/30 shadow-2xl flex items-center justify-center bg-slate-900/50">
                {PERSONAL_INFO.avatar ? (
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                    <User className="w-20 h-20 text-cyan-400 mb-3 opacity-80" />
                    <span className="text-sm font-bold text-slate-200">{PERSONAL_INFO.name}</span>
                    <span className="text-xs text-slate-400 mt-1">{PERSONAL_INFO.title}</span>
                  </div>
                )}
              </div>

              {/* Floating Badge 1: Rekayasa Perangkat Lunak */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 glass-panel px-4 py-2.5 rounded-2xl border border-cyan-500/30 flex items-center gap-3 shadow-xl backdrop-blur-xl"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white dark:text-white light:text-slate-900">Rekayasa Perangkat Lunak</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Siswa RPL</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Rekayasa & Data */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-4 glass-panel px-4 py-3 rounded-2xl border border-blue-500/30 flex items-center gap-3 shadow-xl backdrop-blur-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white dark:text-white light:text-slate-900">Teknologi & Data</p>
                  <p className="text-[10px] text-emerald-400 font-medium">Terampil & Teliti</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Stats Grid Footer in Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-blue-500/40 transition-all hover:-translate-y-1 group"
            >
              <p className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-400 light:text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('about');
              if (element) {
                const yOffset = -80;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="p-3 rounded-full glass-panel border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 animate-bounce transition-colors"
            aria-label="Scroll ke section Tentang Saya"
          >
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
