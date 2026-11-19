/**
 * Halaman Fitur: Persiapan Berkas
 * Route: /dashboard/persiapan-berkas (#persiapan-berkas)
 */

export function renderBerkasPage(userData) {
  return `
    <div class="feature-page-container">
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Persiapan Berkas</span>
      </div>

      <div class="feature-hero-card">
        <div class="feature-hero-header">
          <div class="feature-icon-badge">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <span class="feature-kicker">ADMINISTRASI SELEKSI</span>
            <h1 class="feature-title">Persiapan Berkas</h1>
            <p class="feature-desc">Checklist dokumen dan verifikasi kelengkapan berkas untuk memastikan kelulusan seleksi administrasi.</p>
          </div>
        </div>

        <div class="placeholder-notice-box">
          <div class="notice-icon">📁</div>
          <div class="notice-text">
            <h3>Fitur Sedang Disiapkan</h3>
            <p>Fitur ini sedang dalam tahap pengembangan. Kami sedang mempersiapkan pengalaman belajar terbaik untuk Anda.</p>
          </div>
        </div>

        <div class="preview-grid">
          <div class="preview-item">
            <div class="preview-item-icon">📑</div>
            <h4>Checklist Dokumen Interaktif</h4>
            <p>Daftar periksa otomatis syarat ijazah, transkrip, surat lamaran, dan pernyataan sesuai instansi tujuan.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">📐</div>
            <h4>Panduan Format & Ukuran File</h4>
            <p>Petunjuk kompresi PDF dan scan dokumen agar lolos verifikasi sistem SSCASN.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">🛡️</div>
            <h4>Review Berkas Mandiri</h4>
            <p>Catatan kesalahan umum pendaftar CASN terdahulu agar Anda terhindar dari status Tidak Memenuhi Syarat (TMS).</p>
          </div>
        </div>

        <div class="feature-actions">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>
    </div>
  `;
}
