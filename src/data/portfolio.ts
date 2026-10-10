const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const assetBasePath = configuredBasePath === "__ROOT__" ? "" : configuredBasePath ?? "";

export const profile = {
  name: "Muhammad Ar Rafi Saifuddin",
  shortName: "Rafi",
  role: "Mahasiswa Sistem Informasi",
  location: "Setu, Cipayung, Jakarta Timur, DKI Jakarta",
  email: "pihlloi7@gmail.com",
  phone: "+62 822-1194-8634",
  phoneLink: "+6282211948634",
  github: "https://github.com/4Rvyi9host",
  linkedin: "https://www.linkedin.com/in/mhmmd-arrafi-b53248279/",
  portfolio: "https://4rvyi9host.github.io/portofolio",
  cv: `${assetBasePath}/assets/cv-muhammad-ar-rafi-saifuddin.docx`,
  // Uses the public avatar from the GitHub profile already linked in the CV/site.
  avatar: "https://github.com/4Rvyi9host.png?size=640",
  introduction:
    "Mahasiswa semester 7 Sistem Informasi di Universitas Bina Sarana Informatika dan lulusan Teknik Komputer & Jaringan. Saya tertarik pada IT Support, dengan pengalaman magang menangani troubleshooting dan perawatan perangkat komputer. Saya juga memiliki sertifikasi Database Administrator BNSP dan Uji Kompetensi Sistem Basis Data PHPID, serta berkontribusi pada publikasi ilmiah terindeks nasional.",
  focusAreas: ["IT Support", "Database Administration", "Data Mining · Orange"],
  education: [
    {
      school: "Universitas Bina Sarana Informatika",
      program: "S1 Sistem Informasi",
      period: "2023—sekarang",
      note: "Semester 7",
    },
    {
      school: "SMK Prestasi Prima",
      program: "Teknik Komputer & Jaringan",
      period: "2020—2023",
    },
  ],
  skills: [
    { name: "IT Support", group: "Support" },
    { name: "Hardware & Software Troubleshooting", group: "Support" },
    { name: "Database Management & Administration", group: "Database" },
    { name: "MySQL", group: "Database" },
    { name: "UI/UX Design", group: "Design" },
    { name: "Pengelolaan Data & Pelaporan", group: "Tools" },
    { name: "Microsoft Office", group: "Tools" },
    { name: "Data Mining (Orange Data Mining)", group: "Research" },
    { name: "Laravel (Framework)", group: "Development" },
  ],
  softSkills: ["Problem solving", "Kerja tim", "Ketelitian", "Komunikasi"],
} as const;

export const socialLinks = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
] as const;
