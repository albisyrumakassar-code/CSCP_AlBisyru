/**
 * CSCP Administrator Portal Controller
 * Fitur:
 * - Gerbang Kode Akses Administrator (140997)
 * - Ringkasan & Perkembangan Peserta
 * - Data Seluruh Akun Terdaftar (+ Detail Modal & Export CSV)
 * - Bank Soal Mini Try Out (Buat, Edit, Publish/Draft, Hapus)
 * - Monitoring Hasil Mini Try Out Peserta
 */

const SUPABASE_URL = "https://qiphmdconfqukguhkicz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dMVjE0iV80805TY-JlbH_Q_A_R5oLLs";
const ADMIN_ACCESS_CODE = "140997";
const SESSION_KEY = "cscp_admin_code";

let supabaseClient = null;
let currentRoute = "overview";

const state = {
  loading: false,
  needsSqlSetup: false,
  errorMessage: "",
  accounts: [],
  categories: [
    { code: "TWK", name: "Tes Wawasan Kebangsaan" },
    { code: "TIU", name: "Tes Intelegensia Umum" },
    { code: "TKP", name: "Tes Karakteristik Pribadi" }
  ],
  questions: [],
  tryoutResults: [],
  filters: {
    accountQuery: "",
    accountFormation: "ALL",
    accountEducation: "ALL",
    questionQuery: "",
    questionCategory: "ALL",
    questionStatus: "ALL",
    resultQuery: "",
    resultStatus: "ALL"
  }
};

function getSupabase() {
  if (supabaseClient) return supabaseClient;
  if (window.supabase && typeof window.supabase.createClient === "function") {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return supabaseClient;
  }
  return null;
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(isoStr, withTime = true) {
  if (!isoStr) return "-";
  const d = new Date(isoStr);
  if (Number.isNaN(d.getTime())) return "-";
  const opts = { day: "2-digit", month: "short", year: "numeric" };
  if (withTime) {
    opts.hour = "2-digit";
    opts.minute = "2-digit";
  }
  return d.toLocaleDateString("id-ID", opts);
}

function showToast(msg) {
  const el = document.getElementById("adminToast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => el.classList.remove("show"), 3000);
}

function formatWaLink(phone) {
  const digits = String(phone || "").replace(/[^\d]/g, "");
  if (!digits) return "";
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

function getUnlockedCode() {
  return sessionStorage.getItem(SESSION_KEY) || "";
}

function isUnlocked() {
  return getUnlockedCode() === ADMIN_ACCESS_CODE;
}

function unlockAdmin(code) {
  sessionStorage.setItem(SESSION_KEY, code);
  document.getElementById("adminGateScreen").hidden = true;
  document.getElementById("adminAppShell").hidden = false;
  renderShell();
  loadDashboardData();
}

function lockAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById("adminAppShell").hidden = true;
  document.getElementById("adminGateScreen").hidden = false;
  const input = document.getElementById("adminCodeInput");
  if (input) {
    input.value = "";
    input.focus();
  }
}

async function loadDashboardData() {
  const client = getSupabase();
  if (!client) {
    state.errorMessage = "Klien Supabase gagal dimuat. Periksa koneksi internet Anda.";
    renderActiveView();
    return;
  }

  state.loading = true;
  state.errorMessage = "";
  renderActiveView();

  try {
    const { data, error } = await client.rpc("admin_get_dashboard_data", {
      access_code_input: getUnlockedCode()
    });

    if (error) {
      const msg = String(error.message || "");
      if (
        error.code === "PGRST202" ||
        error.code === "42883" ||
        msg.toLowerCase().includes("admin_get_dashboard_data")
      ) {
        state.needsSqlSetup = true;
        await loadFallbackData(client);
      } else {
        throw error;
      }
    } else if (data) {
      state.needsSqlSetup = false;
      state.accounts = Array.isArray(data.accounts) ? data.accounts : [];
      if (Array.isArray(data.categories) && data.categories.length) {
        state.categories = data.categories;
      }
      state.questions = Array.isArray(data.questions) ? data.questions : [];
      state.tryoutResults = Array.isArray(data.tryout_results) ? data.tryout_results : [];
    }
  } catch (err) {
    console.error("Admin load error:", err);
    state.errorMessage = err?.message || "Gagal memuat data administrator.";
  } finally {
    state.loading = false;
    renderShell();
  }
}

async function loadFallbackData(client) {
  try {
    const { data: profiles } = await client
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (Array.isArray(profiles)) {
      state.accounts = profiles.map((p) => ({
        ...p,
        roles: "participant",
        tryout_count: 0,
        best_score: null,
        checklist_done_count: 0,
        checklist_total_count: 0
      }));
    }
  } catch (_e) {
    // Abaikan jika RLS memblokir sebelum admin_setup.sql dijalankan
  }
}

function renderSidebar() {
  const navItems = [
    { id: "overview", label: "Ringkasan & Grafik", icon: `<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect>` },
    { id: "accounts", label: `Akun Terdaftar (${state.accounts.length})`, icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>` },
    { id: "questions", label: `Soal Mini Try Out (${state.questions.length})`, icon: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>` },
    { id: "results", label: `Hasil Try Out (${state.tryoutResults.length})`, icon: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>` }
  ];

  return `
    <aside class="dash-sidebar" id="adminSidebar" aria-label="Navigasi Administrator">
      <div class="sidebar-brand-wrap">
        <a href="#overview" class="sidebar-brand" data-admin-route="overview">
          <div class="sidebar-logo-mark">C</div>
          <div class="sidebar-brand-info">
            <span class="brand-title">CSCP ADMIN</span>
            <span class="brand-sub">AL BISYRU CONTROL</span>
          </div>
        </a>
        <button class="sidebar-close-btn" id="adminSidebarCloseBtn" aria-label="Tutup Menu">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="sidebar-phase-badge admin-phase-badge">
        <span class="phase-indicator"></span>
        <div class="phase-text">
          <small>MODE ADMINISTRATOR</small>
          <strong>Akses Terverifikasi</strong>
        </div>
      </div>

      <nav class="sidebar-nav-container">
        <div class="nav-group-label">PANEL PENGELOLAAN</div>
        <ul class="nav-menu-list">
          ${navItems.map((item) => `
            <li>
              <a href="#${item.id}" class="nav-menu-item ${currentRoute === item.id ? "active" : ""}" data-admin-route="${item.id}">
                <span class="nav-item-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
                </span>
                <span class="nav-item-text">${item.label}</span>
              </a>
            </li>
          `).join("")}
        </ul>
      </nav>

      <div class="sidebar-user-footer">
        <div class="sidebar-user-card">
          <div class="user-avatar-circle">A</div>
          <div class="user-card-meta">
            <strong class="user-meta-name">Administrator</strong>
            <span class="user-meta-target">Yayasan Al Bisyru</span>
          </div>
        </div>

        <button type="button" class="sidebar-logout-btn" id="adminLockBtn" title="Kunci Panel Administrator">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Kunci Panel</span>
        </button>
      </div>
    </aside>
  `;
}

function renderTopbar() {
  const titles = {
    overview: "Ringkasan & Perkembangan",
    accounts: "Data Akun Terdaftar",
    questions: "Bank Soal Mini Try Out",
    results: "Pemantauan Hasil Try Out"
  };

  return `
    <header class="dash-topbar">
      <div class="topbar-left">
        <button class="topbar-menu-toggle" id="adminMenuToggle" aria-label="Buka Menu">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="topbar-breadcrumb">
          <span class="breadcrumb-root">Portal Admin</span>
          <span class="breadcrumb-slash">/</span>
          <span class="breadcrumb-active">${titles[currentRoute] || "Administrator"}</span>
        </div>
      </div>

      <div class="topbar-right">
        <button type="button" class="btn-admin-secondary" id="adminRefreshBtn">
          <span>↻ Muat Ulang</span>
        </button>
        <a href="dashboard.html" class="btn-admin-secondary">Dashboard Peserta</a>
      </div>
    </header>
  `;
}

function renderSetupBanner() {
  if (!state.needsSqlSetup) return "";
  return `
    <div class="admin-setup-banner">
      <div class="admin-setup-head">
        <div>
          <h3>⚠️ Fungsi SQL Admin Belum Terpasang di Supabase</h3>
          <p>
            Panel admin sudah terbuka dengan kode akses <strong>140997</strong>, namun fungsi RPC pembacaan data di database Supabase belum dijalankan.
            Jalankan file <strong>admin_setup.sql</strong> sekali di <em>Supabase Dashboard → SQL Editor</em> agar seluruh daftar akun, soal, dan hasil try out tampil langsung.
          </p>
        </div>
        <div class="admin-setup-actions">
          <button type="button" class="btn-admin-primary" id="copySqlSetupBtn">📋 Salin SQL Setup (admin_setup.sql)</button>
          <button type="button" class="btn-admin-secondary" id="retryLoadAfterSqlBtn">↻ Cek Ulang Koneksi</button>
        </div>
      </div>
    </div>
  `;
}

function buildBreakdown(items, key, fallbackLabel) {
  const counts = {};
  items.forEach((item) => {
    const val = (item[key] || "").trim() || fallbackLabel;
    counts[val] = (counts[val] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function renderBreakdownBars(entries, total) {
  if (!entries.length) {
    return `<p class="admin-panel-sub">Belum ada data untuk ditampilkan.</p>`;
  }
  return `
    <div class="admin-bar-list">
      ${entries.map(([label, count]) => {
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return `
          <div class="admin-bar-item">
            <div class="admin-bar-meta">
              <span>${escapeHtml(label)}</span>
              <span>${count} akun (${pct}%)</span>
            </div>
            <div class="admin-bar-track">
              <div class="admin-bar-fill" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderOverviewTab() {
  const totalAccounts = state.accounts.length;
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const recentAccountsCount = state.accounts.filter((a) => new Date(a.created_at).getTime() >= weekAgo).length;
  const confirmedCount = state.accounts.filter((a) => Boolean(a.email_confirmed_at || a.last_sign_in_at)).length;

  const publishedQuestions = state.questions.filter((q) => q.is_published).length;
  const draftQuestions = state.questions.length - publishedQuestions;

  const finishedResults = state.tryoutResults.filter((r) => r.status === "submitted" || r.status === "evaluated");
  const scoredResults = finishedResults.filter((r) => r.total_score !== null && r.total_score !== undefined);
  const avgScore = scoredResults.length
    ? (scoredResults.reduce((sum, r) => sum + Number(r.total_score || 0), 0) / scoredResults.length).toFixed(1)
    : "-";

  const formationBars = buildBreakdown(state.accounts, "target_formation", "Belum memilih target");
  const educationBars = buildBreakdown(state.accounts, "education_level", "Belum diisi");

  const latestAccounts = state.accounts.slice(0, 5);
  const latestResults = state.tryoutResults.slice(0, 5);

  return `
    <div class="admin-section-stack">
      <div class="admin-kpi-grid">
        <div class="admin-kpi-card">
          <div class="admin-kpi-top">
            <span class="admin-kpi-label">Total Akun Terdaftar</span>
            <span class="admin-kpi-icon">👥</span>
          </div>
          <div class="admin-kpi-value">${totalAccounts}</div>
          <div class="admin-kpi-meta">+${recentAccountsCount} pendaftar dalam 7 hari terakhir</div>
        </div>

        <div class="admin-kpi-card">
          <div class="admin-kpi-top">
            <span class="admin-kpi-label">Akun Aktif / Login</span>
            <span class="admin-kpi-icon">✓</span>
          </div>
          <div class="admin-kpi-value">${confirmedCount}</div>
          <div class="admin-kpi-meta">Dari total ${totalAccounts} akun terdaftar</div>
        </div>

        <div class="admin-kpi-card">
          <div class="admin-kpi-top">
            <span class="admin-kpi-label">Bank Soal Try Out</span>
            <span class="admin-kpi-icon">📝</span>
          </div>
          <div class="admin-kpi-value">${state.questions.length}</div>
          <div class="admin-kpi-meta">${publishedQuestions} terbit · ${draftQuestions} draft</div>
        </div>

        <div class="admin-kpi-card">
          <div class="admin-kpi-top">
            <span class="admin-kpi-label">Sesi Mini Try Out</span>
            <span class="admin-kpi-icon">📊</span>
          </div>
          <div class="admin-kpi-value">${state.tryoutResults.length}</div>
          <div class="admin-kpi-meta">${finishedResults.length} selesai · Rata-rata skor: ${avgScore}</div>
        </div>
      </div>

      <div class="admin-two-col">
        <div class="admin-panel-card">
          <div class="admin-panel-header">
            <div>
              <h3>Distribusi Target Formasi</h3>
              <p class="admin-panel-sub">Minat formasi peserta CSCP</p>
            </div>
          </div>
          ${renderBreakdownBars(formationBars, totalAccounts)}
        </div>

        <div class="admin-panel-card">
          <div class="admin-panel-header">
            <div>
              <h3>Distribusi Pendidikan Terakhir</h3>
              <p class="admin-panel-sub">Latar belakang pendidikan pendaftar</p>
            </div>
          </div>
          ${renderBreakdownBars(educationBars, totalAccounts)}
        </div>
      </div>

      <div class="admin-two-col">
        <div class="admin-panel-card">
          <div class="admin-panel-header">
            <div>
              <h3>Pendaftar Terbaru</h3>
              <p class="admin-panel-sub">5 akun terakhir yang mendaftar</p>
            </div>
            <button type="button" class="btn-admin-secondary admin-btn-sm" data-goto-tab="accounts">Lihat Semua →</button>
          </div>
          ${latestAccounts.length ? `
            <div class="admin-table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Peserta</th>
                    <th>Target Formasi</th>
                    <th>Tanggal Daftar</th>
                  </tr>
                </thead>
                <tbody>
                  ${latestAccounts.map((acc) => `
                    <tr>
                      <td>
                        <span class="admin-cell-primary">${escapeHtml(acc.full_name)}</span>
                        <span class="admin-cell-sub">${escapeHtml(acc.phone || acc.email || "-")}</span>
                      </td>
                      <td>${escapeHtml(acc.target_formation || "-")}</td>
                      <td>${formatDate(acc.created_at, false)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          ` : `<div class="admin-empty-state">Belum ada akun terdaftar yang termuat.</div>`}
        </div>

        <div class="admin-panel-card">
          <div class="admin-panel-header">
            <div>
              <h3>Aktivitas Mini Try Out Terbaru</h3>
              <p class="admin-panel-sub">5 pengerjaan try out terbaru</p>
            </div>
            <button type="button" class="btn-admin-secondary admin-btn-sm" data-goto-tab="results">Pantau Semua →</button>
          </div>
          ${latestResults.length ? `
            <div class="admin-table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Peserta</th>
                    <th>Paket</th>
                    <th>Skor</th>
                  </tr>
                </thead>
                <tbody>
                  ${latestResults.map((res) => `
                    <tr>
                      <td>
                        <span class="admin-cell-primary">${escapeHtml(res.full_name)}</span>
                        <span class="admin-cell-sub">${formatDate(res.started_at)}</span>
                      </td>
                      <td>${escapeHtml(res.title)}</td>
                      <td><strong>${res.total_score ?? "-"}</strong></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          ` : `<div class="admin-empty-state">Belum ada peserta yang mengerjakan Mini Try Out.</div>`}
        </div>
      </div>
    </div>
  `;
}

function getFilteredAccounts() {
  const q = state.filters.accountQuery.trim().toLowerCase();
  return state.accounts.filter((acc) => {
    if (state.filters.accountFormation !== "ALL" && (acc.target_formation || "") !== state.filters.accountFormation) {
      return false;
    }
    if (state.filters.accountEducation !== "ALL" && (acc.education_level || "") !== state.filters.accountEducation) {
      return false;
    }
    if (!q) return true;
    const haystack = [
      acc.full_name,
      acc.phone,
      acc.email,
      acc.auth_email,
      acc.domicile,
      acc.major,
      acc.target_formation
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

function renderAccountsTab() {
  const filtered = getFilteredAccounts();
  const formations = [...new Set(state.accounts.map((a) => a.target_formation).filter(Boolean))];
  const educations = [...new Set(state.accounts.map((a) => a.education_level).filter(Boolean))];

  return `
    <div class="admin-panel-card">
      <div class="admin-panel-header">
        <div>
          <h2>Daftar Seluruh Akun Terdaftar (${filtered.length})</h2>
          <p class="admin-panel-sub">Pantau identitas pendaftar, kontak WhatsApp/Email, target formasi, serta progres try out & berkas.</p>
        </div>
        <button type="button" class="btn-admin-primary" id="exportAccountsCsvBtn">⬇ Ekspor CSV</button>
      </div>

      <div class="admin-toolbar">
        <input type="search" id="accountSearchInput" class="admin-input admin-search-input" placeholder="Cari nama, nomor WA, email, domisili, jurusan..." value="${escapeHtml(state.filters.accountQuery)}">
        <select id="accountFormationFilter" class="admin-select">
          <option value="ALL">Semua Target Formasi</option>
          ${formations.map((f) => `<option value="${escapeHtml(f)}" ${state.filters.accountFormation === f ? "selected" : ""}>${escapeHtml(f)}</option>`).join("")}
        </select>
        <select id="accountEducationFilter" class="admin-select">
          <option value="ALL">Semua Pendidikan</option>
          ${educations.map((e) => `<option value="${escapeHtml(e)}" ${state.filters.accountEducation === e ? "selected" : ""}>${escapeHtml(e)}</option>`).join("")}
        </select>
      </div>

      ${filtered.length ? `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Peserta</th>
                <th>Kontak</th>
                <th>Pendidikan & Domisili</th>
                <th>Target Formasi</th>
                <th>Perkembangan</th>
                <th>Terdaftar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((acc, idx) => {
                const waUrl = formatWaLink(acc.phone);
                const isVirtualEmail = String(acc.email || "").endsWith("@peserta.cscp.id");
                return `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>
                      <span class="admin-cell-primary">${escapeHtml(acc.full_name)}</span>
                      <span class="admin-cell-sub">${acc.email_confirmed_at ? "✓ Terverifikasi" : "Akun Terdaftar"}</span>
                    </td>
                    <td>
                      ${acc.phone ? `<a href="${waUrl}" target="_blank" rel="noopener" class="admin-cell-primary" style="color: var(--navy-primary); text-decoration: none;">${escapeHtml(acc.phone)}</a>` : `<span class="admin-cell-sub">-</span>`}
                      <span class="admin-cell-sub">${isVirtualEmail ? "Tanpa email pribadi" : escapeHtml(acc.email || "-")}</span>
                    </td>
                    <td>
                      <span class="admin-cell-primary">${escapeHtml(acc.education_level || "-")} ${acc.major ? `· ${escapeHtml(acc.major)}` : ""}</span>
                      <span class="admin-cell-sub">${escapeHtml(acc.domicile || "-")}</span>
                    </td>
                    <td><span class="admin-pill pill-blue">${escapeHtml(acc.target_formation || "Belum dipilih")}</span></td>
                    <td>
                      <span class="admin-cell-primary">Try Out: ${acc.tryout_count || 0}x ${acc.best_score !== null && acc.best_score !== undefined ? `(Best: ${acc.best_score})` : ""}</span>
                      <span class="admin-cell-sub">Berkas selesai: ${acc.checklist_done_count || 0}</span>
                    </td>
                    <td>
                      <span class="admin-cell-primary">${formatDate(acc.created_at, false)}</span>
                      <span class="admin-cell-sub">Login: ${formatDate(acc.last_sign_in_at, false)}</span>
                    </td>
                    <td>
                      <button type="button" class="btn-admin-secondary admin-btn-sm" data-account-detail="${escapeHtml(acc.id)}">Detail</button>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      ` : `<div class="admin-empty-state">Tidak ada akun yang cocok dengan filter pencarian.</div>`}
    </div>
  `;
}

function getFilteredQuestions() {
  const q = state.filters.questionQuery.trim().toLowerCase();
  return state.questions.filter((item) => {
    if (state.filters.questionCategory !== "ALL" && item.category_code !== state.filters.questionCategory) {
      return false;
    }
    if (state.filters.questionStatus === "published" && !item.is_published) return false;
    if (state.filters.questionStatus === "draft" && item.is_published) return false;
    if (!q) return true;
    return (item.question_text || "").toLowerCase().includes(q) || (item.explanation || "").toLowerCase().includes(q);
  });
}

function renderQuestionsTab() {
  const filtered = getFilteredQuestions();
  const catPillClass = { TWK: "pill-blue", TIU: "pill-purple", TKP: "pill-amber" };

  return `
    <div class="admin-panel-card">
      <div class="admin-panel-header">
        <div>
          <h2>Bank Soal Mini Try Out (${filtered.length})</h2>
          <p class="admin-panel-sub">Buat, kelola, dan terbitkan butir soal TWK, TIU, dan TKP untuk peserta CSCP.</p>
        </div>
        <button type="button" class="btn-admin-primary" id="newQuestionBtn">+ Buat Soal Baru</button>
      </div>

      <div class="admin-toolbar">
        <input type="search" id="questionSearchInput" class="admin-input admin-search-input" placeholder="Cari isi soal atau pembahasan..." value="${escapeHtml(state.filters.questionQuery)}">
        <select id="questionCategoryFilter" class="admin-select">
          <option value="ALL">Semua Kategori</option>
          ${state.categories.map((c) => `<option value="${escapeHtml(c.code)}" ${state.filters.questionCategory === c.code ? "selected" : ""}>${escapeHtml(c.code)} — ${escapeHtml(c.name)}</option>`).join("")}
        </select>
        <select id="questionStatusFilter" class="admin-select">
          <option value="ALL">Semua Status</option>
          <option value="published" ${state.filters.questionStatus === "published" ? "selected" : ""}>Terbit (Published)</option>
          <option value="draft" ${state.filters.questionStatus === "draft" ? "selected" : ""}>Draft</option>
        </select>
      </div>

      ${filtered.length ? `
        <div class="admin-question-list">
          ${filtered.map((qItem, idx) => `
            <article class="admin-question-card">
              <div class="admin-question-top">
                <div class="admin-question-badges">
                  <span class="admin-pill pill-slate">#${idx + 1}</span>
                  <span class="admin-pill ${catPillClass[qItem.category_code] || "pill-blue"}">${escapeHtml(qItem.category_code)}</span>
                  <span class="admin-pill ${qItem.is_published ? "pill-green" : "pill-amber"}">
                    ${qItem.is_published ? "✓ Terbit" : "Draft"}
                  </span>
                  <span class="admin-pill pill-slate">${qItem.scoring_type === "weighted" ? "Skor Bobot 1–5" : "Objektif (Benar/Salah)"}</span>
                </div>
                <div class="admin-question-actions">
                  <button type="button" class="btn-admin-secondary admin-btn-sm" data-toggle-publish="${escapeHtml(qItem.id)}" data-next-publish="${qItem.is_published ? "false" : "true"}">
                    ${qItem.is_published ? "Tarik ke Draft" : "Terbitkan"}
                  </button>
                  <button type="button" class="btn-admin-secondary admin-btn-sm" data-edit-question="${escapeHtml(qItem.id)}">Edit</button>
                  <button type="button" class="btn-admin-danger admin-btn-sm" data-delete-question="${escapeHtml(qItem.id)}">Hapus</button>
                </div>
              </div>

              <div class="admin-question-text">${escapeHtml(qItem.question_text)}</div>

              <div class="admin-options-preview">
                ${(qItem.options || []).map((opt) => `
                  <div class="admin-option-chip ${opt.is_correct || (qItem.scoring_type === "weighted" && Number(opt.score) >= 5) ? "is-correct" : ""}">
                    <span><strong>${escapeHtml(opt.option_key)}.</strong> ${escapeHtml(opt.option_text)}</span>
                    <span>${qItem.scoring_type === "weighted" ? `Skor ${opt.score ?? 0}` : (opt.is_correct ? "✓ Benar" : "")}</span>
                  </div>
                `).join("")}
              </div>

              ${qItem.explanation ? `
                <div class="admin-question-explanation">
                  <strong>Pembahasan:</strong> ${escapeHtml(qItem.explanation)}
                </div>
              ` : ""}
            </article>
          `).join("")}
        </div>
      ` : `<div class="admin-empty-state">Belum ada soal Mini Try Out yang dibuat. Klik <strong>+ Buat Soal Baru</strong> untuk menambahkan soal pertama Anda.</div>`}
    </div>
  `;
}

function getFilteredResults() {
  const q = state.filters.resultQuery.trim().toLowerCase();
  return state.tryoutResults.filter((res) => {
    if (state.filters.resultStatus !== "ALL" && res.status !== state.filters.resultStatus) return false;
    if (!q) return true;
    const text = [res.full_name, res.phone, res.email, res.title, res.target_formation].join(" ").toLowerCase();
    return text.includes(q);
  });
}

function formatResultSummary(summary) {
  if (!summary || typeof summary !== "object") return "-";
  const entries = Object.entries(summary);
  if (!entries.length) return "-";
  return entries.map(([k, v]) => `<span class="admin-pill pill-slate" style="margin:2px;">${escapeHtml(k)}: ${escapeHtml(v)}</span>`).join(" ");
}

function renderResultsTab() {
  const filtered = getFilteredResults();
  const statusLabels = {
    in_progress: { text: "Sedang Dikerjakan", cls: "pill-amber" },
    submitted: { text: "Selesai", cls: "pill-blue" },
    evaluated: { text: "Dinilai", cls: "pill-green" }
  };

  const scores = filtered.map((r) => r.total_score).filter((v) => v !== null && v !== undefined).map(Number);
  const highest = scores.length ? Math.max(...scores) : "-";
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "-";

  return `
    <div class="admin-section-stack">
      <div class="admin-kpi-grid" style="grid-template-columns: repeat(3, 1fr);">
        <div class="admin-kpi-card">
          <div class="admin-kpi-top"><span class="admin-kpi-label">Total Sesi Ditampilkan</span><span class="admin-kpi-icon">📋</span></div>
          <div class="admin-kpi-value">${filtered.length}</div>
        </div>
        <div class="admin-kpi-card">
          <div class="admin-kpi-top"><span class="admin-kpi-label">Rata-rata Skor</span><span class="admin-kpi-icon">📈</span></div>
          <div class="admin-kpi-value">${avg}</div>
        </div>
        <div class="admin-kpi-card">
          <div class="admin-kpi-top"><span class="admin-kpi-label">Skor Tertinggi</span><span class="admin-kpi-icon">🏆</span></div>
          <div class="admin-kpi-value">${highest}</div>
        </div>
      </div>

      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <div>
            <h2>Pantauan Hasil Mini Try Out Peserta</h2>
            <p class="admin-panel-sub">Riwayat pengerjaan, status sesi, dan perolehan nilai setiap peserta.</p>
          </div>
        </div>

        <div class="admin-toolbar">
          <input type="search" id="resultSearchInput" class="admin-input admin-search-input" placeholder="Cari nama peserta, nomor WA, atau judul try out..." value="${escapeHtml(state.filters.resultQuery)}">
          <select id="resultStatusFilter" class="admin-select">
            <option value="ALL">Semua Status</option>
            <option value="evaluated" ${state.filters.resultStatus === "evaluated" ? "selected" : ""}>Dinilai</option>
            <option value="submitted" ${state.filters.resultStatus === "submitted" ? "selected" : ""}>Selesai</option>
            <option value="in_progress" ${state.filters.resultStatus === "in_progress" ? "selected" : ""}>Sedang Dikerjakan</option>
          </select>
        </div>

        ${filtered.length ? `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Peserta</th>
                  <th>Paket Try Out</th>
                  <th>Status</th>
                  <th>Waktu Mulai & Selesai</th>
                  <th>Terjawab</th>
                  <th>Skor Total</th>
                  <th>Rincian</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.map((res) => {
                  const st = statusLabels[res.status] || { text: res.status, cls: "pill-slate" };
                  return `
                    <tr>
                      <td>
                        <span class="admin-cell-primary">${escapeHtml(res.full_name)}</span>
                        <span class="admin-cell-sub">${escapeHtml(res.phone || res.email || "-")}</span>
                      </td>
                      <td>
                        <span class="admin-cell-primary">${escapeHtml(res.title)}</span>
                        <span class="admin-cell-sub">${escapeHtml(res.target_formation || "-")}</span>
                      </td>
                      <td><span class="admin-pill ${st.cls}">${st.text}</span></td>
                      <td>
                        <span class="admin-cell-primary">${formatDate(res.started_at)}</span>
                        <span class="admin-cell-sub">Submit: ${formatDate(res.submitted_at)}</span>
                      </td>
                      <td>${res.answered_count ?? 0} soal</td>
                      <td><strong style="font-size:15px; color: var(--navy-primary);">${res.total_score ?? "-"}</strong></td>
                      <td>${formatResultSummary(res.result_summary)}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        ` : `<div class="admin-empty-state">Belum ada hasil Mini Try Out yang tercatat.</div>`}
      </div>
    </div>
  `;
}

function renderActiveView() {
  const mainEl = document.getElementById("adminMainContent");
  if (!mainEl) return;

  let bodyHtml = "";
  if (state.loading) {
    bodyHtml = `<div class="admin-panel-card"><div class="admin-empty-state">Memuat data administrator dari Supabase...</div></div>`;
  } else if (state.errorMessage) {
    bodyHtml = `
      <div class="admin-panel-card">
        <div class="admin-empty-state" style="color:#B91C1C;">
          <p><strong>Terjadi kendala:</strong> ${escapeHtml(state.errorMessage)}</p>
          <button type="button" class="btn-admin-secondary" style="margin-top:12px;" id="retryLoadBtn">Coba Muat Ulang</button>
        </div>
      </div>
    `;
  } else if (currentRoute === "accounts") {
    bodyHtml = renderAccountsTab();
  } else if (currentRoute === "questions") {
    bodyHtml = renderQuestionsTab();
  } else if (currentRoute === "results") {
    bodyHtml = renderResultsTab();
  } else {
    bodyHtml = renderOverviewTab();
  }

  mainEl.innerHTML = renderSetupBanner() + bodyHtml;
  attachContentEvents();
}

function renderShell() {
  const sidebarEl = document.getElementById("adminSidebarContainer");
  const topbarEl = document.getElementById("adminTopbarContainer");
  if (sidebarEl) sidebarEl.innerHTML = renderSidebar();
  if (topbarEl) topbarEl.innerHTML = renderTopbar();
  renderActiveView();
  attachShellEvents();
}

function openModal(html) {
  const backdrop = document.getElementById("adminModalBackdrop");
  const dialog = document.getElementById("adminModalDialog");
  if (!backdrop || !dialog) return;
  dialog.innerHTML = html;
  backdrop.hidden = false;
  dialog.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.onclick = closeModal;
  });
}

function closeModal() {
  const backdrop = document.getElementById("adminModalBackdrop");
  if (backdrop) backdrop.hidden = true;
}

function openAccountDetailModal(accountId) {
  const acc = state.accounts.find((a) => a.id === accountId);
  if (!acc) return;
  const waUrl = formatWaLink(acc.phone);
  const accResults = state.tryoutResults.filter((r) => r.user_id === acc.id);

  openModal(`
    <div class="admin-modal-header">
      <h3>Detail Akun Peserta</h3>
      <button type="button" class="admin-modal-close" data-close-modal aria-label="Tutup">×</button>
    </div>

    <div class="admin-detail-grid">
      <div class="admin-detail-box"><small>Nama Lengkap</small><span>${escapeHtml(acc.full_name)}</span></div>
      <div class="admin-detail-box"><small>Nomor WhatsApp</small><span>${acc.phone ? `<a href="${waUrl}" target="_blank" rel="noopener">${escapeHtml(acc.phone)}</a>` : "-"}</span></div>
      <div class="admin-detail-box"><small>Email Terdaftar</small><span>${escapeHtml(acc.email || "-")}</span></div>
      <div class="admin-detail-box"><small>Target Formasi</small><span>${escapeHtml(acc.target_formation || "-")}</span></div>
      <div class="admin-detail-box"><small>Tempat, Tanggal Lahir</small><span>${escapeHtml(acc.birth_place || "-")}${acc.birth_date ? `, ${formatDate(acc.birth_date, false)}` : ""}</span></div>
      <div class="admin-detail-box"><small>Pendidikan & Jurusan</small><span>${escapeHtml(acc.education_level || "-")}${acc.major ? ` — ${escapeHtml(acc.major)}` : ""}</span></div>
      <div class="admin-detail-box" style="grid-column: 1 / -1;"><small>Domisili</small><span>${escapeHtml(acc.domicile || "-")}</span></div>
      <div class="admin-detail-box"><small>Tanggal Daftar</small><span>${formatDate(acc.created_at)}</span></div>
      <div class="admin-detail-box"><small>Login Terakhir</small><span>${formatDate(acc.last_sign_in_at)}</span></div>
      <div class="admin-detail-box"><small>Riwayat Try Out</small><span>${acc.tryout_count || 0} sesi (Skor terbaik: ${acc.best_score ?? "-"})</span></div>
      <div class="admin-detail-box"><small>Checklist Berkas</small><span>${acc.checklist_done_count || 0} selesai</span></div>
    </div>

    ${accResults.length ? `
      <div style="margin-top:20px;">
        <h4 style="font-size:14px; font-weight:800; margin-bottom:10px;">Riwayat Mini Try Out Peserta Ini</h4>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>Paket</th><th>Status</th><th>Skor</th><th>Tanggal</th></tr></thead>
            <tbody>
              ${accResults.map((r) => `
                <tr>
                  <td>${escapeHtml(r.title)}</td>
                  <td>${escapeHtml(r.status)}</td>
                  <td><strong>${r.total_score ?? "-"}</strong></td>
                  <td>${formatDate(r.started_at)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    ` : ""}

    <div style="margin-top:22px; display:flex; justify-content:flex-end; gap:10px;">
      ${waUrl ? `<a href="${waUrl}" target="_blank" rel="noopener" class="btn-admin-secondary">Hubungi via WhatsApp</a>` : ""}
      <button type="button" class="btn-admin-primary" data-close-modal>Tutup</button>
    </div>
  `);
}

function openQuestionModal(questionId = null) {
  const existing = questionId ? state.questions.find((q) => q.id === questionId) : null;
  const catCode = existing?.category_code || "TWK";
  const scoringType = existing?.scoring_type || (catCode === "TKP" ? "weighted" : "objective");
  const optionKeys = ["A", "B", "C", "D", "E"];
  const optMap = {};
  (existing?.options || []).forEach((o) => { optMap[o.option_key] = o; });

  openModal(`
    <div class="admin-modal-header">
      <h3>${existing ? "Edit Soal Mini Try Out" : "Buat Soal Mini Try Out Baru"}</h3>
      <button type="button" class="admin-modal-close" data-close-modal aria-label="Tutup">×</button>
    </div>

    <form id="questionForm" class="admin-form-grid">
      <div class="admin-form-row">
        <div class="admin-field">
          <label for="qCategory">Kategori Materi</label>
          <select id="qCategory" name="category_code" class="admin-select" required>
            ${state.categories.map((c) => `<option value="${escapeHtml(c.code)}" ${catCode === c.code ? "selected" : ""}>${escapeHtml(c.code)} — ${escapeHtml(c.name)}</option>`).join("")}
          </select>
        </div>
        <div class="admin-field">
          <label for="qScoringType">Tipe Penilaian</label>
          <select id="qScoringType" name="scoring_type" class="admin-select" required>
            <option value="objective" ${scoringType === "objective" ? "selected" : ""}>Objektif (TWK / TIU — Benar: 5, Salah: 0)</option>
            <option value="weighted" ${scoringType === "weighted" ? "selected" : ""}>Berbobot (TKP — Skor 1 s.d. 5 per opsi)</option>
          </select>
        </div>
      </div>

      <div class="admin-field">
        <label for="qText">Pertanyaan Soal</label>
        <textarea id="qText" name="question_text" rows="4" class="admin-textarea" required placeholder="Tulis naskah soal di sini...">${escapeHtml(existing?.question_text || "")}</textarea>
      </div>

      <div class="admin-field">
        <label>Pilihan Jawaban (A – E)</label>
        <div id="qOptionsContainer" style="display:flex; flex-direction:column; gap:10px;">
          ${optionKeys.map((key, idx) => {
            const opt = optMap[key] || { option_text: "", score: scoringType === "weighted" ? 5 - idx : (key === "A" ? 5 : 0), is_correct: key === "A" };
            return `
              <div class="admin-option-row" data-opt-key="${key}">
                <div class="admin-option-key">${key}</div>
                <input type="text" name="opt_text_${key}" class="admin-input" placeholder="Teks pilihan ${key}" value="${escapeHtml(opt.option_text)}" required>
                <div class="admin-option-score-wrap">
                  ${scoringType === "weighted"
                    ? `<input type="number" name="opt_score_${key}" class="admin-input" min="1" max="5" value="${opt.score ?? (5 - idx)}" style="width:100%;" title="Bobot skor 1-5">`
                    : `<label style="display:flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600; cursor:pointer;"><input type="radio" name="correct_key" value="${key}" ${opt.is_correct ? "checked" : ""}> Kunci Benar</label>`
                  }
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="admin-field">
        <label for="qExplanation">Pembahasan Soal (Opsional)</label>
        <textarea id="qExplanation" name="explanation" rows="3" class="admin-textarea" placeholder="Jelaskan alasan jawaban yang benar...">${escapeHtml(existing?.explanation || "")}</textarea>
      </div>

      <label style="display:flex; align-items:center; gap:8px; font-size:13.5px; font-weight:600; cursor:pointer;">
        <input type="checkbox" id="qPublished" name="is_published" ${existing ? (existing.is_published ? "checked" : "") : "checked"}>
        Terbitkan soal ini ke bank soal peserta
      </label>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:6px;">
        <button type="button" class="btn-admin-secondary" data-close-modal>Batal</button>
        <button type="submit" class="btn-admin-primary" id="saveQuestionBtn">💾 Simpan Soal</button>
      </div>
    </form>
  `);

  const categorySelect = document.getElementById("qCategory");
  const scoringSelect = document.getElementById("qScoringType");
  const syncOptionInputs = () => {
    const type = scoringSelect.value;
    optionKeys.forEach((key, idx) => {
      const wrap = document.querySelector(`.admin-option-row[data-opt-key="${key}"] .admin-option-score-wrap`);
      if (!wrap) return;
      if (type === "weighted") {
        const val = optMap[key]?.score ?? (5 - idx);
        wrap.innerHTML = `<input type="number" name="opt_score_${key}" class="admin-input" min="1" max="5" value="${val}" style="width:100%;" title="Bobot skor 1-5">`;
      } else {
        const checked = optMap[key]?.is_correct || (!existing && key === "A");
        wrap.innerHTML = `<label style="display:flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600; cursor:pointer;"><input type="radio" name="correct_key" value="${key}" ${checked ? "checked" : ""}> Kunci Benar</label>`;
      }
    });
  };

  categorySelect.onchange = () => {
    scoringSelect.value = categorySelect.value === "TKP" ? "weighted" : "objective";
    syncOptionInputs();
  };
  scoringSelect.onchange = syncOptionInputs;

  document.getElementById("questionForm").onsubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const type = String(form.get("scoring_type") || "objective");
    const correctKey = String(form.get("correct_key") || "A");

    const options = optionKeys.map((key) => {
      const text = String(form.get(`opt_text_${key}`) || "").trim();
      if (type === "weighted") {
        const score = Number(form.get(`opt_score_${key}`) || 1);
        return { option_key: key, option_text: text, score, is_correct: score >= 5 };
      }
      const isCorrect = key === correctKey;
      return { option_key: key, option_text: text, score: isCorrect ? 5 : 0, is_correct: isCorrect };
    });

    const payload = {
      id: existing?.id || null,
      category_code: String(form.get("category_code") || "TWK"),
      scoring_type: type,
      question_text: String(form.get("question_text") || "").trim(),
      explanation: String(form.get("explanation") || "").trim(),
      is_published: document.getElementById("qPublished").checked,
      options
    };

    const btn = document.getElementById("saveQuestionBtn");
    btn.disabled = true;
    btn.textContent = "Menyimpan...";

    try {
      const client = getSupabase();
      const { error } = await client.rpc("admin_save_question", {
        access_code_input: getUnlockedCode(),
        question_payload: payload
      });
      if (error) throw error;
      closeModal();
      showToast(existing ? "Soal berhasil diperbarui." : "Soal baru berhasil disimpan.");
      await loadDashboardData();
    } catch (err) {
      alert(`Gagal menyimpan soal: ${err?.message || err}`);
      btn.disabled = false;
      btn.textContent = "💾 Simpan Soal";
    }
  };
}

function exportAccountsCsv() {
  const rows = getFilteredAccounts();
  if (!rows.length) {
    showToast("Tidak ada data akun untuk diekspor.");
    return;
  }
  const headers = [
    "No", "Nama Lengkap", "No WhatsApp", "Email", "Tempat Lahir", "Tanggal Lahir",
    "Domisili", "Pendidikan", "Jurusan", "Target Formasi", "Jumlah Try Out",
    "Skor Terbaik", "Checklist Berkas", "Tanggal Daftar"
  ];
  const csvCell = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;
  const lines = [
    headers.map(csvCell).join(","),
    ...rows.map((a, idx) => [
      idx + 1,
      a.full_name,
      a.phone,
      a.email,
      a.birth_place || "",
      a.birth_date || "",
      a.domicile || "",
      a.education_level || "",
      a.major || "",
      a.target_formation || "",
      a.tryout_count || 0,
      a.best_score ?? "",
      a.checklist_done_count || 0,
      formatDate(a.created_at)
    ].map(csvCell).join(","))
  ];

  const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `akun-peserta-cscp-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(`Berhasil mengekspor ${rows.length} data akun.`);
}

function attachShellEvents() {
  const sidebar = document.getElementById("adminSidebar");
  const overlay = document.getElementById("adminSidebarOverlay");
  const openBtn = document.getElementById("adminMenuToggle");
  const closeBtn = document.getElementById("adminSidebarCloseBtn");
  const lockBtn = document.getElementById("adminLockBtn");
  const refreshBtn = document.getElementById("adminRefreshBtn");

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("show");
  };

  if (openBtn) openBtn.onclick = () => {
    if (sidebar) sidebar.classList.add("open");
    if (overlay) overlay.classList.add("show");
  };
  if (closeBtn) closeBtn.onclick = closeSidebar;
  if (overlay) overlay.onclick = closeSidebar;
  if (lockBtn) lockBtn.onclick = lockAdmin;
  if (refreshBtn) refreshBtn.onclick = () => {
    showToast("Memuat ulang data terbaru...");
    loadDashboardData();
  };

  document.querySelectorAll("[data-admin-route]").forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();
      currentRoute = link.getAttribute("data-admin-route") || "overview";
      closeSidebar();
      renderShell();
    };
  });
}

function attachContentEvents() {
  const copySqlBtn = document.getElementById("copySqlSetupBtn");
  if (copySqlBtn) {
    copySqlBtn.onclick = async () => {
      try {
        const resp = await fetch("admin_setup.sql");
        if (!resp.ok) throw new Error("File admin_setup.sql tidak ditemukan");
        const sqlText = await resp.text();
        await navigator.clipboard.writeText(sqlText);
        showToast("Skrip admin_setup.sql berhasil disalin! Paste di Supabase SQL Editor.");
      } catch (err) {
        alert(`Gagal menyalin otomatis. Silakan buka file admin_setup.sql di folder proyek.\n(${err.message})`);
      }
    };
  }

  const retryBtn = document.getElementById("retryLoadAfterSqlBtn") || document.getElementById("retryLoadBtn");
  if (retryBtn) retryBtn.onclick = loadDashboardData;

  document.querySelectorAll("[data-goto-tab]").forEach((btn) => {
    btn.onclick = () => {
      currentRoute = btn.getAttribute("data-goto-tab") || "overview";
      renderShell();
    };
  });

  // Accounts tab events
  const accSearch = document.getElementById("accountSearchInput");
  if (accSearch) {
    accSearch.oninput = (e) => {
      state.filters.accountQuery = e.target.value;
      const pos = e.target.selectionStart;
      renderActiveView();
      const next = document.getElementById("accountSearchInput");
      if (next) { next.focus(); next.setSelectionRange(pos, pos); }
    };
  }
  const accFormFilter = document.getElementById("accountFormationFilter");
  if (accFormFilter) accFormFilter.onchange = (e) => { state.filters.accountFormation = e.target.value; renderActiveView(); };
  const accEduFilter = document.getElementById("accountEducationFilter");
  if (accEduFilter) accEduFilter.onchange = (e) => { state.filters.accountEducation = e.target.value; renderActiveView(); };
  const exportBtn = document.getElementById("exportAccountsCsvBtn");
  if (exportBtn) exportBtn.onclick = exportAccountsCsv;

  document.querySelectorAll("[data-account-detail]").forEach((btn) => {
    btn.onclick = () => openAccountDetailModal(btn.getAttribute("data-account-detail"));
  });

  // Questions tab events
  const newQBtn = document.getElementById("newQuestionBtn");
  if (newQBtn) newQBtn.onclick = () => openQuestionModal(null);

  const qSearch = document.getElementById("questionSearchInput");
  if (qSearch) {
    qSearch.oninput = (e) => {
      state.filters.questionQuery = e.target.value;
      const pos = e.target.selectionStart;
      renderActiveView();
      const next = document.getElementById("questionSearchInput");
      if (next) { next.focus(); next.setSelectionRange(pos, pos); }
    };
  }
  const qCatFilter = document.getElementById("questionCategoryFilter");
  if (qCatFilter) qCatFilter.onchange = (e) => { state.filters.questionCategory = e.target.value; renderActiveView(); };
  const qStatFilter = document.getElementById("questionStatusFilter");
  if (qStatFilter) qStatFilter.onchange = (e) => { state.filters.questionStatus = e.target.value; renderActiveView(); };

  document.querySelectorAll("[data-edit-question]").forEach((btn) => {
    btn.onclick = () => openQuestionModal(btn.getAttribute("data-edit-question"));
  });

  document.querySelectorAll("[data-toggle-publish]").forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.getAttribute("data-toggle-publish");
      const nextPublished = btn.getAttribute("data-next-publish") === "true";
      try {
        const { error } = await getSupabase().rpc("admin_toggle_question_publish", {
          access_code_input: getUnlockedCode(),
          target_question_id: id,
          next_published: nextPublished
        });
        if (error) throw error;
        showToast(nextPublished ? "Soal diterbitkan ke peserta." : "Soal dipindahkan ke Draft.");
        await loadDashboardData();
      } catch (err) {
        alert(`Gagal mengubah status soal: ${err?.message || err}`);
      }
    };
  });

  document.querySelectorAll("[data-delete-question]").forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.getAttribute("data-delete-question");
      if (!confirm("Yakin ingin menghapus soal ini secara permanen?")) return;
      try {
        const { error } = await getSupabase().rpc("admin_delete_question", {
          access_code_input: getUnlockedCode(),
          target_question_id: id
        });
        if (error) throw error;
        showToast("Soal berhasil dihapus.");
        await loadDashboardData();
      } catch (err) {
        alert(`Soal gagal dihapus (jika sudah pernah dikerjakan peserta, silakan jadikan Draft saja).\nDetail: ${err?.message || err}`);
      }
    };
  });

  // Results tab events
  const resSearch = document.getElementById("resultSearchInput");
  if (resSearch) {
    resSearch.oninput = (e) => {
      state.filters.resultQuery = e.target.value;
      const pos = e.target.selectionStart;
      renderActiveView();
      const next = document.getElementById("resultSearchInput");
      if (next) { next.focus(); next.setSelectionRange(pos, pos); }
    };
  }
  const resStatFilter = document.getElementById("resultStatusFilter");
  if (resStatFilter) resStatFilter.onchange = (e) => { state.filters.resultStatus = e.target.value; renderActiveView(); };
}

function initAdminPortal() {
  const gateForm = document.getElementById("adminGateForm");
  const codeInput = document.getElementById("adminCodeInput");
  const gateError = document.getElementById("adminGateError");
  const toggleBtn = document.getElementById("toggleAdminCodeBtn");
  const modalBackdrop = document.getElementById("adminModalBackdrop");

  if (toggleBtn && codeInput) {
    toggleBtn.onclick = () => {
      codeInput.type = codeInput.type === "password" ? "text" : "password";
    };
  }

  if (modalBackdrop) {
    modalBackdrop.onclick = (e) => {
      if (e.target === modalBackdrop) closeModal();
    };
  }

  if (gateForm) {
    gateForm.onsubmit = (e) => {
      e.preventDefault();
      const entered = String(codeInput?.value || "").trim();
      if (entered === ADMIN_ACCESS_CODE) {
        if (gateError) gateError.hidden = true;
        unlockAdmin(entered);
      } else {
        if (gateError) {
          gateError.textContent = "Kode akses administrator salah. Silakan periksa kembali.";
          gateError.hidden = false;
        }
        codeInput?.focus();
      }
    };
  }

  if (isUnlocked()) {
    unlockAdmin(getUnlockedCode());
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdminPortal);
} else {
  initAdminPortal();
}
