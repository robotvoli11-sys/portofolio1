import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PERSONAL_INFO as INITIAL_INFO,
  PROJECTS as INITIAL_PROJECTS,
  SKILLS as INITIAL_SKILLS,
  EXPERIENCES as INITIAL_EXPERIENCES,
  CERTIFICATES as INITIAL_CERTIFICATES,
  EDUCATION as INITIAL_EDUCATION
} from './data';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem('portfolio_personal_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasStaleData = parsed.email === 'denish.lutfian.dev@gmail.com' ||
          (parsed.location && parsed.location.includes('Jakarta')) ||
          (parsed.avatar && !parsed.avatar.startsWith('data:image/') && parsed.avatar !== PERSONAL_INFO.avatar) ||
          (parsed.stats && parsed.stats.some(s => s.label === 'Pengalaman PKL' || s.value === 'Aktif' || s.label === 'Kompetensi' || s.value === 'Dinas Perumahan'));
        if (hasStaleData) {
          localStorage.removeItem('portfolio_personal_info');
          return INITIAL_INFO;
        }
        return parsed;
      } catch (e) {
        return INITIAL_INFO;
      }
    }
    return INITIAL_INFO;
  });

  // Education State
  const [education, setEducation] = useState(() => {
    const saved = localStorage.getItem('portfolio_education');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(e => e.institution && e.institution.includes('Universitas Indonesia') || (e.achievements && e.achievements.some(a => a.includes('Siswa Aktif'))))) {
          localStorage.removeItem('portfolio_education');
          return INITIAL_EDUCATION;
        }
        return parsed;
      } catch (e) {
        return INITIAL_EDUCATION;
      }
    }
    return INITIAL_EDUCATION;
  });

  // Projects State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(p => p.title && p.title.includes('NexAnalytica'))) {
          return INITIAL_PROJECTS;
        }
        return parsed;
      } catch (e) {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });

  // Skills State
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('portfolio_skills');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(s => s.experience === '5+ tahun' || s.name === 'Pengelolaan Data' || s.name === 'Komunikasi Digital' || s.name === 'HTML5 & CSS3')) {
          localStorage.removeItem('portfolio_skills');
          return INITIAL_SKILLS;
        }
        return parsed;
      } catch (e) {
        return INITIAL_SKILLS;
      }
    }
    return INITIAL_SKILLS;
  });

  // Experiences State
  const [experiences, setExperiences] = useState(() => {
    const saved = localStorage.getItem('portfolio_experiences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(e => e.company && e.company.includes('PT Tech Innovation'))) {
          return INITIAL_EXPERIENCES;
        }
        return parsed;
      } catch (e) {
        return INITIAL_EXPERIENCES;
      }
    }
    return INITIAL_EXPERIENCES;
  });

  // Certificates State
  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('portfolio_certificates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(c => c.issuer && c.issuer.includes('Coursera & Meta'))) {
          return INITIAL_CERTIFICATES;
        }
        return parsed;
      } catch (e) {
        return INITIAL_CERTIFICATES;
      }
    }
    return INITIAL_CERTIFICATES;
  });

  // Contact Messages State
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('portfolio_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 1,
        name: "Budi Santoso",
        email: "budi.santoso@company.id",
        subject: "Penawaran Proyek Web E-Commerce",
        message: "Halo Denish, kami dari PT Solusi Digital bermaksud mengajukan proyek pembuatan marketplace khusus UMKM. Mohon hubungi kami kembali.",
        date: "2026-07-21 14:30",
        read: false
      },
      {
        id: 2,
        name: "Siti Rahma",
        email: "siti.rahma@startup.com",
        subject: "Undangan Interview Technical Lead",
        message: "Halo Denish, profil portofolio Anda sangat mengesan. Kami bermaksud mengundang Anda untuk sesi perkenalan tim teknis kami.",
        date: "2026-07-20 09:15",
        read: true
      }
    ];
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('portfolio_admin_logged_in') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Safe Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_personal_info', JSON.stringify(personalInfo));
    } catch (e) {
      console.warn('Gagal menyimpan personal info ke localStorage (mungkin ukuran gambar terlalu besar):', e);
    }
  }, [personalInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_education', JSON.stringify(education));
    } catch (e) {
      console.warn('Gagal menyimpan education ke localStorage:', e);
    }
  }, [education]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('Gagal menyimpan projects ke localStorage:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_skills', JSON.stringify(skills));
    } catch (e) {
      console.warn('Gagal menyimpan skills ke localStorage:', e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
    } catch (e) {
      console.warn('Gagal menyimpan experiences ke localStorage:', e);
    }
  }, [experiences]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_certificates', JSON.stringify(certificates));
    } catch (e) {
      console.warn('Gagal menyimpan certificates ke localStorage:', e);
    }
  }, [certificates]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Gagal menyimpan messages ke localStorage:', e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.warn('Gagal menyimpan admin login state ke localStorage:', e);
    }
  }, [isAdminLoggedIn]);

  // Auth Handler
  const loginAdmin = (username, password) => {
    if ((username === 'admin' && password === 'admin123') || (username === 'admin' && password === 'admin')) {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'Username atau password salah! (Gunakan: admin / admin123)' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // Actions for Personal Info
  const updatePersonalInfo = (newInfo) => {
    setPersonalInfo(prev => ({ ...prev, ...newInfo }));
  };

  // Actions for Projects
  const addProject = (project) => {
    const newProj = { ...project, id: Date.now() };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = (id, updatedFields) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Actions for Skills
  const addSkill = (skill) => {
    setSkills(prev => [...prev, skill]);
  };

  const updateSkill = (name, updatedFields) => {
    setSkills(prev => prev.map(s => s.name === name ? { ...s, ...updatedFields } : s));
  };

  const deleteSkill = (name) => {
    setSkills(prev => prev.filter(s => s.name !== name));
  };

  // Actions for Experiences
  const addExperience = (exp) => {
    setExperiences(prev => [exp, ...prev]);
  };

  const deleteExperience = (idx) => {
    setExperiences(prev => prev.filter((_, i) => i !== idx));
  };

  // Actions for Certificates
  const addCertificate = (cert) => {
    const newCert = { ...cert, id: Date.now() };
    setCertificates(prev => [newCert, ...prev]);
  };

  const deleteCertificate = (id) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  // Actions for Messages
  const addMessage = (msg) => {
    const newMsg = {
      id: Date.now(),
      ...msg,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      read: false
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const markMessageAsRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const resetAllData = () => {
    setPersonalInfo(INITIAL_INFO);
    setEducation(INITIAL_EDUCATION);
    setProjects(INITIAL_PROJECTS);
    setSkills(INITIAL_SKILLS);
    setExperiences(INITIAL_EXPERIENCES);
    setCertificates(INITIAL_CERTIFICATES);
    localStorage.removeItem('portfolio_personal_info');
    localStorage.removeItem('portfolio_education');
    localStorage.removeItem('portfolio_projects');
    localStorage.removeItem('portfolio_skills');
    localStorage.removeItem('portfolio_experiences');
    localStorage.removeItem('portfolio_certificates');
  };

  return (
    <PortfolioContext.Provider value={{
      personalInfo,
      updatePersonalInfo,
      education,
      projects,
      addProject,
      updateProject,
      deleteProject,
      skills,
      addSkill,
      updateSkill,
      deleteSkill,
      experiences,
      addExperience,
      deleteExperience,
      certificates,
      addCertificate,
      deleteCertificate,
      messages,
      addMessage,
      markMessageAsRead,
      deleteMessage,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      resetAllData
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};
