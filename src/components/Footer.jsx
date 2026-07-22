import React, { useEffect, useState } from 'react';
import { ArrowUp, Code2, Heart, Github, Linkedin, Instagram, Mail, Phone, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../utils/PortfolioContext';

export default function Footer() {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const firstName = PERSONAL_INFO.name ? PERSONAL_INFO.name.split(' ')[0] : 'Denish';

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Short Bio */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-blue-400">
                  <Code2 className="w-5 h-5" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {firstName}<span className="text-blue-500">.dev</span>
              </span>
            </a>


            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Menghadirkan antarmuka web modern, presisi tinggi, dan pengalaman pengguna yang luar biasa.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Navigasi Cepat</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Beranda</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Tentang Saya</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Skill & Keahlian</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portofolio Proyek</a></li>
              <li><a href="#experience" className="hover:text-cyan-400 transition-colors">Pengalaman Kerja</a></li>
              <li><a href="#certificates" className="hover:text-cyan-400 transition-colors">Sertifikat</a></li>
            </ul>
          </div>

          {/* Contact Quick Info */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Kontak Langsung</p>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </p>
              <p className="text-slate-500 text-[11px] pt-1">
                {PERSONAL_INFO.location} — Indonesia
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Dibuat dengan React & Tailwind CSS.</span>
            <span className="hidden sm:inline">•</span>
            <a href="/admin" className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </a>
          </div>

          {/* Back to Top Button with Circular Scroll Progress */}

          <button
            onClick={scrollToTop}
            className="group relative flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all shadow-lg"
            aria-label="Kembali ke atas"
          >
            <span>Kembali Ke Atas</span>
            <div className="relative w-6 h-6 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400 transition-all duration-150"
                  strokeDasharray={`${scrollProgress}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <ArrowUp className="w-3 h-3 absolute text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
