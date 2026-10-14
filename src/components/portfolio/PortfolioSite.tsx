"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  Check, Code2, Download, ExternalLink, Github, GraduationCap, Layers3,
  Linkedin, MapPin, Menu, Moon, Sun, Wrench, X,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { getLocalizedProject, profileCopy } from "@/data/locales";
import { ContactForm } from "./ContactForm";
import { CursorWaves } from "./CursorWaves";
import { IntroExperience } from "./IntroExperience";
import { ProfilePhoto } from "./ProfilePhoto";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { LanguageSwitch, useLanguage } from "./LanguageProvider";

const filters = ["all", "Riset", "Pengalaman", "Sertifikasi"] as const;

export function PortfolioSite() {
  const { language, t } = useLanguage();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    let scrollFrame = 0;
    let wheelFrame = 0;
    let wheelTarget = window.scrollY;
    let wheelCurrent = window.scrollY;
    let wheelActive = false;
    const stopWheelScroll = () => {
      window.cancelAnimationFrame(wheelFrame);
      wheelFrame = 0;
      wheelActive = false;
      wheelTarget = window.scrollY;
      wheelCurrent = window.scrollY;
    };
    const followWheel = () => {
      wheelCurrent += (wheelTarget - wheelCurrent) * 0.12;
      window.scrollTo(0, wheelCurrent);
      if (Math.abs(wheelTarget - wheelCurrent) > 0.6) {
        wheelFrame = window.requestAnimationFrame(followWheel);
      } else {
        wheelCurrent = wheelTarget;
        window.scrollTo(0, wheelCurrent);
        wheelFrame = 0;
        wheelActive = false;
      }
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      if (!wheelActive) {
        wheelTarget = window.scrollY;
        wheelCurrent = window.scrollY;
      }
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      wheelTarget = Math.max(0, Math.min(maxScroll, wheelTarget + delta));
      if (!wheelActive) {
        wheelActive = true;
        wheelFrame = window.requestAnimationFrame(followWheel);
      }
    };
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      stopWheelScroll();
      window.cancelAnimationFrame(scrollFrame);
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      const start = window.scrollY;
      const end = Math.max(0, target.getBoundingClientRect().top + start - 88);
      const distance = end - start;
      const duration = Math.min(1550, Math.max(1000, Math.abs(distance) * 0.62));
      const startedAt = performance.now();

      const scroll = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, start + distance * eased);
        if (progress < 1) scrollFrame = window.requestAnimationFrame(scroll);
        else scrollFrame = 0;
      };
      scrollFrame = window.requestAnimationFrame(scroll);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("click", onAnchorClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onAnchorClick);
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(wheelFrame);
    };
  }, []);

  const visibleProjects = projects.filter((project) => filter === "all" || project.kind === filter);
  const projectLabels: Record<(typeof filters)[number], string> = {
    all: t.all,
    Riset: t.research,
    Pengalaman: t.experience,
    Sertifikasi: t.certification,
  };
  const profileLanguage = language === "en" ? profileCopy.en : undefined;
  const role = profileLanguage?.role ?? profile.role;
  const introduction = profileLanguage?.introduction ?? profile.introduction;
  const focusAreas = profileLanguage?.focusAreas ?? profile.focusAreas;
  const softSkills = profileLanguage?.softSkills ?? profile.softSkills;
  const educationPrograms = profileLanguage?.education ?? [profile.education[0].program, profile.education[1].program];

  return (
    <div className="site-root relative min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <IntroExperience />
      <CursorWaves />
        <header className="site-header">
          <div className="site-header__inner page-shell">
            <a href="#home" className="wordmark" aria-label={language === "en" ? "Rafi, back to top" : "Rafi, ke awal"}><span className="wordmark__symbol">ra<span>.</span></span><span className="wordmark__label">rafi builds things</span></a>
            <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label={t.language === "Language" ? "Main navigation" : "Navigasi utama"}>
              <a href="#about" onClick={() => setMenuOpen(false)}>{t.navAbout}</a>
              <a href="#work" onClick={() => setMenuOpen(false)}>{t.navWork}</a>
              <a href="#experience" onClick={() => setMenuOpen(false)}>{t.navExperience}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>{t.navContact}</a>
            </nav>
            <div className="header-actions">
              <LanguageSwitch />
              <a className="header-cv" href={profile.cv} download aria-label={t.cv}><Download size={14} /> CV</a>
              <button className="theme-toggle" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? t.themeLight : t.themeDark} title={theme === "dark" ? t.themeLight : t.themeDark}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={theme} className="theme-toggle__icon" initial={{ opacity: 0, rotate: -75, scale: 0.65 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 75, scale: 0.65 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? t.menuClose : t.menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
            </div>
          </div>
        </header>

        <main>
          <section className="hero-section page-shell" id="home">
            <div className="hero-copy">
              <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}><span className="availability-dot" /> {t.heroEyebrow}</motion.p>
              <motion.h1 id="home-title" tabIndex={-1} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{t.heroLine1}<br />{t.heroLine2} <span>{t.heroLine3}</span></motion.h1>
              <motion.p className="hero-lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{t.heroDescription.replace("{name}", profile.shortName).replace("{role}", role)}</motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <a className="button button--primary" href="#work">{t.seeWork} <ArrowDownRight size={16} /></a>
                <a className="button button--quiet" href="#contact">{t.sayHello} <ArrowRight size={15} /></a>
              </motion.div>
              <div className="hero-footnote"><span>{t.scrollHint}</span><ArrowDown size={13} /></div>
            </div>
            <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.92, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div className="hero-art__backdrop" />
              <div className="hero-art__orbit hero-art__orbit--a" /><div className="hero-art__orbit hero-art__orbit--b" />
              <div className="hero-portrait-frame"><ProfilePhoto className="hero-photo" sizes="(max-width: 768px) 65vw, 400px" /><span className="hero-photo-tag"><span /> {t.opportunities}</span></div>
              <div className="floating-note floating-note--top"><Wrench size={14} /><span>{t.topNote}<br /><strong>{t.topNoteStrong}</strong></span></div>
              <div className="floating-note floating-note--bottom"><span className="note-star">✳</span><span>{t.bottomNote}<br /><strong>{t.bottomNoteStrong}</strong></span></div>
              <span className="hero-art__index">01 / 04</span>
            </motion.div>
          </section>

          <section className="focus-strip page-shell" aria-label="Fokus pengembangan">
            <span className="focus-strip__label"><Layers3 size={14} /> {t.focusLabel}</span>
            <div>{focusAreas.map((area) => <span className="focus-pill" key={area}>{area}</span>)}</div>
            <span className="focus-strip__note">{t.focusNote}</span>
          </section>

          <section className="content-section page-shell" id="about">
            <Reveal className="section-intro"><p className="eyebrow">{t.aboutSection}</p><h2>{t.aboutTitle1}<br /><span>{t.aboutTitle2}</span></h2><p>{t.aboutLead}</p></Reveal>
            <div className="about-bento">
              <Reveal className="bento-card bento-bio"><span className="bento-index">A / {t.story}</span><h3>{t.storyTitle}</h3><p>{language === "en" ? introduction : profile.introduction}</p><div className="bio-location"><MapPin size={14} /> {profile.location}</div><div className="bio-doodle" aria-hidden="true">✳</div></Reveal>
              <Reveal delay={0.08} className="bento-card bento-skills"><span className="bento-index">B / {t.toolbox}</span><h3>{t.skillsTitle}</h3><div className="skill-list">{profile.skills.map((skill) => <span key={skill.name}><i />{language === "en" && skill.name === "Pengelolaan Data & Pelaporan" ? "Data Management & Reporting" : skill.name}</span>)}</div><div className="bento-softskills">{softSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>
              <Reveal delay={0.16} className="bento-card bento-education"><span className="bento-index">C / {t.education}</span><GraduationCap size={19} /><h3>{t.educationTitle}</h3><p>Universitas Bina Sarana Informatika · {educationPrograms[0]} · {t.semester}<br />2023 — {t.yearNow}</p><p>SMK Prestasi Prima · {educationPrograms[1]}<br />2020 — 2023</p><div className="edu-progress"><i /></div><small>{t.educationNote}</small></Reveal>
              <Reveal delay={0.23} className="bento-card bento-direction"><span className="bento-index">D / {t.focusAreas}</span><div className="direction-icon"><Wrench size={23} /></div><h3>{t.focusCardTitle}</h3><p>{t.focusCardDescription}</p><div className="direction-tags"><span>IT Support</span><span>Database</span><span>Data Mining</span></div></Reveal>
              <Reveal delay={0.3} className="bento-card bento-cert"><span className="bento-index">E / {t.credentials}</span><div className="cert-number">02<span>×</span></div><div><h3>{t.credentialsTitle}</h3><p>{t.certifications}</p></div><Check size={17} /></Reveal>
            </div>
          </section>

          <section className="work-section" id="work">
            <div className="page-shell">
              <Reveal className="work-heading"><div><p className="eyebrow">{t.selectedWork}</p><h2>{t.workTitle1}<br /><span>{t.workTitle2}</span></h2></div><p>{t.workDescription}</p></Reveal>
              <div className="project-toolbar"><div className="project-filters" role="group" aria-label={t.navWork}>{filters.map((item) => <button type="button" key={item} className={filter === item ? "is-active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{projectLabels[item]}</button>)}</div><span>{String(visibleProjects.length).padStart(2, "0")} {t.projectCount}</span></div>
              <motion.div className="project-grid" layout>
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((rawProject, index) => {
                    const project = getLocalizedProject(rawProject, language);
                    return <motion.article key={project.slug} className={`project-tile ${project.featured ? "project-tile--featured" : ""}`} layout initial={{ opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.97, y: -6 }} transition={{ duration: 0.48, delay: index * 0.045, ease: [0.2, 0.8, 0.2, 1] }} whileHover={{ y: -5, transition: { type: "spring", stiffness: 260, damping: 19 } }}>
                      <Link href={`/projects/${project.slug}`} className="project-tile__link" aria-label={t.openCaseStudy.replace("{title}", project.title)}>
                        <ProjectVisual project={project} compact />
                        <div className="project-tile__body"><div className="project-tile__meta"><span>{project.kindLabel}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-role-preview"><span>{t.projectRoleLabel}</span><p>{project.caseStudy.role}</p></div><div className="project-outcome-preview"><span>{t.projectOutcomeLabel}</span><p>{project.caseStudy.outcome}</p></div><div className="project-tags">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><span className="project-open">{t.caseStudy} <ArrowUpRight size={15} /></span></div>
                      </Link>
                    </motion.article>;
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          <section className="content-section page-shell experience-section" id="experience">
            <Reveal className="section-intro"><p className="eyebrow">{t.experienceSection}</p><h2>{t.journeyTitle1}<br /><span>{t.journeyTitle2}</span></h2><p>{t.journeyDescription}</p></Reveal>
            <div className="experience-track">
              {[
                { year: "2026—2029", ...t.timeline[0], icon: BriefcaseBusiness },
                { year: "2026", ...t.timeline[1], icon: Code2, href: "https://doi.org/10.23960/jitet.v14i2.9084" },
                { year: "2024", ...t.timeline[2], icon: Check },
                { year: "2022", ...t.timeline[3], icon: Wrench },
              ].map((item, index) => {
                const Icon = item.icon;
                return <Reveal delay={index * 0.07} key={item.title}><article className="experience-item"><span className="experience-year">{item.year}</span><span className="experience-node"><Icon size={14} /></span><div><h3>{item.title}</h3><p className="experience-meta">{item.meta}</p><p className="experience-description">{item.text}</p></div>{"href" in item && <a className="experience-external" href={item.href} target="_blank" rel="noreferrer" aria-label={t.viewPublication}><ExternalLink size={15} /></a>}</article></Reveal>;
              })}
            </div>
          </section>

          <section className="contact-section page-shell" id="contact">
            <Reveal className="contact-heading"><p className="eyebrow">{t.contactSection}</p><h2>{t.contactTitle1}<br /><span>{t.contactTitle2}</span></h2><p>{t.contactDescription}</p><div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a></div></Reveal>
            <Reveal delay={0.12} className="contact-form-card"><ContactForm /></Reveal>
          </section>
        </main>

        <footer className="site-footer page-shell"><a className="wordmark" href="#home"><span className="wordmark__symbol">ra<span>.</span></span></a><p>{t.madeWith}</p><span>© {new Date().getFullYear()} {profile.name}</span><a href="#home">{t.backToTop}</a></footer>
    </div>
  );
}
