/**
 * WelcomeSection Component - CSCP Dashboard Peserta
 * Personalized Welcome Banner dengan Desain Modern & Inspiratif
 */

export function renderWelcomeSection(userData) {
  const fullName = userData?.profile?.full_name || userData?.user?.user_metadata?.full_name || "Peserta CSCP";
  const target = userData?.profile?.target_formation || "Calon Aparatur Sipil Negara";
  const firstName = fullName.trim().split(" ")[0] || "Peserta";

  return `
    <section class="premium-welcome-card">
      <div class="welcome-card-glow"></div>
      
      <div class="welcome-left-col">
        <div class="welcome-tag-row">
          <span class="welcome-status-tag">
            <span class="pulse-dot"></span>
            Ruang Belajar Mandiri CASN
          </span>
          <span class="welcome-formation-tag">🎯 Formasi: <strong>${escapeHtml(target)}</strong></span>
        </div>

        <h1 class="welcome-heading">
          Selamat Datang, <span class="highlight-navy">${escapeHtml(fullName)}</span>!
        </h1>
        <p class="welcome-subheading">
          Siapkan langkah terbaikmu menuju CASN bersama CSCP. Konsistensi latihan dan persiapan administrasi terstruktur adalah kunci keberhasilan meraih NIP.
        </p>

        <div class="welcome-actions-row">
          <a href="#tryout" class="welcome-cta-primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Mulai Mini Try Out</span>
          </a>
          <a href="#rekomendasi-belajar" class="welcome-cta-secondary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Lihat Arah Belajar</span>
          </a>
        </div>
      </div>

      <div class="welcome-right-col">
        <div class="target-summary-box">
          <div class="target-box-header">
            <span class="target-icon">🏆</span>
            <div>
              <strong class="target-title">Target Kelulusan SKD</strong>
              <small class="target-sub">Standar Passing Grade BKN</small>
            </div>
          </div>
          <div class="target-score-display">
            <span class="score-number">450+</span>
            <span class="score-label">Skor Target Aman</span>
          </div>
          <div class="target-breakdown">
            <div class="target-pill"><span>TWK</span> <strong>65+</strong></div>
            <div class="target-pill"><span>TIU</span> <strong>80+</strong></div>
            <div class="target-pill"><span>TKP</span> <strong>166+</strong></div>
          </div>
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
