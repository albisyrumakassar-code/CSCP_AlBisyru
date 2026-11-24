/**
 * Halaman Fitur: Kelas Zoom Interaktif
 * Route: /dashboard/kelas-zoom (#kelas-zoom)
 * Dilengkapi Link Sesi Zoom Resmi & Jadwal "To be announced"
 */

const ZOOM_LINK = "https://us04web.zoom.us/j/2672944490?pwd=hKYEs7sFfZ4rz8Ev5KdvGOKtXnLBvi.1";
const ZOOM_ID = "267 294 4490";
const ZOOM_RECORDING_LINK = "https://drive.google.com/drive/folders/13oppOEXKLO5UhnQ8IstcMqizvOu8TqqX?usp=sharing";

export function renderZoomPage(userData) {
  return `
    <div class="feature-page-container">
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
        <span class="breadcrumb-current">Kelas Zoom Interaktif</span>
      </div>

      <!-- Feature Hero Container -->
      <div class="feature-hero-card">
        <!-- Header Fitur -->
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
            <p class="feature-desc">Ruang bimbingan belajar dan pembahasan materi intensif secara langsung bersama tim mentor Yayasan Pendidikan Al Bisyru.</p>
          </div>
        </div>

        <!-- Featured Card: Ruang Sesi Zoom Bimbingan -->
        <div class="zoom-session-card">
          <div class="zoom-card-top">
            <span class="zoom-badge-tba">
              <span class="zoom-pulse-amber"></span>
              Jadwal Sesi: To be announced
            </span>
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Sesi Resmi Peserta CSCP</span>
          </div>

          <h2 class="zoom-session-title">Ruang Kelas Tatap Muka Virtual CSCP</h2>

          <!-- Alert Pemberitahuan Khusus -->
          <div class="zoom-notice-alert">
            <span class="zoom-notice-icon">📢</span>
            <div class="zoom-notice-text">
              <strong>Pemberitahuan Pelaksanaan Sesi:</strong><br>
              Pelaksanaan kelas bimbingan Zoom akan diumumkan sewaktu-waktu di halaman fitur ini. Jadwal saat ini berstatus <strong>"To be announced"</strong>. Pastikan Anda memeriksa fitur ini secara berkala atau memantau informasi pengumuman di grup bimbingan WhatsApp peserta.
            </div>
          </div>

          <!-- Rincian Parameter Pertemuan -->
          <div class="zoom-details-grid">
            <div class="zoom-detail-item">
              <span class="zoom-detail-label">Status Pelaksanaan</span>
              <span class="zoom-detail-val highlight-tba">To be announced</span>
            </div>
            <div class="zoom-detail-item">
              <span class="zoom-detail-label">Platform Bimbingan</span>
              <span class="zoom-detail-val">Zoom Meetings</span>
            </div>
            <div class="zoom-detail-item">
              <span class="zoom-detail-label">Meeting ID</span>
              <span class="zoom-detail-val">${ZOOM_ID}</span>
            </div>
            <div class="zoom-detail-item">
              <span class="zoom-detail-label">Password / Passcode</span>
              <span class="zoom-detail-val" style="color: #059669;">Tersemat Otomatis</span>
            </div>
          </div>

          <!-- Tombol Aksi Akses Zoom -->
          <div class="zoom-actions-row">
            <a href="${ZOOM_LINK}" target="_blank" rel="noopener noreferrer" class="btn-zoom-join" id="btnJoinZoom">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span>Masuk Ruang Zoom Sekarang →</span>
            </a>

            <button type="button" class="btn-zoom-copy" id="btnCopyZoomLink" onclick="navigator.clipboard.writeText('${ZOOM_LINK}').then(() => { this.innerHTML = '✓ Link Zoom Tersalin!'; setTimeout(() => { this.innerHTML = '📋 Salin Tautan Zoom'; }, 2500); })">
              <span>📋 Salin Tautan Zoom</span>
            </button>
          </div>
        </div>

        <!-- Panel Akses Rekaman Zoom yang Telah Berlalu -->
        <div class="zoom-recording-card">
          <div class="zoom-card-top">
            <span class="zoom-badge-recording">
              <span class="zoom-dot-recording"></span>
              Arsip Video: Rekaman Tersedia
            </span>
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Google Drive Resmi CSCP</span>
          </div>

          <h2 class="zoom-session-title">Rekaman Kelas Zoom yang Telah Berlalu</h2>
          <p class="zoom-recording-desc">
            Tertinggal sesi bimbingan atau ingin mengulas kembali pembahasan materi sebelumnya? Akses seluruh arsip video rekaman kelas Zoom yang telah berlangsung melalui folder Google Drive resmi di bawah ini.
          </p>

          <div class="zoom-actions-row">
            <a href="${ZOOM_RECORDING_LINK}" target="_blank" rel="noopener noreferrer" class="btn-zoom-recording" id="btnOpenZoomRecording">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              <span>Buka Rekaman Kelas Zoom →</span>
            </a>

            <button type="button" class="btn-zoom-copy" id="btnCopyRecordingLink" onclick="navigator.clipboard.writeText('${ZOOM_RECORDING_LINK}').then(() => { this.innerHTML = '✓ Link Rekaman Tersalin!'; setTimeout(() => { this.innerHTML = '📋 Salin Tautan Rekaman'; }, 2500); })">
              <span>📋 Salin Tautan Rekaman</span>
            </button>
          </div>
        </div>

        <!-- Panduan & Keunggulan Kelas Daring -->
        <div class="preview-grid">
          <div class="preview-item">
            <div class="preview-item-icon">🎙️</div>
            <h4>Tanya Jawab Dua Arah</h4>
            <p>Konsultasikan langsung kendala belajar, soal-soal HOTS, dan trik pengerjaan cepat bersama mentor.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">📚</div>
            <h4>Kupas Tuntas Materi SKD</h4>
            <p>Pembahasan mendalam materi TWK, TIU, dan TKP sesuai kisi-kisi dan tren soal resmi seleksi CASN.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">📱</div>
            <h4>Akses Lintas Perangkat</h4>
            <p>Dapat diikuti dengan nyaman melalui komputer, laptop, tablet, maupun smartphone Anda.</p>
          </div>
        </div>

        <!-- Tombol Kembali -->
        <div class="feature-actions">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>
    </div>
  `;
}
