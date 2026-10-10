"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { profile } from "@/data/portfolio";

export function ContactForm() {
  const [ready, setReady] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Pesan portofolio dari ${name}`);
    const body = encodeURIComponent(`${message}\n\nDari: ${name}\nEmail: ${email}`);
    setReady(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-field-row">
        <label>Nama<input name="name" autoComplete="name" placeholder="Nama kamu" required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" placeholder="kamu@email.com" required /></label>
      </div>
      <label>Pesan<textarea name="message" rows={4} placeholder="Ceritakan sedikit tentang peluang atau ide kamu…" required /></label>
      <div className="form-submit-row">
        <button className="button button--primary" type="submit"><Send size={15} /> Buat email</button>
        <p aria-live="polite">{ready ? "Aplikasi email sedang dibuka." : "Pesan akan dibuka di aplikasi email kamu."}</p>
      </div>
      <a className="contact-mail-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={14} /></a>
    </form>
  );
}
