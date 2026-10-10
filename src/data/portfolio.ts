export const profile = {
  name: "Muhammad Ar Rafi Saifuddin",
  shortName: "Rafi",
  role: "Mobile App Developer",
  location: "Setu, Cipayung, Jakarta Timur, Indonesia",
  email: "pihlloi7@gmail.com",
  phone: "+62 822-1194-8634",
  phoneLink: "+6282211948634",
  github: "https://github.com/4Rvyi9host",
  linkedin: "https://www.linkedin.com/in/mhmmd-arrafi-b53248279/",
  portfolio: "https://4rvyi9host.github.io/portofolio",
  cv: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/cv-muhammad-ar-rafi-saifuddin.pdf`,
  // Uses the public avatar from the GitHub profile already linked in the CV/site.
  avatar: "https://github.com/4Rvyi9host.png?size=640",
  introduction:
    "Saya mahasiswa semester 7 Sistem Informasi di Universitas Bina Sarana Informatika, lulusan Teknik Komputer & Jaringan. Berbekal pengalaman IT support, pengelolaan basis data, dan riset data mining, saya sedang mengarahkan fokus ke pengembangan aplikasi mobile.",
  targetStack: ["Expo", "React Native", "TypeScript"],
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
    { name: "MySQL", group: "Database" },
    { name: "Database Administration", group: "Database" },
    { name: "PHP", group: "Development" },
    { name: "Laravel", group: "Development" },
    { name: "UI/UX Design", group: "Design" },
    { name: "Data Mining · Orange", group: "Research" },
    { name: "Pengelolaan Data & Pelaporan", group: "Tools" },
    { name: "Microsoft Office", group: "Tools" },
  ],
  softSkills: ["Problem solving", "Kerja tim", "Ketelitian", "Komunikasi"],
} as const;

export const socialLinks = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
] as const;
