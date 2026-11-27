/**
 * Halaman Fitur: Monitoring Belajar
 * Route: /dashboard/monitoring (#monitoring)
 * Terintegrasi Penuh dengan Hasil & Riwayat Latihan Soal CSCP
 */

import { getUserHistory, getOverallUserStats, getUserId, PRACTICE_PACKAGES } from "../data/practiceBank.js";

export function renderMonitoringPage(userData) {
  const userId = getUserId(userData);
  const stats = getOverallUserStats(userId);
  const history = getUserHistory(userId);

  return `
    <div class="feature-page-container">
      <!-- Breadcrumb Navigasi -->
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Monitoring Belajar</span>
      </div>

      <!-- Feature Hero Container -->
      <div class="feature-hero-card">
        <div class="feature-hero-header">
          <div class="feature-icon-badge bg-green-subtle">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <div>
            <span class="feature-kicker">EVALUASI PERKEMBANGAN DIRI</span>
            <h1 class="feature-title">Monitoring Belajar & Rekap Skor</h1>
            <p class="feature-desc">Pantau rekam jejak latihan soal, konsistensi skor dari waktu ke waktu, serta status kesiapan Passing Grade SKD Anda.</p>
          </div>
        </div>

        <!-- 4 Metrik Ringkas Monitoring -->
        <div class="practice-stats-strip" style="margin-top: 10px;">
          <div class="practice-stat-col">
            <span class="p-stat-label">Total Percobaan</span>
            <strong class="p-stat-val">${stats.totalAttempts} <small>Kali</small></strong>
          </div>
          <div class="practice-stat-divider"></div>
          <div class="practice-stat-col">
            <span class="p-stat-label">Rata-Rata Skor</span>
            <strong class="p-stat-val text-navy">${stats.averageScore || "—"}</strong>
          </div>
          <div class="practice-stat-divider"></div>
          <div class="practice-stat-col">
            <span class="p-stat-label">Skor Tertinggi</span>
            <strong class="p-stat-val text-green">${stats.highestScore || "—"} <small>${stats.highestScore ? "/ 250" : ""}</small></strong>
          </div>
          <div class="practice-stat-divider"></div>
          <div class="practice-stat-col">
            <span class="p-stat-label">Lulus Passing Grade</span>
            <strong class="p-stat-val text-green">${stats.passedCount} <small>Kali</small></strong>
          </div>
        </div>
      </div>

      <!-- Riwayat & Log Pengerjaan Ujian -->
      <section class="practice-section-block">
        <div class="section-title-wrap">
          <div class="section-icon-pill bg-blue-subtle">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          </div>
          <div>
            <h2 class="practice-sec-title">Rekap Percobaan Latihan Soal</h2>
            <p class="practice-sec-sub">Setiap kali Anda menyelesaikan latihan, tanggal, durasi, jumlah jawaban benar, dan skor akan tercatat otomatis di bawah ini.</p>
          </div>
        </div>

        ${history.length > 0 ? `
          <div class="practice-history-wrapper">
            <div class="practice-table-responsive">
              <table class="practice-history-table">
                <thead>
                  <tr>
                    <th>Percobaan</th>
                    <th>Waktu Pengerjaan</th>
                    <th>Paket Soal</th>
                    <th>Durasi</th>
                    <th>Rincian Jawaban</th>
                    <th>Skor</th>
                    <th>Status Passing Grade</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  ${history.map((att, idx) => {
                    const passClass = att.isPassed ? "tag-pass" : "tag-fail";
                    const passText = att.isPassed ? "LULUS PG (≥80)" : "BELUM LULUS";
                    const durationMin = Math.floor((att.durationTakenSeconds || 0) / 60);
                    const durationSec = (att.durationTakenSeconds || 0) % 60;

                    return `
                      <tr>
                        <td class="col-center"><strong>#${history.length - idx}</strong></td>
                        <td>${att.formattedDate}</td>
                        <td>
                          <strong>${att.packageTitle}</strong>
                          <div class="text-muted-xs">${att.panel} · ${att.subCategory}</div>
                        </td>
                        <td>${durationMin}m ${durationSec}s</td>
                        <td>
                          <span class="text-green-bold">✓ ${att.correctCount}</span> · 
                          <span class="text-red-bold">✗ ${att.wrongCount}</span> · 
                          <span class="text-muted-xs">Kosong: ${att.unansweredCount}</span>
                        </td>
                        <td>
                          <span class="score-pill-bold">${att.score}</span>
                          <small class="text-muted-xs">/ ${att.maxScore || 250}</small>
                        </td>
                        <td><span class="status-pill ${passClass}">${passText}</span></td>
                        <td>
                          <a href="#tryout" class="btn-table-review" onclick="setTimeout(() => window.cscpQuiz && window.cscpQuiz.viewHistoryAttempt('${att.attemptId}'), 50);">
                            Buka Pembahasan →
                          </a>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : `
          <div class="practice-empty-state">
            <div class="empty-icon">📊</div>
            <h3>Belum Ada Data Rekap</h3>
            <p>Data grafik dan analisis performa akan muncul otomatis setelah Anda menyelesaikan minimal 1 kali latihan soal di fitur <strong>Mini Try Out CASN</strong>.</p>
            <div style="margin-top: 16px;">
              <a href="#tryout" class="btn btn-primary">Mulai Latihan Sekarang →</a>
            </div>
          </div>
        `}
      </section>

      <!-- Saran & Rekomendasi Belajar Berdasarkan Evaluasi -->
      <section class="practice-section-block">
        <div class="section-title-wrap">
          <div class="section-icon-pill bg-amber-subtle">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
          </div>
          <div>
            <h2 class="practice-sec-title">Strategi Evaluasi Mandiri</h2>
            <p class="practice-sec-sub">Panduan memaksimalkan skor TIU dari hasil latihan yang telah Anda kerjakan.</p>
          </div>
        </div>

        <div class="preview-grid" style="margin-top: 4px;">
          <div class="preview-item">
            <div class="preview-item-icon">🔍</div>
            <h4>Fokus pada Soal Keliru</h4>
            <p>Gunakan filter "Salah Saja" di menu pembahasan untuk mempelajari letak kesalahan pola angka atau huruf Anda.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">⏱️</div>
            <h4>Latihan Manajemen Waktu</h4>
            <p>Targetkan rata-rata pengerjaan 1 soal TIU maksimal 50–54 detik agar tidak kehabisan waktu pada hari ujian CAT BKN.</p>
          </div>
          <div class="preview-item">
            <div class="preview-item-icon">🔄</div>
            <h4>Ulangi Paket Latihan</h4>
            <p>Manfaatkan tombol "Ulangi Latihan" untuk menguji apakah Anda sudah benar-benar menguasai seluruh pola di paket tersebut.</p>
          </div>
        </div>

        <div class="feature-actions" style="margin-top: 12px; display: flex; gap: 12px;">
          <a href="#tryout" class="btn btn-primary">Buka Latihan Soal (50 Butir) →</a>
          <a href="#overview" class="btn btn-outline">← Kembali ke Dashboard</a>
        </div>
      </section>
    </div>
  `;
}
