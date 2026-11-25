/* CSCP frontend (Landing Page). */
const SUPABASE_URL = "https://qiphmdconfqukguhkicz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dMVjE0iV80805TY-JlbH_Q_A_R5oLLs";

function getDb() {
  if (window._supabaseClient) return window._supabaseClient;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const lib = window.supabase;
  if (lib && typeof lib.createClient === "function") {
    try {
      window._supabaseClient = lib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return window._supabaseClient;
    } catch (e) {
      console.error("Gagal inisialisasi Supabase client:", e);
    }
  }
  return null;
}

const db = new Proxy({}, {
  get(_target, prop) {
    const client = getDb();
    if (!client) return undefined;
    const value = client[prop];
    return typeof value === "function" ? value.bind(client) : value;
  }
});

const $ = (selector) => document.querySelector(selector);
const dialog = $("#authDialog");
const toast = (message) => {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  window.setTimeout(() => el.classList.remove("show"), 3200);
};
const showMessage = (message) => {
  const el = $("#authMessage");
  if (el) el.textContent = message;
};
const openAuth = (view) => {
  $("#loginView").hidden = view !== "login";
  $("#registerView").hidden = view !== "register";
  showMessage("");
  if (!dialog.open) dialog.showModal();
};

document.querySelectorAll("[data-open]").forEach(btn => btn.addEventListener("click", () => openAuth(btn.dataset.open)));
document.querySelectorAll("[data-switch]").forEach(btn => btn.addEventListener("click", () => openAuth(btn.dataset.switch)));
$("#closeDialog").addEventListener("click", () => dialog.close());
$("#menuToggle").addEventListener("click", () => {
  const nav = $("#mainNav");
  const isOpen = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
});
$("#mainNav").querySelectorAll("a").forEach(a => a.addEventListener("click", () => $("#mainNav").classList.remove("open")));
$("#year").textContent = new Date().getFullYear();

// Opsi lihat / sembunyikan password
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const wrap = btn.closest(".password-wrap");
    if (!wrap) return;
    const input = wrap.querySelector("input");
    const eyeIcon = btn.querySelector(".eye-icon");
    const eyeOffIcon = btn.querySelector(".eye-off-icon");
    
    if (input.type === "password") {
      input.type = "text";
      if (eyeIcon) eyeIcon.style.display = "none";
      if (eyeOffIcon) eyeOffIcon.style.display = "block";
      btn.setAttribute("aria-label", "Sembunyikan password");
      btn.setAttribute("title", "Sembunyikan password");
    } else {
      input.type = "password";
      if (eyeIcon) eyeIcon.style.display = "block";
      if (eyeOffIcon) eyeOffIcon.style.display = "none";
      btn.setAttribute("aria-label", "Lihat password");
      btn.setAttribute("title", "Lihat password");
    }
  });
});

function normalizePhone(value) {
  let phone = value.replace(/[^\d+]/g, "");
  if (phone.startsWith("0")) phone = "+62" + phone.slice(1);
  if (phone.startsWith("62")) phone = "+" + phone;
  return phone;
}

function requireSupabase() {
  const client = getDb();
  if (!client) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase belum dikonfigurasi. Isi SUPABASE_URL dan SUPABASE_ANON_KEY di script.js terlebih dahulu.");
    }
    if (!window.supabase) {
      throw new Error("Library Supabase belum selesai dimuat. Pastikan koneksi internet aktif, lalu refresh halaman (Ctrl + F5).");
    }
    throw new Error("Gagal menghubungkan ke Supabase. Periksa konsol browser untuk detail.");
  }
  return client;
}

function friendlyError(error) {
  const msg = error?.message || "Terjadi kesalahan. Silakan coba kembali.";
  if (window.location.protocol === "file:" && (/failed to fetch/i.test(msg) || /network/i.test(msg) || /fetch/i.test(msg))) {
    return "Browser memblokir koneksi database karena dibuka via file://. Klik ganda file 'jalankan_server.bat' di folder proyek untuk membukanya secara benar.";
  }
  if (/email rate limit/i.test(msg)) {
    return "Batas pengiriman email Supabase tercapai. Buka dashboard Supabase > Authentication > Providers > Email, lalu MATIKAN (uncheck) opsi 'Confirm email' dan klik Save agar pendaftaran langsung aktif tanpa kirim email.";
  }
  if (/invalid login credentials/i.test(msg)) return "Email/Nomor WhatsApp atau password tidak sesuai.";
  if (/already registered/i.test(msg) || /user already exists/i.test(msg)) return "Email atau nomor WhatsApp tersebut sudah terdaftar. Silakan login.";
  if (/Email not confirmed/i.test(msg)) return "Email belum dikonfirmasi. Pastikan opsi 'Confirm email' dimatikan di pengaturan Supabase agar langsung aktif.";
  if (/security purposes.*after (\d+) seconds/i.test(msg)) {
    const detik = msg.match(/after (\d+) seconds/i)?.[1] || "60";
    return `Demi keamanan, harap tunggu ${detik} detik sebelum mencoba lagi.`;
  }
  return msg;
}

// Handler Registrasi Peserta
$("#registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    requireSupabase();
    const form = new FormData(event.currentTarget);
    const phone = normalizePhone(String(form.get("phone") || ""));
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      throw new Error("Format nomor WhatsApp tidak valid. Gunakan format seperti 08123456789 atau +6281234567890.");
    }
    
    const inputEmail = String(form.get("email") || "").trim().toLowerCase();
    const cleanDigits = phone.replace(/[^\d]/g, "");
    // Jika email diisi gunakan email tersebut; jika tidak, gunakan format virtual berbasis nomor HP
    const authEmail = inputEmail || `wa_${cleanDigits}@peserta.cscp.id`;
    
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirm_password") || "");

    if (!password || password.length < 8) {
      throw new Error("Password minimal 8 karakter.");
    }
    if (password !== confirmPassword) {
      throw new Error("Konfirmasi password tidak cocok. Pastikan kedua kolom password diisi sama persis.");
    }

    const metadata = {
      full_name: String(form.get("full_name")).trim(),
      phone: phone,
      birth_place: String(form.get("birth_place") || "").trim(),
      birth_date: form.get("birth_date") || null,
      domicile: String(form.get("domicile") || "").trim(),
      education_level: String(form.get("education_level") || ""),
      major: String(form.get("major") || "").trim(),
      target_formation: String(form.get("target_formation") || "").trim(),
      privacy_consent: true
    };

    const { data, error } = await db.auth.signUp({
      email: authEmail,
      password: password,
      options: { data: metadata }
    });
    if (error) throw error;

    if (data.user) {
      try {
        await db.from("profiles").upsert({
          id: data.user.id,
          ...metadata,
          email: inputEmail || null
        });
      } catch (profileError) {
        console.warn("Penyimpanan profil tambahan:", profileError);
      }
    }

    event.currentTarget.reset();

    // Jika Supabase langsung memberikan session (confirm email mati):
    if (data.session) {
      toast("Pendaftaran berhasil! Mengarahkan ke Dashboard...");
      showMessage("Pendaftaran berhasil! Mengarahkan ke Dashboard Peserta...");
      window.setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1200);
    } else {
      toast("Pendaftaran berhasil! Silakan login.");
      showMessage("Pendaftaran berhasil! Silakan login menggunakan Email atau Nomor WhatsApp Anda.");
      window.setTimeout(() => openAuth("login"), 1800);
    }
  } catch (error) {
    showMessage(friendlyError(error));
  }
});

// Handler Login Peserta
$("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    requireSupabase();
    const form = new FormData(event.currentTarget);
    const identifier = String(form.get("identifier") || "").trim();
    const password = String(form.get("password") || "");

    if (!identifier) throw new Error("Masukkan email atau nomor WhatsApp.");
    if (!password) throw new Error("Masukkan password.");

    let candidateEmails = [];
    const isPhoneInput = !identifier.includes("@");
    let rpcFound = false;

    // Jika pengguna memasukkan nomor HP (bukan format email yang ada tanda @)
    if (isPhoneInput) {
      const phone = normalizePhone(identifier);
      const cleanDigits = phone.replace(/[^\d]/g, "");

      // 1. Cari email akun via RPC get_email_by_phone di Supabase
      try {
        const { data: rpcEmail, error: rpcErr } = await db.rpc("get_email_by_phone", { phone_input: phone });
        if (!rpcErr && rpcEmail) {
          rpcFound = true;
          const foundList = String(rpcEmail).split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
          candidateEmails.push(...foundList);
        }
      } catch (_) {}

      // 2. Tambahkan akun virtual berbasis nomor HP sebagai alternatif (untuk akun yang daftar tanpa email)
      candidateEmails.push(`wa_${cleanDigits}@peserta.cscp.id`);
      if (cleanDigits.startsWith("62")) {
        candidateEmails.push(`wa_0${cleanDigits.slice(2)}@peserta.cscp.id`);
      }
    } else {
      candidateEmails.push(identifier.toLowerCase());
    }

    // Hilangkan duplikasi kandidat email
    candidateEmails = [...new Set(candidateEmails)];

    let authSuccess = false;
    let lastError = null;

    // Coba autentikasi dengan tiap kandidat email
    for (const testEmail of candidateEmails) {
      const { data, error } = await db.auth.signInWithPassword({
        email: testEmail,
        password: password
      });
      if (!error && data?.session) {
        authSuccess = true;
        break;
      } else {
        lastError = error;
      }
    }

    if (!authSuccess) {
      if (isPhoneInput && !rpcFound) {
        throw new Error("Login dengan nomor WhatsApp belum terhubung ke database. Silakan login langsung menggunakan Email terdaftar Anda, atau hubungi admin.");
      }
      throw lastError || new Error("Email/Nomor WhatsApp atau password tidak sesuai.");
    }

    dialog.close();
    toast("Login berhasil! Mengarahkan ke Dashboard...");
    window.location.href = "dashboard.html";
  } catch (error) {
    showMessage(friendlyError(error));
  }
});

async function init() {
  let client = getDb();
  if (!client && SUPABASE_URL && SUPABASE_ANON_KEY) {
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 200));
      client = getDb();
      if (client) break;
    }
  }

  if (!client) return;

  try {
    const { data: { session } } = await client.auth.getSession();
    const urlParams = new URLSearchParams(window.location.search);
    const isLogout = urlParams.has("logout");

    if (session && !isLogout) {
      // Tampilkan tombol Buka Dashboard di navbar jika pengunjung kembali ke landing page
      const navLoginBtn = $("#navLoginBtn");
      const navRegisterBtn = $("#navRegisterBtn");
      const navDashboardBtn = $("#navDashboardBtn");
      const heroRegisterBtn = $("#heroRegisterBtn");

      if (navLoginBtn) navLoginBtn.style.display = "none";
      if (navRegisterBtn) navRegisterBtn.style.display = "none";
      if (navDashboardBtn) navDashboardBtn.style.display = "inline-flex";
      if (heroRegisterBtn) {
        heroRegisterBtn.textContent = "Buka Dashboard Peserta →";
        heroRegisterBtn.removeAttribute("data-open");
        heroRegisterBtn.addEventListener("click", () => {
          window.location.href = "dashboard.html";
        });
      }
    }
  } catch (err) {
    console.error("Init session check error:", err);
  }
}
init();
