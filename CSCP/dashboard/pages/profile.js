/**
 * Halaman Menu: Profil Saya
 * Route: #profil
 */

export function renderProfilePage(userData) {
  const p = userData?.profile || {};
  const u = userData?.user || {};
  const meta = u.user_metadata || {};

  const fullName = p.full_name || meta.full_name || "Peserta CSCP";
  const phone = p.phone || meta.phone || u.phone || "—";
  const email = p.email || u.email || "—";
  const birthPlace = p.birth_place || meta.birth_place || "—";
  const birthDate = p.birth_date || meta.birth_date || "—";
  const domicile = p.domicile || meta.domicile || "—";
  const education = p.education_level || meta.education_level || "—";
  const major = p.major || meta.major || "—";
  const target = p.target_formation || meta.target_formation || "—";
  const initial = (fullName.trim()[0] || "C").toUpperCase();

  return `
    <div class="profile-page-container">
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Profil Saya</span>
      </div>

      <div class="profile-card-main">
        <div class="profile-header-strip">
          <div class="profile-avatar-large">${initial}</div>
          <div class="profile-header-details">
            <h1 class="profile-name-title">${escapeHtml(fullName)}</h1>
            <p class="profile-target-badge">🎯 Target: ${escapeHtml(target)}</p>
            <span class="profile-status-pill">✓ Peserta Terdaftar Aktif</span>
          </div>
        </div>

        <div class="profile-sections-grid">
          <div class="profile-section-box">
            <h3>Informasi Kontak & Akun</h3>
            <div class="info-row">
              <span class="info-label">Nama Lengkap</span>
              <strong class="info-val">${escapeHtml(fullName)}</strong>
            </div>
            <div class="info-row">
              <span class="info-label">Nomor WhatsApp</span>
              <strong class="info-val">${escapeHtml(phone)}</strong>
            </div>
            <div class="info-row">
              <span class="info-label">Alamat Email</span>
              <strong class="info-val">${escapeHtml(email)}</strong>
            </div>
            <div class="info-row">
              <span class="info-label">ID Akun Peserta</span>
              <span class="info-val monospace">${escapeHtml(u.id || "—")}</span>
            </div>
          </div>

          <div class="profile-section-box">
            <h3>Latar Belakang & Pendidikan</h3>
            <div class="info-row">
              <span class="info-label">Tempat & Tanggal Lahir</span>
              <strong class="info-val">${escapeHtml(birthPlace)}, ${escapeHtml(birthDate)}</strong>
            </div>
            <div class="info-row">
              <span class="info-label">Domisili Saat Ini</span>
              <strong class="info-val">${escapeHtml(domicile)}</strong>
            </div>
            <div class="info-row">
              <span class="info-label">Pendidikan Terakhir</span>
              <strong class="info-val">${escapeHtml(education)}</strong>
            </div>
            <div class="info-row">
              <span class="info-label">Jurusan / Program Studi</span>
              <strong class="info-val">${escapeHtml(major)}</strong>
            </div>
          </div>
        </div>

        <div class="profile-footer-actions">
          <a href="#overview" class="btn btn-primary">← Kembali ke Dashboard</a>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
