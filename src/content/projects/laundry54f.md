---
featured: true
title: "Laundry 54F"
description: "Booking laundry online dengan sistem pembayaran digital (QRIS, E-Wallet, Kartu Kredit), dashboard admin lengkap, dan keamanan database tingkat lanjut menggunakan Supabase RLS."
image: "Laundry54F.png"
year: "2026"
status: "Revisi"
tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel"]
category: "web"
demoUrl: "https://laundry54f.vercel.app/"
repoUrl: "https://github.com/FerrCodes/Laundry"
---

## 1. Masalah

**Masalah Awal:** Saya ingin membuat projek booking laundry online yang modern dengan fitur pembayaran digital (QRIS, E-Wallet, Kartu Kredit), dashboard admin lengkap, tracking status order, dan keamanan database tingkat lanjut. Karena saya ingin membangun proyek dengan Tech Stack modern, saya memilih Next.js 16 dengan App Router, TypeScript, Tailwind CSS, Supabase, dan Midtrans sebagai payment gateway.

**Keputusan:** Saya memilih Tech Stack (Tumpukan Teknologi) yaitu Next.js, TypeScript, Tailwind CSS, Supabase, dan Midtrans untuk deploy di Vercel. Tujuan proyek ini adalah untuk membuat aplikasi laundry online yang siap production dengan sistem pembayaran digital, manajemen order yang rapi, dan keamanan data customer yang terjamin. Saya juga belajar banyak tentang middleware role-based, RLS (Row Level Security), dan integrasi webhook Midtrans.

## 2. Pendekatan & Alasan Memilih Tech Stack

### 2.1 Kebutuhan
- Membangun aplikasi laundry online dengan sistem pembayaran digital (QRIS, E-Wallet, Kartu Kredit) menggunakan Midtrans.
- Memisahkan akses customer dan admin dengan middleware role-based (Supabase Auth + Middleware).
- Memilih Supabase karena Row Level Security (RLS)-nya memungkinkan saya membuat sistem multi-user yang aman tanpa perlu setup backend server manual.
- Aplikasi harus responsif di desktop dan mobile.
- Dashboard admin untuk kelola order, layanan, dan customer.
- Tracking status order dari "Menunggu" hingga "Sudah Diambil".
- Proses development tidak boleh terlalu rumit.

### 2.2 Pilihan Stack
- Next.js 16 + TypeScript untuk framework dan type safety.
- Tailwind CSS untuk styling cepat & konsisten.
- Supabase untuk Database, Auth, dan RLS.
- Midtrans untuk Payment Gateway (QRIS, E-Wallet, Kartu Kredit).
- Lucide React untuk Icon library.
- Vercel untuk Deploy.
- ngrok/localtunnel untuk testing webhook di local.

### 2.3 Alasan Utama
- **Next.js + App Router:** Routing modern, server components, dan mudah di-deploy ke Vercel.
- **Supabase RLS:** Keamanan data customer tanpa perlu backend manual.
- **Midtrans:** Payment gateway populer di Indonesia, support QRIS, OVO, Gopay, DANA, dan Kartu Kredit.
- **Webhook:** Update status pembayaran otomatis setelah customer bayar.
- **Role-based middleware:** Customer tidak bisa akses halaman admin, dan sebaliknya.

## 3. Kendala Teknis

- **Error "Two Parallel Pages" di Next.js:** Error `You cannot have two parallel pages that resolve to the same path`. Penyebab: Adanya folder route group `(admin)` dan `customer` yang bentrok. Solusi: Hapus folder yang salah, gunakan hanya satu struktur folder.
- **Error RLS "Permission Denied":** Error `permission denied for table orders / profiles / payments`. Penyebab: RLS aktif tapi policy belum dibuat atau GRANT belum diberikan. Solusi: Berikan GRANT SELECT/UPDATE/INSERT dan buat policy yang sesuai untuk customer dan admin.
- **Error Midtrans "Sequence Permission Denied":** Error `permission denied for sequence order_number_seq`. Penyebab: Trigger order_number menggunakan SEQUENCE yang tidak diberi izin ke role authenticated. Solusi: `GRANT USAGE, SELECT ON SEQUENCE order_number_seq TO authenticated`.
- **Webhook Midtrans Tidak Berjalan di Localhost:** Penyebab: Localhost tidak bisa diakses dari internet. Solusi: Gunakan ngrok atau localtunnel untuk membuat URL publik sementara.
- **Error "useSearchParams() should be wrapped in Suspense":** Penyebab: Client Component pakai `useSearchParams()` tanpa Suspense boundary. Solusi: Bungkus komponen dengan Suspense di `page.tsx`, pindahkan logika ke komponen terpisah.
- **Redirect Loop di Vercel (ERR_TOO_MANY_REDIRECTS):** Penyebab: Middleware redirect terus-menerus antara `/auth/login` dan `/customer`. Solusi: Perbaiki logic middleware, pastikan redirect hanya terjadi sekali.
- **Error "Column profiles_1.email does not exist":** Penyebab: Email ada di `auth.users`, bukan di `profiles`. Solusi: Hapus email dari query profiles, gunakan dummy email atau join ke `auth.users`.

## 4. Solusi

- **Konsisten dengan Satu Struktur Folder:** Saya memutuskan untuk hanya menggunakan satu struktur folder (tanpa route group ganda) agar tidak ada konflik di Next.js. Ini membuat routing lebih sederhana dan mudah dipahami.
- **RLS Bertahap:** Saya aktifkan RLS secara bertahap, dimulai dari tabel yang paling sensitif (orders, profiles, payments), lalu buat policy yang sesuai untuk customer dan admin.
- **Webhook Testing dengan Ngrok:** Saya gunakan ngrok untuk testing webhook Midtrans di localhost, lalu setelah deploy ke Vercel, webhook berjalan otomatis tanpa perlu ngrok lagi.
- **Suspense Boundary:** Saya pindahkan logika `useSearchParams()` ke komponen terpisah dan bungkus dengan Suspense di `page.tsx`.
- **Middleware yang Lebih Sederhana:** Saya perbaiki logic middleware agar tidak terjadi redirect loop, dengan memastikan redirect hanya terjadi sekali berdasarkan role user.

## 5. Pelajaran yang Didapat

**Memahami konsep RLS dulu Sebelum Production:** Saya belajar bahwa RLS di Supabase sangat powerful tapi juga bisa menjadi sumber error jika tidak dipahami dengan baik. Awalnya saya matikan RLS untuk development, tapi setelah deploy ke Vercel, saya sadar bahwa RLS harus diaktifkan untuk keamanan data customer. Saya juga belajar cara membuat policy yang tepat untuk customer dan admin.

**Webhook Itu Vital untuk Payment Gateway:** Saya belajar bahwa redirect URL saja tidak cukup untuk mengkonfirmasi pembayaran. Webhook dari server Midtrans adalah satu-satunya cara yang aman untuk update status pembayaran. Saya juga belajar cara verifikasi signature untuk mencegah webhook palsu.

**Jangan Terburu-buru ke Production:** Saya sempat mengalami redirect loop di Vercel karena middleware yang belum sempurna. Lalu ditest dulu di localhost dengan berbagai skenario sebelum deploy ke production.