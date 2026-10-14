"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useLanguage } from "./LanguageProvider";

export function ContactForm() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);

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
      <a className="contact-mail-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={14} /></a>
    </form>
  );
}
