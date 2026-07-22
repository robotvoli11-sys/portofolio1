// Data Portofolio Denish Lutfian Wardana (Berdasarkan CV PDF)

import profileAvatar from '../assets/images/denish_profile_bromo_1784695914997.jpg';
import projectDashboard from '../assets/images/project_dashboard_mockup_1784691057311.jpg';
import projectEcommerce from '../assets/images/project_ecommerce_mockup_1784691073405.jpg';

export const PERSONAL_INFO = {
  name: "Denish Lutfian Wardana",
  title: "Rekayasa Perangkat Lunak (RPL)",
  location: "Pilang, Kec. Wonoayu, Kabupaten Sidoarjo, Jawa Timur",
  email: "denishlutfian2008@gmail.com",
  phone: "0821-4160-8571",
  whatsapp: "https://wa.me/6282141608571?text=Halo%20Denish,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda.",
  github: "https://github.com/denishlutfian",
  linkedin: "https://linkedin.com/in/denishlutfian",
  instagram: "https://instagram.com/denishlutfian",
  bioShort: "Siswa jurusan Rekayasa Perangkat Lunak (RPL) yang bertanggung jawab, teliti, memiliki motivasi tinggi untuk menerapkan ilmu yang dipelajari serta siap berkontribusi secara profesional.",
  bioLong: "Saya adalah siswa jurusan Rekayasa Perangkat Lunak (RPL) di SMKS Krian 1 Sidoarjo. Saya memiliki dedikasi tinggi, ketelitian, serta motivasi kuat dalam menerapkan ilmu rekayasa perangkat lunak, pengolahan data, dan teknologi informasi secara nyata. Siap berkontribusi secara profesional baik dalam tim maupun mandiri.",
  avatar: profileAvatar,
  cvUrl: "#",
  availability: "Terbuka untuk Magang, PKL & Proyek Rekayasa Perangkat Lunak",
  stats: [
    { label: "Jurusan", value: "RPL" },
    { label: "Sekolah", value: "SMKS Krian 1 Sidoarjo" },
    { label: "Lokasi", value: "Sidoarjo, Jawa Timur" },
    { label: "Status", value: "Siswa RPL" }
  ]
};

export const EDUCATION = [
  {
    institution: "SMKS KRIAN 1 SIDOARJO",
    degree: "Rekayasa Perangkat Lunak (RPL)",
    period: "2024 - Sekarang",
    description: "Mempelajari rekayasa perangkat lunak, pemrograman web & aplikasi, pengelolaan basis data, pengoperasian komputer, serta jaringan dasar.",
    achievements: [
      "Jurusan REKAYASA PERANGKAT LUNAK (RPL)",
      "Siswa Berdedikasi Tinggi & Siap Praktek Kerja Industri"
    ]
  },
  {
    institution: "MTS PROGRESIF BUMI SHOLAWAT",
    degree: "Pendidikan Menengah Pertama (MTs)",
    period: "2021 - 2024",
    description: "Menyelesaikan pendidikan menengah pertama dengan pembentukan karakter disiplin, kemandirian, dan fondasi akademis yang kuat."
  }
];

export const SKILLS = [
  { name: "Microsoft Word", category: "Tools", level: 92, icon: "SiMicrosoftword", color: "#2B579A", experience: "Mahir" },
  { name: "Microsoft Excel", category: "Tools", level: 90, icon: "SiMicrosoftexcel", color: "#1D6F42", experience: "Mahir" },
  { name: "Pengoperasian Komputer & Jaringan Dasar", category: "Tools", level: 88, icon: "SiPcgamingwiki", color: "#0078D4", experience: "Terampil" },
  { name: "Desain Grafis", category: "UI/UX", level: 85, icon: "SiFigma", color: "#F24E1E", experience: "Kreatif" },
  { name: "JavaScript", category: "Front-End", level: 80, icon: "SiJavascript", color: "#F7DF1E", experience: "Siswa RPL" },
  { name: "PHP & MySQL", category: "Back-End", level: 82, icon: "SiPhp", color: "#777BB4", experience: "Siswa RPL" },
  { name: "Git & GitHub", category: "Tools", level: 85, icon: "SiGit", color: "#F05032", experience: "Siswa RPL" }
];

export const SOFT_SKILLS = [
  "Tanggung Jawab & Disiplin Kerja Tinggi",
  "Ketelitian dalam Pengolahan Dokumentasi & Data",
  "Motivasi Tinggi Mempelajari Teknologi Baru",
  "Kolaborasi & Kerja Sama Tim",
  "Pemahaman Prosedur Kerja & Budaya Industri"
];

export const EXPERIENCES = [
  {
    role: "Praktik Kerja Lapangan (PKL)",
    company: "Dinas Perumahan Permukiman Cipta Karya dan Tata Ruang Kabupaten Sidoarjo",
    period: "Periode PKL",
    location: "Kabupaten Sidoarjo, Jawa Timur",
    type: "PKL / Magang",
    description: "Melakukan pengarsipan dokumen, pengolahan data, penyusunan laporan, serta mempelajari prosedur kerja dan kebijakan di Dinas Perumahan, Permukiman, Cipta Karya dan Tata Ruang Kabupaten Sidoarjo.",
    achievements: [
      "Pengarsipan dokumen dinas secara terstruktur dan teratur",
      "Pengolahan data operasional dan penyusunan laporan instansi",
      "Pemahaman prosedur kerja serta kebijakan lingkungan dinas kabupaten"
    ],
    technologies: ["Pengelolaan Data", "Microsoft Excel", "Microsoft Word", "Pengarsipan Dokumen"]
  },
  {
    role: "Peserta Kunjungan Industri",
    company: "PT. Kosmetikatama Super Indah",
    period: "Program Kunjungan Industri",
    location: "Jawa Timur, Indonesia",
    type: "Kunjungan Industri",
    description: "Mengikuti kegiatan kunjungan industri untuk mempelajari secara langsung suasana dan lingkungan kerja di bidang teknologi informasi. Kegiatan ini memberikan pengalaman nyata serta wawasan mengenai sistem kerja perusahaan, budaya kerja profesional, dan penerapan teknologi dalam menunjang kelancaran operasional industri.",
    achievements: [
      "Mempelajari sistem kerja perusahaan & budaya kerja profesional secara langsung",
      "Memahami penerapan teknologi informasi dalam menunjang operasional industri"
    ],
    technologies: ["Teknologi Informasi", "Budaya Kerja Industri", "Sistem Operasional IT"]
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "Sistem Pengarsipan Dokumen & Pengolahan Data Instansi",
    category: "Full-Stack",
    badge: "PKL Showcase",
    image: projectDashboard,
    description: "Sistem berbasis web untuk manajemen pengarsipan dokumen digital, pencarian berkas cepat, dan penyusunan laporan data operasional instansi.",
    longDescription: "Aplikasi pengarsipan dan pengolahan data terstruktur yang dikembangkan untuk mempermudah pencatatan berkas, pengelompokan dokumen, serta pembuatan rekapitulasi laporan secara efisien dan akurat.",
    technologies: ["PHP", "MySQL", "Bootstrap", "Microsoft Excel Integration"],
    demoUrl: "#",
    githubUrl: "https://github.com/denishlutfian/sistem-pengarsipan-data",
    features: [
      "Pengarsipan Dokumen Digital & Kategorisasi Berkas",
      "Live Search & Filter Data Pengarsipan Cepat",
      "Ekspor & Rekapitulasi Laporan ke Excel/PDF",
      "Antarmuka Responsif & Pengoperasian Mudah"
    ]
  },
  {
    id: 2,
    title: "Portofolio Digital RPL — Denish Lutfian Wardana",
    category: "Front-End",
    badge: "Featured",
    image: projectEcommerce,
    description: "Website portofolio interaktif dengan animasi modern, dark mode, panel admin pengubah konten, serta ringkasan riwayat pendidikan & PKL.",
    longDescription: "Website personal portofolio yang dibangun menggunakan React, Tailwind CSS, dan Framer Motion. Menampilkan informasi keahlian, riwayat pendidikan RPL, pengalaman PKL, serta fitur pesan langsung.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    demoUrl: "#",
    githubUrl: "https://github.com/denishlutfian/portfolio-denish",
    features: [
      "Desain Responsif dengan Animasi Smooth",
      "Panel Admin Manajemen Konten Real-time",
      "Fitur Kirim Pesan & Integrasi WhatsApp",
      "Mode Gelap (Dark Mode) & Terang Interaktif"
    ]
  },
  {
    id: 3,
    title: "Sistem Informasi & Pendataan Siswa Sekolah",
    category: "Full-Stack",
    badge: "Proyek RPL",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    description: "Aplikasi pengelolaan data siswa, kehadiran, dan rekapitulasi nilai berbasis web untuk lingkungan sekolah.",
    longDescription: "Sistem informasi berbasis web yang dirancang untuk mendukung pencatatan data akademis siswa, kehadiran harian, dan penyusunan laporan nilai dengan validasi data yang presisi.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    demoUrl: "#",
    githubUrl: "https://github.com/denishlutfian/sim-sekolah",
    features: [
      "Manajemen Data Siswa & Jurusan RPL",
      "Input Kehadiran & Rekap Nilai Otomatis",
      "Sistem Hak Akses Admin & Guru",
      "Visualisasi Ringkasan Data"
    ]
  }
];

export const CERTIFICATES = [
  {
    id: 1,
    title: "Sertifikat Praktik Kerja Lapangan (PKL)",
    issuer: "Dinas Perumahan Permukiman Cipta Karya dan Tata Ruang Kabupaten Sidoarjo",
    issueDate: "2024",
    credentialId: "PKL-SIDOARJO-2024",
    image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800",
    description: "Sertifikat kelulusan Praktik Kerja Lapangan dalam bidang pengarsipan dokumen, pengolahan data, dan penyusunan laporan operasional dinas.",
    verifyUrl: "#"
  },
  {
    id: 2,
    title: "Sertifikat Kunjungan Industri Teknologi Informasi",
    issuer: "PT. Kosmetikatama Super Indah",
    issueDate: "2024",
    credentialId: "KI-KOSMETIKATAMA-2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    description: "Sertifikat kepesertaan kunjungan industri mempelajari penerapan teknologi informasi dan sistem kerja operasional industri.",
    verifyUrl: "#"
  }
];

