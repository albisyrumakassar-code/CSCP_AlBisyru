/**
 * CSCP Dashboard Peserta - Main Controller & Router
 * Arsitektur Modular Premium dengan Sidebar Navigation & Live State
 */

import { checkAuth } from "./components/ProtectedRoute.js";
import { renderSidebar } from "./components/Sidebar.js";
import { renderTopBar } from "./components/TopBar.js";
import { renderWelcomeSection } from "./components/WelcomeSection.js";
import { renderStatsCards } from "./components/StatsCards.js";
import { renderProgressOverview } from "./components/ProgressOverview.js";
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

// Router map
const ROUTES = {
  "overview": (data) => `
    <div class="dash-overview-canvas">
      ${renderWelcomeSection(data)}
      ${renderStatsCards(data)}
      ${renderProgressOverview(data)}
      ${renderServiceGrid()}
    </div>
  `,
  "tryout": renderTryoutPage,
  "rekomendasi-belajar": renderRekomendasiPage,
  "persiapan-berkas": renderBerkasPage,
  "tips-strategi": renderTipsPage,
  "kelas-zoom": renderZoomPage,
  "monitoring": renderMonitoringPage,
  "profil": renderProfilePage
};

function getActiveRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "").trim();
  if (hash && ROUTES[hash]) return hash;

  const path = window.location.pathname.toLowerCase();
  for (const key of Object.keys(ROUTES)) {
    if (path.includes(`/dashboard/${key}`) || path.endsWith(`/${key}`)) {
      return key;
    }
  }

  return "overview";
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

function renderApp(route = "overview") {
  const sidebarContainer = document.getElementById("sidebarContainer");
  const topbarContainer = document.getElementById("topbarContainer");
  const mainContent = document.getElementById("mainContent");

  if (!currentUserData) return;

  // 1. Render Sidebar
  if (sidebarContainer) {
    sidebarContainer.innerHTML = renderSidebar(currentUserData, route);
  }

  // 2. Render TopBar
  if (topbarContainer) {
    topbarContainer.innerHTML = renderTopBar(currentUserData, route);
  }

  // 3. Render Canvas
  const renderFn = ROUTES[route] || ROUTES["overview"];
  if (mainContent) {
    mainContent.innerHTML = renderFn(currentUserData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 4. Attach Events
  attachEvents();
}

function attachEvents() {
  // Mobile Sidebar Toggle
  const sidebar = document.getElementById("dashSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const openBtn = document.getElementById("topbarMenuToggle");
  const closeBtn = document.getElementById("sidebarCloseBtn");
  const logoutBtn = document.getElementById("sidebarLogoutBtn");

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("show");
  };

  const openSidebar = () => {
    if (sidebar) sidebar.classList.add("open");
    if (overlay) overlay.classList.add("show");
  };

  if (openBtn) openBtn.onclick = openSidebar;
  if (closeBtn) closeBtn.onclick = closeSidebar;
  if (overlay) overlay.onclick = closeSidebar;

  // Logout
  if (logoutBtn) logoutBtn.onclick = handleLogout;

  // Service Cards Clicks
  document.querySelectorAll(".service-card-item").forEach((card) => {
    card.onclick = () => {
      const hash = card.getAttribute("data-hash") || "#overview";
      window.location.hash = hash;
      closeSidebar();
    };
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const hash = card.getAttribute("data-hash") || "#overview";
        window.location.hash = hash;
        closeSidebar();
      }
    };
  });

  // Nav menu items click
  document.querySelectorAll(".nav-menu-item").forEach((link) => {
    link.onclick = () => {
      closeSidebar();
    };
  });
}

async function initDashboard() {
  const loadingScreen = document.getElementById("dashLoadingScreen");

  let client = getSupabase();
  if (!client) {
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 200));
      client = getSupabase();
      if (client) break;
    }
  }

  // Proteksi Route
  const authResult = await checkAuth(client);
  if (!authResult) {
    return;
  }

  currentUserData = authResult;

  // Sembunyikan loading screen
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 280);
  }

  // Render awal
  const initialRoute = getActiveRoute();
  renderApp(initialRoute);

  // Router listener
  window.addEventListener("hashchange", () => {
    const currentRoute = getActiveRoute();
    renderApp(currentRoute);
  });

  // Realtime Auth State
  if (client) {
    client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        redirectToLanding("logout=1");
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboard);
} else {
  initDashboard();
}
