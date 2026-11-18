/* CSCP frontend. Isi konfigurasi Supabase setelah membuat proyek. Jangan pernah memasukkan service_role key di browser. */
const SUPABASE_URL = "https://qiphmdconfqukguhkicz.supabase.co"; // contoh: https://xxxx.supabase.co
const SUPABASE_ANON_KEY = "sb_publishable_dMVjE0iV80805TY-JlbH_Q_A_R5oLLs"; // publishable/anon key saja

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
  const el = $("#toast"); el.textContent = message; el.classList.add("show");
  window.setTimeout(() => el.classList.remove("show"), 3200);
};
const showMessage = (message) => { $("#authMessage").textContent = message; };
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
  const nav = $("#mainNav"); const isOpen = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
});
$("#mainNav").querySelectorAll("a").forEach(a => a.addEventListener("click", () => $("#mainNav").classList.remove("open")));
$("#year").textContent = new Date().getFullYear();

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
  if (/invalid login credentials/i.test(msg)) return "Email/Nomor WhatsApp atau password tidak sesuai.";
  if (/already registered/i.test(msg) || /user already exists/i.test(msg)) return "Email atau nomor WhatsApp tersebut sudah terdaftar. Silakan login.";
  if (/Email not confirmed/i.test(msg)) return "Email belum dikonfirmasi. Pastikan opsi 'Confirm email' dimatikan di pengaturan Supabase agar langsung aktif.";
  if (/security purposes.*after (\d+) seconds/i.test(msg)) {
    const detik = msg.match(/after (\d+) seconds/i)?.[1] || "60";
    return `Demi keamanan, harap tunggu ${detik} detik sebelum mencoba lagi.`;
  }
  return msg;
}

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
    if (!password || password.length < 8) {
      throw new Error("Password minimal 8 karakter.");
    }

    const metadata = {
      full_name: String(form.get("full_name")).trim(),
      phone: phone,
      birth_place: String(form.get("birth_place") || "").trim(),
      birth_date: form.get("birth_date") || null,
      domicile: String(form.get("domicile") || "").trim(),
      education_level: String(form.get("education_level") || ""),
      major: String(form.get("major") || "").trim(),
      target_formation: String(form.get("target_formation") || ""),
      privacy_consent: true
    };

    const { data, error } = await db.auth.signUp({
      email: authEmail,
      password: password,
      options: { data: metadata }
    });
    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await db.from("profiles").upsert({
        id: data.user.id,
        ...metadata,
        email: inputEmail || null
      });
      if (profileError) console.warn("Penyimpanan profil tambahan:", profileError);
    }

    event.currentTarget.reset();
    toast("Pendaftaran berhasil! Silakan login.");
    showMessage("Pendaftaran berhasil! Silakan login menggunakan Email atau Nomor WhatsApp Anda.");
    window.setTimeout(() => openAuth("login"), 1800);
  } catch (error) {
    showMessage(friendlyError(error));
  }
});

$("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    requireSupabase();
    const form = new FormData(event.currentTarget);
    const identifier = String(form.get("identifier") || "").trim();
    const password = String(form.get("password") || "");

    if (!identifier) throw new Error("Masukkan email atau nomor WhatsApp.");
    if (!password) throw new Error("Masukkan password.");

    let loginEmail = identifier.toLowerCase();

    // Jika pengguna memasukkan nomor HP (bukan format email yang ada tanda @)
    if (!loginEmail.includes("@")) {
      const phone = normalizePhone(identifier);
      let foundEmail = null;

      // 1. Coba cari email asli via RPC get_email_by_phone
      try {
        const { data: rpcEmail, error: rpcErr } = await db.rpc("get_email_by_phone", { phone_input: phone });
        if (!rpcErr && rpcEmail) {
          foundEmail = rpcEmail;
        }
      } catch (_) {}

      // 2. Jika RPC tidak menemukan atau belum dibuat, gunakan fallback format akun virtual
      if (!foundEmail) {
        const cleanDigits = phone.replace(/[^\d]/g, "");
        foundEmail = `wa_${cleanDigits}@peserta.cscp.id`;
      }

      loginEmail = foundEmail;
    }

    const { data, error } = await db.auth.signInWithPassword({
      email: loginEmail,
      password: password
    });
    if (error) throw error;

    dialog.close();
    await renderSession(data.session);
    toast("Login berhasil.");
  } catch (error) {
    showMessage(friendlyError(error));
  }
});

async function renderSession(session) {
  const client = getDb();
  if (!session || !client) { $("#accountArea").hidden = true; return; }
  let profile = null;
  try {
    const { data } = await client.from("profiles").select("full_name,phone,email,target_formation").eq("id", session.user.id).maybeSingle();
    profile = data;
  } catch (_) {}
  
  const displayName = profile?.full_name || session.user.user_metadata?.full_name || "Peserta CSCP";
  const displayContact = profile?.phone || session.user.user_metadata?.phone || profile?.email || session.user.email || "";
  $("#profileName").textContent = displayName;
  $("#profilePhone").textContent = displayContact;
  $("#avatar").textContent = (displayName.trim()[0] || "C").toUpperCase();
  $("#accountArea").hidden = false;
}
$("#logoutBtn").addEventListener("click", async () => {
  const client = getDb();
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) toast(friendlyError(error)); else { $("#accountArea").hidden = true; toast("Anda telah keluar."); }
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

  if (!client) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      showMessage("Mode pratinjau: autentikasi belum aktif. Hubungkan Supabase untuk mengaktifkan pendaftaran dan login.");
    }
    return;
  }
  try {
    const { data: { session } } = await client.auth.getSession();
    await renderSession(session);
    client.auth.onAuthStateChange((_event, session) => { renderSession(session); });
  } catch (err) {
    console.error("Init session error:", err);
  }
}
init();

// Soal demonstrasi statis untuk memeriksa tampilan. Bank soal produksi wajib diambil dari database.
const sample = $("#sampleQuestion");
if (sample) {
  sample.innerHTML = `<p><b>Contoh TWK · Nomor 1</b></p><p>Nilai yang menjadi dasar persatuan dalam keberagaman masyarakat Indonesia adalah ...</p><label><input type="radio" name="demo" value="a"> A. Individualisme</label><br><label><input type="radio" name="demo" value="b"> B. Bhinneka Tunggal Ika</label><br><label><input type="radio" name="demo" value="c"> C. Persaingan bebas</label><br><button class="btn btn-outline" id="checkDemo">Periksa jawaban contoh</button><p id="demoFeedback" class="muted"></p>`;
  $("#checkDemo").addEventListener("click", () => {
    const answer = document.querySelector('input[name="demo"]:checked');
    $("#demoFeedback").textContent = !answer ? "Pilih salah satu jawaban." : answer.value === "b" ? "Benar untuk contoh ini." : "Belum tepat. Jawaban contoh: Bhinneka Tunggal Ika.";
  });
}
