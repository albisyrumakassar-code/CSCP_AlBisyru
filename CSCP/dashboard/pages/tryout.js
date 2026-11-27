/**
 * Halaman Fitur: Latihan Soal & Mini Try Out CSCP
 * Route: /dashboard/tryout (#tryout)
 * Arsitektur Modular, Fleksibel, & Dinamis untuk Panel TIU, TWK, dan TKP
 * Dilengkapi Engine CBT CAT Berwaktu, Navigasi 1-50, Ragu-ragu, Riwayat Percobaan, & Pembahasan Lengkap
 */

import {
  PRACTICE_TAXONOMY,
  PRACTICE_PACKAGES,
  getPackageById,
  getUserHistory,
  saveUserAttempt,
  getOverallUserStats,
  getUserId
} from "../data/practiceBank.js";

// State Global Modul Latihan Soal
let state = {
  view: "lobby", // "lobby" | "exam" | "result"
  userData: null,
  activeFilter: "all", // "all" | "TIU" | "TWK" | "TKP"
  activeSubcategory: "all",
  activePackage: null,
  currentQuestionIdx: 0,
  answers: {}, // { questionId: "A" }
  flagged: {}, // { questionId: true/false }
  timerSeconds: 45 * 60,
  timerInterval: null,
  startTime: null,
  activeAttemptResult: null,
  reviewFilter: "all" // "all" | "wrong" | "correct" | "unanswered"
};

/**
 * Render Utama Halaman Tryout
 */
export function renderTryoutPage(userData) {
  state.userData = userData;

  // Pastikan cscpQuiz terpasang di window
  if (!window.cscpQuiz) {
    initQuizEngine();
  }

  if (state.view === "exam" && state.activePackage) {
    return renderExamView();
  }

  if (state.view === "result" && state.activeAttemptResult) {
    return renderResultView();
  }

  return renderLobbyView();
}

/**
 * =========================================================================
 * 1. TAMPILAN LOBBY (KATALOG LATIHAN SOAL & RIWAYAT NILAI)
 * =========================================================================
 */
function renderLobbyView() {
  const userId = getUserId(state.userData);
  const userStats = getOverallUserStats(userId);
  const history = getUserHistory(userId);

  // Filter paket berdasarkan tab aktif
  let filteredPackages = PRACTICE_PACKAGES;
  if (state.activeFilter !== "all") {
    filteredPackages = filteredPackages.filter(p => p.panel === state.activeFilter);
  }

  return `
    <div class="feature-page-container practice-lobby-wrap">
      <!-- Breadcrumb -->
      <div class="feature-breadcrumb">
        <a href="#overview" class="breadcrumb-back">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Dashboard
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Latihan Soal CSCP</span>
      </div>

      <!-- Hero Header -->
      <div class="feature-hero-card practice-hero-banner">
        <div class="feature-hero-header">
          <div class="feature-icon-badge bg-navy-subtle">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 14l2 2 4-4"></path>
            </svg>
          </div>
          <div>
            <div class="practice-kicker-row">
              <span class="feature-kicker">BANK SOAL & SIMULASI CAT</span>
              <span class="practice-live-badge"><span class="badge-dot-live"></span> Kisi-Kisi Resmi BKN</span>
            </div>
            <h1 class="feature-title">Latihan Soal & Mini Try Out</h1>
            <p class="feature-desc">Tingkatkan ketajaman analisis, kecepatan berhitung, dan penguasaan materi seleksi CASN dengan simulasi berwaktu standar CAT resmi.</p>
          </div>
        </div>

        <!-- Kartu Ringkasan Progres Peserta -->
        <div class="practice-stats-strip">
          <div class="practice-stat-col">
            <span class="p-stat-label">Latihan Diikuti</span>
            <strong class="p-stat-val">${userStats.totalAttempts} <small>Kali</small></strong>
          </div>
          <div class="practice-stat-divider"></div>
          <div class="practice-stat-col">
            <span class="p-stat-label">Skor Tertinggi</span>
            <strong class="p-stat-val text-navy">${userStats.highestScore || "—"} <small>${userStats.highestScore ? "/ 250" : ""}</small></strong>
          </div>
          <div class="practice-stat-divider"></div>
          <div class="practice-stat-col">
            <span class="p-stat-label">Rata-Rata Skor</span>
            <strong class="p-stat-val">${userStats.averageScore || "—"}</strong>
          </div>
          <div class="practice-stat-divider"></div>
          <div class="practice-stat-col">
            <span class="p-stat-label">Lulus Passing Grade</span>
            <strong class="p-stat-val text-green">${userStats.passedCount} <small>Kali</small></strong>
          </div>
        </div>
      </div>

      <!-- Navigasi Tab Panel: TIU, TWK, TKP -->
      <div class="practice-tab-container">
        <button type="button" class="practice-tab-btn ${state.activeFilter === 'all' ? 'active' : ''}" onclick="window.cscpQuiz.setPanelFilter('all')">
          <span class="tab-label">Semua Panel</span>
          <span class="tab-count">${PRACTICE_PACKAGES.length}</span>
        </button>
        <button type="button" class="practice-tab-btn ${state.activeFilter === 'TIU' ? 'active' : ''}" onclick="window.cscpQuiz.setPanelFilter('TIU')">
          <span class="tab-badge-panel tiu">TIU</span>
          <span class="tab-label">Tes Intelegensia Umum</span>
          <span class="tab-pg">PG: 80</span>
        </button>
        <button type="button" class="practice-tab-btn ${state.activeFilter === 'TWK' ? 'active' : ''}" onclick="window.cscpQuiz.setPanelFilter('TWK')">
          <span class="tab-badge-panel twk">TWK</span>
          <span class="tab-label">Tes Wawasan Kebangsaan</span>
          <span class="tab-pg">PG: 65</span>
        </button>
        <button type="button" class="practice-tab-btn ${state.activeFilter === 'TKP' ? 'active' : ''}" onclick="window.cscpQuiz.setPanelFilter('TKP')">
          <span class="tab-badge-panel tkp">TKP</span>
          <span class="tab-label">Tes Karakteristik Pribadi</span>
          <span class="tab-pg">PG: 166</span>
        </button>
      </div>

      <!-- Daftar Paket Soal Aktif & Subkategori -->
      <section class="practice-section-block">
        <div class="section-title-wrap">
          <div class="section-icon-pill">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div>
            <h2 class="practice-sec-title">Paket Latihan Siap Dikerjakan</h2>
            <p class="practice-sec-sub">Pilih paket latihan untuk memulai simulasi CAT dengan timer dan penilaian otomatis.</p>
          </div>
        </div>

        <div class="practice-packages-grid">
          ${filteredPackages.map(pkg => renderPackageCard(pkg, userId)).join("")}
        </div>
      </section>

      <!-- Roadmap Kategori Soal Sesuai Silabus Acuan PDF -->
      <section class="practice-section-block">
        <div class="section-title-wrap">
          <div class="section-icon-pill bg-blue-subtle">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </div>
          <div>
            <h2 class="practice-sec-title">Struktur & Silabus Soal CASN Lengkap</h2>
            <p class="practice-sec-sub">Daftar seluruh kategori dan subkategori materi TIU, TWK, dan TKP sesuai acuan modul resmi. Paket soal baru akan ditambahkan bertahap.</p>
          </div>
        </div>

        <div class="syllabus-taxonomy-grid">
          ${renderTaxonomyGrid()}
        </div>
      </section>

      <!-- Riwayat & Perkembangan Nilai Peserta -->
      <section class="practice-section-block" id="riwayatLatihanSec">
        <div class="section-title-wrap">
          <div class="section-icon-pill bg-green-subtle">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
          <div>
            <h2 class="practice-sec-title">Riwayat & Perkembangan Nilai Saya</h2>
            <p class="practice-sec-sub">Catatan seluruh percobaan latihan yang pernah Anda kerjakan untuk evaluasi peningkatan pemahaman materi.</p>
          </div>
        </div>

        ${renderHistoryTable(history)}
      </section>
    </div>
  `;
}

/**
 * Render Kartu Paket Soal
 */
function renderPackageCard(pkg, userId) {
  const history = getUserHistory(userId, pkg.id);
  const bestScore = history.length ? Math.max(...history.map(h => h.score || 0)) : null;
  const attemptsCount = history.length;
  const latestAttempt = history[0] || null;

  return `
    <article class="pkg-card-item ${pkg.panel.toLowerCase()}">
      <div class="pkg-card-header">
        <div class="pkg-panel-badge ${pkg.panel.toLowerCase()}">
          <span>${pkg.panel}</span> · <strong>${pkg.subcategoryTitle}</strong>
        </div>
        <span class="pkg-status-badge available">Tersedia</span>
      </div>

      <div class="pkg-card-body">
        <h3 class="pkg-card-title">${pkg.title}</h3>
        <p class="pkg-card-desc">${pkg.description}</p>
        
        <div class="pkg-meta-tags">
          <span class="pkg-meta-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${pkg.durationMinutes} Menit
          </span>
          <span class="pkg-meta-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
            ${pkg.totalQuestions} Soal
          </span>
          <span class="pkg-meta-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Passing Grade: ${pkg.passingGrade}
          </span>
        </div>

        <!-- Riwayat Singkat Paket Ini -->
        <div class="pkg-history-preview">
          ${attemptsCount > 0 ? `
            <div class="pkg-hist-row">
              <span class="pkg-hist-lbl">Percobaan: <strong>${attemptsCount}x</strong></span>
              <span class="pkg-hist-lbl">Skor Tertinggi: <strong class="text-navy">${bestScore} / ${pkg.maxScore}</strong></span>
              ${latestAttempt?.isPassed ? `
                <span class="pkg-pass-tag pass">Lulus PG</span>
              ` : `
                <span class="pkg-pass-tag">Perlu Latihan</span>
              `}
            </div>
          ` : `
            <span class="pkg-not-attempted">Belum pernah dikerjakan. Uji kemampuan Anda sekarang!</span>
          `}
        </div>
      </div>

      <div class="pkg-card-footer">
        <button type="button" class="btn btn-primary full" onclick="window.cscpQuiz.startPackage('${pkg.id}')">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          ${attemptsCount > 0 ? "Ulangi Latihan" : "Mulai Latihan Sekarang"}
        </button>
      </div>
    </article>
  `;
}

/**
 * Render Roadmap Silabus Soal
 */
function renderTaxonomyGrid() {
  const panels = Object.values(PRACTICE_TAXONOMY);
  return panels.map(panel => `
    <div class="taxonomy-panel-card">
      <div class="tax-panel-header ${panel.id.toLowerCase()}">
        <div>
          <span class="tax-panel-code">${panel.id}</span>
          <h3 class="tax-panel-name">${panel.name}</h3>
        </div>
        <span class="tax-panel-pg">Passing Grade: <strong>${panel.passingGrade}</strong></span>
      </div>

      <div class="tax-panel-body">
        ${panel.groups.map(group => `
          <div class="tax-group-block">
            <h4 class="tax-group-title">${group.title}</h4>
            <div class="tax-subcat-list">
              ${group.subcategories.map(sub => `
                <div class="tax-subcat-item ${sub.isAvailable ? 'available' : 'upcoming'}">
                  <div class="tax-subcat-text">
                    <strong>${sub.title}</strong>
                    <p>${sub.description}</p>
                  </div>
                  <span class="tax-subcat-badge ${sub.isAvailable ? 'available' : 'upcoming'}">${sub.badge}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

/**
 * Render Tabel Riwayat Percobaan
 */
function renderHistoryTable(history) {
  if (!history.length) {
    return `
      <div class="practice-empty-state">
        <div class="empty-icon">📝</div>
        <h3>Belum Ada Riwayat Latihan</h3>
        <p>Anda belum pernah menyelesaikan paket latihan. Klik tombol <strong>Mulai Latihan Sekarang</strong> pada paket di atas untuk memulai latihan perdana Anda.</p>
      </div>
    `;
  }

  return `
    <div class="practice-history-wrapper">
      <div class="practice-table-responsive">
        <table class="practice-history-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Waktu Latihan</th>
              <th>Paket Soal</th>
              <th>Durasi</th>
              <th>Hasil Jawaban</th>
              <th>Skor Akhir</th>
              <th>Status PG</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${history.map((att, idx) => {
              const passClass = att.isPassed ? "tag-pass" : "tag-fail";
              const passText = att.isPassed ? "LULUS PG" : "BELUM LULUS";
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
                    <button type="button" class="btn-table-review" onclick="window.cscpQuiz.viewHistoryAttempt('${att.attemptId}')">
                      Lihat Pembahasan →
                    </button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * =========================================================================
 * 2. TAMPILAN CBT SIMULATOR (UJIAN AKTIF)
 * =========================================================================
 */
function renderExamView() {
  const pkg = state.activePackage;
  const currentQ = pkg.questions[state.currentQuestionIdx];
  const qNum = state.currentQuestionIdx + 1;
  const totalQ = pkg.questions.length;
  const selectedAnswer = state.answers[currentQ.id] || null;
  const isFlagged = Boolean(state.flagged[currentQ.id]);

  // Hitung jumlah terjawab
  const answeredCount = Object.keys(state.answers).length;
  const progressPercent = Math.round((answeredCount / totalQ) * 100);

  // Format Timer Menit : Detik
  const mins = String(Math.floor(state.timerSeconds / 60)).padStart(2, "0");
  const secs = String(state.timerSeconds % 60).padStart(2, "0");
  const timerWarningClass = state.timerSeconds < 300 ? (state.timerSeconds < 60 ? "timer-critical" : "timer-warning") : "";

  return `
    <div class="cbt-exam-wrapper" id="cbtExamRoot">
      <!-- Fixed Sticky CBT Header -->
      <header class="cbt-header-bar">
        <div class="cbt-header-left">
          <span class="cbt-package-badge">${pkg.panel}</span>
          <div class="cbt-header-meta">
            <h2 class="cbt-exam-title">${pkg.title}</h2>
            <span class="cbt-exam-sub">${pkg.subcategoryTitle} · ${totalQ} Soal</span>
          </div>
        </div>

        <div class="cbt-header-center">
          <div class="cbt-timer-box ${timerWarningClass}">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span class="cbt-timer-display" id="cbtTimerDisplay">${mins}:${secs}</span>
          </div>
        </div>

        <div class="cbt-header-right">
          <div class="cbt-progress-indicator">
            <span class="cbt-prog-text">Terjawab: <strong>${answeredCount}/${totalQ}</strong> (${progressPercent}%)</span>
            <div class="cbt-prog-bar"><div class="cbt-prog-fill" style="width: ${progressPercent}%;"></div></div>
          </div>
          <button type="button" class="btn btn-finish-exam" onclick="window.cscpQuiz.promptSubmit()">
            Selesaikan Ujian
          </button>
        </div>
      </header>

      <!-- Main Layout CBT (Soal + Grid Nomor) -->
      <div class="cbt-main-layout">
        <!-- Area Kiri: Soal & Opsi Pilihan Ganda -->
        <main class="cbt-question-area">
          <div class="cbt-question-card">
            <!-- Header Kartu Soal -->
            <div class="cbt-q-header">
              <div class="cbt-q-title-wrap">
                <span class="cbt-q-number-pill">Soal No. ${qNum} dari ${totalQ}</span>
                <span class="cbt-q-type-badge">${pkg.panel} · ${pkg.subcategoryTitle} · <strong>No. Asli #${currentQ.id}</strong></span>
              </div>
              <label class="cbt-flag-toggle ${isFlagged ? 'flagged' : ''}">
                <input type="checkbox" ${isFlagged ? 'checked' : ''} onchange="window.cscpQuiz.toggleFlag(${currentQ.id})">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="${isFlagged ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                <span>${isFlagged ? 'Ditandai Ragu-Ragu' : 'Tandai Ragu-Ragu'}</span>
              </label>
            </div>

            <!-- Teks Pertanyaan -->
            <div class="cbt-q-body">
              <div class="cbt-q-text">${escapeHtml(currentQ.question)}</div>
            </div>

            <!-- Pilihan Jawaban A, B, C, D, E -->
            <div class="cbt-options-list">
              ${Object.entries(currentQ.options).map(([optKey, optVal]) => {
                const isChecked = selectedAnswer === optKey;
                return `
                  <label class="cbt-option-item ${isChecked ? 'selected' : ''}">
                    <input type="radio" name="opt_${currentQ.id}" value="${optKey}" ${isChecked ? 'checked' : ''} onchange="window.cscpQuiz.selectAnswer(${currentQ.id}, '${optKey}')">
                    <span class="cbt-opt-badge">${optKey}</span>
                    <span class="cbt-opt-content">${escapeHtml(optVal)}</span>
                  </label>
                `;
              }).join("")}
            </div>

            <!-- Action Bar Navigasi Bawah -->
            <div class="cbt-q-footer">
              <button type="button" class="btn btn-cbt-nav" ${state.currentQuestionIdx === 0 ? 'disabled' : ''} onclick="window.cscpQuiz.navigateQuestion(${state.currentQuestionIdx - 1})">
                ← Soal Sebelumnya
              </button>

              <div class="cbt-center-actions">
                <button type="button" class="btn-clear-choice ${selectedAnswer ? '' : 'hidden'}" onclick="window.cscpQuiz.clearAnswer(${currentQ.id})">
                  Hapus Pilihan
                </button>
              </div>

              <button type="button" class="btn btn-cbt-nav next" ${state.currentQuestionIdx === totalQ - 1 ? 'disabled' : ''} onclick="window.cscpQuiz.navigateQuestion(${state.currentQuestionIdx + 1})">
                Soal Selanjutnya →
              </button>
            </div>
          </div>
        </main>

        <!-- Area Kanan: Grid Navigasi Nomor Soal CAT -->
        <aside class="cbt-sidebar-nav">
          <div class="cbt-sidebar-card">
            <div class="cbt-sidebar-header">
              <h3 class="cbt-sb-title">Nomor Soal CAT</h3>
              <span class="cbt-sb-count">${answeredCount}/${totalQ}</span>
            </div>

            <div class="cbt-num-grid">
              ${pkg.questions.map((q, idx) => {
                const num = idx + 1;
                const isCurrent = idx === state.currentQuestionIdx;
                const hasAnswer = Boolean(state.answers[q.id]);
                const isRagu = Boolean(state.flagged[q.id]);

                let statusClass = "unanswered";
                if (hasAnswer) statusClass = "answered";
                if (isRagu) statusClass = "flagged";
                if (isCurrent) statusClass += " current";

                return `
                  <button type="button" class="cbt-num-btn ${statusClass}" onclick="window.cscpQuiz.navigateQuestion(${idx})" aria-label="Soal nomor ${num}">
                    ${num}
                  </button>
                `;
              }).join("")}
            </div>

            <!-- Legend Box -->
            <div class="cbt-legend-box">
              <div class="cbt-legend-item"><span class="legend-box answered"></span><span>Sudah dijawab</span></div>
              <div class="cbt-legend-item"><span class="legend-box flagged"></span><span>Ragu-ragu</span></div>
              <div class="cbt-legend-item"><span class="legend-box unanswered"></span><span>Belum dijawab</span></div>
            </div>

            <div class="cbt-sidebar-finish-btn">
              <button type="button" class="btn btn-primary full" onclick="window.cscpQuiz.promptSubmit()">
                Kumpulkan & Nilai Ujian
              </button>
            </div>
          </div>
        </aside>
      </div>

      <!-- Modal Konfirmasi Submit -->
      <div class="cbt-modal-backdrop" id="cbtSubmitModal">
        <div class="cbt-modal-card">
          <div class="cbt-modal-icon">⚠️</div>
          <h3 class="cbt-modal-title">Selesaikan Latihan Soal?</h3>
          <p class="cbt-modal-desc">Pastikan Anda telah memeriksa kembali seluruh jawaban sebelum mengirim.</p>

          <div class="cbt-modal-summary">
            <div class="modal-sum-item">
              <span>Soal Terjawab:</span>
              <strong class="text-green">${answeredCount} Soal</strong>
            </div>
            <div class="modal-sum-item">
              <span>Belum Terjawab:</span>
              <strong class="text-red">${totalQ - answeredCount} Soal</strong>
            </div>
            <div class="modal-sum-item">
              <span>Ditandai Ragu-ragu:</span>
              <strong class="text-amber">${Object.values(state.flagged).filter(Boolean).length} Soal</strong>
            </div>
          </div>

          <div class="cbt-modal-actions">
            <button type="button" class="btn btn-light" onclick="window.cscpQuiz.closeModal()">Lanjut Mengerjakan</button>
            <button type="button" class="btn btn-primary" onclick="window.cscpQuiz.finalizeSubmit()">Ya, Kumpulkan Jawaban</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * =========================================================================
 * 3. TAMPILAN HASIL EVALUASI & PEMBAHASAN LENGKAP
 * =========================================================================
 */
function renderResultView() {
  const result = state.activeAttemptResult;
  const pkg = getPackageById(result.packageId);
  const questions = pkg ? pkg.questions : [];

  const accuracy = Math.round((result.correctCount / result.totalQuestions) * 100);
  const durationMin = Math.floor((result.durationTakenSeconds || 0) / 60);
  const durationSec = (result.durationTakenSeconds || 0) % 60;

  // Filter pembahasan
  let displayedQuestions = questions;
  if (state.reviewFilter === "wrong") {
    displayedQuestions = questions.filter(q => result.answers[q.id] && result.answers[q.id] !== q.correct);
  } else if (state.reviewFilter === "correct") {
    displayedQuestions = questions.filter(q => result.answers[q.id] === q.correct);
  } else if (state.reviewFilter === "unanswered") {
    displayedQuestions = questions.filter(q => !result.answers[q.id]);
  }

  return `
    <div class="feature-page-container practice-result-wrap">
      <!-- Breadcrumb -->
      <div class="feature-breadcrumb">
        <a href="#tryout" class="breadcrumb-back" onclick="window.cscpQuiz.backToLobby(); return false;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Daftar Latihan
        </a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Hasil & Pembahasan</span>
      </div>

      <!-- Hero Skor Akhir -->
      <div class="result-hero-card ${result.isPassed ? 'passed' : 'failed'}">
        <div class="result-hero-top">
          <div class="result-hero-badge ${result.isPassed ? 'passed' : 'failed'}">
            ${result.isPassed ? `
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              MEMENUHI PASSING GRADE ${result.panel}
            ` : `
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              BELUM MEMENUHI PASSING GRADE ${result.panel}
            `}
          </div>
          <span class="result-date-tag">Dikerjakan pada: ${result.formattedDate}</span>
        </div>

        <div class="result-score-main">
          <div class="result-score-number">
            <span class="score-big">${result.score}</span>
            <span class="score-max">/ ${result.maxScore}</span>
          </div>
          <div class="result-score-desc">
            <h2>${result.packageTitle}</h2>
            <p>Ambang Batas Kelulusan (${result.panel}): <strong>${result.passingGrade} Poin</strong>. ${result.isPassed ? "Luar biasa! Skor Anda telah melampaui standar kelulusan CAT BKN." : "Tetap semangat! Evaluasi soal-soal yang keliru di bawah untuk meningkatkan akurasi."}</p>
          </div>
        </div>

        <!-- Metrik Rincian Skor -->
        <div class="result-metrics-grid">
          <div class="res-metric-item">
            <span class="res-m-label">Jawaban Benar</span>
            <strong class="res-m-val text-green">${result.correctCount} <small>Soal</small></strong>
            <span class="res-m-sub">+${result.correctCount * 5} Poin</span>
          </div>
          <div class="res-metric-item">
            <span class="res-m-label">Jawaban Salah</span>
            <strong class="res-m-val text-red">${result.wrongCount} <small>Soal</small></strong>
            <span class="res-m-sub">0 Poin</span>
          </div>
          <div class="res-metric-item">
            <span class="res-m-label">Tidak Dijawab</span>
            <strong class="res-m-val text-muted">${result.unansweredCount} <small>Soal</small></strong>
            <span class="res-m-sub">0 Poin</span>
          </div>
          <div class="res-metric-item">
            <span class="res-m-label">Waktu Pengerjaan</span>
            <strong class="res-m-val">${durationMin}m ${durationSec}s</strong>
            <span class="res-m-sub">dari 45 Menit</span>
          </div>
          <div class="res-metric-item">
            <span class="res-m-label">Tingkat Akurasi</span>
            <strong class="res-m-val text-navy">${accuracy}%</strong>
            <span class="res-m-sub">Ketepatan Jawaban</span>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="result-hero-actions">
          <button type="button" class="btn btn-primary" onclick="window.cscpQuiz.startPackage('${result.packageId}')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Ulangi Latihan (Retake Test)
          </button>
          <button type="button" class="btn btn-outline" onclick="window.cscpQuiz.backToLobby()">
            ← Kembali ke Menu Latihan
          </button>
        </div>
      </div>

      <!-- Bagian Pembahasan Soal Lengkap -->
      <section class="result-review-section">
        <div class="review-header-bar">
          <div>
            <h3 class="review-title">Pembahasan Soal Lengkap (50 Butir)</h3>
            <p class="review-sub">Pelajari rumus pola, analisis larik, dan trik pengerjaan cepat untuk setiap butir soal.</p>
          </div>

          <!-- Filter Review Buttons -->
          <div class="review-filters">
            <button type="button" class="btn-rev-filter ${state.reviewFilter === 'all' ? 'active' : ''}" onclick="window.cscpQuiz.setReviewFilter('all')">
              Semua (${questions.length})
            </button>
            <button type="button" class="btn-rev-filter ${state.reviewFilter === 'wrong' ? 'active' : ''}" onclick="window.cscpQuiz.setReviewFilter('wrong')">
              Salah Saja (${result.wrongCount})
            </button>
            <button type="button" class="btn-rev-filter ${state.reviewFilter === 'correct' ? 'active' : ''}" onclick="window.cscpQuiz.setReviewFilter('correct')">
              Benar (${result.correctCount})
            </button>
            <button type="button" class="btn-rev-filter ${state.reviewFilter === 'unanswered' ? 'active' : ''}" onclick="window.cscpQuiz.setReviewFilter('unanswered')">
              Kosong (${result.unansweredCount})
            </button>
          </div>
        </div>

        <!-- Daftar Kartu Pembahasan Soal -->
        <div class="review-questions-list">
          ${displayedQuestions.map((q, idx) => {
            const userAns = result.answers[q.id] || null;
            const isCorrect = userAns === q.correct;
            const isUnanswered = !userAns;

            let cardStatusClass = "review-correct";
            let statusPill = `<span class="rev-badge-status correct">✓ Jawaban Anda Benar</span>`;

            if (isUnanswered) {
              cardStatusClass = "review-unanswered";
              statusPill = `<span class="rev-badge-status unanswered">○ Tidak Dijawab</span>`;
            } else if (!isCorrect) {
              cardStatusClass = "review-wrong";
              statusPill = `<span class="rev-badge-status wrong">✗ Jawaban Anda Keliru</span>`;
            }

            return `
              <article class="review-item-card ${cardStatusClass}" id="qReview_${q.id}">
                <div class="review-card-head">
                  <div class="rev-num-title">
                    <span class="rev-q-num">Soal #${idx + 1} <small style="opacity: 0.85;">(Asli #${q.id})</small></span>
                    <span class="rev-q-key">Kunci: <strong>${q.correct}</strong></span>
                  </div>
                  ${statusPill}
                </div>

                <div class="review-q-content">
                  <p class="rev-q-text">${escapeHtml(q.question)}</p>
                </div>

                <!-- Opsi Jawaban dengan Penanda -->
                <div class="review-options-grid">
                  ${Object.entries(q.options).map(([optKey, optVal]) => {
                    const isKey = optKey === q.correct;
                    const isUserPick = optKey === userAns;
                    let optClass = "";
                    if (isKey) optClass = "is-correct-answer";
                    if (isUserPick && !isKey) optClass = "is-wrong-pick";

                    return `
                      <div class="rev-opt-row ${optClass}">
                        <span class="rev-opt-key">${optKey}</span>
                        <span class="rev-opt-val">${escapeHtml(optVal)}</span>
                        ${isKey ? '<span class="rev-opt-marker correct">✓ Kunci Jawaban</span>' : ''}
                        ${isUserPick && !isKey ? '<span class="rev-opt-marker wrong">Pilihan Anda</span>' : ''}
                      </div>
                    `;
                  }).join("")}
                </div>

                <!-- Kotak Penjelasan Pembahasan Mendalam -->
                <div class="review-explanation-box">
                  <div class="exp-box-title">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    <strong>Pembahasan & Trik Pola:</strong>
                  </div>
                  <div class="exp-box-body">
                    ${escapeHtml(q.explanation).replace(/\n/g, "<br>")}
                  </div>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    </div>
  `;
}

/**
 * =========================================================================
 * 4. LOGIKA ENGINE CBT & EVENT HANDLERS
 * =========================================================================
 */
function initQuizEngine() {
  window.cscpQuiz = {
    setPanelFilter(panel) {
      state.activeFilter = panel;
      refreshUI();
    },

    setReviewFilter(filterType) {
      state.reviewFilter = filterType;
      refreshUI();
    },

    startPackage(packageId) {
      const pkg = getPackageById(packageId);
      if (!pkg) {
        alert("Paket soal tidak ditemukan.");
        return;
      }

      // Reset exam state
      state.activePackage = pkg;
      state.currentQuestionIdx = 0;
      state.answers = {};
      state.flagged = {};
      state.timerSeconds = pkg.durationSeconds || 45 * 60;
      state.startTime = Date.now();
      state.view = "exam";

      // Clear any previous timer
      if (state.timerInterval) clearInterval(state.timerInterval);

      // Start Countdown Timer
      state.timerInterval = setInterval(() => {
        state.timerSeconds--;
        const display = document.getElementById("cbtTimerDisplay");
        if (display) {
          const mins = String(Math.floor(state.timerSeconds / 60)).padStart(2, "0");
          const secs = String(state.timerSeconds % 60).padStart(2, "0");
          display.textContent = `${mins}:${secs}`;

          const box = display.closest(".cbt-timer-box");
          if (box) {
            if (state.timerSeconds < 60) {
              box.className = "cbt-timer-box timer-critical";
            } else if (state.timerSeconds < 300) {
              box.className = "cbt-timer-box timer-warning";
            }
          }
        }

        // Jika waktu habis, otomatis submit ujian!
        if (state.timerSeconds <= 0) {
          clearInterval(state.timerInterval);
          alert("Waktu pengerjaan telah habis! Jawaban Anda akan otomatis dikumpulkan dan dinilai.");
          window.cscpQuiz.finalizeSubmit();
        }
      }, 1000);

      refreshUI();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    selectAnswer(questionId, optionKey) {
      state.answers[questionId] = optionKey;
      refreshUI();
    },

    clearAnswer(questionId) {
      delete state.answers[questionId];
      refreshUI();
    },

    toggleFlag(questionId) {
      state.flagged[questionId] = !state.flagged[questionId];
      refreshUI();
    },

    navigateQuestion(targetIdx) {
      if (!state.activePackage) return;
      if (targetIdx >= 0 && targetIdx < state.activePackage.questions.length) {
        state.currentQuestionIdx = targetIdx;
        refreshUI();
      }
    },

    promptSubmit() {
      const modal = document.getElementById("cbtSubmitModal");
      if (modal) modal.classList.add("show");
    },

    closeModal() {
      const modal = document.getElementById("cbtSubmitModal");
      if (modal) modal.classList.remove("show");
    },

    finalizeSubmit() {
      if (state.timerInterval) clearInterval(state.timerInterval);
      window.cscpQuiz.closeModal();

      const pkg = state.activePackage;
      const durationTakenSeconds = Math.round((Date.now() - (state.startTime || Date.now())) / 1000);

      // Hitung hasil penilaian
      let correctCount = 0;
      let wrongCount = 0;
      let unansweredCount = 0;

      pkg.questions.forEach(q => {
        const userChoice = state.answers[q.id];
        if (!userChoice) {
          unansweredCount++;
        } else if (userChoice === q.correct) {
          correctCount++;
        } else {
          wrongCount++;
        }
      });

      const score = correctCount * (pkg.scorePerCorrect || 5);
      const isPassed = score >= (pkg.passingGrade || 80);
      const userId = getUserId(state.userData);

      const attemptRecord = {
        packageId: pkg.id,
        packageTitle: pkg.title,
        panel: pkg.panel,
        subCategory: pkg.subcategoryTitle,
        durationTakenSeconds: Math.min(durationTakenSeconds, pkg.durationSeconds),
        totalQuestions: pkg.totalQuestions,
        correctCount,
        wrongCount,
        unansweredCount,
        score,
        maxScore: pkg.maxScore || 250,
        passingGrade: pkg.passingGrade || 80,
        isPassed,
        answers: { ...state.answers },
        flagged: { ...state.flagged }
      };

      // Simpan ke riwayat penyimpanan lokal
      const saved = saveUserAttempt(userId, attemptRecord);

      state.activeAttemptResult = saved || attemptRecord;
      state.view = "result";
      state.reviewFilter = "all";

      refreshUI();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    viewHistoryAttempt(attemptId) {
      const userId = getUserId(state.userData);
      const history = getUserHistory(userId);
      const found = history.find(h => h.attemptId === attemptId);
      if (found) {
        state.activeAttemptResult = found;
        state.view = "result";
        state.reviewFilter = "all";
        refreshUI();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    backToLobby() {
      if (state.timerInterval) clearInterval(state.timerInterval);
      state.view = "lobby";
      state.activePackage = null;
      state.activeAttemptResult = null;
      refreshUI();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
}

/**
 * Re-render kanvas konten tanpa reload halaman penuh
 */
function refreshUI() {
  const mainContent = document.getElementById("mainContent");
  if (mainContent) {
    mainContent.innerHTML = renderTryoutPage(state.userData);
  }
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
