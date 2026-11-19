/**
 * Halaman Fitur: Mini Try Out CASN
 * Route: /dashboard/tryout (#tryout)
 */

export function renderTryoutPage(userData) {
  return `
    <div class="feature-page-container">
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Mini Try Out CASN</span>
      </div>

      <div class="feature-hero-card">
        <div class="feature-hero-header">
          <div class="feature-icon-badge">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 14l2 2 4-4"></path>
            </svg>
          </div>
          <div>
            <span class="feature-kicker">SIMULASI & EVALUASI</span>
            <h1 class="feature-title">Mini Try Out CASN</h1>
            <p class="feature-desc">Latihan TWK, TIU, dan TKP untuk mengukur kesiapan dan pemahaman materi Anda.</p>
          </div>
        </div>

        <div class="placeholder-notice-box">
          <div class="notice-icon">🚧</div>
          <div class="notice-text">
            <h3>Fitur Sedang Disiapkan</h3>
            <p>Fitur ini sedang dalam tahap pengembangan. Kami sedang mempersiapkan pengalaman belajar terbaik untuk Anda.</p>
          </div>
        </div>

        <div class="preview-grid">
          <div class="preview-item">
            <div class="preview-item-icon">📋</div>
            <h4>Bank Soal Berkualitas</h4>
            <p>Ratusan latihan soal TWK, TIU, dan TKP yang disusun sesuai kisi-kisi resmi BKN.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">⏱️</div>
            <h4>Simulasi CAT Berwaktu</h4>
            <p>Latihan dengan batasan waktu nyata untuk melatih kecepatan dan ketepatan menjawab.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">📊</div>
            <h4>Pembahasan & Skor Instan</h4>
            <p>Evaluasi nilai otomatis beserta pembahasan mendalam di setiap butir soal.</p>
          </div>
        </div>

        <div class="feature-actions">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>
    </div>
  `;
}
