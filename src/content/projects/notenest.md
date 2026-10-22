---
featured: true
title: "NoteNest"
description: "Aplikasi jurnal pribadi berbasis Flutter dengan dukungan multi-bahasa (ID/EN), tracking mood, upload foto, dan statistik menulis — semua berjalan 100% offline dengan Hive."
image: "Demo.jpg"
year: "2026"
status: "Tahap Pengembangan"
tech: ["Flutter", "Dart", "Android SDK", "Hive"]
category: "favorite"
demoUrl: "https://github.com/FerrCodes/Note-Nest/releases/latest"
repoUrl: "https://github.com/FerrCodes/Note-Nest"
---

## 1. Masalah

**Masalah Awal:** Saya ingin membuat aplikasi secara native, UI dan ingin tahu cara aplikasi bekerja dibaliknya dan ekosistem Android semua itu, tapi saya tidak mau pakai React Native karena sebelumnya saya sudah pernah mencoba dan berakhir burnout karena konflik Library yang tidak ada habisnya.

Karena sebelumnya saya sudah pernah mencoba React Native dan berakhir burnout karena konflik Library yang tidak ada habisnya, saya memutuskan untuk pindah ke Flutter dan mulai dari nol.

**Keputusan:** Saya memilih Flutter karena satu bahasa (Dart) bisa dipakai untuk Android saja tanpa harus setup native code yang rumit. Untuk database lokal saya memilih Hive karena ringan dan tidak butuh konfigurasi Gradle tambahan, sedangkan untuk fitur-fitur native seperti kamera, galeri, dan notifikasi saya pakai package resmi yang sudah stabil di ekosistem Flutter.

## 2. Pendekatan & Alasan Memilih Tech Stack

### 2.1 Kebutuhan
- Aplikasi harus bisa dipakai 100% offline, jadi tidak boleh bergantung pada server atau internet.
- User harus bisa menulis jurnal, upload foto dari galeri atau ambil langsung dari kamera, dan lacak mood harian.
- Perlu ada fitur statistik untuk melihat streak menulis, kalender bulanan, grafik mingguan, dan distribusi mood.
- Aplikasi harus mendukung multi-bahasa (Indonesia & Inggris) supaya bisa dipakai lebih luas.
- Perlu notifikasi pengingat harian supaya user konsisten menulis jurnal.
- UI harus mengikuti gaya iOS yang minimalis, gelap, dan tenang.
- Harus bisa di-build jadi APK release yang bisa dibagikan ke siapa saja.

### 2.2 Pilihan Stack
- Flutter untuk framework UI & build ke native Android
- Dart sebagai bahasa pemrograman utama
- Hive untuk database lokal (NoSQL)
- flutter_local_notifications untuk reminder harian
- image_picker untuk kamera & galeri
- fl_chart untuk grafik statistik
- intl + flutter_localizations untuk multi-bahasa
- url_launcher untuk buka Instagram, GitHub, Email, WhatsApp
- share_plus untuk export jurnal
- font_awesome_flutter untuk ikon brand
- Inter sebagai font utama aplikasi

### 2.3 Alasan Utama
- **Pindah dari React Native ke Flutter:** Karena di React Native saya sering kena konflik Library yang tidak jelas penyebabnya, sedangkan di Flutter semua package dikelola dengan lebih rapi dan stabil.
- **Hive > SQLite:** Hive lebih ringan, tidak butuh setup native code, dan cocok untuk aplikasi kecil-menengah seperti jurnal.
- **100% Offline:** Karena ini jurnal pribadi, saya tidak mau data user dikirim ke server. Semua data disimpan lokal di HP user.
- **Dark Mode Only:** Karena tema gelap lebih nyaman untuk aplikasi jurnal yang dipakai malam hari, dan lebih terlihat premium.

## 3. Kendala Teknis

- **Konflik Gradle pada Package shared_preferences:** Error `Could not close incremental caches`. Penyebab: Cache Gradle korup karena proyek di drive D: tapi cache di drive C:. Solusi: Ganti shared_preferences dengan Hive untuk menghindari konflik native code.
- **Konflik Gradle pada Package image_picker:** Error `Could not close incremental caches`. Solusi: Tambahkan `kotlin.incremental=false` di `gradle.properties`.
- **Kotlin Daemon Compilation Failed:** Penyebab: RAM laptop terbatas untuk compile Kotlin. Solusi: Set RAM Gradle & Kotlin daemon di `gradle.properties`, matikan Gradle daemon.
- **Error Desugaring di flutter_local_notifications:** Error `requires core library desugaring`. Solusi: Aktifkan `isCoreLibraryDesugaringEnabled` dan tambahkan `desugar_jdk_libs:2.1.4`.
- **kotlinOptions Deprecated di AGP 9.0:** Solusi: Pindahkan konfigurasi ke blok `kotlin { compilerOptions { } }`.
- **AndroidManifest.xml Salah Struktur:** Error `unexpected element <receiver>`. Solusi: Pindahkan semua `<receiver>` ke dalam `<application>`.
- **MainActivity ClassNotFoundException:** Penyebab: Package name di `build.gradle.kts` sudah diubah, tapi file `MainActivity.kt` masih pakai package lama.
- **Foto Preset Tidak Muncul di APK Release:** Penyebab: `_buildImage` cuma handle http & file, tapi tidak handle assets. Solusi: Tambahkan cabang ketiga di `_buildImage` untuk handle assets dengan `Image.asset`.
- **Error Kotlin Incremental Muncul Lagi di Proyek Baru:** Solusi: Pindahkan `PUB_CACHE` ke `D:\FlutterCache` lewat environment variable, dan masalah hilang permanen.

## 4. Solusi

- **Setup Permanen Anti-Error:** Setelah menghadapi puluhan error Gradle yang sama berulang-ulang, saya akhirnya memindahkan cache Flutter ke drive yang sama dengan proyek (`D:\FlutterCache`) lewat environment variable `PUB_CACHE`. Sejak saat itu, error Kotlin incremental hilang permanen.
- **Pindah dari React Native ke Flutter:** Setelah 3 hari burnout mencoba memperbaiki konflik Library di React Native tanpa hasil, saya memutuskan pindah ke Flutter dan mulai dari nol. Meskipun butuh belajar Dart dari awal, hasilnya jauh lebih stabil dan menyenangkan.
- **Rilis APK Release:** Setelah melewati semua error, saya build APK release (53.9 MB), test di HP sendiri, lalu upload ke GitHub Releases v1.1.0. Sekarang siapapun bisa download dan install langsung dari halaman GitHub.

## 5. Pelajaran yang Didapat

**Jangan Terburu-Buru Pindah Framework Tanpa Cek Ekosistemnya:** Saya sempat burnout 3 hari di React Native karena konflik Library yang tidak jelas, padahal kalau dari awal saya cek kompatibilitas dan ekosistemnya, saya bisa langsung pindah ke Flutter dan menghemat waktu. Tapi dari situ saya belajar bahwa setiap framework punya ekosistem sendiri, dan yang paling penting adalah memilih tool yang cocok dengan cara kerja kita — bukan yang paling populer.

**Setup Itu 50% Keberhasilan:** Dari semua error yang saya hadapi, sebagian besar bukan karena kode saya salah, tapi karena setup environment yang kurang tepat. Setelah saya atur cache di drive yang sama dengan proyek, exclude antivirus, dan set environment variable dengan benar, error-error itu hilang sendiri. Pelajaran pentingnya: investasi waktu untuk setup yang benar itu worth it.

## 6. Analogi & Konsep Baru

Selama mengerjakan NoteNest, saya banyak menemukan istilah dan konsep yang belum pernah saya sentuh di dunia Web. Supaya lebih mudah dipahami, saya tuliskan analogi-analoginya di sini.

### 6.1 Gradle — Si Mandor Proyek
**Analogi:** Bayangkan kamu mau membangun rumah. Kamu punya desainnya (kode Dart), tapi desain saja tidak cukup — kamu butuh semen, batu bata, tukang, dan alat berat. **Gradle itu mandor proyeknya.** Dia yang pesan material (download library), panggil tukang (compile kode Kotlin/Java), dan rakit semuanya jadi rumah (file APK).

**Kenapa rumit?** Karena Gradle harus support ribuan model HP Android, dari Android 5 sampai Android 15. Setiap HP punya spesifikasi berbeda, dan Gradle harus memastikan aplikasimu bisa jalan di semuanya. Itulah kenapa Gradle sering error — bukan karena kodenya salah, tapi karena "proyeknya" terlalu besar untuk diatur.

### 6.2 Kotlin & Java — Bahasa Native Android
**Analogi:** Kalau Dart itu bahasa yang kamu pakai untuk ngobrol dengan Flutter, maka **Kotlin dan Java** itu bahasa yang dipakai untuk ngobrol langsung dengan Android. Flutter tidak bisa langsung bicara ke Android — dia butuh "penerjemah" yang namanya Kotlin/Java.

**Kenapa penting?** Setiap kali kamu pakai fitur native (kamera, notifikasi, galeri), Flutter akan memanggil kode Kotlin di balik layar. Kalau kode Kotlin-nya error, aplikasimu juga error — meskipun kode Dart-mu 100% benar.

### 6.3 Kotlin Daemon — Si Tukang yang Butuh Tenaga
**Analogi:** Kotlin Daemon itu seperti tukang bangunan yang butuh tenaga ekstra untuk mengangkat material. Kalau tenaganya kurang (RAM terbatas), dia akan *drop* — dan itu yang bikin error `Daemon compilation failed`.

**Kenapa penting?** Daemon ini jalan di background, makan RAM 1-2 GB. Kalau laptop tersebut RAM-nya terbatas, dia sering crash. Solusinya: atur RAM di `gradle.properties`, dan matikan daemon kalau tidak dipakai.

### 6.4 Incremental Cache — Lemari Arsip yang Bisa Berjamur
**Analogi:** Bayangkan kamu punya lemari arsip. Setiap kali compile, Gradle menyimpan hasilnya di lemari itu supaya compile berikutnya lebih cepat. Tapi kalau lemari itu **berjamur** (cache korup), bukan cepat — malah error.

**Kenapa penting?** Error `Could not close incremental caches` itu artinya lemari arsipnya rusak. Penyebabnya bisa banyak: drive berbeda, antivirus, atau proses yang nyangkut. Solusinya: bersihkan lemari (`flutter clean`), atau matikan fitur arsipnya (`kotlin.incremental=false`).

### 6.5 Core Library Desugaring — Penerjemah untuk Android Lama
**Analogi:** Bayangkan kamu punya buku dengan bahasa modern, tapi harus dibaca oleh orang yang hanya mengerti bahasa kuno. **Desugaring** itu penerjemahnya — dia mengubah kode modern (Java 8+) jadi kode yang bisa dipahami Android versi lama (Android 5).

**Kenapa penting?** Package seperti `flutter_local_notifications` butuh fitur Java 8+, tapi harus tetap jalan di Android 5. Tanpa desugaring, aplikasimu tidak akan bisa di-build.

### 6.6 Environment Variable — Alamat Rumah
**Analogi:** Environment variable itu seperti **alamat rumah** yang dipakai sistem operasi untuk mencari sesuatu. Kalau `PUB_CACHE` mengarah ke drive D:, maka Flutter akan mencari cache-nya di sana. Kalau alamatnya salah, dia akan tersesat — dan error.

**Kenapa penting?** Banyak error Gradle terjadi karena environment variable tidak di-set dengan benar. Setelah saya pindahkan `PUB_CACHE` ke drive yang sama dengan proyek, error yang sama berulang-ulang itu hilang permanen.

### 6.7 APK — Rumah yang Siap Ditinggali
**Analogi:** Kalau kode Flutter itu **desain rumah**, maka **APK** itu **rumah jadi** yang bisa ditinggali. Semua material sudah dirakit, semua kabel sudah tersambung, dan siap dipakai.

**Kenapa penting?** APK itu **hasil akhir** dari semua proses. Dari kode Dart, compile ke Kotlin, dirakit Gradle, jadi file APK yang bisa di-install di HP siapa saja. Itu momen paling memuaskan — ketika hasil kerja berhari-hari jadi satu file yang bisa dibagikan.