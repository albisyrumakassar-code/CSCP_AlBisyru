# Panduan Instalasi CSCP

## 1. Isi paket
- `index.html` — landing page, dialog autentikasi, dan area peserta awal.
- `style.css` — desain responsif.
- `script.js` — interaksi UI dan koneksi Supabase.
- `schema.sql` — struktur database awal beserta RLS.
- `CHECKLIST_INTEGRASI_PRODUKSI.md` — daftar pemeriksaan sebelum rilis.

## 2. Jalankan pratinjau lokal
1. Ekstrak folder `CSCP`.
2. Buka folder dengan editor kode.
3. Jalankan melalui server lokal (disarankan VS Code + Live Server). Jangan mengandalkan `file://` untuk pengujian autentikasi.
4. Tanpa konfigurasi Supabase, halaman tampil sebagai pratinjau; registrasi dan login tidak aktif.

## 3. Buat proyek Supabase
1. Buat proyek baru di Supabase.
2. Buka **SQL Editor**, jalankan seluruh isi `schema.sql`.
3. Buka **Project Settings → API** dan salin Project URL serta publishable/anon key.
4. Di `script.js`, isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY`.
5. Jangan pernah menaruh `service_role` / secret key pada frontend atau repository publik.

## 4. Pengaturan autentikasi nomor HP
1. Di Supabase Authentication, aktifkan Phone provider.
2. Konfigurasikan penyedia SMS/OTP yang didukung dan kredensialnya.
3. Atur kebijakan verifikasi nomor dan password sesuai kebijakan layanan.
4. Uji alur pendaftaran, OTP, login, logout, dan pemulihan akun pada nomor uji.
5. Implementasi UI saat ini memakai sign-up nomor telepon + password. Email hanya disimpan sebagai data profil opsional; alur reset password dan verifikasi OTP interaktif perlu diselesaikan sebelum produksi.

## 5. Buat akun staf dengan aman
1. Daftarkan akun staf melalui alur autentikasi.
2. Verifikasi identitas staf melalui prosedur internal.
3. Tambahkan role melalui SQL Editor/operasi server tepercaya, misalnya:
   ```sql
   insert into public.user_roles(user_id, role)
   values ('UUID_USER_STAFF', 'admin');
   ```
4. Ganti UUID contoh dengan UUID akun yang benar.
5. Jangan menyediakan endpoint publik untuk menaikkan role sendiri. Role tidak boleh dapat ditulis oleh pengguna dari browser.

## 6. Deployment Cloudflare Pages
1. Simpan proyek di repository Git.
2. Buat proyek Cloudflare Pages dan hubungkan repository.
3. Untuk situs statis tanpa build step, set build command kosong dan output directory ke root folder proyek (atau folder tempat `index.html` berada).
4. Deploy, lalu tambahkan domain khusus bila diperlukan.
5. Perbarui URL redirect/callback di Supabase Authentication sesuai domain produksi.
6. Uji di desktop dan ponsel, termasuk autentikasi serta kebijakan akses.

## 7. Batasan paket awal
Paket ini adalah fondasi awal, bukan sistem produksi lengkap. Dashboard fasilitator, manajemen bank soal, manajemen materi, checklist dinamis, kelas Zoom, ekspor data, reset password, histori nilai, dan laporan analitik belum dibangun secara menyeluruh. Tryout pada halaman hanya contoh antarmuka; bank soal dan penilaian produksi harus dilayani database/backend dan diuji.

## 8. Privasi
Kumpulkan data yang benar-benar diperlukan. Terbitkan kebijakan privasi, tetapkan retensi data, mekanisme koreksi/penghapusan, akses petugas, dan prosedur penanganan insiden sebelum menerima data peserta sungguhan.
