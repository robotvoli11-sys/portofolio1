import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Copy, MapPin, ExternalLink, Github, Linkedin, Instagram } from 'lucide-react';
import { usePortfolio } from '../utils/PortfolioContext';
import { useToast } from './Toast';

export default function Contact() {
  const { addToast } = useToast();
  const { personalInfo, addMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Nama lengkap wajib diisi.';
    if (!formData.email.trim()) {
      errs.email = 'Email wajib diisi.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Format email tidak valid.';
    }
    if (!formData.subject.trim()) errs.subject = 'Subjek pesan wajib diisi.';
    if (!formData.message.trim()) {
      errs.message = 'Pesan tidak boleh kosong.';
    } else if (formData.message.length < 10) {
      errs.message = 'Pesan minimal berisi 10 karakter.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast('Harap periksa kembali input formulir Anda.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addMessage(formData);
      setIsSubmitting(false);
      addToast('Pesan Anda berhasil terkirim dan disimpan! Saya akan membalas segera.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    addToast('Email berhasil disalin ke clipboard!', 'info');
  };


  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-50">
      {/* Ambient background blob */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hubungi Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Mari Berdikusi & <span className="text-gradient">Bekerja Sama</span>
          </h2>
          <p className="mt-4 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Punya ide proyek menarik, tawaran pekerjaan, atau sekadar ingin menyapa? Kirimkan pesan melalui formulir di bawah ini atau hubungi saluran langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Side Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Card 1: Email */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-xl group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Email Resmi</p>
                    <p className="text-sm font-bold text-white dark:text-white light:text-slate-900">{personalInfo.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                  aria-label="Salin Email"
                  title="Salin Alamat Email"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Contact Card 2: WhatsApp */}
            <a
              href={personalInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-3xl border border-slate-800/80 hover:border-emerald-500/40 transition-all shadow-xl block group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">WhatsApp Direct</p>
                    <p className="text-sm font-bold text-white dark:text-white light:text-slate-900">{personalInfo.phone}</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* Quick Contact Card 3: Location */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Lokasi Kerja</p>
                  <p className="text-sm font-bold text-white dark:text-white light:text-slate-900">{personalInfo.location}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Terbuka untuk pekerjaan On-site, Hybrid, maupun Remote secara penuh di seluruh zona waktu.
              </p>
            </div>

            {/* Social Media Row */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 shadow-xl">
              <p className="text-xs font-semibold text-slate-400 mb-4">Ikuti Media Sosial Saya:</p>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 hover:border-cyan-500/40 transition-all"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 hover:border-blue-500/40 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 hover:border-rose-500/40 transition-all"
                >
                  <Instagram className="w-4 h-4 text-rose-400" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
              Kirim Pesan Langsung
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Isi formulir di bawah ini dan pesan Anda akan dikirimkan langsung ke inbox saya.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field: Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama Anda"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Field: Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Alamat Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Field: Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subjek Pesan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Contoh: Tawaran Proyek Web Application"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.subject ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.subject && <p className="text-[11px] text-rose-400 mt-1">{errors.subject}</p>}
              </div>

              {/* Field: Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Isi Pesan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan detail proyek atau kebutuhan Anda..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/30 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Mengirim Pesan...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
