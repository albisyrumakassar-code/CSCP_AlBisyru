/**
 * ProgressOverview Component - CSCP Dashboard Peserta
 * Menampilkan Indikator Kesiapan Materi SKD & Checklist Tahapan Persiapan
 */

export function renderProgressOverview(userData) {
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
            Kuasai ketiga pilar materi ujian Seleksi Kompetensi Dasar untuk mengamankan posisi perangkingan formasi.
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
                <span class="bar-score">Ambang Batas: <strong>80</strong> / 175</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill tiu-fill" style="width: 45%;"></div>
              </div>
              <div class="bar-footer">
                <small>35 Soal · Penalaran Verbal, Numerik, Deret, Figural</small>
                <span class="bar-status-text">Siap Evaluasi</span>
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
                <small>45 Soal · Pelayanan Publik, Jejaring Kerja, Sosial Budaya, Anti Radikalisme</small>
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
              <h2 class="card-heading">Tahapan Persiapan Berkas</h2>
            </div>
            <a href="#persiapan-berkas" class="card-link-action">Lihat Semua →</a>
          </div>
          <p class="card-subtext">
            Pastikan setiap dokumen administrasi disiapkan dengan ukuran dan format yang sesuai ketentuan instansi.
          </p>

          <ul class="milestone-steps-list">
            <li class="milestone-step done">
              <div class="step-marker">✓</div>
              <div class="step-content">
                <strong>Akun Belajar CSCP Aktif</strong>
                <span>Profil dan data formasi Anda telah tersimpan di sistem Al Bisyru.</span>
              </div>
            </li>
            <li class="milestone-step active">
              <div class="step-marker">2</div>
              <div class="step-content">
                <strong>Verifikasi Ijazah & Transkrip Nilai</strong>
                <span>Pastikan hasil scan dokumen asli berformat PDF berukuran maksimal 500-1000 KB.</span>
              </div>
            </li>
            <li class="milestone-step">
              <div class="step-marker">3</div>
              <div class="step-content">
                <strong>Surat Pernyataan & Surat Lamaran</strong>
                <span>Gunakan format resmi instansi tujuan dan bubuhkan e-Meterai resmi Peruri.</span>
              </div>
            </li>
            <li class="milestone-step">
              <div class="step-marker">4</div>
              <div class="step-content">
                <strong>Pas Foto Latar Belakang Merah</strong>
                <span>Format JPEG/JPG berdimensi tajam dengan ukuran maksimal 200-300 KB.</span>
              </div>
            </li>
          </ul>

          <div class="checklist-action-box">
            <a href="#persiapan-berkas" class="btn-open-checklist">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span>Kelola Checklist Berkas Administrasi</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
