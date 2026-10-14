"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useLanguage } from "./LanguageProvider";

export function ContactForm() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`${t.contactSection} · ${name}`);
    const body = encodeURIComponent(`${message}\n\n${t.contactName}: ${name}\n${t.contactEmail}: ${email}`);
    setReady(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-field-row">
        <label>{t.contactName}<input name="name" autoComplete="name" placeholder={t.contactNamePlaceholder} required /></label>
        <label>{t.contactEmail}<input name="email" type="email" autoComplete="email" placeholder={t.contactEmailPlaceholder} required /></label>
      </div>
      <label>{t.contactMessage}<textarea name="message" rows={4} placeholder={t.contactMessagePlaceholder} required /></label>
      <div className="form-submit-row">
        <button className="button button--primary" type="submit"><Send size={15} /> {t.sendEmail}</button>
        <p aria-live="polite">{ready ? t.emailOpening : t.emailHelp}</p>
      </div>
      <div className="contact-mail-row">
        <a className="contact-mail-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={14} /></a>
        <button className="contact-copy-button" type="button" onClick={copyEmail} aria-label={copyState === "copied" ? t.emailCopied : t.copyEmail}>
          {copyState === "copied" ? <Check size={13} /> : <Copy size={13} />}{copyState === "copied" ? t.emailCopied : t.copyEmail}
        </button>
        <span className="contact-copy-status" aria-live="polite">{copyState === "failed" ? t.emailCopyFailed : ""}</span>
      </div>
    </form>
  );
}
