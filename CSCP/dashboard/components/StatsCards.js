/**
 * StatsCards Component - CSCP Dashboard Peserta
 * Menampilkan 4 Kartu Statistik Ringkas Persiapan CASN
 */

export function renderStatsCards(userData) {
  return `
    <section class="stats-cards-grid" aria-label="Statistik Belajar">
      <!-- Stat 1: Try Out Dikerjakan -->
      <article class="stat-card">
        <div class="stat-card-header">
          <div class="stat-icon-wrap bg-blue-subtle text-navy">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1"></rect>
              <path d="M9 14l2 2 4-4"></path>
            </svg>
          </div>
          <span class="stat-pill-trend">Siap Latihan</span>
        </div>
        <div class="stat-card-body">
          <span class="stat-label">Try Out Selesai</span>
          <div class="stat-value-row">
            <strong class="stat-number">0</strong>
            <span class="stat-unit">/ 12 Paket</span>
          </div>
          <p class="stat-caption">Mini Try Out TWK, TIU, dan TKP</p>
        </div>
        <div class="stat-footer-bar">
          <div class="stat-progress-line" style="width: 5%;"></div>
        </div>
      </article>

      <!-- Stat 2: Rata-Rata Skor SKD -->
      <article class="stat-card">
        <div class="stat-card-header">
          <div class="stat-icon-wrap bg-green-subtle text-green">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </div>
          <span class="stat-pill-trend bg-green-badge">Target 450+</span>
        </div>
        <div class="stat-card-body">
          <span class="stat-label">Estimasi Rata-rata Skor</span>
          <div class="stat-value-row">
            <strong class="stat-number">—</strong>
            <span class="stat-unit">/ 550 Max</span>
          </div>
          <p class="stat-caption">Ambang batas passing grade: 311</p>
        </div>
        <div class="stat-footer-bar">
          <div class="stat-progress-line bg-green-fill" style="width: 0%;"></div>
        </div>
      </article>

      <!-- Stat 3: Progres Belajar & Berkas -->
      <article class="stat-card">
        <div class="stat-card-header">
          <div class="stat-icon-wrap bg-purple-subtle text-purple">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <span class="stat-pill-trend">Fase Awal</span>
        </div>
        <div class="stat-card-body">
          <span class="stat-label">Progres Kesiapan</span>
          <div class="stat-value-row">
            <strong class="stat-number">25%</strong>
            <span class="stat-unit">Persiapan</span>
          </div>
          <p class="stat-caption">Data akun & checklist berkas aktif</p>
        </div>
        <div class="stat-footer-bar">
          <div class="stat-progress-line bg-purple-fill" style="width: 25%;"></div>
        </div>
      </article>

      <!-- Stat 4: Sesi Bimbingan Zoom -->
      <article class="stat-card">
        <div class="stat-card-header">
          <div class="stat-icon-wrap bg-amber-subtle text-amber">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2"></rect>
            </svg>
          </div>
          <span class="stat-pill-trend bg-amber-badge">Jadwal Aktif</span>
        </div>
        <div class="stat-card-body">
          <span class="stat-label">Pendampingan Daring</span>
          <div class="stat-value-row">
            <strong class="stat-number">Live</strong>
            <span class="stat-unit">Zoom Class</span>
          </div>
          <p class="stat-caption">Tatap muka & kupas tuntas soal</p>
        </div>
        <div class="stat-footer-bar">
          <div class="stat-progress-line bg-amber-fill" style="width: 100%;"></div>
        </div>
      </article>
    </section>
  `;
}
