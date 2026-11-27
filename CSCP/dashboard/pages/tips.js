/**
 * Halaman Fitur: Tips dan Strategi
 * Route: /dashboard/tips-strategi (#tips-strategi)
 */

export function renderTipsPage(userData) {
  return `
    <div class="feature-page-container">
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Tips dan Strategi</span>
      </div>

      <div class="feature-hero-card">
        <div class="feature-hero-header">
          <div class="feature-icon-badge">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <div>
            <span class="feature-kicker">MATERI & TAKTIK UJIAN</span>
            <h1 class="feature-title">Tips dan Strategi</h1>
            <p class="feature-desc">Materi rangkuman esensial, trik cepat hitung TIU, penalaran TWK, dan strategi poin 5 TKP.</p>
          </div>
        </div>

        <div class="placeholder-notice-box">
          <div class="notice-icon">📖</div>
          <div class="notice-text">
            <h3>Fitur Sedang Disiapkan</h3>
            <p>Fitur ini sedang dalam tahap pengembangan. Kami sedang mempersiapkan pengalaman belajar terbaik untuk Anda.</p>
          </div>
        </div>

        <div class="preview-grid">
          <div class="preview-item">
            <div class="preview-item-icon">⚡</div>
            <h4>Trik Cepat Berhitung TIU</h4>
            <p>Metode eliminasi opsi, pecahan istimewa, dan rumus praktis tanpa membuang banyak waktu ujian.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">⚖️</div>
            <h4>Pola Soal Penalaran TWK</h4>
            <p>Kunci memahami implementasi Pancasila, UUD 1945, dan integritas dalam konteks kehidupan nyata.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">🌟</div>
            <h4>Manajemen Waktu 100 Menit</h4>
            <p>Simulasi alokasi waktu pengerjaan 110 butir soal agar seluruh target passing grade terlampaui.</p>
          </div>
        </div>

        <div class="feature-actions">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>
    </div>
  `;
}
