/**
 * CSCP Dashboard Peserta - Main Controller & Router
 * Arsitektur Modular & Integrasi Supabase Authentication
 */

import { checkAuth } from "./components/ProtectedRoute.js";
import { renderDashboardHeader } from "./components/Header.js";
import { renderWelcomeSection } from "./components/WelcomeSection.js";
import { renderServiceGrid } from "./components/ServiceGrid.js";

import { renderTryoutPage } from "./pages/tryout.js";
import { renderRekomendasiPage } from "./pages/rekomendasi.js";
import { renderBerkasPage } from "./pages/berkas.js";
import { renderTipsPage } from "./pages/tips.js";
import { renderZoomPage } from "./pages/zoom.js";
import { renderMonitoringPage } from "./pages/monitoring.js";
import { renderProfilePage } from "./pages/profile.js";

const SUPABASE_URL = "https://qiphmdconfqukguhkicz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dMVjE0iV80805TY-JlbH_Q_A_R5oLLs";

let supabaseClient = null;
let currentUserData = null;

function getSupabase() {
  if (supabaseClient) return supabaseClient;
  if (window.supabase && typeof window.supabase.createClient === "function") {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return supabaseClient;
  }
  return null;
}

// Map rute ke fungsi render halaman
const ROUTES = {
  "overview": (data) => renderWelcomeSection(data) + renderServiceGrid(),
  "tryout": renderTryoutPage,
  "rekomendasi-belajar": renderRekomendasiPage,
  "persiapan-berkas": renderBerkasPage,
  "tips-strategi": renderTipsPage,
  "kelas-zoom": renderZoomPage,
  "monitoring": renderMonitoringPage,
  "profil": renderProfilePage
};

function getActiveRoute() {
  // 1. Cek parameter query atau hash
  const hash = window.location.hash.replace(/^#\/?/, "").trim();
  if (hash && ROUTES[hash]) return hash;

  // 2. Cek path URL (misal /dashboard/tryout)
  const path = window.location.pathname.toLowerCase();
  for (const key of Object.keys(ROUTES)) {
    if (path.includes(`/dashboard/${key}`) || path.endsWith(`/${key}`)) {
      return key;
    }
  }

  return "overview";
}

function renderApp(route = "overview") {
  const headerContainer = document.getElementById("headerContainer");
  const mainContent = document.getElementById("mainContent");

  if (!currentUserData) return;

  // 1. Render Header
  if (headerContainer) {
    headerContainer.innerHTML = renderDashboardHeader(currentUserData, route);
    attachHeaderEvents();
  }

  // 2. Render Body Content
  const renderFn = ROUTES[route] || ROUTES["overview"];
  if (mainContent) {
    mainContent.innerHTML = renderFn(currentUserData);
    window.scrollTo({ top: 0, behavior: "smooth" });
    attachCardEvents();
  }
}

function attachHeaderEvents() {
  const menuToggle = document.getElementById("dashMenuToggle");
  const nav = document.getElementById("dashNav");
  const logoutBtn = document.getElementById("dashLogoutBtn");

  if (menuToggle && nav) {
    menuToggle.onclick = () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = handleLogout;
  }
}

function attachCardEvents() {
  document.querySelectorAll(".service-card-item").forEach((card) => {
    card.onclick = () => {
      const hash = card.getAttribute("data-hash") || "#overview";
      window.location.hash = hash;
    };
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const hash = card.getAttribute("data-hash") || "#overview";
        window.location.hash = hash;
      }
    };
  });
}

function redirectToLanding(params = "logout=1") {
  const isInsideSubdir = window.location.pathname.includes("/dashboard");
  const target = isInsideSubdir ? "../index.html" : "index.html";
  window.location.replace(params ? `${target}?${params}` : target);
}

async function handleLogout() {
  const client = getSupabase();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (err) {
      console.warn("Logout notice:", err);
    }
  }
  redirectToLanding("logout=1");
}

async function initDashboard() {
  const loadingScreen = document.getElementById("dashLoadingScreen");

  // Tunggu Supabase termuat dari CDN jika ada jeda
  let client = getSupabase();
  if (!client) {
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 200));
      client = getSupabase();
      if (client) break;
    }
  }

  // Proteksi Route: Validasi session
  const authResult = await checkAuth(client);
  if (!authResult) {
    // checkAuth otomatis me-redirect ke index.html
    return;
  }

  currentUserData = authResult;

  // Sembunyikan loading screen
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 250);
  }

  // Render halaman sesuai rute saat ini
  const initialRoute = getActiveRoute();
  renderApp(initialRoute);

  // Dengarkan perubahan hash navigasi
  window.addEventListener("hashchange", () => {
    const currentRoute = getActiveRoute();
    renderApp(currentRoute);
  });

  // Dengarkan auth state jika session habis di tab lain
  if (client) {
    client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        redirectToLanding("logout=1");
      }
    });
  }
}

// Inisialisasi saat DOM siap
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboard);
} else {
  initDashboard();
}
