import { ArrowUpRight, Database, FlaskConical, Wrench } from "lucide-react";
import type { LocalizedProject } from "@/data/locales";
import { useLanguage } from "./LanguageProvider";

const Icon = ({ kind }: { kind: LocalizedProject["kind"] }) => {
  if (kind === "Riset") return <FlaskConical aria-hidden="true" />;
  if (kind === "Pengalaman") return <Wrench aria-hidden="true" />;
  return <Database aria-hidden="true" />;
};

export function ProjectVisual({ project, compact = false }: { project: LocalizedProject; compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={`project-visual project-visual--${project.accent} ${compact ? "project-visual--compact" : ""}`} aria-label={`${t.projectIllustration} ${project.title}`}>
      <div className="visual-grid" aria-hidden="true" />
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
