import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { usePortfolio } from '../utils/PortfolioContext';

export default function Experience() {
  const { experiences: EXPERIENCES } = usePortfolio();

  return (

    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-50">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Pengalaman Kerja</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Jejak Karir & <span className="text-gradient">Pengalaman Profesional</span>
          </h2>
          <p className="mt-4 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Perjalanan praktik kerja dan kegiatan industri saya dalam mempelajari serta menerapkan ilmu rekayasa perangkat lunak.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-500 to-slate-800 sm:-translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Node */}
                  <div className="absolute left-4 sm:left-1/2 top-0 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/30 z-10">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  {/* Card Content Container */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl group">
                      
                      {/* Period & Company */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 text-xs font-semibold border border-blue-500/20">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-4">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-normal">{exp.type}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2 mb-5">
                        <p className="text-xs font-semibold text-slate-400">Pencapaian Utama:</p>
                        {exp.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-slate-900/80 text-slate-300 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
