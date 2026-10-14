import { ArrowUpRight, Database, FlaskConical, Wrench } from "lucide-react";
import { motion } from "motion/react";
import type { LocalizedProject } from "@/data/locales";
import { useLanguage } from "./LanguageProvider";

const Icon = ({ kind }: { kind: LocalizedProject["kind"] }) => {
  if (kind === "Riset") return <FlaskConical aria-hidden="true" />;
  if (kind === "Pengalaman") return <Wrench aria-hidden="true" />;
  return <Database aria-hidden="true" />;
};

export function ProjectVisual({ project, compact = false }: { project: LocalizedProject; compact?: boolean }) {
  const { language, t } = useLanguage();
  const winningAlgorithm = project.facts.find((fact) => /algoritma|algorithm/i.test(fact.label))?.value ?? project.stack[1] ?? "Research";
  const validation = project.facts.find((fact) => /validasi|validation/i.test(fact.label))?.value ?? "Validation";
  const accuracyFact = project.facts.find((fact) => /akurasi|accuracy/i.test(fact.label));
  const accuracyValue = accuracyFact ? Number(accuracyFact.value.replace(/[^\d.,]/g, "").replace(",", ".")) : 0;
  const processSteps = project.kind === "Riset"
    ? [winningAlgorithm, validation, accuracyFact?.value ?? (language === "en" ? "Study" : "Riset")]
    : project.kind === "Pengalaman"
      ? (language === "en" ? ["Diagnose", "Maintain", "Set up"] : ["Diagnosis", "Perawatan", "Instalasi"])
      : (language === "en" ? ["Database", "Administration", "Competency"] : ["Basis data", "Administrasi", "Kompetensi"]);
  return (
    <div className={`project-visual project-visual--${project.accent} ${compact ? "project-visual--compact" : ""}`} aria-label={`${t.projectIllustration} ${project.title}`}>
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-process" aria-hidden="true">
        {processSteps.map((step, index) => (
          <span className="visual-process__group" key={step}>
            <span className={`visual-process__step ${index === processSteps.length - 1 ? "visual-process__step--result" : ""}`}>
              {step}
              {project.kind === "Riset" && index === processSteps.length - 1 && accuracyValue > 0 && (
                <span className="visual-process__meter"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.65 }} transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} style={{ width: `${Math.min(accuracyValue, 100)}%` }} /></span>
              )}
            </span>
            {index < processSteps.length - 1 && <i className="visual-process__connector" />}
          </span>
        ))}
      </div>
      <div className="phone-shell">
        <div className="phone-island" />
        <div className="phone-screen">
          <div className="phone-appbar"><span>RA / LAB</span><span className="phone-menu">•••</span></div>
          <div className="phone-eyebrow">{project.kindLabel.toUpperCase()} · {project.year}</div>
          <Icon kind={project.kind} />
          <h4>{project.title}</h4>
          <p>{project.summary}</p>
          {project.facts.slice(0, 2).map((fact) => (
            <div className="phone-fact" key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>
          ))}
          <div className="phone-tags">{project.stack.slice(0, 2).map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </div>
      <span className="visual-note">{t.projectPreview}</span>
      <ArrowUpRight className="visual-arrow" aria-hidden="true" />
    </div>
  );
}
