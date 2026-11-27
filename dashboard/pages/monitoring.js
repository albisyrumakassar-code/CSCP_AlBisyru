/**
 * Halaman Fitur: Monitoring Belajar
 * Route: /dashboard/monitoring (#monitoring)
 */

export function renderMonitoringPage(userData) {
  return `
    <div class="feature-page-container">
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Monitoring Belajar</span>
      </div>

      <div class="feature-hero-card">
        <div class="feature-hero-header">
          <div class="feature-icon-badge">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <div>
            <span class="feature-kicker">PROGRES & ANALISIS</span>
            <h1 class="feature-title">Monitoring Belajar</h1>
            <p class="feature-desc">Pantau perkembangan skor latihan, grafik kemajuan belajar, dan kesiapan sebelum hari ujian sebenarnya.</p>
          </div>
        </div>

        <div class="placeholder-notice-box">
          <div class="notice-icon">📈</div>
          <div class="notice-text">
            <h3>Fitur Sedang Disiapkan</h3>
            <p>Fitur ini sedang dalam tahap pengembangan. Kami sedang mempersiapkan pengalaman belajar terbaik untuk Anda.</p>
          </div>
        </div>

        <div class="preview-grid">
          <div class="preview-item">
            <div class="preview-item-icon">📉</div>
            <h4>Grafik Nilai Try Out</h4>
            <p>Visualisasi tren kenaikan nilai TWK, TIU, dan TKP dari waktu ke waktu secara komprehensif.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">🎯</div>
            <h4>Indikator Passing Grade</h4>
            <p>Pengecekan otomatis apakah nilai Anda sudah melampaui ambang batas resmi BKN.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">📑</div>
            <h4>Laporan Riwayat Jawaban</h4>
            <p>Arsip rekapitulasi seluruh try out yang pernah dikerjakan untuk evaluasi mandiri kapan pun.</p>
          </div>
        </div>

        <div class="feature-actions">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>
    </div>
  `;
}
