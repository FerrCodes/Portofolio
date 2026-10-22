---
title: "Journal App"
description: "Aplikasi jurnal harian berbasis web modern dengan dukungan multi-bahasa (ID/EN), tracking mood visual, export PDF, dan keamanan database tingkat lanjut menggunakan Supabase RLS."
image: "JournalApp.png"
year: "2026"
status: "Selesai"
tech: ["TypeScript", "React", "Tailwind", "Supabase", "Vercel"]
category: "favorite"
demoUrl: "https://journal-khaki-zeta.vercel.app/"
repoUrl: "https://github.com/FerrCodes/Journal"
---

## 1. Masalah

**Masalah Awal:** Saya berfikiran untuk membuat aplikasi membuat web app Jurnal tapi dengan Fitur upload foto, ganti bahasa, kalender, statistik, favorit dan arsip dan export ke PDF. Karena saya belum tahu teknologi apa yang akan di gunakan jadi saya memakai Typescript untuk bahasa pemogramannya untuk membuat projek, struktur, konsep dan UI nya memakai Tailwind dan beberapa komponen dari React juga.

**Keputusan:** Saya memilih Tech Stack (Tumpukan Teknologi) nya yaitu Typescript, React, Tailwind, Supabase dan Vercel untuk deploy dengan tujuan projek nya karena saya ingin mempunyai projek Tech Stack modern, jadi dengan keputusan saya itu untuk memilih empat Tech Stack nya, dengan proses membuat projek dan juga proses belajar ekosistem dan dan Tipe data yang tidak boleh sembarang di Typescript saat mencoba bereksperimen waktu membuat tipe data sendiri dengan sesuai yang sudah ada. Dan untuk UI dan desain lainnya saya pilih Tailwind CSS karena mudah untuk di Styling di baris kode nya dan untuk Icon saya memilih lucide.dev untuk icon modern projek ini.

## 2. Pendekatan & Alasan Memilih Tech Stack

### 2.1 Kebutuhan
- Implementasi multi-bahasa dilakukan setelah aplikasi hampir selesai sebagai tantangan teknis untuk memastikan skalabilitas kode.
- Mempercepat pengembangan UI responsif dan konsistensi desain antara mode terang/gelap.
- Memilih BaaS ini karena Row Level Security (RLS)-nya memungkinkan saya membuat sistem multi-user yang aman tanpa perlu setup backend server manual. Fitur Storage-nya juga sangat membantu untuk upload foto jurnal.
- Web app harus tetap berjalan dan stabil
- Bisa diakses di desktop dan mobile (responsive)
- Ingin memiliki versi APK native
- Proses development tidak boleh terlalu rumit

### 2.2 Pilihan Stack
- React + TypeScript untuk UI & type safety.
- Vite untuk Build tool super cepat
- Tailwind CSS untuk Styling cepat & konsisten
- Supabase Database, autentikasi, realtime
- date-fns untuk Manipulasi tanggal
- sonner untuk Toast notification modern
- lucide-react Icon library
- react-toastify Legacy toast (diganti ke sonner)
- react-router-dom untuk Routing halaman
- recharts untuk Grafik statistik

### 2.3 Alasan Utama
- **Tetap di Web:** Untuk sementara proses jadinya projek ini di Web, karena untuk dibuat versi APK nya ada masalah konflik pada Library
- **Sonner > react-toastify:** Lebih modern, lebih ringan (7KB vs 20KB), rich colors, expandable.
- **PrivateRoute:** Proteksi halaman agar user harus login dulu.
- **Activity Logs:** Mencatat aktivitas user (login, logout, create, update, delete) langsung dari frontend ke Supabase.

## 3. Kendala Teknis

- **React Native + Supabase Tidak Kompatibel:** Error `Cannot assign to property 'protocol' which has only a getter`. Penyebab: Supabase SDK versi 2.39+ menggunakan module events yang tidak ada di React Native. Solusi: Downgrade ke Supabase SDK 2.38.4 + polyfill events, tapi tetap bermasalah. Akhirnya memutuskan kembali ke web.
- **Timezone Bug di Kalender:** Error: Tanggal di kalender salah karena `toISOString()` mengubah waktu ke UTC. Solusi: Pakai `date-fns` dengan format lokal 'yyyy-MM-dd'.
- **Text Overflow di Mobile:** Error: Judul dan konten jurnal panjang melebar ke kanan di layar kecil. Solusi: Pakai class `truncate` di Tailwind.
- **Dropdown Profil di Sidebar Tidak Muncul Saat Collapsed:** Error: Avatar di sidebar tidak bisa diklik saat sidebar dicuitkan. Solusi: Pindahkan dropdown ke luar sidebar dengan `position: fixed`.
- **ESLint Warning "setState in useEffect":** Error: `Calling setState synchronously within an effect can trigger cascading renders`. Solusi: Tambahkan `// eslint-disable-next-line` atau pakai `useCallback`.
- **Toast Notifikasi Tidak Update:** Error: Terakhir Login tidak berubah setelah login ulang. Penyebab: Data diambil dari `loginLogs[0]` (yang pertama/terlama), bukan yang terbaru. Solusi: Ambil `loginLogs[loginLogs.length - 1]` (yang terakhir).
- **Trigger Login di Supabase Gagal:** Error: Login gagal setelah buat trigger di `auth.users`. Penyebab: Supabase membatasi akses ke schema `auth`. Trigger tidak bisa insert ke `activity_logs` karena RLS. Solusi: Hapus trigger, pindahkan logika insert ke frontend (`supabase.from('activity_logs').insert()`).

## 4. Solusi

- **Kembali ke Web:** Memang selalu error saat menjalan versi APK nya dengan menggunakan React Native bahkan sampai mencoba Expo dan CLI dan hasilnya tetap saja error di Library nya bahkan Konflik selalu jika versi Librarynya terbaru atau lama bahkan ada yang tertimpa, jadi memutuskan di Web saja untuk memperbaiki segala yang masih kurang. Jadi saya tidak memutuskan memaksa ke membuat versi APK nya.

## 5. Pelajaran yang Didapat

**Terburu-buru ke React Native Tanpa Cek Kompatibilitas Library: Supabase SDK versi terbaru TIDAK kompatibel dengan React Native CLI. Seharusnya dari awal saya cek dulu dokumentasi atau informasi yang jelas dengan sebelum memutuskan membuat versi APK nya... tapi saya tahu waktu itu memang bersamaan dengan Proses terjun langsung belajar ekosistem React Native, Expo dan CLI, jadinya saya 3 hari terbuang untuk hal ini dan sampai Burnout diwaktu itu untuk mencoba berbagai cara yang saya tahu dan bisa.**