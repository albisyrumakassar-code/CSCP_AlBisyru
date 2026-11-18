import os
import json
import base64
import urllib.request
import urllib.error

REPO = "albisyrumakassar-code/CSCP_AlBisyru"
BRANCH = "main" # default branch
FILES_TO_SYNC = ["index.html", "script.js", "schema.sql", "style.css"]
TOKEN_FILE = os.path.join(os.path.dirname(__file__), "github_token.txt")

def get_token():
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r", encoding="utf-8") as f:
            t = f.read().strip()
            if t:
                return t
    print("=" * 60)
    print(" PENGATURAN AWAL TOKEN GITHUB UNTUK UPDATE OTOMATIS ")
    print("=" * 60)
    print("Agar file bisa diunggah otomatis ke GitHub, masukkan")
    print("GitHub Personal Access Token (Classic dengan izin 'repo').")
    print("Buat di: https://github.com/settings/tokens/new")
    print("=" * 60)
    token = input("Masukkan GitHub Token Anda: ").strip()
    if token:
        with open(TOKEN_FILE, "w", encoding="utf-8") as f:
            f.write(token)
        print("Token berhasil disimpan di github_token.txt!\n")
        return token
    return None

def api_request(url, token, data=None, method="GET"):
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "CSCP-Updater"
    }
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode("utf-8")), response.status
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        try:
            return json.loads(err_msg), e.code
        except:
            return {"message": err_msg}, e.code

def get_file_sha(token, file_path):
    url = f"https://api.github.com/repos/{REPO}/contents/{file_path}"
    res, status = api_request(url, token)
    if status == 200:
        return res.get("sha")
    return None

def detect_target_path(token, local_name):
    # Cek apakah file berada di root atau dalam subfolder CSCP/
    if get_file_sha(token, local_name) is not None:
        return local_name
    if get_file_sha(token, f"CSCP/{local_name}") is not None:
        return f"CSCP/{local_name}"
    # Default ke root jika file baru
    return local_name

def upload_file(token, local_name):
    current_dir = os.path.dirname(__file__)
    full_local = os.path.join(current_dir, local_name)
    if not os.path.exists(full_local):
        print(f"File {local_name} tidak ditemukan secara lokal, dilewati.")
        return False

    with open(full_local, "rb") as f:
        content_bytes = f.read()
    b64_content = base64.b64encode(content_bytes).decode("utf-8")

    remote_path = detect_target_path(token, local_name)
    sha = get_file_sha(token, remote_path)

    url = f"https://api.github.com/repos/{REPO}/contents/{remote_path}"
    payload = {
        "message": f"Update {remote_path} via auto updater CSCP",
        "content": b64_content
    }
    if sha:
        payload["sha"] = sha

    res, status = api_request(url, token, data=payload, method="PUT")
    if status in (200, 201):
        print(f" [OK] Berhasil memperbarui: {remote_path}")
        return True
    else:
        print(f" [GAGAL] {remote_path}: {res.get('message')}")
        return False

def main():
    print("=" * 60)
    print(" CSCP Website Auto-Updater ke GitHub & Cloudflare ")
    print(" Repository:", REPO)
    print("=" * 60)

    token = get_token()
    if not token:
        print("Token tidak diberikan. Batal mengunggah.")
        return

    success_count = 0
    for file_name in FILES_TO_SYNC:
        if upload_file(token, file_name):
            success_count += 1

    print("=" * 60)
    if success_count > 0:
        print(f" SELESAI! {success_count} file berhasil diunggah ke GitHub.")
        print(" Cloudflare akan otomatis mendeploy dalam ~30 detik ke:")
        print(" https://cscp-albisyru.albisyrumakassar.workers.dev/")
    else:
        print("Tidak ada file yang berhasil diunggah. Periksa izin token GitHub Anda.")
    print("=" * 60)

if __name__ == "__main__":
    main()
