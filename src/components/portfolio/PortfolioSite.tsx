"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  Check, Code2, Download, ExternalLink, Github, GraduationCap, Layers3,
  Linkedin, MapPin, Menu, Moon, Sun, Wrench, X,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { projects, type ProjectKind } from "@/data/projects";
import { ContactForm } from "./ContactForm";
import { IntroExperience } from "./IntroExperience";
import { ProfilePhoto } from "./ProfilePhoto";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";

const filters: ("Semua" | ProjectKind)[] = ["Semua", "Riset", "Pengalaman", "Sertifikasi"];

export function PortfolioSite() {
  const [introDone, setIntroDone] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const enterPortfolio = useCallback(() => {
    setIntroDone(true);
    window.setTimeout(() => document.getElementById("home-title")?.focus(), 650);
  }, []);

  const visibleProjects = projects.filter((project) => filter === "Semua" || project.kind === filter);

  return (
    <div className="site-root relative min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <IntroExperience visible={!introDone} onComplete={enterPortfolio} />
      <div inert={!introDone ? true : undefined} aria-hidden={!introDone}>
        <header className="site-header">
          <div className="site-header__inner page-shell">
            <a href="#home" className="wordmark" aria-label="Rafi, ke awal"><span className="wordmark__symbol">ra<span>.</span></span><span className="wordmark__label">rafi builds things</span></a>
            <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Navigasi utama">
              <a href="#about" onClick={() => setMenuOpen(false)}>Tentang</a>
              <a href="#work" onClick={() => setMenuOpen(false)}>Karya</a>
              <a href="#experience" onClick={() => setMenuOpen(false)}>Perjalanan</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Kontak</a>
            </nav>
            <div className="header-actions">
              <a className="header-cv" href={profile.cv} download><Download size={14} /> CV</a>
              <button className="theme-toggle" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap"} title="Ganti tema">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Tutup menu" : "Buka menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
            </div>
          </div>
        </header>

        <main>
          <section className="hero-section page-shell" id="home">
            <div className="hero-copy">
              <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}><span className="availability-dot" /> PORTOFOLIO PERSONAL · JAKARTA, ID</motion.p>
              <motion.h1 id="home-title" tabIndex={-1} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>Membuat teknologi<br />terasa lebih <span>manusiawi.</span></motion.h1>
              <motion.p className="hero-lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Saya <strong>{profile.shortName}</strong> — {profile.role}. Berbekal pengalaman IT Support, kompetensi basis data, dan kontribusi pada riset ilmiah.</motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <a className="button button--primary" href="#work">Lihat karya <ArrowDownRight size={16} /></a>
                <a className="button button--quiet" href="#contact">Mari terhubung <ArrowRight size={15} /></a>
              </motion.div>
              <div className="hero-footnote"><span>SWIPE / SCROLL TO EXPLORE</span><ArrowDown size={13} /></div>
            </div>
            <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.92, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div className="hero-art__backdrop" />
              <div className="hero-art__orbit hero-art__orbit--a" /><div className="hero-art__orbit hero-art__orbit--b" />
              <div className="hero-portrait-frame"><ProfilePhoto className="hero-photo" sizes="(max-width: 768px) 65vw, 400px" /><span className="hero-photo-tag"><span /> OPEN TO OPPORTUNITIES</span></div>
              <div className="floating-note floating-note--top"><Wrench size={14} /><span>solving for<br /><strong>real systems</strong></span></div>
              <div className="floating-note floating-note--bottom"><span className="note-star">✳</span><span>curiosity<br /><strong>in progress</strong></span></div>
              <span className="hero-art__index">01 / 04</span>
            </motion.div>
          </section>

          <section className="focus-strip page-shell" aria-label="Fokus pengembangan">
            <span className="focus-strip__label"><Layers3 size={14} /> AREA KOMPETENSI</span>
            <div>{profile.focusAreas.map((area) => <span className="focus-pill" key={area}>{area}</span>)}</div>
            <span className="focus-strip__note">Fokus berdasarkan CV terbaru</span>
          </section>

          <section className="content-section page-shell" id="about">
            <Reveal className="section-intro"><p className="eyebrow">01 / ABOUT ME</p><h2>Practical roots.<br /><span>Curious by nature.</span></h2><p>Perjalanan saya berawal dari troubleshooting dan perawatan komputer, lalu berkembang ke pengelolaan basis data dan riset data mining.</p></Reveal>
            <div className="about-bento">
              <Reveal className="bento-card bento-bio"><span className="bento-index">A / STORY</span><h3>Teknologi seharusnya membantu tanpa terasa rumit.</h3><p>{profile.introduction}</p><div className="bio-location"><MapPin size={14} /> {profile.location}</div><div className="bio-doodle" aria-hidden="true">✳</div></Reveal>
              <Reveal delay={0.08} className="bento-card bento-skills"><span className="bento-index">B / TOOLBOX</span><h3>Yang saya kerjakan</h3><div className="skill-list">{profile.skills.map((skill) => <span key={skill.name}><i />{skill.name}</span>)}</div><div className="bento-softskills">{profile.softSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>
              <Reveal delay={0.16} className="bento-card bento-education"><span className="bento-index">C / EDUCATION</span><GraduationCap size={19} /><h3>Sistem Informasi &amp; TKJ</h3><p>Universitas Bina Sarana Informatika · S1 Sistem Informasi · Semester 7<br />2023 — sekarang</p><p>SMK Prestasi Prima · Teknik Komputer &amp; Jaringan<br />2020 — 2023</p><div className="edu-progress"><i /></div><small>Belajar, mencoba, mengulang.</small></Reveal>
              <Reveal delay={0.23} className="bento-card bento-direction"><span className="bento-index">D / FOCUS AREAS</span><div className="direction-icon"><Wrench size={23} /></div><h3>Teknologi yang siap membantu</h3><p>Fokus pada dukungan teknis, administrasi basis data, dan pengolahan data menggunakan Orange Data Mining.</p><div className="direction-tags"><span>IT Support</span><span>Database</span><span>Data Mining</span></div></Reveal>
              <Reveal delay={0.3} className="bento-card bento-cert"><span className="bento-index">E / CREDENTIALS</span><div className="cert-number">02<span>×</span></div><div><h3>Sertifikasi kompetensi</h3><p>Database Administrator · BNSP<br />Sistem Basis Data · PHPID</p></div><Check size={17} /></Reveal>
            </div>
          </section>

          <section className="work-section" id="work">
            <div className="page-shell">
              <Reveal className="work-heading"><div><p className="eyebrow">02 / SELECTED WORK</p><h2>Hal-hal yang pernah<br /><span>saya tekuni.</span></h2></div><p>Kumpulan riset, pengalaman, dan sertifikasi yang membentuk fondasi saya di bidang teknologi informasi.</p></Reveal>
              <div className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter karya">{filters.map((item) => <button type="button" key={item} className={filter === item ? "is-active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><span>{String(visibleProjects.length).padStart(2, "0")} KARYA</span></div>
              <motion.div className="project-grid" layout>
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((project, index) => (
                    <motion.article key={project.slug} className={`project-tile ${project.featured ? "project-tile--featured" : ""}`} layout initial={{ opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.97, y: -6 }} transition={{ duration: 0.48, delay: index * 0.045, ease: [0.2, 0.8, 0.2, 1] }} whileHover={{ y: -5, transition: { type: "spring", stiffness: 260, damping: 19 } }}>
                      <Link href={`/projects/${project.slug}`} className="project-tile__link" aria-label={`Buka case study: ${project.title}`}>
                        <ProjectVisual project={project} compact />
                        <div className="project-tile__body"><div className="project-tile__meta"><span>{project.kind}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-tags">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><span className="project-open">Lihat case study <ArrowUpRight size={15} /></span></div>
                      </Link>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          <section className="content-section page-shell experience-section" id="experience">
            <Reveal className="section-intro"><p className="eyebrow">03 / EXPERIENCE</p><h2>Langkah kecil,<br /><span>fondasi kuat.</span></h2><p>Pengalaman kerja, pendidikan, dan pengakuan kompetensi dalam satu perjalanan.</p></Reveal>
            <div className="experience-track">
              {[
                { year: "2026—2029", title: "Database Administrator", meta: "Sertifikat Kompetensi · BNSP", text: "Kompetensi administrasi basis data. Sertifikat berlaku hingga Maret 2029.", icon: BriefcaseBusiness },
                { year: "2026", title: "Publikasi Jurnal Nasional", meta: "JITET · Universitas Lampung", text: "Co-author riset perbandingan C4.5 dan Naive Bayes pada klasifikasi jamur.", icon: Code2, href: "https://doi.org/10.23960/jitet.v14i2.9084" },
                { year: "2024", title: "Uji Kompetensi Industri", meta: "PHPID Community × Universitas BSI", text: "Bidang Sistem Basis Data · predikat Baik.", icon: Check },
                { year: "2022", title: "Praktik Kerja Lapangan", meta: "Teknisi Komputer · Toko Service Komputer", text: "Troubleshooting, perawatan berkala, serta instalasi aplikasi dan sistem operasi.", icon: Wrench },
              ].map((item, index) => {
                const Icon = item.icon;
                return <Reveal delay={index * 0.07} key={item.title}><article className="experience-item"><span className="experience-year">{item.year}</span><span className="experience-node"><Icon size={14} /></span><div><h3>{item.title}</h3><p className="experience-meta">{item.meta}</p><p className="experience-description">{item.text}</p></div>{item.href && <a className="experience-external" href={item.href} target="_blank" rel="noreferrer" aria-label="Buka publikasi"><ExternalLink size={15} /></a>}</article></Reveal>;
              })}
            </div>
          </section>

          <section className="contact-section page-shell" id="contact">
            <Reveal className="contact-heading"><p className="eyebrow">04 / SAY HELLO</p><h2>Punya ide yang<br /><span>layak diwujudkan?</span></h2><p>Saya terbuka untuk kesempatan magang, kerja, freelance, dan kolaborasi yang menarik.</p><div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a></div></Reveal>
            <Reveal delay={0.12} className="contact-form-card"><ContactForm /></Reveal>
          </section>
        </main>

        <footer className="site-footer page-shell"><a className="wordmark" href="#home"><span className="wordmark__symbol">ra<span>.</span></span></a><p>Dibuat dengan rasa ingin tahu, di Jakarta.</p><span>© {new Date().getFullYear()} {profile.name}</span><a href="#home">Kembali ke atas ↑</a></footer>
      </div>
    </div>
  );
}
