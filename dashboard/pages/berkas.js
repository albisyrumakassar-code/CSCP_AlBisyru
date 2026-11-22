/**
 * Halaman Fitur: Persiapan Berkas Seleksi CASN
 * Route: /dashboard/persiapan-berkas (#persiapan-berkas)
 * Klasifikasi 1: Berkas & Informasi Pembuatan Akun SSCASN (Infografis Berurutan)
 * Klasifikasi 2: Berkas Unggahan Setelah Mendaftar Formasi Instansi
 */

function getPanduanImgPath(filename) {
  const isInsideSubdir = window.location.pathname.includes("/dashboard");
  return isInsideSubdir ? `images/panduan-sscasn/${filename}` : `dashboard/images/panduan-sscasn/${filename}`;
}

const SSCASN_SLIDES = [
  {
    step: "Langkah 1",
    badge: "Cover Panduan",
    title: "Mau Daftar Jadi Calon ASN?",
    desc: "Simak panduan langkah demi langkah pembuatan akun SSCASN BKN secara tepat dan terhindar dari kesalahan data.",
    filename: "1_cover_panduan_sscasn.jpg"
  },
  {
    step: "Langkah 2",
    badge: "Validasi Awal KTP",
    title: "Mulai Pendaftaran Akun SSCASN dengan Tepat",
    desc: "1. Buka situs resmi SSCASN (sscasn.bkn.go.id) lalu klik Buat Akun. 2. Isi NIK, No. KK, nama lengkap, tempat/tgl lahir, kota terbit KTP, no HP, dan email. 3. Periksa kesesuaian data dengan Dukcapil.",
    filename: "2_langkah_1_2_3_buka_situs_isi_ktp.jpg"
  },
  {
    step: "Langkah 3",
    badge: "Pengisian Berkas & Akun",
    title: "Lengkapi Data Diri & Keamanan Akun",
    desc: "Unggah scan KTP asli, isi data ijazah (nama tanpa gelar, tanggal lahir, kota lahir), buat password kombinasi 8-64 karakter (huruf kapital, huruf kecil, angka, simbol), dan pilih 2 pertanyaan pengaman.",
    filename: "3_langkah_4_lengkapi_data_ktp_ijazah.jpg"
  },
  {
    step: "Langkah 4",
    badge: "Foto Biometrik",
    title: "Pengambilan Swafoto (Selfie)",
    desc: "Pastikan posisi wajah pas di dalam bingkai oval, pencahayaan ruangan cukup terang, serta tidak menggunakan masker atau kacamata hitam.",
    filename: "4_langkah_5_swafoto.jpg"
  },
  {
    step: "Langkah 5",
    badge: "Resume & Persetujuan",
    title: "Cek Ulang Sebelum Selesai",
    desc: "Periksa kembali nama, tempat lahir, tanggal lahir, dan foto karena tidak dapat diubah setelah akun dibuat. Centang persetujuan EULA, lalu klik 'Selesaikan Pendaftaran'.",
    filename: "5_langkah_6_cek_ulang_sebelum_selesai.jpg"
  },
  {
    step: "Langkah 6",
    badge: "Dokumen Registrasi",
    title: "Cetak Bukti Pendaftaran Akun",
    desc: "Klik 'Cetak Informasi Pendaftaran' dan simpan buktinya dengan aman. Satu NIK hanya bisa digunakan untuk satu kali registrasi. Jaga kerahasiaan NIK dan password akun Anda.",
    filename: "6_langkah_7_cetak_bukti_pendaftaran.jpg"
  },
  {
    step: "Langkah 7",
    badge: "Tahap Berikutnya",
    title: "Akun Jadi, Saatnya Memilih Formasi!",
    desc: "Login kembali ke portal SSCASN untuk mengisi biodata lengkap, riwayat pendidikan, memilih formasi jabatan yang dituju, dan mengunggah dokumen persyaratan instansi.",
    filename: "7_langkah_8_akun_jadi_saatnya_lanjut.jpg"
  }
];

const FORMASI_DOCUMENTS = [
  {
    num: "1",
    title: "Surat Pernyataan Ditandatangani & Bermeterai",
    ruleBadge: "Lampiran Formasi",
    ruleColor: "amber",
    desc: "Surat Pernyataan yang sudah ditandatangani dan dibubuhi meterai. Format resmi surat pernyataan disediakan sebagai lampiran dan akan muncul bersamaan dengan pengumuman rincian formasi dari instansi.",
    format: "PDF",
    maxSize: "Maks. 1.000 KB",
    tip: "Gunakan e-Meterai resmi Peruri atau meterai tempel sesuai petunjuk juknis instansi."
  },
  {
    num: "2",
    title: "Surat Lamaran Resmi Bermeterai",
    ruleBadge: "Ditujukan ke Menteri Agama RI",
    ruleColor: "amber",
    desc: "Surat lamaran ditulis tangan dengan tinta hitam atau diketik menggunakan komputer yang ditujukan kepada Menteri Agama Republik Indonesia yang sudah ditandatangani dan dibubuhi meterai. Format surat lamaran resmi disediakan sebagai lampiran saat pengumuman formasi dibuka.",
    format: "PDF",
    maxSize: "Maks. 500 - 1.000 KB",
    tip: "Pastikan tanggal surat sesuai dengan periode pendaftaran dan tujuan surat tertulis tepat."
  },
  {
    num: "3",
    title: "Kartu Tanda Penduduk (KTP) Asli / Surat Keterangan Dukcapil",
    ruleBadge: "Identitas Kependudukan",
    ruleColor: "blue",
    desc: "Kartu Tanda Penduduk (KTP) asli atau Surat Keterangan asli telah melakukan perekaman kependudukan yang dikeluarkan oleh Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) yang masih berlaku.",
    format: "JPEG / JPG",
    maxSize: "Maks. 500 KB",
    tip: "Scan berwarna, seluruh tepi KTP terlihat utuh, nomor NIK dan tulisan terbaca jelas tanpa blur."
  },
  {
    num: "4",
    title: "Bukti Sertifikat Akreditasi Perguruan Tinggi / Prodi / Izin Ma'had Aly",
    ruleBadge: "Akreditasi BAN-PT / LAM",
    ruleColor: "green",
    desc: "Bukti sertifikat akreditasi perguruan tinggi dan/atau program studi yang terakreditasi pada BAN-PT atau Lembaga Akreditasi Mandiri (LAM), atau bukti izin operasional bagi pelamar yang berasal dari Ma'had Aly sesuai dengan tahun kelulusan.",
    format: "PDF",
    maxSize: "Maks. 500 - 1.000 KB",
    tip: "Dapat berupa tangkapan layar (screenshot) resmi dari pangkalan data PDDIKTI / BAN-PT atau scan sertifikat fisik."
  },
  {
    num: "5",
    title: "Ijazah Asli Sesuai Kualifikasi Formasi",
    ruleBadge: "Kualifikasi Pendidikan",
    ruleColor: "blue",
    desc: "Ijazah asli sesuai dengan ketentuan persyaratan kualifikasi pendidikan formasi yang dilamar. Bagi lulusan luar negeri, wajib menyertakan surat penyetaraan ijazah dari kementerian terkait.",
    format: "PDF",
    maxSize: "Maks. 1.000 KB",
    tip: "Wajib scan dari fisik Ijazah Asli berwarna, bukan fotokopi legalisir (kecuali juknis menentukan lain)."
  },
  {
    num: "6",
    title: "Transkrip Nilai Asli",
    ruleBadge: "Prestasi Akademik",
    ruleColor: "blue",
    desc: "Transkrip Nilai asli lengkap seluruh semester/halaman sesuai dengan ketentuan persyaratan kualifikasi pendidikan.",
    format: "PDF",
    maxSize: "Maks. 1.000 KB",
    tip: "Jika transkrip memiliki halaman bolak-balik, gabungkan menjadi satu berkas file PDF utuh yang berurutan."
  },
  {
    num: "7",
    title: "Pasfoto Terbaru Pakaian Formal Latar Belakang Merah",
    ruleBadge: "Latar Belakang Merah",
    ruleColor: "red",
    desc: "Pasfoto terbaru menggunakan pakaian formal (kemeja putih rapi/jas/dasi) dengan latar belakang warna merah menyala.",
    format: "JPEG / JPG",
    maxSize: "Maks. 200 - 300 KB",
    tip: "Foto studio tegak berdimensi tajam, wajah menghadap lurus ke kamera, bukan hasil foto selfie atau potong dari foto lain."
  }
];

export function renderBerkasPage(userData) {
  const slidesHtml = SSCASN_SLIDES.map((slide, idx) => {
    const imgPath = getPanduanImgPath(slide.filename);
    return `
      <article class="sscasn-slide-card" onclick="openLightbox('${imgPath}', '${slide.step}: ${escapeHtml(slide.title)}')">
        <div class="sscasn-img-container">
          <img src="${imgPath}" onerror="if(!this.dataset.retried){this.dataset.retried='1';this.src='dashboard/images/panduan-sscasn/${slide.filename}';}" alt="${escapeHtml(slide.title)}" loading="lazy">
          <div class="sscasn-slide-overlay">
            <span class="sscasn-zoom-pill">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              Perbesar Gambar
            </span>
          </div>
        </div>
        <div class="sscasn-slide-info">
          <span class="sscasn-step-badge">${slide.step} · ${slide.badge}</span>
          <h4 class="sscasn-slide-title">${slide.title}</h4>
          <p class="sscasn-slide-desc">${slide.desc}</p>
        </div>
      </article>
    `;
  }).join("");

  const docsHtml = FORMASI_DOCUMENTS.map((doc) => `
    <article class="doc-formal-item">
      <div class="doc-number-marker">${doc.num}</div>
      <div class="doc-formal-content">
        <div class="doc-meta-badges-row">
          <span class="badge-doc-rule ${doc.ruleColor}">Dokumen #${doc.num}</span>
          <span class="badge-doc-rule ${doc.ruleColor}">${doc.ruleBadge}</span>
        </div>
        <h3 class="doc-formal-title">${doc.title}</h3>
        <p class="doc-formal-desc">${doc.desc}</p>
        <div class="doc-formal-footer">
          <div class="doc-format-info">
            <span>Format Wajib: <strong>${doc.format}</strong></span>
            <span>•</span>
            <span>Batas Ukuran: <strong>${doc.maxSize}</strong></span>
          </div>
          <div class="doc-tip-alert">💡 Catatan: ${doc.tip}</div>
        </div>
      </div>
    </article>
  `).join("");

  return `
    <div class="feature-page-container berkas-main-wrapper">
      <!-- Breadcrumb Navigasi -->
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Persiapan Berkas Seleksi CASN</span>
      </div>

      <!-- Feature Header Card -->
      <div class="feature-hero-card">
        <div class="feature-hero-header">
          <div class="feature-icon-badge">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <span class="feature-kicker">PANDUAN INFORMASI RESMI</span>
            <h1 class="feature-title">Persiapan Berkas Seleksi CASN</h1>
            <p class="feature-desc">
              Pusat informasi dan checklist dokumen yang wajib Anda siapkan dalam proses seleksi Calon Aparatur Sipil Negara, terbagi menjadi 2 tahapan utama: saat pembuatan akun portal SSCASN dan saat pendaftaran formasi instansi.
            </p>
          </div>
        </div>

        <!-- Banner Penjelasan Khusus -->
        <div class="berkas-info-banner">
          <span class="berkas-info-icon">ℹ️</span>
          <div class="berkas-info-content">
            <h3>Informasi Penting Persiapan Berkas:</h3>
            <p>
              Fitur ini merupakan <strong>panduan informasi dan checklist mandiri</strong> untuk membantu Anda mempersiapkan seluruh berkas dengan format dan ukuran yang benar. Seluruh pengunggahan dokumen dilakukan secara resmi di portal <strong>SSCASN BKN (sscasn.bkn.go.id)</strong> saat pendaftaran dibuka.
            </p>
          </div>
        </div>

        <!-- Navigasi Lompat Antar-Klasifikasi -->
        <div class="berkas-tabs-nav" style="margin-top: 24px;">
          <a href="#sscasn-section" class="berkas-tab-btn active" onclick="document.getElementById('sec-sscasn').scrollIntoView({behavior:'smooth'}); return false;">
            <span>1. Berkas & Informasi Buat Akun SSCASN</span>
          </a>
          <a href="#formasi-section" class="berkas-tab-btn" onclick="document.getElementById('sec-formasi').scrollIntoView({behavior:'smooth'}); return false;">
            <span>2. Berkas Unggahan Setelah Daftar Formasi</span>
          </a>
          <a href="https://sscasn.bkn.go.id/" target="_blank" rel="noopener noreferrer" class="berkas-tab-btn" style="color: var(--navy-primary); border-color: #B9D5F7;">
            <span>🌐 Buka Portal SSCASN BKN ↗</span>
          </a>
        </div>
      </div>

      <!-- ========================================================
           KLASIFIKASI 1: Pembuatan Akun SSCASN
           ======================================================== -->
      <section class="berkas-section-box" id="sec-sscasn">
        <div class="berkas-section-header">
          <span class="berkas-section-kicker">KLASIFIKASI TAHAP 1</span>
          <h2 class="berkas-section-title">1. Berkas & Informasi Saat Buat Akun SSCASN</h2>
          <p class="berkas-section-desc">
            Ikuti alur panduan pembuatan akun SSCASN resmi berikut ini secara berurutan sesuai infografis panduan. Klik pada gambar untuk memperbesar tampilan infografis.
          </p>
        </div>

        <!-- Grid 7 Slide Infografis Berurutan -->
        <div class="sscasn-guide-grid">
          ${slidesHtml}
        </div>
      </section>

      <!-- ========================================================
           KLASIFIKASI 2: Berkas Unggahan Setelah Daftar Formasi
           ======================================================== -->
      <section class="berkas-section-box" id="sec-formasi">
        <div class="berkas-section-header">
          <span class="berkas-section-kicker">KLASIFIKASI TAHAP 2</span>
          <h2 class="berkas-section-title">2. Berkas yang Diupload Setelah Daftar Formasi</h2>
          <p class="berkas-section-desc">
            Setelah berhasil memilih formasi jabatan yang dituju di portal SSCASN, siapkan dan unggah 7 berkas persyaratan resmi berikut ini:
          </p>
        </div>

        <!-- Daftar 7 Dokumen Wajib -->
        <div class="docs-formal-list">
          ${docsHtml}
        </div>
      </section>

      <!-- Tombol Aksi Bawah -->
      <div class="feature-hero-card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <strong style="color: var(--text-headline); font-size: 14px;">Siap Mengikuti Seleksi CASN?</strong>
          <p style="color: var(--text-muted); font-size: 12.5px;">Pastikan seluruh dokumen Anda sudah sesuai dengan format dan kapasitas maksimal file.</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>

      <!-- Lightbox Modal untuk Zoom Gambar -->
      <div class="image-lightbox-modal" id="imageLightboxModal" onclick="closeLightbox(event)">
        <div class="lightbox-content-box">
          <button type="button" class="lightbox-close-btn" onclick="closeLightbox(null, true)">×</button>
          <img src="" id="lightboxImg" alt="Preview Infografis">
          <p class="lightbox-caption-text" id="lightboxCaption"></p>
        </div>
      </div>
    </div>
  `;
}

// Inisialisasi handler global lightbox window
window.openLightbox = function(src, caption) {
  const modal = document.getElementById("imageLightboxModal");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if (modal && img) {
    img.src = src;
    if (cap) cap.textContent = caption || "";
    modal.classList.add("show");
  }
};

window.closeLightbox = function(event, force = false) {
  if (force || (event && event.target.id === "imageLightboxModal")) {
    const modal = document.getElementById("imageLightboxModal");
    if (modal) modal.classList.remove("show");
  }
};

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
