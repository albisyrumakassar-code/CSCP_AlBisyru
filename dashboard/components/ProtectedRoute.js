/**
 * ProtectedRoute Component
 * Memastikan hanya peserta yang sudah terautentikasi yang dapat mengakses Dashboard.
 */

function redirectToLanding(params = "") {
  const isInsideSubdir = window.location.pathname.includes("/dashboard");
  const target = isInsideSubdir ? "../index.html" : "index.html";
  window.location.replace(params ? `${target}?${params}` : target);
}

export async function checkAuth(supabaseClient) {
  if (!supabaseClient) {
    redirectToLanding();
    return null;
  }

  try {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error || !session || !session.user) {
      redirectToLanding();
      return null;
    }

    // Ambil data profil tambahan dari tabel profiles
    let profile = null;
    try {
      const { data, error: profileErr } = await supabaseClient
        .from("profiles")
        .select("id, full_name, phone, email, birth_place, birth_date, domicile, education_level, major, target_formation")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!profileErr && data) {
        profile = data;
      }
    } catch (e) {
      console.warn("Gagal mengambil data profil:", e);
    }

    return {
      session,
      user: session.user,
      profile: profile || {
        full_name: session.user.user_metadata?.full_name || "Peserta CSCP",
        phone: session.user.user_metadata?.phone || session.user.phone || "",
        email: session.user.email || "",
        target_formation: session.user.user_metadata?.target_formation || "Calon ASN"
      }
    };
  } catch (err) {
    console.error("Auth check exception:", err);
    redirectToLanding();
    return null;
  }
}
