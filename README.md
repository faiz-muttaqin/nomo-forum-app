# NOMO (No More Missing Out) Discussion App

Aplikasi forum diskusi berbasis React + Vite untuk berbagi pemikiran dan ide dengan komunitas.

## Fitur

- Autentikasi pengguna (register dan login)
- Melihat daftar thread diskusi
- Membuat thread baru
- Menampilkan detail thread dan komentar
- Menambahkan komentar pada thread
- UI responsif dengan loading indicators
- Dan lainnya


## Instalasi & Menjalankan

1. **Clone repositori**

```bash
git clone https://github.com/yourusername/nomo-forum-app.git
cd nomo-forum-app
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Jalankan aplikasi dalam mode development**

```bash
pnpm run dev
```

4. Buka browser ke alamat yang tertera di terminal (biasanya `http://localhost:5173`)

## CI/CD & Deployment

- **GitHub Actions**: Otomatis menjalankan test unit, e2e, dan lint setiap ada pull request ke branch utama. Jika test gagal, merge akan diblokir.
- **Vercel**: Deployment otomatis ke Vercel setiap ada perubahan di branch utama. Hasil build dapat diakses secara publik.

## Library Tambahan

- **Storybook**: Digunakan untuk dokumentasi dan preview komponen UI secara interaktif. Jalankan dengan `pnpm run storybook`.
- **Framer Motion**: Digunakan untuk animasi pada komponen, seperti tombol yang membesar saat hover dan mengecil saat ditekan.

## Fitur Detail

### Autentikasi

- Register dengan nama, email, dan password
- Login dengan email dan password
- Otomatis menyimpan sesi login

### Thread

- Melihat daftar thread tanpa perlu login
- Setiap thread menampilkan judul, potongan konten, waktu pembuatan, jumlah komentar, dan info pembuat
- Membuat thread baru (memerlukan login)
- Detail thread menampilkan judul, konten lengkap, waktu pembuatan, dan info pembuat

### Komentar

- Melihat semua komentar pada thread
- Menambahkan komentar baru (memerlukan login)
- Komentar menampilkan konten, waktu pembuatan, dan info pembuat


## Struktur Folder

- `src/` : kode sumber utama React
  - `components/` : komponen UI reusable (AuthModal, BtnMotion, Thread, dsb)
  - `pages/` : halaman aplikasi (HomePage, LeaderboardPage, UserDetail)
  - `states/` : manajemen state aplikasi (Redux Toolkit, async action, reducer, dsb)
  - `contexts/` : context global (ThemeContext, LanguageContext)
  - `stories/` : file Storybook untuk dokumentasi dan preview komponen
  - `styles/` : file CSS custom
  - `utils/` : utilitas (API, local data, helper)
- `public/` : aset publik (icon, gambar, dsb)
- `index.html` : root HTML aplikasi

---

Dibuat oleh Faiz Muttaqin untuk submission Di coding.
