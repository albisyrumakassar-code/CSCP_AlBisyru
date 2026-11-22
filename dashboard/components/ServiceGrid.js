/**
 * ServiceGrid Component - CSCP Dashboard Peserta
 * Grid 6 Kartu Layanan Interaktif CSCP
 */
import { SERVICE_CARDS_DATA, renderServiceCard } from "./ServiceCard.js";

export function renderServiceGrid() {
  const cardsHtml = SERVICE_CARDS_DATA.map(renderServiceCard).join("");
  return `
    <section class="services-main-section" aria-label="Katalog Fitur Layanan">
      <div class="section-title-wrap">
        <div class="section-title-left">
          <span class="section-kicker-badge">FITUR LAYANAN UTAMA</span>
          <h2 class="section-main-heading">Bekal Persiapan dalam Satu Platform.</h2>
          <p class="section-sub-heading">
            Semua kebutuhan persiapan CASN tersedia dalam satu tempat untuk membantu perjalanan belajarmu lebih terarah dan terukur.
          </p>
        </div>
        <div class="section-title-right">
          <span class="badge-services-count">6 Layanan Tersedia</span>
        </div>
      </div>

      <div class="services-cards-grid" id="servicesGrid">
        ${cardsHtml}
      </div>
    </section>
  `;
}
