/**
 * TopBar Component - CSCP Dashboard Peserta
 * Header Bar Atas dengan Breadcrumb, Aksi Cepat, & Mobile Toggle
 */

export function renderTopBar(userData, activeRoute = "overview") {
  const fullName = userData?.profile?.full_name || userData?.user?.user_metadata?.full_name || "Peserta";
  const initial = (fullName.trim()[0] || "C").toUpperCase();

  const ROUTE_LABELS = {
    "overview": "Ringkasan Dashboard",
    "tryout": "Mini Try Out CASN",
    "rekomendasi-belajar": "Rekomendasi Belajar",
    "persiapan-berkas": "Persiapan Berkas",
    "tips-strategi": "Tips dan Strategi",
    "kelas-zoom": "Kelas Zoom Interaktif",
    "monitoring": "Monitoring Belajar",
    "profil": "Profil Saya"
  };

  const currentLabel = ROUTE_LABELS[activeRoute] || "Dashboard";

  return `
    <header class="dash-topbar" id="dashTopbar">
      <div class="topbar-left">
        <!-- Mobile Sidebar Hamburger Toggle -->
        <button class="topbar-menu-toggle" id="topbarMenuToggle" aria-label="Buka Navigasi Sidebar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <!-- Breadcrumb Tracker -->
        <div class="topbar-breadcrumb">
          <span class="breadcrumb-root">Portal CSCP</span>
          <span class="breadcrumb-slash">/</span>
          <span class="breadcrumb-active">${currentLabel}</span>
        </div>
      </div>

      <div class="topbar-right">
        <!-- Live CASN Status Pill -->
        <div class="topbar-status-badge" title="Program Persiapan Terpadu Aktif">
          <span class="live-pulse"></span>
          <span>Bimbingan CASN Aktif</span>
        </div>

        <!-- Help Link -->
        <a href="https://wa.me/6282349468463" target="_blank" rel="noopener" class="topbar-action-btn" title="Hubungi Admin CSCP">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span class="action-btn-text">Bantuan Admin</span>
        </a>

        <!-- Notification Bell -->
        <div class="topbar-notify-wrap" title="Pengumuman & Notifikasi">
          <button type="button" class="topbar-notify-btn" id="topbarNotifyBtn" aria-label="Notifikasi">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="notify-dot"></span>
          </button>
        </div>

        <!-- User Quick Profile Pill -->
        <a href="#profil" class="topbar-user-pill" title="Buka Profil Saya">
          <span class="topbar-user-avatar">${initial}</span>
          <div class="topbar-user-details">
            <span class="topbar-user-name">${escapeHtml(fullName.split(" ")[0])}</span>
            <small class="topbar-user-role">Peserta</small>
          </div>
        </a>
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
