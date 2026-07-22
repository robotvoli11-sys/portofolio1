import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Code2, Database, Layout, Terminal, Sparkles, Filter } from 'lucide-react';
import { usePortfolio } from '../utils/PortfolioContext';


// Import icons from react-icons/si safely
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaPhp,
  FaGitAlt,
  FaGithub,
  FaFigma
} from 'react-icons/fa';

import {
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiFirebase
} from 'react-icons/si';

const ICON_MAP = {
  SiHtml5: FaHtml5,
  SiCss3: FaCss3Alt,
  SiJavascript: FaJs,
  SiReact: FaReact,
  SiTailwindcss: SiTailwindcss,
  SiNodedotjs: FaNodeJs,
  SiExpress: SiExpress,
  SiLaravel: FaLaravel,
  SiPhp: FaPhp,
  SiMysql: SiMysql,
  SiFirebase: SiFirebase,
  SiGit: FaGitAlt,
  SiGithub: FaGithub,
  SiFigma: FaFigma
};

const CATEGORIES = ['Semua', 'Front-End', 'Back-End', 'Database', 'Tools', 'UI/UX'];

export default function Skills() {
  const { skills: SKILLS } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('Semua');


  const filteredSkills = activeCategory === 'Semua'
    ? SKILLS
    : SKILLS.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-50">
      {/* Background Blobs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Keahlian & Teknologi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Teknologi & Toolsets <span className="text-gradient">Yang Saya Kuasai</span>
          </h2>
          <p className="mt-4 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Kumpulan teknologi modern yang saya gunakan sehari-hari untuk membangun produk digital berkualitas tinggi.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 glass-panel rounded-2xl border border-slate-800">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid with Stagger Animation */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = ICON_MAP[skill.icon] || Code2;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="group glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all duration-300 shadow-xl flex flex-col items-center text-center relative overflow-hidden"
                >
                  {/* Glowing Hover Background Overlay */}
                  <div
                    className="absolute -inset-1 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl pointer-events-none rounded-2xl"
                    style={{ backgroundColor: skill.color }}
                  />

                  {/* Icon Container */}
                  <div
                    className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-3xl mb-3 shadow-md group-hover:scale-110 transition-transform duration-300"
                    style={{ color: skill.color }}
                  >
                    <IconComponent />
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-slate-900 mb-1">
                    {skill.name}
                  </h3>

                  {/* Skill Experience Badge */}
                  <span className="text-[10px] text-slate-400 font-medium mb-3">
                    {skill.experience}
                  </span>

                  {/* Mini Progress Bar */}
                  <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color
                      }}
                    />
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 mt-1">
                    {skill.level}%
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
