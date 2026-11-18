# Checklist Integrasi Produksi CSCP

## A. Konfigurasi dan infrastruktur
- [ ] Buat proyek Supabase produksi dan pisahkan dari proyek uji.
- [ ] Jalankan `schema.sql` dan tinjau setiap kebijakan RLS.
- [ ] Isi URL dan publishable/anon key pada konfigurasi frontend.
- [ ] Pastikan tidak ada service-role/secret key di HTML, JS, Git, atau log.
- [ ] Hubungkan repository ke Cloudflare Pages.
- [ ] Atur domain, HTTPS, redirect URL, dan environment yang sesuai.
- [ ] Siapkan backup database dan prosedur pemulihan.

## B. Autentikasi
- [ ] Aktifkan Phone Auth dan penyedia OTP/SMS.
- [ ] Uji verifikasi nomor telepon.
- [ ] Selesaikan alur lupa/reset password.
- [ ] Uji login/logout lintas perangkat.
- [ ] Terapkan pembatasan percobaan login dan pemantauan penyalahgunaan.
- [ ] Pastikan role staf diberikan hanya melalui proses tepercaya.

## C. Data dan otorisasi
- [ ] Uji peserta hanya dapat membaca/mengubah profil sendiri.
- [ ] Uji peserta A tidak dapat membaca data peserta B.
- [ ] Uji peserta tidak dapat mengubah role sendiri.
- [ ] Uji fasilitator/admin sesuai matriks kewenangan.
- [ ] Audit seluruh tabel dan operasi INSERT/SELECT/UPDATE/DELETE.
- [ ] Tambahkan validasi server-side dan audit log untuk operasi sensitif.
- [ ] Uji penghapusan akun dan retensi data.

## D. Fitur produk
- [ ] Selesaikan dashboard peserta dan data statistik aktual.
- [ ] Bangun dashboard fasilitator.
- [ ] Bangun CRUD bank soal dan pembahasan.
- [ ] Pisahkan soal TWK, TIU, dan TKP.
- [ ] Verifikasi metode penilaian, terutama bobot TKP.
- [ ] Simpan sesi, jawaban, dan hasil tryout di database.
- [ ] Bangun rekomendasi belajar berdasarkan hasil.
- [ ] Bangun checklist dokumen per peserta.
- [ ] Bangun manajemen jadwal Zoom dan notifikasi.
- [ ] Bangun ekspor CSV/XLSX dengan kontrol akses.

## E. Mutu dan aksesibilitas
- [ ] Uji Chrome, Firefox, Safari, dan browser mobile utama.
- [ ] Uji ukuran layar ponsel, tablet, laptop, dan desktop.
- [ ] Pastikan tidak ada horizontal overflow.
- [ ] Uji validasi formulir dan pesan kesalahan.
- [ ] Uji keyboard navigation, label form, kontras, dan screen reader dasar.
- [ ] Hormati `prefers-reduced-motion`.
- [ ] Jalankan pemeriksaan keamanan dependency dan JavaScript.
- [ ] Uji performa dan optimasi aset.

## F. Legal dan operasional
- [ ] Terbitkan kebijakan privasi dan syarat layanan.
- [ ] Siapkan persetujuan pemrosesan data yang jelas.
- [ ] Tetapkan petugas yang dapat mengakses data pribadi.
- [ ] Siapkan prosedur permintaan akses, koreksi, dan penghapusan data.
- [ ] Tetapkan retensi, backup, dan respons insiden.
- [ ] Pastikan konten latihan tidak diklaim sebagai soal resmi tanpa verifikasi.
- [ ] Lakukan UAT dengan peserta dan fasilitator sebelum peluncuran.

**Rilis produksi hanya setelah seluruh butir kritis keamanan, autentikasi, otorisasi, dan backup telah lulus pengujian.**
