import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../utils/PortfolioContext';
import { useToast } from './Toast';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Wrench,

  Briefcase,
  Award,
  Mail,
  LogOut,
  Lock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Save,
  X,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function AdminPanel() {
  const {
    personalInfo,
    updatePersonalInfo,
    projects,
    addProject,
    updateProject,
    deleteProject,
    skills,
    addSkill,
    deleteSkill,
    experiences,
    addExperience,
    deleteExperience,
    certificates,
    addCertificate,
    deleteCertificate,
    messages,
    markMessageAsRead,
    deleteMessage,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    resetAllData
  } = usePortfolio();

  const { addToast } = useToast();

  // Login Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Form States for CRUD
  const [infoForm, setInfoForm] = useState({ ...personalInfo });

  useEffect(() => {
    if (personalInfo) {
      setInfoForm({ ...personalInfo });
    }
  }, [personalInfo]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Web App',
    description: '',
    longDescription: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    tech: 'React, Tailwind CSS, Node.js',
    demoUrl: '#',
    githubUrl: '#',
    featured: false
  });

  const [showAddSkill, setShowAddSkill] = useState(false);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Front-End',
    level: 85,
    icon: 'FaCode'
  });

  const [showAddExp, setShowAddExp] = useState(false);
  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    period: '',
    type: 'Full-time',
    description: '',
    skills: 'React, Tailwind CSS, TypeScript'
  });

  const [showAddCert, setShowAddCert] = useState(false);
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    date: '2026',
    credentialId: '',
    credentialUrl: '#',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600',
    skills: ['React', 'JavaScript']
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const res = loginAdmin(username, password);
    if (res.success) {
      addToast('Berhasil masuk ke Admin Panel!', 'success');
      setLoginError('');
    } else {
      setLoginError(res.message);
      addToast(res.message, 'error');
    }
  };

  const handleQuickDemoLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    loginAdmin('admin', 'admin123');
    addToast('Masuk dengan akun demo admin!', 'success');
  };

  const handleSaveInfo = (e) => {
    e.preventDefault();
    updatePersonalInfo(infoForm);
    addToast('Profil berhasil diperbarui!', 'success');
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectForm.title) return addToast('Judul proyek harus diisi', 'error');

    const techArray = typeof projectForm.tech === 'string'
      ? projectForm.tech.split(',').map(t => t.trim())
      : projectForm.tech;

    if (editingProjectId) {
      updateProject(editingProjectId, {
        ...projectForm,
        tech: techArray
      });
      addToast('Proyek berhasil diperbarui!', 'success');
      setEditingProjectId(null);
    } else {
      addProject({
        ...projectForm,
        tech: techArray
      });
      addToast('Proyek baru berhasil ditambahkan!', 'success');
    }

    setProjectForm({
      title: '',
      category: 'Web App',
      description: '',
      longDescription: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      tech: 'React, Tailwind CSS, Node.js',
      demoUrl: '#',
      githubUrl: '#',
      featured: false
    });
    setShowAddProject(false);
  };

  const handleEditProjectClick = (p) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title || '',
      category: p.category || 'Web App',
      description: p.description || '',
      longDescription: p.longDescription || '',
      image: p.image || '',
      tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech || '',
      demoUrl: p.demoUrl || '#',
      githubUrl: p.githubUrl || '#',
      featured: !!p.featured
    });
    setShowAddProject(true);
  };

  const handleCreateSkill = (e) => {
    e.preventDefault();
    if (!skillForm.name) return addToast('Nama skill harus diisi', 'error');
    addSkill(skillForm);
    addToast(`Skill "${skillForm.name}" berhasil ditambahkan!`, 'success');
    setSkillForm({ name: '', category: 'Front-End', level: 85, icon: 'FaCode' });
    setShowAddSkill(false);
  };

  const handleCreateExp = (e) => {
    e.preventDefault();
    if (!expForm.role || !expForm.company) return addToast('Jabatan dan Perusahaan harus diisi', 'error');

    const skillsArray = typeof expForm.skills === 'string'
      ? expForm.skills.split(',').map(s => s.trim())
      : expForm.skills;

    addExperience({
      ...expForm,
      skills: skillsArray
    });
    addToast('Pengalaman kerja berhasil ditambahkan!', 'success');
    setExpForm({
      role: '',
      company: '',
      period: '',
      type: 'Full-time',
      description: '',
      skills: 'React, Tailwind CSS, TypeScript'
    });
    setShowAddExp(false);
  };

  const handleCreateCert = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return addToast('Judul dan Penerbit sertifikat harus diisi', 'error');

    const skillsArray = typeof certForm.skills === 'string'
      ? certForm.skills.split(',').map(s => s.trim())
      : certForm.skills;

    addCertificate({
      ...certForm,
      skills: skillsArray
    });
    addToast('Sertifikat berhasil ditambahkan!', 'success');
    setCertForm({
      title: '',
      issuer: '',
      date: '2026',
      credentialId: '',
      credentialUrl: '#',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600',
      skills: ['React', 'JavaScript']
    });
    setShowAddCert(false);
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;

  // Render Login View if not logged in
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-slate-950 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-cyan-400">
                <Lock className="w-7 h-7" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Panel Portfolio</h1>
            <p className="text-xs text-slate-400">
              Masuk untuk mengelola konten portofolio, proyek, skill, dan kotak pesan.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Masuk ke Admin Panel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-cyan-400 border border-slate-700/60 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Login Demo Cepat (admin / admin123)
            </button>

            <a
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 mt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Halaman Utama
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Main Layout
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Admin Header */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-cyan-400 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Dashboard Admin</h1>
                <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Aktif
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Kelola data portofolio <span className="text-blue-400 font-medium">{personalInfo.name}</span> secara langsung.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Lihat Website Live
            </a>

            <button
              onClick={() => {
                logoutAdmin();
                addToast('Berhasil keluar dari admin', 'info');
              }}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/20 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="glass-panel p-3 rounded-2xl border border-slate-800 space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center gap-3 ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Ringkasan Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setInfoForm({ ...personalInfo });
                  setActiveTab('profile');
                }}
                className={`w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center gap-3 ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profil Utama</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'projects'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Proyek</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800/80 text-slate-300">
                  {projects.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'skills'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wrench className="w-4 h-4" />
                  <span>Skill & Keahlian</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800/80 text-slate-300">
                  {skills.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'experience'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Pengalaman Kerja</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800/80 text-slate-300">
                  {experiences.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('certificates')}
                className={`w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'certificates'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4" />
                  <span>Sertifikat</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800/80 text-slate-300">
                  {certificates.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'messages'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>Pesan Masuk</span>
                </div>
                {unreadMessagesCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500 text-slate-950 font-bold">
                    {unreadMessagesCount} Baru
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800/80 text-slate-300">
                    {messages.length}
                  </span>
                )}
              </button>
            </div>

            {/* System Reset Box */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center">
              <p className="text-[11px] text-slate-400 mb-3">
                Ingin mengembalikan seluruh data portofolio ke pengaturan awal bawaan?
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Apakah Anda yakin ingin mereset seluruh data ke versi default?')) {
                    resetAllData();
                    addToast('Data portofolio telah direset ke default!', 'info');
                  }
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                Reset Data Default
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">

            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-white">{projects.length}</div>
                    <div className="text-xs text-slate-400 mt-1">Total Proyek</div>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-white">{skills.length}</div>
                    <div className="text-xs text-slate-400 mt-1">Total Skill</div>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-white">{experiences.length}</div>
                    <div className="text-xs text-slate-400 mt-1">Pengalaman</div>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-white">{messages.length}</div>
                    <div className="text-xs text-slate-400 mt-1">Pesan ({unreadMessagesCount} Baru)</div>
                  </div>
                </div>

                {/* Recent Messages Section */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-cyan-400" />
                      <span>Pesan Masuk Terbaru</span>
                    </h2>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs font-semibold text-blue-400 hover:text-cyan-300 transition-colors"
                    >
                      Lihat Semua ({messages.length}) →
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-8">Belum ada pesan masuk dari pengunjung.</p>
                  ) : (
                    <div className="space-y-3">
                      {messages.slice(0, 3).map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-xl border transition-all ${
                            msg.read
                              ? 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                              : 'bg-blue-950/30 border-blue-500/30 text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-bold text-white">{msg.name} ({msg.email})</span>
                            <span className="text-[10px] text-slate-400">{msg.date}</span>
                          </div>
                          <div className="text-xs font-semibold text-blue-400 mb-1">{msg.subject}</div>
                          <p className="text-xs text-slate-400 line-clamp-2">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE INFO */}
            {activeTab === 'profile' && (
              <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  <span>Edit Profil Utama</span>
                </h2>

                <form onSubmit={handleSaveInfo} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={infoForm.name || ''}
                        onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Gelar / Jabatan (Opsional)</label>
                      <input
                        type="text"
                        value={infoForm.title || ''}
                        onChange={(e) => setInfoForm({ ...infoForm, title: e.target.value })}
                        placeholder="Contoh: Senior Web Developer (atau kosongkan)"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Lokasi</label>
                      <input
                        type="text"
                        value={infoForm.location || ''}
                        onChange={(e) => setInfoForm({ ...infoForm, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Kontak</label>
                      <input
                        type="email"
                        value={infoForm.email || ''}
                        onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor Telepon</label>
                      <input
                        type="text"
                        value={infoForm.phone || ''}
                        onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Status Ketersediaan</label>
                      <input
                        type="text"
                        value={infoForm.availability || ''}
                        onChange={(e) => setInfoForm({ ...infoForm, availability: e.target.value })}
                        placeholder="Tersedia untuk Freelance & Full-time Roles"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Singkat (Ringkasan Hero)</label>
                    <textarea
                      rows={3}
                      value={infoForm.bioShort || ''}
                      onChange={(e) => setInfoForm({ ...infoForm, bioShort: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Lengkap (Tentang Saya)</label>
                    <textarea
                      rows={4}
                      value={infoForm.bioLong || ''}
                      onChange={(e) => setInfoForm({ ...infoForm, bioLong: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FolderGit2 className="w-5 h-5 text-blue-400" />
                      <span>Kelola Proyek Portfolio</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Tambah, edit, atau hapus proyek portofolio Anda.</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectForm({
                        title: '',
                        category: 'Web App',
                        description: '',
                        longDescription: '',
                        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
                        tech: 'React, Tailwind CSS, Node.js',
                        demoUrl: '#',
                        githubUrl: '#',
                        featured: false
                      });
                      setShowAddProject(!showAddProject);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    {showAddProject ? 'Batal' : 'Tambah Proyek Baru'}
                  </button>
                </div>

                {/* Add / Edit Project Form */}
                {showAddProject && (
                  <form onSubmit={handleCreateProject} className="glass-panel p-6 rounded-2xl border border-blue-500/30 space-y-4">
                    <h3 className="text-sm font-bold text-cyan-400 mb-2">
                      {editingProjectId ? 'Edit Proyek' : 'Form Tambah Proyek Baru'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Proyek</label>
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          placeholder="Nama Proyek"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        >
                          <option value="Web App">Web App</option>
                          <option value="SaaS Platform">SaaS Platform</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Teknologi (pisahkan dengan koma)</label>
                        <input
                          type="text"
                          value={projectForm.tech}
                          onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                          placeholder="React, Tailwind CSS, Firebase"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">URL Sampul Gambar</label>
                        <input
                          type="text"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">URL Live Demo</label>
                        <input
                          type="text"
                          value={projectForm.demoUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">URL GitHub Repository</label>
                        <input
                          type="text"
                          value={projectForm.githubUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Ringkas</label>
                      <textarea
                        rows={2}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-0"
                      />
                      <label htmlFor="featured" className="text-xs text-slate-300">Tampilkan sebagai Proyek Unggulan (Featured)</label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        {editingProjectId ? 'Simpan Perubahan' : 'Tambahkan Proyek'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Projects List */}
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p.id} className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={p.image} alt={p.title} className="w-16 h-12 rounded-lg object-cover bg-slate-900 border border-slate-800" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white">{p.title}</h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {p.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{p.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => handleEditProjectClick(p)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus proyek "${p.title}"?`)) {
                              deleteProject(p.id);
                              addToast('Proyek berhasil dihapus', 'info');
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SKILLS MANAGEMENT */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-cyan-400" />
                      <span>Kelola Skill & Keahlian</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Atur daftar kemampuan teknis yang ditampilkan di portofolio.</p>
                  </div>

                  <button
                    onClick={() => setShowAddSkill(!showAddSkill)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    {showAddSkill ? 'Batal' : 'Tambah Skill'}
                  </button>
                </div>

                {showAddSkill && (
                  <form onSubmit={handleCreateSkill} className="glass-panel p-6 rounded-2xl border border-blue-500/30 space-y-4">
                    <h3 className="text-sm font-bold text-cyan-400 mb-2">Form Tambah Skill Baru</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Skill</label>
                        <input
                          type="text"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          placeholder="misal: Vue.js / TypeScript"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
                        <select
                          value={skillForm.category}
                          onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        >
                          <option value="Front-End">Front-End</option>
                          <option value="Back-End">Back-End</option>
                          <option value="Database">Database</option>
                          <option value="Tools">Tools</option>
                          <option value="UI/UX">UI/UX</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Tingkat Penguasaan ({skillForm.level}%)</label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={skillForm.level}
                          onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
                          className="w-full accent-blue-500 my-2"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        Tambah Skill
                      </button>
                    </div>
                  </form>
                )}

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {skills.map((s, idx) => (
                    <div key={idx} className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{s.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{s.category} • {s.level}%</div>
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus skill "${s.name}"?`)) {
                            deleteSkill(s.name);
                            addToast('Skill dihapus', 'info');
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: EXPERIENCE MANAGEMENT */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-emerald-400" />
                      <span>Kelola Pengalaman Kerja</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Riwayat karir dan pengalaman profesional Anda.</p>
                  </div>

                  <button
                    onClick={() => setShowAddExp(!showAddExp)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    {showAddExp ? 'Batal' : 'Tambah Pengalaman'}
                  </button>
                </div>

                {showAddExp && (
                  <form onSubmit={handleCreateExp} className="glass-panel p-6 rounded-2xl border border-blue-500/30 space-y-4">
                    <h3 className="text-sm font-bold text-cyan-400 mb-2">Form Tambah Pengalaman Kerja</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Jabatan / Role</label>
                        <input
                          type="text"
                          value={expForm.role}
                          onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                          placeholder="misal: Senior Frontend Developer"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Perusahaan</label>
                        <input
                          type="text"
                          value={expForm.company}
                          onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                          placeholder="misal: PT Tech Solutions"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Periode</label>
                        <input
                          type="text"
                          value={expForm.period}
                          onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                          placeholder="2024 - Sekarang"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Tipe Kerja</label>
                        <input
                          type="text"
                          value={expForm.type}
                          onChange={(e) => setExpForm({ ...expForm, type: e.target.value })}
                          placeholder="Full-time / Contract / Freelance"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Tugas</label>
                      <textarea
                        rows={3}
                        value={expForm.description}
                        onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        Tambah Pengalaman
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="glass-panel p-4 rounded-xl border border-slate-800 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-white">{exp.role} — <span className="text-blue-400">{exp.company}</span></div>
                        <div className="text-xs text-slate-400 mt-0.5">{exp.period} • {exp.type}</div>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{exp.description}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus pengalaman di ${exp.company}?`)) {
                            deleteExperience(idx);
                            addToast('Pengalaman kerja dihapus', 'info');
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: CERTIFICATES MANAGEMENT */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span>Kelola Sertifikat & Lisensi</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Sertifikasi profesional dan pencapaian akademik.</p>
                  </div>

                  <button
                    onClick={() => setShowAddCert(!showAddCert)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    {showAddCert ? 'Batal' : 'Tambah Sertifikat'}
                  </button>
                </div>

                {showAddCert && (
                  <form onSubmit={handleCreateCert} className="glass-panel p-6 rounded-2xl border border-blue-500/30 space-y-4">
                    <h3 className="text-sm font-bold text-cyan-400 mb-2">Form Tambah Sertifikat</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Sertifikat</label>
                        <input
                          type="text"
                          value={certForm.title}
                          onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                          placeholder="Nama sertifikasi"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Penerbit (Issuer)</label>
                        <input
                          type="text"
                          value={certForm.issuer}
                          onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                          placeholder="Meta / Google / Dicoding"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Tanggal / Tahun</label>
                        <input
                          type="text"
                          value={certForm.date}
                          onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                          placeholder="2026"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">ID Kredensial</label>
                        <input
                          type="text"
                          value={certForm.credentialId}
                          onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                          placeholder="META-XYZ-123"
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        Tambah Sertifikat
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={cert.image} alt={cert.title} className="w-16 h-12 rounded-lg object-cover bg-slate-900 border border-slate-800" />
                        <div>
                          <div className="text-sm font-bold text-white">{cert.title}</div>
                          <div className="text-xs text-slate-400">{cert.issuer} • {cert.date}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus sertifikat "${cert.title}"?`)) {
                            deleteCertificate(cert.id);
                            addToast('Sertifikat dihapus', 'info');
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: MESSAGES INBOX */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <span>Kotak Masuk Pesan Pengunjung</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Pesan yang dikirim oleh pengunjung melalui form kontak.</p>
                  </div>
                </div>

                {messages.length === 0 ? (
                  <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center">
                    <Mail className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-xs text-slate-400">Belum ada pesan yang diterima.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`glass-panel p-5 rounded-2xl border transition-all ${
                          m.read
                            ? 'border-slate-800 text-slate-300'
                            : 'border-blue-500/40 bg-blue-950/20 text-white'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{m.name}</span>
                              {!m.read && (
                                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-400 text-slate-950">
                                  Baru
                                </span>
                              )}
                            </div>
                            <a href={`mailto:${m.email}`} className="text-xs text-blue-400 hover:underline">
                              {m.email}
                            </a>
                          </div>

                          <span className="text-[10px] text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                            {m.date}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-cyan-300 mb-2">Subjek: {m.subject}</div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800 mb-4 whitespace-pre-wrap">
                          {m.message}
                        </p>

                        <div className="flex items-center justify-end gap-2">
                          {!m.read && (
                            <button
                              onClick={() => {
                                markMessageAsRead(m.id);
                                addToast('Tandai sudah dibaca', 'success');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-semibold border border-blue-500/30 transition-colors flex items-center gap-1.5"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Tandai Dibaca
                            </button>
                          )}

                          <a
                            href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-colors flex items-center gap-1.5"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Balas Email
                          </a>

                          <button
                            onClick={() => {
                              if (window.confirm('Hapus pesan ini?')) {
                                deleteMessage(m.id);
                                addToast('Pesan dihapus', 'info');
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold border border-red-500/30 transition-colors flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
