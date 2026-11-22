/**
 * WelcomeSection Component
 * Banner sapaan personal untuk peserta yang sedang login
 */

export function renderWelcomeSection(userData) {
  const fullName = userData?.profile?.full_name || userData?.user?.user_metadata?.full_name || "Peserta CSCP";
  const target = userData?.profile?.target_formation || "Calon Aparatur Sipil Negara";
  const initial = (fullName.trim()[0] || "C").toUpperCase();

  return `
    <section class="welcome-banner">
      <div class="welcome-content">
        <div class="welcome-badge">
          <span class="badge-dot"></span>
          <span>Ruang Belajar Mandiri · CASN</span>
        </div>
        <h1 class="welcome-title">Selamat Datang, <span class="highlight-name">${escapeHtml(fullName)}</span>!</h1>
        <p class="welcome-subtitle">Siapkan langkah terbaikmu menuju CASN bersama CSCP.</p>
        
        <div class="welcome-meta-row">
          <div class="meta-item">
            <span class="meta-label">Target Formasi:</span>
            <span class="meta-value">${escapeHtml(target)}</span>
          </div>
          <div class="meta-divider">•</div>
          <div class="meta-item">
            <span class="meta-label">Status Akun:</span>
            <span class="meta-badge-active">Aktif</span>
          </div>
        </div>
      </div>

      <div class="welcome-avatar-card">
        <div class="avatar-large">${initial}</div>
        <div class="avatar-info">
          <strong>${escapeHtml(fullName)}</strong>
          <small>${escapeHtml(userData?.profile?.phone || userData?.user?.phone || userData?.user?.email || "Peserta")}</small>
        </div>
      </div>
    </section>
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
