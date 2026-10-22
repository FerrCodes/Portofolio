---
title: "Face Recognition"
description: "Sistem pengenalan wajah berbasis web yang menerima foto dari smartphone, memprosesnya secara online, dan menghasilkan laporan dalam format Excel."
image: "facerecognition.png"
year: "2026"
status: "Selesai"
tech: ["Python", "OpenCV", "Streamlit"]
category: "sistem"
demoUrl: "https://facerecognition-facial-recognition-system-learning.streamlit.app/"
repoUrl: "https://github.com/FerrCodes/FaceRecognition"
---

## 1. Masalah

**Masalah Awal:** Guru jurusan saya menyuruh membuat projek Machine Learning untuk mengenali wajah dengan cara wajah seseorang menggunakan Hp, kemudian hasil fotonya di pindahkan ke PC untuk di deteksi lalu nanti hasilnya terbentuk file .xlsx (Excel)
**Keputusan:** Saya membuat konsep alur nya seperti ini:
- 📱 Smartphone (ambil foto)
- ⬆️ Upload ke Web App (Streamlit)
- 🧠 DeepFace + FaceNet (deteksi & perbandingan)
- 📊 Hasil: **DIKENAL** / **TIDAK DIKENAL**
- 📄 Export ke Excel (Batch Mode)
- ✅ Selesai

Saya menggunakan DeepFace sebagai library utama karena lebih mudah diinstal dan sudah menyediakan model FaceNet yang siap pakai.
Saya juga memilih Streamlit untuk membuat antarmuka web agar proyek bisa diakses publik.

## 2. Pendekatan & Alasan Memilih Tech Stack

### 2.1 Kebutuhan
- Deteksi wajah akurat, menggunakan model deep learning yang sudah teruji.
- Batch processing, bisa memproses banyak foto sekaligus.
- Export ke Excel, hasil deteksi harus bisa diunduh sebagai laporan.
- Web app publik, bisa diakses tanpa instalasi.
- Multi-mode, single upload untuk testing, batch upload untuk produksi.

### 2.2 Pilihan Stack
- Python 3.11, Bahasa pemrograman utama.
- DeepFace, Library face recognition dengan model FaceNet.
- Streamlit, Framework web untuk antarmuka.
- Pandas & Openpyxl, Ekspor hasil ke Excel.
- OpenCV, Pemrosesan gambar.
- sonner untuk Toast notification modern.
- lucide-react Icon library.
- react-toastify Legacy toast (diganti ke sonner).
- react-router-dom untuk Routing halaman.
- recharts untuk Grafik statistik.

### 2.3 Alasan Utama
- **DeepFace > face_recognition:** Tidak perlu install dlib yang bermasalah di Windows, lebih mudah di-deploy ke cloud.
- **Streamlit > Flask:** Lebih cepat untuk membuat antarmuka web, tidak perlu HTML, CSS, JavaScript.
- **FaceNet > Model lain:** Akurasi tinggi dan sudah tersedia di DeepFace.

## 3. Kendala Teknis

- **Python 3.14 tidak kompatibel dengan dlib:** Penyebab: Python 3.14 belum didukung library. Solusi: Downgrade ke Python 3.11
- **Error tf-keras tidak ditemukan:** Penyebab: TensorFlow 2.21+ butuh tf-keras terpisah. Solusi: pip install tf-keras
- **Error openpyxl tidak ditemukan:** Penyebab: Pandas butuh engine untuk Excel. Solusi: pip install openpyxl
- **Error libGL.so.1 di Streamlit Cloud:** Penyebab: OpenCV butuh library sistem di cloud. Solusi: Hapus packages.txt, pakai opencv-python-headless
- **DeepFace tidak bisa diimport di cloud:** Penyebab: Versi tidak kompatibel. Solusi: Gunakan versi stabil deepface==0.0.79
- **Foto tidak terdeteksi wajahnya:** Penyebab: Deteksi wajah terlalu ketat. Solusi: Tambahkan enforce_detection=False
- **Batch processing lambat:** Penyebab: Render ulang halaman terus-menerus. Solusi: Gunakan st.empty() dan tampilkan hasil setelah selesai
- **Scroll patah-patah:** Penyebab: Gambar besar dimuat di setiap iterasi. Solusi: Resize gambar dengan thumbnail()

**Kendala Terbesar: libGL.so.1 error di Streamlit Cloud**
- Penyebab: OpenCV membutuhkan library sistem libGL yang tidak tersedia di environment cloud.
- Solusi: Hapus packages.txt, gunakan opencv-python-headless yang tidak membutuhkan libGL
Butuh 3 kali percobaan deploy sampai berhasil.

## 4. Solusi

**Untuk menyelesaikan proyek ini:** Saya mengganti library utama dari face_recognition ke DeepFace karena lebih mudah diinstal dan tidak membutuhkan dlib yang bermasalah di Windows. Untuk antarmuka, saya memilih Streamlit agar bisa membuat web app dengan cepat tanpa harus menulis HTML, CSS, atau JavaScript. Sistem dirancang dengan dua mode: Single Upload untuk testing cepat dan Batch Upload & Export untuk memproses banyak foto sekaligus dengan progress bar, tabel hasil, dan tombol download Excel. Performa juga dioptimalkan dengan meresize gambar sebelum ditampilkan dan menampilkan hasil batch setelah semua foto selesai diproses, sehingga scrolling terasa halus. Setelah beberapa kali percobaan deploy dan perbaikan konfigurasi, akhirnya aplikasi berhasil dideploy ke Streamlit Cloud dan bisa diakses publik dengan stabil.

## 5. Pelajaran yang Didapat

**Jangan Menyerah pada Error: Saya hampir menyerah ketika error libGL.so.1 muncul berkali-kali. Tapi dengan mencoba pendekatan berbeda (hapus packages.txt, ganti versi OpenCV), akhirnya berhasil.**