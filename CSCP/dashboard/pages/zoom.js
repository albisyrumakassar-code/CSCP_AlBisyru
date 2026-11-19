/**
 * Halaman Fitur: Kelas Zoom Interaktif
 * Route: /dashboard/kelas-zoom (#kelas-zoom)
 */

export function renderZoomPage(userData) {
  return `
    <div class="feature-page-container">
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Kelas Zoom Interaktif</span>
      </div>

      <div class="feature-hero-card">
        <div class="feature-hero-header">
          <div class="feature-icon-badge">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </div>
          <div>
            <span class="feature-kicker">BIMBINGAN TATAP MUKA DARING</span>
            <h1 class="feature-title">Kelas Zoom Interaktif</h1>
            <p class="feature-desc">Informasi jadwal bimbingan langsung, link sesi Zoom, rekaman materi, dan forum tanya jawab fasilitator.</p>
          </div>
        </div>

        <div class="placeholder-notice-box">
          <div class="notice-icon">🎥</div>
          <div class="notice-text">
            <h3>Fitur Sedang Disiapkan</h3>
            <p>Fitur ini sedang dalam tahap pengembangan. Kami sedang mempersiapkan pengalaman belajar terbaik untuk Anda.</p>
          </div>
        </div>

        <div class="preview-grid">
          <div class="preview-item">
            <div class="preview-item-icon">📅</div>
            <h4>Jadwal Tatap Muka Terstruktur</h4>
            <p>Sesi rutin pembahasan soal intensif dan kupas tuntas materi bersama pengajar berpengalaman.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">🎙️</div>
            <h4>Tanya Jawab Langsung</h4>
            <p>Diskusi interaktif dua arah untuk membahas soal-soal HOTS yang membingungkan.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">💾</div>
            <h4>Akses Rekaman 24/7</h4>
            <p>Rekaman video setiap kelas Zoom dapat diputar ulang kapan saja jika Anda berhalangan hadir.</p>
          </div>
        </div>

        <div class="feature-actions">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>
    </div>
  `;
}
