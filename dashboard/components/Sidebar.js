/**
 * Sidebar Component - CSCP Dashboard Peserta
 * Elegant, Modern SaaS Sidebar Navigation
 */

export function renderSidebar(userData, activeRoute = "overview") {
  const fullName = userData?.profile?.full_name || userData?.user?.user_metadata?.full_name || "Peserta CSCP";
  const target = userData?.profile?.target_formation || "Calon ASN";
  const initial = (fullName.trim()[0] || "C").toUpperCase();

  const isRouteActive = (routeKey) => {
    if (routeKey === "overview" && (activeRoute === "overview" || !activeRoute)) return "active";
    return activeRoute === routeKey ? "active" : "";
  };

  return `
    <aside class="dash-sidebar" id="dashSidebar" aria-label="Navigasi Utama">
      <!-- Sidebar Brand Header -->
      <div class="sidebar-brand-wrap">
        <a href="#overview" class="sidebar-brand" aria-label="CSCP Beranda Dashboard">
          <div class="sidebar-logo-mark">C</div>
          <div class="sidebar-brand-info">
            <span class="brand-title">CSCP</span>
            <span class="brand-sub">AL BISYRU EDUCATION</span>
          </div>
        </a>
        <button class="sidebar-close-btn" id="sidebarCloseBtn" aria-label="Tutup Menu">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Preparation Badge -->
      <div class="sidebar-phase-badge">
        <span class="phase-indicator"></span>
        <div class="phase-text">
          <small>PERSIAPAN SELEKSI</small>
          <strong>CASN 2026 / 2027</strong>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="sidebar-nav-container">
        <!-- Group 1: Menu Utama -->
        <div class="nav-group-label">MENU UTAMA</div>
        <ul class="nav-menu-list">
          <li>
            <a href="#overview" class="nav-menu-item ${isRouteActive('overview')}" data-route="overview">
              <span class="nav-item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                </svg>
              </span>
              <span class="nav-item-text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#profil" class="nav-menu-item ${isRouteActive('profil')}" data-route="profil">
              <span class="nav-item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <span class="nav-item-text">Profil Saya</span>
            </a>
          </li>
        </ul>

        <!-- Group 2: Fitur Layanan Persiapan -->
        <div class="nav-group-label">FITUR PERSIAPAN</div>
        <ul class="nav-menu-list">
          <li>
            <a href="#tryout" class="nav-menu-item ${isRouteActive('tryout')}" data-route="tryout">
              <span class="nav-item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1"></rect>
                  <path d="M9 14l2 2 4-4"></path>
                </svg>
              </span>
              <span class="nav-item-text">Mini Try Out CASN</span>
            </a>
          </li>
          <li>
            <a href="#rekomendasi-belajar" class="nav-menu-item ${isRouteActive('rekomendasi-belajar')}" data-route="rekomendasi-belajar">
              <span class="nav-item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </span>
              <span class="nav-item-text">Rekomendasi Belajar</span>
            </a>
          </li>
          <li>
            <a href="#persiapan-berkas" class="nav-menu-item ${isRouteActive('persiapan-berkas')}" data-route="persiapan-berkas">
              <span class="nav-item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </span>
              <span class="nav-item-text">Persiapan Berkas</span>
            </a>
          </li>
          <li>
            <a href="#tips-strategi" class="nav-menu-item ${isRouteActive('tips-strategi')}" data-route="tips-strategi">
              <span class="nav-item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </span>
              <span class="nav-item-text">Tips & Strategi</span>
            </a>
          </li>
          <li>
            <a href="#kelas-zoom" class="nav-menu-item ${isRouteActive('kelas-zoom')}" data-route="kelas-zoom">
              <span class="nav-item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2"></rect>
                </svg>
              </span>
              <span class="nav-item-text">Kelas Zoom Interaktif</span>
            </a>
          </li>
          <li>
            <a href="#monitoring" class="nav-menu-item ${isRouteActive('monitoring')}" data-route="monitoring">
              <span class="nav-item-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </span>
              <span class="nav-item-text">Monitoring Belajar</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Sidebar User Profile & Logout Area -->
      <div class="sidebar-user-footer">
        <div class="sidebar-user-card" title="${escapeHtml(fullName)}">
          <div class="user-avatar-circle">${initial}</div>
          <div class="user-card-meta">
            <strong class="user-meta-name">${escapeHtml(fullName.split(" ").slice(0, 2).join(" "))}</strong>
            <span class="user-meta-target">${escapeHtml(target)}</span>
          </div>
        </div>

        <button type="button" class="sidebar-logout-btn" id="sidebarLogoutBtn" title="Keluar dari akun">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
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
