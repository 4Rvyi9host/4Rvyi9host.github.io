"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { getLocalizedProject } from "@/data/locales";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { LanguageSwitch, useLanguage } from "./LanguageProvider";

export function CaseStudy({ project }: { project: Project }) {
  const { language, t } = useLanguage();
  const localized = getLocalizedProject(project, language);
  return (
    <main className="case-page">
      <header className="case-nav page-shell"><Link href="/#work" className="case-back"><ArrowLeft size={15} /> {t.allWork}</Link><Link href="/" className="case-wordmark">ra<span>.</span></Link><LanguageSwitch compact /><span>{t.caseStudyLabel} / {localized.kindLabel.toUpperCase()}</span></header>
      <section className="case-hero page-shell">
        <motion.div className="case-hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <p className="eyebrow">{localized.kindLabel.toUpperCase()} <span>·</span> {localized.year}</p>
          <h1>{localized.title}</h1>
          <p>{localized.summary}</p>
          <div className="case-tags">{localized.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {localized.externalUrl && <a className="button button--primary" href={localized.externalUrl} target="_blank" rel="noreferrer">{localized.externalLabel ?? t.viewSource}<ExternalLink size={15} /></a>}
        </motion.div>
        <motion.div className="case-visual" initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: .7 }}><ProjectVisual project={localized} /></motion.div>
      </section>
      <section className="case-facts page-shell" aria-label={t.quickFacts}><div className="case-facts-label">{t.quickFacts}</div>{localized.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</section>
      <section className="case-content page-shell">
        <div className="case-story"><Reveal><p className="eyebrow">01 / {t.context}</p><h2>{t.problemContext}</h2><p>{localized.caseStudy.context}</p></Reveal><Reveal delay={.06}><p className="eyebrow">02 / {t.myRole}</p><h2>{t.myRoleTitle}</h2><p>{localized.caseStudy.role}</p></Reveal><Reveal delay={.12}><p className="eyebrow">03 / {t.approach}</p><h2>{t.process}</h2><ol className="case-process">{localized.caseStudy.process.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></Reveal><Reveal delay={.18}><p className="eyebrow">04 / {t.outcome}</p><h2>{t.solutionOutcome}</h2><p>{localized.caseStudy.solution}</p><p className="case-outcome"><Check size={16} />{localized.caseStudy.outcome}</p></Reveal></div>
        <aside className="case-aside"><div className="case-gallery"><p className="eyebrow">{t.visualNote}</p><ProjectVisual project={localized} compact /><p>{localized.caseStudy.galleryNote}</p></div><div className="case-aside-cta"><span>{t.keepExploring}</span><Link href="/#work">{t.moreWork} <ArrowUpRight size={15} /></Link></div></aside>
      </section>
      <footer className="case-footer page-shell"><Link href="/#contact">{t.contactMe} <ArrowUpRight size={14} /></Link><Link href="/">{t.footerName}</Link></footer>
    </main>
  );
}
