import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Eye, ShieldCheck, Calendar } from 'lucide-react';
import { usePortfolio } from '../utils/PortfolioContext';
import CertificateModal from './CertificateModal';

export default function Certificate() {
  const { certificates: CERTIFICATES } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);


  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-100">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Sertifikat & Lisensi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Validasi & <span className="text-gradient">Sertifikasi Profesional</span>
          </h2>
          <p className="mt-4 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Pengakuan resmi atas keahlian teknis dan standar profesionalitas dari lembaga global terpercaya.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATES.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Certificate Image Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Terverifikasi</span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/50 backdrop-blur-xs">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg transition-transform hover:scale-105"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Sertifikat</span>
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5">
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span>{cert.issuer}</span>
                  </p>
                  <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 line-clamp-2 mb-2 group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-0 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 mt-auto pt-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  {cert.issueDate}
                </span>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Detail</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}
