/**
 * Halaman Fitur: Rekomendasi Belajar
 * Route: /dashboard/rekomendasi-belajar (#rekomendasi-belajar)
 */

export function renderRekomendasiPage(userData) {
  return `
    <div class="feature-page-container">
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Rekomendasi Belajar</span>
      </div>

      <div class="feature-hero-card">
        <div class="feature-hero-header">
          <div class="feature-icon-badge">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </div>
          <div>
            <span class="feature-kicker">PERSONALISASI BELAJAR</span>
            <h1 class="feature-title">Rekomendasi Belajar</h1>
            <p class="feature-desc">Arah belajar berdasarkan kebutuhan dan hasil latihan untuk memaksimalkan peluang lolos seleksi.</p>
          </div>
        </div>

        <div class="placeholder-notice-box">
          <div class="notice-icon">🎯</div>
          <div class="notice-text">
            <h3>Fitur Sedang Disiapkan</h3>
            <p>Fitur ini sedang dalam tahap pengembangan. Kami sedang mempersiapkan pengalaman belajar terbaik untuk Anda.</p>
          </div>
        </div>

        <div class="preview-grid">
          <div class="preview-item">
            <div class="preview-item-icon">🔍</div>
            <h4>Analisis Kelemahan</h4>
            <p>Mendeteksi sub-topik yang membutuhkan perhatian ekstra berdasarkan histori latihan.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">📈</div>
            <h4>Kurikulum Terarah</h4>
            <p>Rekomendasi urutan modul belajar mingguan yang disesuaikan dengan target formasi.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">💡</div>
            <h4>Fasilitator Feedback</h4>
            <p>Saran personal dari pengajar Yayasan Pendidikan Al Bisyru untuk meningkatkan skor.</p>
          </div>
        </div>

        <div class="feature-actions">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>
    </div>
  `;
}
