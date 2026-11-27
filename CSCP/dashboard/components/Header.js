/**
 * DashboardHeader Component
 * Header navigasi utama Dashboard Peserta CSCP
 */

export function renderDashboardHeader(userData, activeRoute = "overview") {
  const fullName = userData?.profile?.full_name || userData?.user?.user_metadata?.full_name || "Peserta";
  const initial = (fullName.trim()[0] || "C").toUpperCase();

  const isDashboardActive = activeRoute === "overview" || activeRoute.startsWith("service-");
  const isProfileActive = activeRoute === "profil" || activeRoute === "profile";

  return `
    <header class="dash-header">
      <div class="dash-header-inner">
        <a href="#overview" class="dash-brand" aria-label="Dashboard CSCP">
          <span class="dash-brand-mark">C</span>
          <span class="dash-brand-text">
            CSCP
            <small>CIVIL SERVANT CANDIDATE PREPARATION</small>
          </span>
        </a>

        <button class="dash-menu-toggle" id="dashMenuToggle" aria-label="Buka navigasi" aria-expanded="false">
          ☰
        </button>

        <nav class="dash-nav" id="dashNav">
          <a href="#overview" class="dash-nav-link ${isDashboardActive ? 'active' : ''}" data-nav="overview">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Dashboard</span>
          </a>

          <a href="#profil" class="dash-nav-link ${isProfileActive ? 'active' : ''}" data-nav="profile">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Profil Saya</span>
          </a>

          <div class="dash-user-pill" title="${escapeHtml(fullName)}">
            <span class="user-pill-avatar">${initial}</span>
            <span class="user-pill-name">${escapeHtml(fullName.split(" ")[0])}</span>
          </div>

          <button type="button" class="dash-btn-logout" id="dashLogoutBtn" aria-label="Keluar dari akun">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Keluar</span>
          </button>
        </nav>
      </div>
    </header>
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
