export type ProjectKind = "Riset" | "Pengalaman" | "Sertifikasi";

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  year: string;
  summary: string;
  stack: string[];
  accent: "mint" | "violet" | "amber";
  featured?: boolean;
  externalUrl?: string;
  externalLabel?: string;
  facts: { label: string; value: string }[];
  caseStudy: {
    context: string;
    role: string;
    process: string[];
    solution: string;
    outcome: string;
    galleryNote: string;
  };
};

// Data portofolio terpusat di sini supaya proyek dan case study mudah diperbarui.
export const projects: Project[] = [
  {
    slug: "klasifikasi-jamur-c45-naive-bayes",
    title: "Analisis Perbandingan Hasil Kerja Algoritma C4.5 dan Naive Bayes dalam Mengenali Spesies Jamur yang Beracun",
    kind: "Riset",
    year: "2026",
    summary:
      "Analisis perbandingan algoritma C4.5 dan Naive Bayes untuk mengenali spesies jamur beracun.",
    stack: ["Orange Data Mining", "C4.5", "Naive Bayes", "10-fold cross validation"],
    accent: "mint",
    featured: true,
    externalUrl: "https://doi.org/10.23960/jitet.v14i2.9084",
    externalLabel: "Baca publikasi",
    facts: [
      { label: "Algoritma dengan hasil tertinggi", value: "C4.5" },
      { label: "Akurasi tercatat", value: "98,5%" },
      { label: "Validasi", value: "10-fold cross validation" },
      { label: "Publikasi", value: "JITET Vol. 14 No. 2 · ISSN 2830-7062" },
    ],
    caseStudy: {
      context:
        "Penelitian membandingkan hasil algoritma C4.5 dan Naive Bayes dalam mengenali spesies jamur beracun menggunakan dataset Mushroom.",
      role:
        "Penulis bersama Bagas Muizul Rohmadan, Muhammad Alfa Reza, Naufal Shafly Fawwaz, dan Khairy Mumtaz Alhafidz. Berperan menganalisis dan membandingkan performa algoritma pada dataset yang digunakan.",
      process: [
        "Menggunakan dataset Mushroom yang telah tersedia.",
        "Menjalankan klasifikasi dengan C4.5 dan Naive Bayes melalui Orange Data Mining.",
        "Mengevaluasi performa menggunakan metode 10-fold cross validation.",
      ],
      solution:
        "Menyusun analisis komparatif dua algoritma untuk mengukur kinerjanya pada tugas klasifikasi spesies jamur.",
      outcome:
        "C4.5 memperoleh akurasi 98,5%. Penelitian diterbitkan pada Jurnal Informatika dan Teknik Elektro Terapan (JITET), Vol. 14 No. 2 (2026), Universitas Lampung.",
      galleryNote:
        "Visual di bawah adalah ilustrasi editorial untuk merangkum temuan riset, bukan tangkapan layar Orange Data Mining.",
    },
  },
  {
    slug: "praktik-kerja-teknisi-komputer",
    title: "Praktik Kerja Lapangan · IT Support",
    kind: "Pengalaman",
    year: "2022",
    summary:
      "Pengalaman sebagai teknisi komputer: troubleshooting, perawatan berkala, dan instalasi perangkat lunak.",
    stack: ["IT Support", "Hardware", "Software", "Operating Systems"],
    accent: "amber",
    externalLabel: "April—Juni 2022",
    facts: [
      { label: "Tempat", value: "Toko Service Komputer" },
      { label: "Perangkat", value: "Laptop & komputer" },
      { label: "Periode", value: "April—Juni 2022" },
    ],
    caseStudy: {
      context:
        "Praktik kerja lapangan di toko servis komputer, menangani perangkat laptop dan komputer milik pelanggan.",
      role: "Peserta PKL dengan tanggung jawab teknisi komputer.",
      process: [
        "Melakukan troubleshooting pada permasalahan software dan hardware.",
        "Membantu perawatan berkala perangkat komputer.",
        "Membantu instalasi aplikasi dan sistem operasi.",
      ],
      solution:
        "Mendukung proses pemeriksaan, perawatan, dan penyiapan ulang perangkat sesuai kebutuhan servis.",
      outcome:
        "Mendapat pengalaman langsung menangani kebutuhan servis perangkat komputer dan berkomunikasi seputar masalah teknis.",
      galleryNote:
        "Ilustrasi perangkat di sini adalah visual pengganti; dokumentasi tempat PKL tidak tersedia pada CV.",
    },
  },
  {
    slug: "sertifikasi-database-administrator-bnsp",
    title: "Database Administrator · BNSP",
    kind: "Sertifikasi",
    year: "2026—2029",
    summary:
      "Sertifikat Kompetensi Database Administrator dari Badan Nasional Sertifikasi Profesi.",
    stack: ["Database Administration", "BNSP", "Sertifikat Kompetensi"],
    accent: "violet",
    facts: [
      { label: "Penerbit", value: "BNSP" },
      { label: "Masa berlaku", value: "Maret 2026—Maret 2029" },
    ],
    caseStudy: {
      context:
        "Sertifikasi kompetensi nasional di bidang administrasi basis data.",
      role: "Pemegang Sertifikat Kompetensi Database Administrator.",
      process: [
        "Mengikuti proses sertifikasi kompetensi bidang Database Administrator.",
        "Memperoleh sertifikat yang berlaku mulai Maret 2026.",
      ],
      solution:
        "Sertifikasi ini melengkapi pengalaman akademik Sistem Informasi dan minat pada pengelolaan data.",
      outcome: "Sertifikat berlaku hingga Maret 2029.",
      galleryNote:
        "Dokumen sertifikat tidak disertakan dalam CV sumber; area ini dapat diganti dengan gambar sertifikat saat tersedia.",
    },
  },
  {
    slug: "uji-kompetensi-sistem-basis-data-phpid",
    title: "Uji Kompetensi Sistem Basis Data · PHPID",
    kind: "Sertifikasi",
    year: "2024",
    summary:
      "Uji Kompetensi Berbasis Industri oleh PHP Indonesia Community bersama Universitas BSI.",
    stack: ["Sistem Basis Data", "PHPID Community", "Universitas BSI"],
    accent: "mint",
    facts: [
      { label: "Tanggal", value: "30 Juli 2024" },
      { label: "Predikat", value: "Baik" },
      { label: "Bidang", value: "Sistem Basis Data" },
    ],
    caseStudy: {
      context:
        "Uji kompetensi berbasis industri pada bidang Sistem Basis Data.",
      role: "Peserta uji kompetensi.",
      process: [
        "Mengikuti uji kompetensi yang diselenggarakan PHP Indonesia Community.",
        "Program bekerja sama dengan Universitas Bina Sarana Informatika.",
      ],
      solution:
        "Mengikuti evaluasi kompetensi untuk bidang sistem basis data.",
      outcome: "Dilaksanakan pada 30 Juli 2024 dengan predikat Baik.",
      galleryNote:
        "Gambar sertifikat dapat ditambahkan di sini ketika dokumen aslinya tersedia.",
    },
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
