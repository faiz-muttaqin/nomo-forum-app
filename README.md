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
npm install
```

3. **Jalankan aplikasi dalam mode development**

```bash
npm run dev
```

4. Buka browser ke alamat yang tertera di terminal (biasanya `http://localhost:5173`)

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
- `src/` : kode sumber React
    - `components/` : komponen UI reusable
    - `pages/` : halaman aplikasi
    - `states/` : manajemen state aplikasi
    - `hooks/` : custom hooks
- `public/` : aset publik
- `index.html` : root HTML

---

Dibuat oleh Faiz Muttaqin untuk submission Dicoding.
