/**
 * ProgressOverview Component - CSCP Dashboard Peserta
 * Menampilkan Indikator Kesiapan Materi SKD & Checklist Tahapan Persiapan
 * Terintegrasi Dinamis dengan Hasil Latihan Peserta
 */

import { getOverallUserStats, getUserId, getUserHistory } from "../data/practiceBank.js";

export function renderProgressOverview(userData) {
  const userId = getUserId(userData);
  const stats = getOverallUserStats(userId);
  const tiuHistory = getUserHistory(userId, "tiu-baris-deret-1");
  const latestTiu = tiuHistory[0] || null;
  const highestTiuScore = tiuHistory.length ? Math.max(...tiuHistory.map(h => h.score || 0)) : null;

  const tiuPercent = highestTiuScore ? Math.min(100, Math.round((highestTiuScore / 250) * 100)) : 45;
  const tiuStatus = highestTiuScore !== null 
    ? (highestTiuScore >= 80 ? `Lulus PG (${highestTiuScore} Poin)` : `Belum PG (${highestTiuScore} Poin)`)
    : "Siap Evaluasi";

  return `
    <section class="progress-overview-section" aria-label="Ringkasan Kesiapan Belajar">
      <div class="overview-grid">
        <!-- Col 1: Indikator Kesiapan Materi SKD -->
        <div class="overview-card readiness-card">
          <div class="card-title-row">
            <div>
              <span class="card-kicker">ANALISIS KESIAPAN</span>
              <h2 class="card-heading">Standar Ambang Batas SKD (BKN)</h2>
            </div>
            <span class="badge-tag-skd">SKD CASN</span>
          </div>
          <p class="card-subtext">
            Kuasai ketiga pilar materi ujian Seleksi Kompetensi Dasar untuk mengamankan posisi pemeringkatan formasi.
          </p>

          <div class="readiness-bars-list">
            <!-- TWK Bar -->
            <div class="readiness-bar-item">
              <div class="bar-header">
                <span class="bar-name"><strong>TWK</strong> (Tes Wawasan Kebangsaan)</span>
                <span class="bar-score">Ambang Batas: <strong>65</strong> / 150</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill twk-fill" style="width: 43%;"></div>
              </div>
              <div class="bar-footer">
                <small>30 Soal · Nasionalisme, Integritas, Bela Negara, Pilar Negara</small>
                <span class="bar-status-text">Siap Evaluasi</span>
              </div>
            </div>

            <!-- TIU Bar -->
            <div class="readiness-bar-item">
              <div class="bar-header">
                <span class="bar-name"><strong>TIU</strong> (Tes Inteligensi Umum)</span>
                <span class="bar-score">Ambang Batas: <strong>80</strong> / 250</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill tiu-fill" style="width: ${tiuPercent}%;"></div>
              </div>
              <div class="bar-footer">
                <small>Kemampuan Numerik (Baris & Deret), Verbal, Figural</small>
                <span class="bar-status-text ${highestTiuScore >= 80 ? 'text-green-bold' : ''}">${tiuStatus}</span>
              </div>
            </div>

            <!-- TKP Bar -->
            <div class="readiness-bar-item">
              <div class="bar-header">
                <span class="bar-name"><strong>TKP</strong> (Tes Karakteristik Pribadi)</span>
                <span class="bar-score">Ambang Batas: <strong>166</strong> / 225</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill tkp-fill" style="width: 74%;"></div>
              </div>
              <div class="bar-footer">
                <small>45 Soal · Pelayanan Publik, Jejaring Kerja, Sosial Budaya, TIK</small>
                <span class="bar-status-text">Prioritas Skor</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 2: Alur Persiapan & Checklist Administrasi -->
        <div class="overview-card checklist-card">
          <div class="card-title-row">
            <div>
              <span class="card-kicker">CHECKLIST KESIAPAN</span>
              <h2 class="card-heading">Tahapan Persiapan CASN</h2>
            </div>
            <span class="badge-tag-skd bg-blue-subtle text-navy">Al Bisyru</span>
          </div>
          <p class="card-subtext">
            Pantau runtutan langkah persiapan administrasi dan bimbingan belajar Anda.
          </p>

          <ol class="milestone-steps-list">
            <li class="milestone-step done">
              <div class="step-marker">✓</div>
              <div class="step-content">
                <strong>Buat Akun Portal CSCP</strong>
                <span>Registrasi bimbingan belajar Yayasan Pendidikan Al Bisyru selesai.</span>
              </div>
            </li>
            <li class="milestone-step ${tiuHistory.length > 0 ? 'done' : 'active'}">
              <div class="step-marker">${tiuHistory.length > 0 ? '✓' : '2'}</div>
              <div class="step-content">
                <strong>Latihan Soal & Mini Try Out</strong>
                <span>${tiuHistory.length > 0 ? `Telah menyelesaikan ${tiuHistory.length} kali latihan soal.` : 'Kerjakan Paket Tes 1: TIU Baris & Deret (50 Soal).'}</span>
              </div>
            </li>
            <li class="milestone-step">
              <div class="step-marker">3</div>
              <div class="step-content">
                <strong>Pelajari 7 Dokumen Wajib</strong>
                <span>Sesuaikan KTP, Ijazah, Transkrip, Surat Lamaran Kemenag RI, dll.</span>
              </div>
            </li>
            <li class="milestone-step">
              <div class="step-marker">4</div>
              <div class="step-content">
                <strong>Ikuti Sesi Pendampingan Zoom</strong>
                <span>Diskusi materi intensif dan bedah soal bersama mentor Al Bisyru.</span>
              </div>
            </li>
          </ol>

          <a href="#tryout" class="btn-open-checklist">
            <span>Buka Latihan Soal Sekarang</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    </section>
  `;
}
