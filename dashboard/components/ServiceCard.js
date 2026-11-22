/**
 * ServiceCard Component
 * Reusable component untuk 6 kartu fitur layanan CSCP
 */

export const SERVICE_CARDS_DATA = [
  {
    id: "tryout",
    title: "MINI TRY OUT CASN",
    description: "Latihan TWK, TIU, dan TKP untuk mengukur kesiapan.",
    tag: "3 Kategori Soal",
    route: "/dashboard/tryout",
    hash: "#tryout",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      <path d="M9 14l2 2 4-4"></path>
    </svg>`
  },
  {
    id: "rekomendasi-belajar",
    title: "REKOMENDASI BELAJAR",
    description: "Arah belajar berdasarkan kebutuhan dan hasil latihan.",
    tag: "Terarah",
    route: "/dashboard/rekomendasi-belajar",
    hash: "#rekomendasi-belajar",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>`
  },
  {
    id: "persiapan-berkas",
    title: "PERSIAPAN BERKAS",
    description: "Checklist dokumen untuk membantu persiapan administrasi.",
    tag: "Administrasi",
    route: "/dashboard/persiapan-berkas",
    hash: "#persiapan-berkas",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`
  },
  {
    id: "tips-strategi",
    title: "TIPS DAN STRATEGI",
    description: "Materi dan strategi belajar yang praktis.",
    tag: "Materi Praktis",
    route: "/dashboard/tips-strategi",
    hash: "#tips-strategi",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>`
  },
  {
    id: "kelas-zoom",
    title: "KELAS ZOOM INTERAKTIF",
    description: "Informasi jadwal dan pendampingan kelas daring.",
    tag: "Kelas Daring",
    route: "/dashboard/kelas-zoom",
    hash: "#kelas-zoom",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>`
  },
  {
    id: "monitoring",
    title: "MONITORING BELAJAR",
    description: "Pantau riwayat latihan dan perkembangan persiapan.",
    tag: "Statistik Belajar",
    route: "/dashboard/monitoring",
    hash: "#monitoring",
    icon: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>`
  }
];

export function renderServiceCard(card) {
  return `
    <article class="service-card-item" data-route="${card.route}" data-hash="${card.hash}" tabindex="0" role="button" aria-label="Buka layanan ${card.title}">
      <div class="card-top">
        <div class="card-icon-wrap" aria-hidden="true">
          ${card.icon}
        </div>
        <span class="card-tag">${card.tag}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${card.title}</h3>
        <p class="card-desc">${card.description}</p>
      </div>
      <div class="card-footer">
        <span class="card-action">Akses Layanan <span class="action-arrow">→</span></span>
      </div>
    </article>
  `;
}
