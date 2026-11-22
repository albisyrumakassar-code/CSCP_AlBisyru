/**
 * ServiceGrid Component
 * Menampilkan grid 6 kartu layanan CSCP
 */
import { SERVICE_CARDS_DATA, renderServiceCard } from "./ServiceCard.js";

export function renderServiceGrid() {
  const cardsHtml = SERVICE_CARDS_DATA.map(renderServiceCard).join("");
  return `
    <section class="services-section">
      <div class="section-header-wrap">
        <span class="section-kicker">FITUR LAYANAN</span>
        <h2 class="section-headline">Bekal Persiapan dalam Satu Platform.</h2>
        <p class="section-subheadline">
          Semua kebutuhan persiapan CASN tersedia dalam satu tempat untuk membantu perjalanan belajarmu lebih terarah.
        </p>
      </div>
      <div class="services-grid" id="servicesGrid">
        ${cardsHtml}
      </div>
    </section>
  `;
}
