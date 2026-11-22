/**
 * Halaman Fitur: Kelas Zoom Interaktif
 * Route: /dashboard/kelas-zoom (#kelas-zoom)
 */

const ZOOM_JOIN_URL = "https://us04web.zoom.us/j/2672944490?pwd=hKYEs7sFfZ4rz8Ev5KdvGOKtXnLBvi.1";
const ZOOM_TOPIC = "Maulana's Personal Meeting Room";
const ZOOM_MEETING_ID = "267 294 4490";
const ZOOM_PASSCODE = "PP8S9w";

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
          <div class="notice-icon">📅</div>
          <div class="notice-text">
            <h3>Jadwal Zoom: To Be Announced</h3>
            <p>Jadwal sesi Zoom belum ditetapkan dan akan diumumkan kemudian. Link meeting, Meeting ID, serta passcode di bawah ini sudah aktif dan bisa langsung digunakan saat sesi dimulai.</p>
          </div>
        </div>

        <div class="preview-grid">
          <div class="preview-item">
            <div class="preview-item-icon">🎥</div>
            <h4>Topik Sesi</h4>
            <p>${ZOOM_TOPIC}</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">🆔</div>
            <h4>Meeting ID</h4>
            <p>${ZOOM_MEETING_ID}</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">🔑</div>
            <h4>Passcode</h4>
            <p>${ZOOM_PASSCODE}</p>
          </div>
        </div>

        <div class="feature-actions">
          <a href="${ZOOM_JOIN_URL}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">🎥 Gabung Zoom Meeting</a>
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>

        <p style="margin-top: 16px; font-size: 12.5px; color: var(--text-muted); word-break: break-all;">
          Link meeting:
          <a href="${ZOOM_JOIN_URL}" target="_blank" rel="noopener noreferrer">${ZOOM_JOIN_URL}</a>
        </p>
      </div>
    </div>
  `;
}
