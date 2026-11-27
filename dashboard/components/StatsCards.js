/**
 * StatsCards Component - CSCP Dashboard Peserta
 * Menampilkan 4 Kartu Statistik Ringkas Persiapan CASN
 * Terintegrasi Dinamis dengan Riwayat Latihan Soal
 */

import { getOverallUserStats, getUserId } from "../data/practiceBank.js";

export function renderStatsCards(userData) {
  const userId = getUserId(userData);
  const stats = getOverallUserStats(userId);
  const completedCount = stats.totalAttempts || 0;
  const avgScore = stats.averageScore > 0 ? stats.averageScore : "—";
  const progressPercent = Math.min(100, Math.round((completedCount / 12) * 100));

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
          <span class="stat-pill-trend">${completedCount > 0 ? `${completedCount} Selesai` : 'Siap Latihan'}</span>
        </div>
        <div class="stat-card-body">
          <span class="stat-label">Try Out Selesai</span>
          <div class="stat-value-row">
            <strong class="stat-number">${completedCount}</strong>
            <span class="stat-unit">/ 12 Paket</span>
          </div>
          <p class="stat-caption">Latihan Soal & Mini Try Out CAT</p>
        </div>
        <div class="stat-footer-bar">
          <div class="stat-progress-line" style="width: ${Math.max(5, progressPercent)}%;"></div>
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
          <span class="stat-label">Estimasi Rata-Rata Skor</span>
          <div class="stat-value-row">
            <strong class="stat-number">${avgScore}</strong>
            <span class="stat-unit">/ 250 TIU</span>
          </div>
          <p class="stat-caption">Ambang batas passing grade: 80</p>
        </div>
        <div class="stat-footer-bar">
          <div class="stat-progress-line bg-green-fill" style="width: ${stats.averageScore > 0 ? Math.min(100, Math.round((stats.averageScore / 250) * 100)) : 0}%;"></div>
        </div>
      </article>

      <!-- Stat 3: Progres Belajar & Berkas -->
      <article class="stat-card">
        <div class="stat-card-header">
          <div class="stat-icon-wrap bg-amber-subtle text-amber">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <span class="stat-pill-trend bg-amber-badge">7 Dokumen</span>
        </div>
        <div class="stat-card-body">
          <span class="stat-label">Checklist Dokumen</span>
          <div class="stat-value-row">
            <strong class="stat-number">Panduan</strong>
            <span class="stat-unit">SSCASN</span>
          </div>
          <p class="stat-caption">7 Berkas & 7 Infografis Al Bisyru</p>
        </div>
        <div class="stat-footer-bar">
          <div class="stat-progress-line bg-amber-fill" style="width: 100%;"></div>
        </div>
      </article>

      <!-- Stat 4: Kelas Zoom & Mentoring -->
      <article class="stat-card">
        <div class="stat-card-header">
          <div class="stat-icon-wrap bg-purple-subtle text-purple">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </div>
          <span class="stat-pill-trend bg-purple-badge">Zoom Aktif</span>
        </div>
        <div class="stat-card-body">
          <span class="stat-label">Kelas Pendampingan</span>
          <div class="stat-value-row">
            <strong class="stat-number">TBA</strong>
            <span class="stat-unit">Sesi Daring</span>
          </div>
          <p class="stat-caption">Jadwal diumumkan sewaktu-waktu</p>
        </div>
        <div class="stat-footer-bar">
          <div class="stat-progress-line bg-purple-fill" style="width: 80%;"></div>
        </div>
      </article>
    </section>
  `;
}
