/* CSCP frontend. Isi konfigurasi Supabase setelah membuat proyek. Jangan pernah memasukkan service_role key di browser. */
const SUPABASE_URL = ""; // contoh: https://xxxx.supabase.co
const SUPABASE_ANON_KEY = ""; // publishable/anon key saja
const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase);
const db = supabaseReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

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
  if (!db) throw new Error("Supabase belum dikonfigurasi. Isi SUPABASE_URL dan SUPABASE_ANON_KEY di script.js terlebih dahulu.");
}
function friendlyError(error) {
  const msg = error?.message || "Terjadi kesalahan. Silakan coba kembali.";
  if (/invalid login credentials/i.test(msg)) return "Nomor WhatsApp atau password tidak sesuai.";
  if (/already registered/i.test(msg)) return "Nomor tersebut sudah terdaftar. Silakan login.";
  return msg;
}

$("#registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    requireSupabase();
    const form = new FormData(event.currentTarget);
    const phone = normalizePhone(String(form.get("phone") || ""));
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) throw new Error("Format nomor WhatsApp tidak valid. Gunakan format internasional, misalnya +6281234567890.");
    const email = String(form.get("email") || "").trim() || undefined;
    const password = prompt("Buat password akun CSCP (minimal 8 karakter):");
    if (!password || password.length < 8) throw new Error("Password minimal 8 karakter.");
    const metadata = {
      full_name: String(form.get("full_name")).trim(),
      birth_place: String(form.get("birth_place") || "").trim(),
      birth_date: form.get("birth_date") || null,
      domicile: String(form.get("domicile") || "").trim(),
      education_level: String(form.get("education_level") || ""),
      major: String(form.get("major") || "").trim(),
      target_formation: String(form.get("target_formation") || ""),
      privacy_consent: true
    };
    const { data, error } = await db.auth.signUp({ phone, password, options: { data: metadata } });
    if (error) throw error;
    if (data.user) {
      const { error: profileError } = await db.from("profiles").upsert({
        id: data.user.id, ...metadata, phone, email: email || null
      });
      if (profileError) throw profileError;
    }
    event.currentTarget.reset();
    showMessage("Pendaftaran dikirim. Selesaikan verifikasi nomor melalui OTP sesuai pengaturan Supabase sebelum login.");
  } catch (error) { showMessage(friendlyError(error)); }
});

$("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    requireSupabase();
    const form = new FormData(event.currentTarget);
    const phone = normalizePhone(String(form.get("phone") || ""));
    const password = String(form.get("password") || "");
    const { data, error } = await db.auth.signInWithPassword({ phone, password });
    if (error) throw error;
    dialog.close(); await renderSession(data.session); toast("Login berhasil.");
  } catch (error) { showMessage(friendlyError(error)); }
});

async function renderSession(session) {
  if (!session || !db) { $("#accountArea").hidden = true; return; }
  const { data: profile } = await db.from("profiles").select("full_name,phone,target_formation").eq("id", session.user.id).maybeSingle();
  $("#profileName").textContent = profile?.full_name || session.user.user_metadata?.full_name || "Peserta CSCP";
  $("#profilePhone").textContent = profile?.phone || session.user.phone || "";
  $("#avatar").textContent = ($("#profileName").textContent.trim()[0] || "C").toUpperCase();
  $("#accountArea").hidden = false;
}
$("#logoutBtn").addEventListener("click", async () => {
  if (!db) return;
  const { error } = await db.auth.signOut();
  if (error) toast(friendlyError(error)); else { $("#accountArea").hidden = true; toast("Anda telah keluar."); }
});

async function init() {
  if (!db) {
    showMessage("Mode pratinjau: autentikasi belum aktif. Hubungkan Supabase untuk mengaktifkan pendaftaran dan login.");
    return;
  }
  const { data: { session } } = await db.auth.getSession();
  await renderSession(session);
  db.auth.onAuthStateChange((_event, session) => { renderSession(session); });
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
