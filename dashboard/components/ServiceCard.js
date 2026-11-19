/**
 * ServiceCard Component - CSCP Dashboard Peserta
 * 6 Kartu Layanan Interaktif dengan Desain Premium Modern
 */

export const SERVICE_CARDS_DATA = [
  {
    id: "tryout",
    title: "MINI TRY OUT CASN",
    description: "Latihan TWK, TIU, dan TKP untuk mengukur kesiapan dan kecepatan menjawab soal.",
    tag: "Simulasi CAT",
    tagType: "blue",
    route: "/dashboard/tryout",
    hash: "#tryout",
    metaInfo: "Bank Soal & Timer",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      <path d="M9 14l2 2 4-4"></path>
    </svg>`
  },
  {
    id: "rekomendasi-belajar",
    title: "REKOMENDASI BELAJAR",
    description: "Arah belajar berdasarkan kebutuhan dan hasil latihan untuk fokus pada sub-materi terlemah.",
    tag: "Terarah & Personal",
    tagType: "purple",
    route: "/dashboard/rekomendasi-belajar",
    hash: "#rekomendasi-belajar",
    metaInfo: "Kurikulum SKD",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>`
  },
  {
    id: "persiapan-berkas",
    title: "PERSIAPAN BERKAS",
    description: "Checklist dokumen untuk membantu persiapan administrasi agar lolos verifikasi berkas instansi.",
    tag: "Administrasi",
    tagType: "green",
    route: "/dashboard/persiapan-berkas",
    hash: "#persiapan-berkas",
    metaInfo: "Format & Dokumen",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`
  },
  {
    id: "tips-strategi",
    title: "TIPS DAN STRATEGI",
    description: "Materi dan strategi belajar yang praktis, trik hitung cepat TIU, serta penalaran TWK dan TKP.",
    tag: "Taktik Ujian",
    tagType: "amber",
    route: "/dashboard/tips-strategi",
    hash: "#tips-strategi",
    metaInfo: "Rangkuman Materi",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>`
  },
  {
    id: "kelas-zoom",
    title: "KELAS ZOOM INTERAKTIF",
    description: "Informasi jadwal dan pendampingan kelas daring langsung bersama tutor ahli Al Bisyru.",
    tag: "Tatap Muka Daring",
    tagType: "blue",
    route: "/dashboard/kelas-zoom",
    hash: "#kelas-zoom",
    metaInfo: "Jadwal & Rekaman",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>`
  },
  {
    id: "monitoring",
    title: "MONITORING BELAJAR",
    description: "Pantau riwayat latihan, grafik perkembangan skor, dan kesiapan sebelum hari ujian sebenarnya.",
    tag: "Analitik Skor",
    tagType: "teal",
    route: "/dashboard/monitoring",
    hash: "#monitoring",
    metaInfo: "Riwayat & Tren",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>`
  }
];

export function renderServiceCard(card) {
  return `
    <article class="service-card-item tag-${card.tagType}" data-route="${card.route}" data-hash="${card.hash}" tabindex="0" role="button" aria-label="Buka layanan ${card.title}">
      <div class="card-glow-layer"></div>
      
      <div class="card-top-bar">
        <div class="card-icon-container" aria-hidden="true">
          ${card.icon}
        </div>
        <div class="card-badges-wrap">
          <span class="card-tag-pill">${card.tag}</span>
        </div>
      </div>

      <div class="card-content-body">
        <span class="card-sub-category">${card.metaInfo}</span>
        <h3 class="card-title-text">${card.title}</h3>
        <p class="card-desc-text">${card.description}</p>
      </div>

      <div class="card-footer-action">
        <span class="card-btn-link">
          <span>Akses Layanan</span>
          <svg class="action-arrow-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </article>
  `;
}
