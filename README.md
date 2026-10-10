# Rafi Saifuddin Portfolio

Portofolio personal menggunakan Next.js App Router, TypeScript, Tailwind CSS v4, Motion for React, dan GitHub Pages.

## Menjalankan lokal

Persyaratan: Node.js 20.9 atau lebih baru.

```bash
npm.cmd install
npm.cmd run dev
```

Buka `http://localhost:3000`.

## Mengganti konten

- `src/data/portfolio.ts`: identitas, ringkasan, kontak, pendidikan, skill, dan arah tech stack.
- `src/data/projects.ts`: kartu karya dan isi case study. Menambah objek baru otomatis menambah kartu dan halaman `/projects/[slug]`.
- Foto profil menggunakan avatar GitHub publik. Ganti properti `avatar` di `portfolio.ts` dengan `/images/profile.jpg` setelah foto diletakkan di `public/images/profile.jpg`.
- CV ada di `public/assets/cv-muhammad-ar-rafi-saifuddin.pdf`.

Konten mengambil pengalaman, pendidikan, sertifikasi, dan publikasi dari CV. Expo, React Native, dan TypeScript ditampilkan sebagai arah pengembangan. Mockup proyek bisa diganti dengan screenshot asli saat tersedia.

## Publish lewat GitHub Pages

Workflow `.github/workflows/githubpage.yaml` menjalankan build statis setiap ada push ke `main`, lalu memperbarui file situs di root repository. Pengaturan Pages tetap memakai branch `main` dan folder root seperti sebelumnya.

Untuk menerbitkan perubahan, cukup push source ke `main`:

```bash
git add -A
git commit -m "Update portfolio"
git push origin main
```

Setelah workflow selesai, GitHub Pages memperbarui situs. Repo `portofolio` memakai <https://4rvyi9host.github.io/portofolio/>; repo profil `4Rvyi9host.github.io` memakai <https://4rvyi9host.github.io/>. Tidak perlu mengubah pengaturan Pages.

## Struktur sumber

```text
src/
  app/
    projects/[slug]/page.tsx
    globals.css
    layout.tsx
    page.tsx
    template.tsx
  components/portfolio/
  data/
public/
  assets/cv-muhammad-ar-rafi-saifuddin.pdf
scripts/
  build-pages.mjs
```
