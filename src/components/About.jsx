import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, GraduationCap, Award, CheckCircle2, Sparkles, Layers, Cpu, Code2 } from 'lucide-react';
import { usePortfolio } from '../utils/PortfolioContext';
import { SOFT_SKILLS } from '../utils/data';

export default function About() {
  const { personalInfo: PERSONAL_INFO, education: EDUCATION, skills: SKILLS } = usePortfolio();
  const [activeTab, setActiveTab] = useState('profile');

  // Select top 6 skills for progress bar display
  const topSkills = SKILLS.slice(0, 6);


  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-100/60">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Tentang Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Mengenal Lebih Dekat <span className="text-gradient">Profil & Dedikasi Saya</span>
          </h2>
          <p className="mt-4 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Siswa jurusan Rekayasa Perangkat Lunak (RPL) yang berdedikasi tinggi, teliti, dan siap berkontribusi secara profesional.
          </p>
        </div>

        {/* Tab Buttons Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 glass-panel rounded-2xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profil Lengkap</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Pendidikan</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'skills'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Keahlian Utama</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl">
                <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <span>Filosofi Pengembang & Dedikasi Kode</span>
                </h3>
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                  {PERSONAL_INFO.bioLong}
                </p>
                <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed text-sm sm:text-base mb-8">
                  Dalam setiap proyek, saya tidak hanya menulis kode, tetapi juga merancang pengalaman interaktif yang estetis, mudah diakses, dan memiliki struktur arsitektur modular yang dapat dikembangkan lebih jauh tanpa hambatan teknik.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span className="text-xs text-slate-400">Lokasi: <strong className="text-slate-200">{PERSONAL_INFO.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-slate-400">Email: <strong className="text-slate-200">{PERSONAL_INFO.email}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs text-slate-400">Status: <strong className="text-emerald-400">Tersedia Kapan Saja</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-indigo-400" />
                    <span className="text-xs text-slate-400">Pengalaman: <strong className="text-slate-200">2+ Tahun</strong></span>
                  </div>
                </div>
              </div>

              {/* Soft Skills Card */}
              <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-6 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-400" />
                    <span>Soft Skills & Kemampuan Utama</span>
                  </h3>
                  <div className="space-y-4">
                    {SOFT_SKILLS.map((skill, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/80 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-4 rounded-2xl border border-blue-500/20">
                  <p className="text-xs text-cyan-300 font-semibold mb-1">Poin Utama:</p>
                  <p className="text-xs text-slate-400">Fokus pada penyelesaian masalah, kode bersih, dan komunikasi yang terbuka dengan tim maupun pemangku kepentingan.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 hover:border-blue-500/40 transition-all shadow-xl flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">{edu.institution}</h3>
                    <p className="text-sm font-semibold text-cyan-400">{edu.degree}</p>
                    <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mt-2">
                      {edu.description}
                    </p>

                    {edu.achievements && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80">
                        <p className="text-xs font-semibold text-slate-400 mb-2">Pencapaian:</p>
                        <ul className="space-y-1">
                          {edu.achievements.map((ach, aIdx) => (
                            <li key={aIdx} className="text-xs text-slate-300 flex items-center gap-2">
                              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>Tingkat Penguasaan Teknologi Utama</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        {skill.name}
                      </span>
                      <span className="text-xs font-bold text-cyan-400">{skill.level}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-3 rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-slate-700/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 shadow-md shadow-blue-500/30"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center pt-6 border-t border-slate-800/80">
                <a
                  href="#skills"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('skills');
                    if (element) {
                      const yOffset = -80;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Lihat Seluruh Grid Skill & Icon Teknologi →</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
