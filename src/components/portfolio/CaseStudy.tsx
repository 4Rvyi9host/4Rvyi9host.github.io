"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <main className="case-page">
      <header className="case-nav page-shell"><Link href="/#work" className="case-back"><ArrowLeft size={15} /> Semua karya</Link><Link href="/" className="case-wordmark">ra<span>.</span></Link><span>CASE STUDY / {project.kind.toUpperCase()}</span></header>
      <section className="case-hero page-shell">
        <motion.div className="case-hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <p className="eyebrow">{project.kind.toUpperCase()} <span>·</span> {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="case-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {project.externalUrl && <a className="button button--primary" href={project.externalUrl} target="_blank" rel="noreferrer">{project.externalLabel ?? "Lihat sumber"}<ExternalLink size={15} /></a>}
        </motion.div>
        <motion.div className="case-visual" initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: .7 }}><ProjectVisual project={project} /></motion.div>
      </section>
      <section className="case-facts page-shell" aria-label="Ringkasan"><div className="case-facts-label">QUICK FACTS</div>{project.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</section>
      <section className="case-content page-shell">
        <div className="case-story"><Reveal><p className="eyebrow">01 / CONTEXT</p><h2>Masalah &amp; konteks</h2><p>{project.caseStudy.context}</p></Reveal><Reveal delay={.06}><p className="eyebrow">02 / MY ROLE</p><h2>Peran saya</h2><p>{project.caseStudy.role}</p></Reveal><Reveal delay={.12}><p className="eyebrow">03 / APPROACH</p><h2>Proses</h2><ol className="case-process">{project.caseStudy.process.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></Reveal><Reveal delay={.18}><p className="eyebrow">04 / OUTCOME</p><h2>Solusi &amp; hasil</h2><p>{project.caseStudy.solution}</p><p className="case-outcome"><Check size={16} />{project.caseStudy.outcome}</p></Reveal></div>
        <aside className="case-aside"><div className="case-gallery"><p className="eyebrow">VISUAL NOTE</p><ProjectVisual project={project} compact /><p>{project.caseStudy.galleryNote}</p></div><div className="case-aside-cta"><span>KEEP EXPLORING</span><Link href="/#work">Karya lainnya <ArrowUpRight size={15} /></Link></div></aside>
      </section>
      <footer className="case-footer page-shell"><Link href="/#contact">Hubungi saya <ArrowUpRight size={14} /></Link><Link href="/">RAFI · PORTFOLIO</Link></footer>
    </main>
  );
}
