/**
 * Bank Data Latihan Soal CSCP Al Bisyru
 * Arsitektur Modular & Dinamis untuk Panel TIU, TWK, dan TKP
 * Mengacu pada kurikulum resmi CAT BKN & Modul Paket Tes CASN
 */

export const PRACTICE_TAXONOMY = {
  TIU: {
    id: "TIU",
    name: "TIU (Tes Intelegensia Umum)",
    shortName: "TIU",
    passingGrade: 80,
    maxScore: 250,
    scorePerCorrect: 5,
    description: "Mengukur penguasaan logika numerik, verbal, dan penalaran figural sesuai standar BKN.",
    groups: [
      {
        id: "numerik",
        title: "Kemampuan Numerik",
        description: "Operasi hitung angka, pola deret, dan logika kuantitatif praktis.",
        subcategories: [
          {
            id: "baris-deret",
            title: "Baris & Deret",
            badge: "Tersedia 50 Soal",
            isAvailable: true,
            totalPackages: 1,
            description: "Pola deret angka, huruf, bertingkat, berselang, dan barisan Fibonacci."
          },
          {
            id: "aritmatika-aljabar",
            title: "Aritmatika & Aljabar",
            badge: "Segera Hadir",
            isAvailable: false,
            totalPackages: 0,
            description: "Hitung cepat, pecahan, desimal, persentase, dan persamaan aljabar dasar."
          },
          {
            id: "soal-cerita",
            title: "Soal Cerita & Berhitung Praktis",
            badge: "Segera Hadir",
            isAvailable: false,
            totalPackages: 0,
            description: "Kecepatan, debit, perbandingan berbalik nilai, dan aplikasi matematika."
          }
        ]
      },
      {
        id: "verbal",
        title: "Kemampuan Verbal",
        description: "Penguasaan kosa kata, relasi makna, dan logika penarikan kesimpulan.",
        subcategories: [
          {
            id: "analogi",
            title: "Analogi Kata",
            badge: "Segera Hadir",
            isAvailable: false,
            totalPackages: 0,
            description: "Menemukan hubungan makna setara antar pasangan kata."
          },
          {
            id: "silogisme",
            title: "Silogisme & Penarikan Kesimpulan",
            badge: "Segera Hadir",
            isAvailable: false,
            totalPackages: 0,
            description: "Logika premis mayor-minor, modus ponens, dan kuantor logika."
          },
          {
            id: "analitis",
            title: "Penalaran Analitis",
            badge: "Segera Hadir",
            isAvailable: false,
            totalPackages: 0,
            description: "Analisis kondisi bersyarat, posisi duduk, urutan dan kombinasi jadwal."
          }
        ]
      },
      {
        id: "figural",
        title: "Kemampuan Figural",
        description: "Ketajaman visual terhadap transformasi bentuk, pola serial, dan relasi spasial.",
        subcategories: [
          {
            id: "figural-analogi",
            title: "Analogi Gambar",
            badge: "Segera Hadir",
            isAvailable: false,
            totalPackages: 0,
            description: "Hubungan bentuk geometris berdasarkan rotasi, pencerminan, atau elemen."
          },
          {
            id: "figural-ketidaksamaan",
            title: "Ketidaksamaan Gambar",
            badge: "Segera Hadir",
            isAvailable: false,
            totalPackages: 0,
            description: "Menemukan satu bentuk gambar yang memiliki aturan berbeda di antara pilihan."
          },
          {
            id: "figural-serial",
            title: "Serial Gambar",
            badge: "Segera Hadir",
            isAvailable: false,
            totalPackages: 0,
            description: "Melanjutkan runtutan perubahan pola visual secara berkesinambungan."
          }
        ]
      }
    ]
  },
  TWK: {
    id: "TWK",
    name: "TWK (Tes Wawasan Kebangsaan)",
    shortName: "TWK",
    passingGrade: 65,
    maxScore: 150,
    scorePerCorrect: 5,
    description: "Mengukur komitmen kebangsaan, integritas moral, dan pemahaman pilar kenegaraan.",
    groups: [
      {
        id: "kebangsaan",
        title: "Pilar & Wawasan Kebangsaan",
        description: "Nilai luhur bangsa Indonesia dan dasar tata negara.",
        subcategories: [
          { id: "nasionalisme", title: "Nasionalisme", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Menempatkan persatuan dan kepentingan bangsa di atas kepentingan individu." },
          { id: "integritas", title: "Integritas", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Kejujuran, ketangguhan, dan konsistensi etika pelayanan publik." },
          { id: "bela-negara", title: "Bela Negara", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Peran aktif menjaga kedaulatan dan keutuhan NKRI." },
          { id: "pilar-negara", title: "Pilar Negara", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Pancasila, UUD NRI 1945, NKRI, dan Bhinneka Tunggal Ika." },
          { id: "bahasa-indonesia", title: "Bahasa Indonesia", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "EYD V, kalimat efektif, ide pokok, dan tata bahasa baku." }
        ]
      }
    ]
  },
  TKP: {
    id: "TKP",
    name: "TKP (Tes Karakteristik Pribadi)",
    shortName: "TKP",
    passingGrade: 166,
    maxScore: 225,
    scorePerCorrect: "Skala 1 - 5",
    description: "Mengukur kematangan emosi, profesionalisme kerja, jejaring sosial, dan integritas ASN.",
    groups: [
      {
        id: "karakteristik-pribadi",
        title: "Dimensi Karakteristik & Perilaku",
        description: "Kesiapan pelayanan, kepemimpinan, dan adaptasi di birokrasi pemerintahan.",
        subcategories: [
          { id: "pelayanan-publik", title: "Pelayanan Publik", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Sikap ramah, solutif, dan mengutamakan kepentingan umum." },
          { id: "jejaring-kerja", title: "Jejaring Kerja", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Kemitraan, komunikasi efektif, dan kolaborasi tim kerja." },
          { id: "sosial-budaya", title: "Sosial Budaya", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Toleransi kemajemukan dan kepekaan terhadap norma sosial." },
          { id: "tik", title: "Teknologi Informasi (TIK)", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Pemanfaatan instrumen digital untuk akselerasi kinerja birokrasi." },
          { id: "profesionalisme", title: "Profesionalisme", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Keahlian profesi, komitmen waktu, dan tanggung jawab tugas." },
          { id: "anti-radikalisme", title: "Anti Radikalisme", badge: "Segera Hadir", isAvailable: false, totalPackages: 0, description: "Ketahanan ideologi Pancasila dan penolakan paham radikalisme." }
        ]
      }
    ]
  }
};

/**
 * Daftar Paket Soal Latihan CSCP
 * Mudah ditambah di kemudian hari hanya dengan menambahkan objek paket baru ke array ini.
 */
export const PRACTICE_PACKAGES = [
  {
    id: "tiu-baris-deret-1",
    panel: "TIU",
    subcategoryId: "baris-deret",
    subcategoryTitle: "Baris & Deret",
    code: "TIU-BD-01",
    title: "Paket Tes 1: Soal TIU Baris & Deret",
    sourceInfo: "Modul Resmi Paket Tes 1 — Soal TIU Baris & Deret (Halaman 36-44)",
    durationMinutes: 45,
    durationSeconds: 45 * 60,
    totalQuestions: 50,
    passingGrade: 80,
    scorePerCorrect: 5,
    scorePerWrong: 0,
    scorePerUnanswered: 0,
    maxScore: 250,
    difficulty: "Menengah (Standard CAT BKN)",
    description: "50 butir soal latihan variasi barisan angka dan huruf lengkap dengan pembahasan mendalam serta trik pola cepat.",
    questions: [
      {
        id: 1,
        question: "52, 53, 56, 61, 68, 77, ...",
        options: { A: "85", B: "87", C: "88", D: "91", E: "93" },
        correct: "C",
        explanation: "Pola deret dengan selisih bilangan ganjil bertingkat (+1, +3, +5, +7, +9, +11):\n• 52 + 1 = 53\n• 53 + 3 = 56\n• 56 + 5 = 61\n• 61 + 7 = 68\n• 68 + 9 = 77\n• 77 + 11 = 88\nJadi, bilangan yang dicari adalah 88 (Pilihan C)."
      },
      {
        id: 2,
        question: "5 - 6 - 7 - 5 - 6 - 7 - 8 - 5 - 6 - 7 - 8 - 9 - ... - ...",
        options: { A: "5 - 6", B: "7 - 6", C: "9 - 10", D: "12 - 9", E: "10 - 9" },
        correct: "A",
        explanation: "Perhatikan pola pengelompokan yang bertambah satu angka di setiap siklus:\n• Kelompok 1: (5, 6, 7)\n• Kelompok 2: (5, 6, 7, 8)\n• Kelompok 3: (5, 6, 7, 8, 9)\n• Kelompok 4 dimulai kembali dari angka awal: 5, 6, ...\nJadi, dua seri berikutnya adalah 5 dan 6 (Pilihan A)."
      },
      {
        id: 3,
        question: "11 - 99 - 77 - 12 - 100 - 78 - 13 - ... - ...",
        options: { A: "79 - 101", B: "78 - 100", C: "100 - 78", D: "101 - 79", E: "77 - 101" },
        correct: "D",
        explanation: "Pola terdiri dari 3 larik berselang:\n• Larik 1: 11, 12, 13, ... (+1)\n• Larik 2: 99, 100, 101, ... (+1)\n• Larik 3: 77, 78, 79, ... (+1)\nSetelah angka 13, urutan berikutnya berasal dari Larik 2 lalu Larik 3, yaitu 101 dan 79 (Pilihan D)."
      },
      {
        id: 4,
        question: "1 - 2 - 4 - 8 - 16 - ... - ...",
        options: { A: "8 - 2", B: "8 - 4", C: "24 - 32", D: "32 - 66", E: "32 - 64" },
        correct: "E",
        explanation: "Pola deret geometri dikalikan 2 secara bertahap (x2):\n• 16 x 2 = 32\n• 32 x 2 = 64\nJadi, dua bilangan berikutnya adalah 32 dan 64 (Pilihan E)."
      },
      {
        id: 5,
        question: "5 - 7 - 10 - 12 - 15 - ...",
        options: { A: "13", B: "14", C: "15", D: "16", E: "17" },
        correct: "E",
        explanation: "Pola selang-seling operasi (+2) dan (+3):\n• 5 (+2) 7 (+3) 10 (+2) 12 (+3) 15 (+2) 17.\nAtau pola 2 larik selang 1:\n• 5 (+5) 10 (+5) 15\n• 7 (+5) 12 (+5) 17.\nJadi, bilangan selanjutnya adalah 17 (Pilihan E)."
      },
      {
        id: 6,
        question: "99, 94, 96, 91, 93, 88, 90, ....",
        options: { A: "79", B: "85", C: "90", D: "91", E: "93" },
        correct: "B",
        explanation: "Pola 2 larik berselang dengan pengurangan 3 (-3):\n• Larik ganjil: 99 (-3) 96 (-3) 93 (-3) 90\n• Larik genap: 94 (-3) 91 (-3) 88 (-3) 85\nBilangan yang dicari berada pada larik genap berikutnya: 88 - 3 = 85 (Pilihan B)."
      },
      {
        id: 7,
        question: "F, I, L, O, ...",
        options: { A: "S", B: "R", C: "T", D: "U", E: "V" },
        correct: "B",
        explanation: "Pola deret huruf melompat 3 langkah (+3):\n• F (g, h) -> I\n• I (j, k) -> L\n• L (m, n) -> O\n• O (p, q) -> R\nJadi, huruf selanjutnya adalah R (Pilihan B)."
      },
      {
        id: 8,
        question: "1½, 3, ..., ..., 24, 48",
        options: { A: "3 dan 6", B: "1½ dan 6", C: "6 dan 6", D: "6 dan 12", E: "12 dan 18" },
        correct: "D",
        explanation: "Pola deret perkalian 2 (x2):\n• 1½ x 2 = 3\n• 3 x 2 = 6 (bilangan pertama)\n• 6 x 2 = 12 (bilangan kedua)\n• 12 x 2 = 24\n• 24 x 2 = 48\nJadi, dua bilangan pengisi adalah 6 dan 12 (Pilihan D)."
      },
      {
        id: 9,
        question: "3, 8, 14, 21, 29, 38, ..., ...",
        options: { A: "48 dan 59", B: "45 dan 55", C: "42 dan 51", D: "40 dan 49", E: "40 dan 45" },
        correct: "A",
        explanation: "Pola selisih bertambah 1 setiap langkah (+5, +6, +7, +8, +9, +10, +11):\n• 38 + 10 = 48\n• 48 + 11 = 59\nJadi, dua bilangan selanjutnya adalah 48 dan 59 (Pilihan A)."
      },
      {
        id: 10,
        question: "9, 9, 9, 6, 9, 3, ..., ...",
        options: { A: "11 dan 11", B: "10 dan 9", C: "9 dan 0", D: "0 dan 9", E: "1 dan 0" },
        correct: "C",
        explanation: "Pola 2 larik berselang:\n• Larik ganjil: 9, 9, 9, (9) -> konstan 9\n• Larik genap: 9 (-3) 6 (-3) 3 (-3) 0 -> berkurang 3\nJadi, dua bilangan selanjutnya adalah 9 dan 0 (Pilihan C)."
      },
      {
        id: 11,
        question: "625 - 1296 - 25 - 36 - 5 - ....",
        options: { A: "8", B: "4", C: "6", D: "10", E: "14" },
        correct: "C",
        explanation: "Pola 2 larik operasi penarikan akar kuadrat (√):\n• Larik 1: 625 -> √625 = 25 -> √25 = 5\n• Larik 2: 1296 -> √1296 = 36 -> √36 = 6\nJadi, angka selanjutnya adalah 6 (Pilihan C)."
      },
      {
        id: 12,
        question: "50 - 40 - 100 - 90 - 50 - ....",
        options: { A: "140", B: "100", C: "80", D: "60", E: "50" },
        correct: "A",
        explanation: "Pola 2 larik berselang:\n• Larik ganjil: 50, 100, 50, ... (berulang selang-seling)\n• Larik genap: 40 (+50) 90 (+50) 140\nBilangan yang dicari adalah kelanjutan Larik genap: 90 + 50 = 140 (Pilihan A)."
      },
      {
        id: 13,
        question: "15, 16, 20, 29, ..., ...",
        options: { A: "30, 34", B: "32, 35", C: "35, 45", D: "45, 70", E: "70, 85" },
        correct: "D",
        explanation: "Pola penambahan bilangan kuadrat (n²):\n• 15 + 1² (1) = 16\n• 16 + 2² (4) = 20\n• 20 + 3² (9) = 29\n• 29 + 4² (16) = 45\n• 45 + 5² (25) = 70\nJadi, dua bilangan berikutnya adalah 45 dan 70 (Pilihan D)."
      },
      {
        id: 14,
        question: "26, 27, 29, 32, ..., ..., 40, 38, 35, 31, 26",
        options: { A: "34 dan 40", B: "40 dan 36", C: "41 dan 30", D: "36 dan 41", E: "36 dan 40" },
        correct: "D",
        explanation: "Pola simetris naik lalu turun bertingkat:\n• Sisi kiri naik: 26 (+1) 27 (+2) 29 (+3) 32 (+4) 36 (+5) 41 (puncak)\n• Sisi kanan turun: 41 (-1) 40 (-2) 38 (-3) 35 (-4) 31 (-5) 26\nJadi, dua bilangan yang hilang adalah 36 dan 41 (Pilihan D)."
      },
      {
        id: 15,
        question: "1, 0, 8, 3, 3, 7, 5, 6, 6, 7, 9, 5, 9, 12, 4, ..., ..., ...",
        options: { A: "1, 11, dan 15", B: "1, 15, dan 16", C: "11, 15, dan 3", D: "11, 2, dan 15", E: "15, 11, dan 1" },
        correct: "C",
        explanation: "Pola 3 larik berselang 3 langkah:\n• Larik 1: 1 (+2) 3 (+2) 5 (+2) 7 (+2) 9 (+2) 11\n• Larik 2: 0 (+3) 3 (+3) 6 (+3) 9 (+3) 12 (+3) 15\n• Larik 3: 8 (-1) 7 (-1) 6 (-1) 5 (-1) 4 (-1) 3\nJadi, tiga bilangan berikutnya berturut-turut adalah 11, 15, dan 3 (Pilihan C)."
      },
      {
        id: 16,
        question: "..., ..., 41, 33, 26, 20, 15, 11",
        options: { A: "51 dan 44", B: "55 dan 45", C: "60 dan 55", D: "60 dan 50", E: "65 dan 55" },
        correct: "D",
        explanation: "Perhatikan selisih dari kanan ke kiri yang bertambah satu:\n• 11 (+4) 15 (+5) 20 (+6) 26 (+7) 33 (+8) 41 (+9) 50 (+10) 60.\nSehingga urutan dua bilangan awal dari kiri adalah 60 dan 50 (Pilihan D)."
      },
      {
        id: 17,
        question: "Suatu seri: 3 - 3 - 6 - 9 - 15 - 24 - ... - ... seri selanjutnya:",
        options: { A: "33, 55", B: "31, 51", C: "36, 73", D: "39, 63", E: "42, 71" },
        correct: "D",
        explanation: "Pola deret Fibonacci (suku berikutnya adalah hasil penjumlahan dua suku sebelumnya):\n• 3 + 3 = 6\n• 3 + 6 = 9\n• 6 + 9 = 15\n• 9 + 15 = 24\n• 15 + 24 = 39\n• 24 + 39 = 63\nJadi, dua seri berikutnya adalah 39 dan 63 (Pilihan D)."
      },
      {
        id: 18,
        question: "Suatu seri: 1 - 4 - 9 - 16 - 25 - seri selanjutnya:",
        options: { A: "31", B: "36", C: "38", D: "42", E: "44" },
        correct: "B",
        explanation: "Pola deret barisan bilangan kuadrat sempurna (n²):\n• 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25, 6² = 36.\nJadi, seri selanjutnya adalah 36 (Pilihan B)."
      },
      {
        id: 19,
        question: "Suatu seri: 16 - 12 - 15 - 13 - 14 - seri selanjutnya:",
        options: { A: "12", B: "14", C: "13", D: "15", E: "17" },
        correct: "B",
        explanation: "Pola 2 larik berselang:\n• Larik ganjil: 16 (-1) 15 (-1) 14\n• Larik genap: 12 (+1) 13 (+1) 14\nSuku ke-6 berada pada larik genap: 13 + 1 = 14 (Pilihan B)."
      },
      {
        id: 20,
        question: "18, 10, 20, ..., ..., 16, 32, 24",
        options: { A: "8 dan 16", B: "9 dan 3", C: "12 dan 24", D: "32 dan 24", E: "28 dan 24" },
        correct: "C",
        explanation: "Pola 2 larik berselang dengan pertambahan kelipatan 2:\n• Larik genap: 10 (+2) 12 (+4) 16 (+8) 24\n• Larik ganjil: 18 (+2) 20 (+4) 24 (+8) 32\nBilangan pada posisi ke-4 dan ke-5 adalah 12 dan 24 (Pilihan C)."
      },
      {
        id: 21,
        question: "11, 19, 27, 9, 17, 25, 7, ..., ...",
        options: { A: "15, 22", B: "23, 15", C: "22, 15", D: "15, 23", E: "26, 23" },
        correct: "D",
        explanation: "Pola 3 larik berselang dengan pengurangan 2 (-2):\n• Larik 1: 11 (-2) 9 (-2) 7\n• Larik 2: 19 (-2) 17 (-2) 15\n• Larik 3: 27 (-2) 25 (-2) 23\nJadi, dua bilangan selanjutnya adalah 15 dan 23 (Pilihan D)."
      },
      {
        id: 22,
        question: "1, 4, 8, 11, 15, ....",
        options: { A: "18", B: "16", C: "17", D: "19", E: "20" },
        correct: "A",
        explanation: "Pola selang-seling operasi (+3) dan (+4):\n• 1 (+3) 4 (+4) 8 (+3) 11 (+4) 15 (+3) 18.\nJadi, bilangan selanjutnya adalah 15 + 3 = 18 (Pilihan A)."
      },
      {
        id: 23,
        question: "3, 4, 8, 9, 18, 19, ....",
        options: { A: "28, 29", B: "54, 81", C: "16, 21", D: "27, 36", E: "38, 39" },
        correct: "E",
        explanation: "Pola selang-seling operasi (+1) dan (x2):\n• 3 (+1) 4 (x2) 8 (+1) 9 (x2) 18 (+1) 19 (x2) 38 (+1) 39.\nJadi, dua bilangan berikutnya adalah 38 dan 39 (Pilihan E)."
      },
      {
        id: 24,
        question: "2, 3, 5, 8, 8, 13, 11, 18, ...., ....",
        options: { A: "14, 23", B: "13, 20", C: "12, 19", D: "15, 24", E: "16, 24" },
        correct: "A",
        explanation: "Pola 2 larik berselang:\n• Larik 1: 2 (+3) 5 (+3) 8 (+3) 11 (+3) 14\n• Larik 2: 3 (+5) 8 (+5) 13 (+5) 18 (+5) 23\nJadi, dua bilangan berikutnya adalah 14 dan 23 (Pilihan A)."
      },
      {
        id: 25,
        question: "A, B, C, B, C, D, C, D, E, D, E, F, ...., ...., ....",
        options: { A: "E, F, G", B: "D, E, F", C: "D, G, H", D: "F, G, H", E: "E, G, F" },
        correct: "A",
        explanation: "Pola kelompok 3 huruf berurutan dengan huruf awal bergeser satu tingkat:\n• (A, B, C), (B, C, D), (C, D, E), (D, E, F), (E, F, G).\nJadi, tiga huruf selanjutnya adalah E, F, G (Pilihan A)."
      },
      {
        id: 26,
        question: "C, F, I, L, O, ..., ...",
        options: { A: "T dan V", B: "R dan U", C: "R dan S", D: "Q dan T", E: "P dan S" },
        correct: "B",
        explanation: "Pola deret huruf melompat 3 huruf (+3):\n• C (de) F (gh) I (jk) L (mn) O (pq) R (st) U.\nJadi, dua huruf selanjutnya adalah R dan U (Pilihan B)."
      },
      {
        id: 27,
        question: "B, A, C, A, D, A, E, A, F, A, G, A, ..., ...",
        options: { A: "A dan J", B: "A dan H", C: "H dan A", D: "I dan A", E: "J dan A" },
        correct: "C",
        explanation: "Pola berselang dengan huruf 'A' sebagai penyekat tetap:\n• Larik ganjil: B, C, D, E, F, G, H\n• Larik genap: A, A, A, A, A, A, A\nJadi, dua huruf selanjutnya adalah H dan A (Pilihan C)."
      },
      {
        id: 28,
        question: "4, 2, 1, 5, 4, 4, 6, 6, 7, 7, ..., ...",
        options: { A: "8 dan 8", B: "8 dan 9", C: "8 dan 10", D: "9 dan 9", E: "9 dan 10" },
        correct: "C",
        explanation: "Pola 3 larik berselang 3 langkah:\n• Larik 1: 4 (+1) 5 (+1) 6 (+1) 7 (+1) 8\n• Larik 2: 2 (+2) 4 (+2) 6 (+2) 8\n• Larik 3: 1 (+3) 4 (+3) 7 (+3) 10\nUrutan dua bilangan berikutnya pada seri adalah 8 dan 10 (Pilihan C)."
      },
      {
        id: 29,
        question: "Suatu seri: 1-2-4-8-16-32- seri selanjutnya:",
        options: { A: "32-16-8", B: "16-32-8", C: "64-128-256", D: "64-32-128", E: "256-128-64" },
        correct: "C",
        explanation: "Pola deret geometri berlipat dua (x2):\n• 32 x 2 = 64\n• 64 x 2 = 128\n• 128 x 2 = 256\nJadi, seri selanjutnya adalah 64-128-256 (Pilihan C)."
      },
      {
        id: 30,
        question: "Suatu seri: 8-7-8-7-8-6-8-6- seri selanjutnya:",
        options: { A: "6-8-5", B: "8-5-8", C: "6-8-6", D: "5-8-5", E: "6-8-5" },
        correct: "B",
        explanation: "Pola 2 larik berselang:\n• Larik ganjil: 8, 8, 8, 8, (8), (8) -> bernilai konstan 8\n• Larik genap: 7, 7, 6, 6, (5), (5) -> berpasangan berkurang 1\nMaka, 3 bilangan berikutnya adalah 8 - 5 - 8 (Pilihan B)."
      },
      {
        id: 31,
        question: "Suatu seri: 13-8-16-5-19-2-22- seri selanjutnya:",
        options: { A: "2 32", B: "2 18", C: "-1 25", D: "32 64", E: "35 32" },
        correct: "C",
        explanation: "Pola 2 larik berselang:\n• Larik ganjil: 13 (+3) 16 (+3) 19 (+3) 22 (+3) 25\n• Larik genap: 8 (-3) 5 (-3) 2 (-3) -1\nUrutan suku ke-8 dan ke-9 berturut-turut adalah -1 dan 25 (Pilihan C)."
      },
      {
        id: 32,
        question: "100, 4, 90, 7, 80, ..., ...",
        options: { A: "8 dan 90", B: "9 dan 80", C: "10 dan 70", D: "11 dan 71", E: "12 dan 72" },
        correct: "C",
        explanation: "Pola 2 larik berselang:\n• Larik ganjil: 100 (-10) 90 (-10) 80 (-10) 70\n• Larik genap: 4 (+3) 7 (+3) 10\nJadi, dua angka berikutnya adalah 10 dan 70 (Pilihan C)."
      },
      {
        id: 33,
        question: "3, 5, 9, 17, 33, 65, ...",
        options: { A: "78", B: "84", C: "99", D: "112", E: "129" },
        correct: "E",
        explanation: "Pola penambahan selisih berlipat ganda (+2, +4, +8, +16, +32, +64):\n• 3 + 2 = 5\n• 5 + 4 = 9\n• 9 + 8 = 17\n• 17 + 16 = 33\n• 33 + 32 = 65\n• 65 + 64 = 129\nJadi, bilangan selanjutnya adalah 129 (Pilihan E)."
      },
      {
        id: 34,
        question: "Aba, abe, abi, ..., ...",
        options: { A: "abm dan abq", B: "abu dan abo", C: "abe dan abz", D: "abj dan abg", E: "abd dan abx" },
        correct: "A",
        explanation: "Dua huruf pertama selalu konstan ('ab'). Huruf ketiga melompat 4 langkah (+4):\n• a (bcd) e -> abe\n• e (fgh) i -> abi\n• i (jkl) m -> abm\n• m (nop) q -> abq\nJadi, kelanjutan seri adalah abm dan abq (Pilihan A)."
      },
      {
        id: 35,
        question: "Suatu seri: 15-14-12-15-19-14-8- seri selanjutnya:",
        options: { A: "9", B: "11", C: "13", D: "14", E: "15" },
        correct: "E",
        explanation: "Perhatikan pola perubahan selisih deret:\n15 (-1) 14 (-2) 12 (+3) 15 (+4) 19 (-5) 14 (-6) 8 (+7) 15.\nLangkah selanjutnya adalah penambahan 7 (+7): 8 + 7 = 15 (Pilihan E)."
      },
      {
        id: 36,
        question: "Suatu seri: 28-19-11-6-2-1- seri selanjutnya:",
        options: { A: "0", B: "1", C: "2", D: "3", E: "4" },
        correct: "B",
        explanation: "Pola selisih pengurangan bertingkat:\n• 28 - 9 = 19\n• 19 - 8 = 11\n• 11 - 5 = 6\n• 6 - 4 = 2\n• 2 - 1 = 1\n• 1 - 0 = 1\nJadi, angka selanjutnya adalah 1 (Pilihan B)."
      },
      {
        id: 37,
        question: "Suatu seri: 40-39-37-40-36-31- seri selanjutnya:",
        options: { A: "37", B: "36", C: "35", D: "34", E: "33" },
        correct: "A",
        explanation: "Pola variasi selisih bertingkat:\n• 40 (-1) 39\n• 39 (-2) 37\n• 37 (+3) 40\n• 40 (-4) 36\n• 36 (-5) 31\n• 31 (+6) 37\nOperasi berikutnya adalah penambahan 6 (+6): 31 + 6 = 37 (Pilihan A)."
      },
      {
        id: 38,
        question: "1, 2, 4, 5, 25, 26, ..., ...",
        options: { A: "27 dan 54", B: "51 dan 52", C: "60 dan 82", D: "254 dan 275", E: "226 dan 227" },
        correct: "E",
        explanation: "Pola pertambahan selisih berpangkat 10:\n• 1 (+1) 2 (+2) 4 (+1) 5 (+20) 25 (+1) 26 (+200) 226 (+1) 227\n• Bilangan pertama = 26 + 200 = 226\n• Bilangan kedua = 226 + 1 = 227\nJadi, dua bilangan berikutnya adalah 226 dan 227 (Pilihan E)."
      },
      {
        id: 39,
        question: "A, G, ..., S, ...",
        options: { A: "H dan N", B: "J dan O", C: "M dan Y", D: "N dan Q", E: "O dan R" },
        correct: "C",
        explanation: "Pola deret huruf melompat 6 langkah (+6):\n• A (+6) -> G\n• G (+6) -> M\n• M (+6) -> S\n• S (+6) -> Y\nJadi, huruf pengisi titik-titik adalah M dan Y (Pilihan C)."
      },
      {
        id: 40,
        question: "54 - 42 - 32 - 24 - 18 - ...",
        options: { A: "14", B: "16", C: "13", D: "15", E: "12" },
        correct: "A",
        explanation: "Pola pengurangan bilangan genap yang semakin mengecil:\n• 54 - 12 = 42\n• 42 - 10 = 32\n• 32 - 8 = 24\n• 24 - 6 = 18\n• 18 - 4 = 14\nJadi, bilangan selanjutnya adalah 14 (Pilihan A)."
      },
      {
        id: 41,
        question: "9 - 5 - 1 - 2 - 10 - 6 - 2 - 3 - 11 - 7 - ...",
        options: { A: "3", B: "6", C: "9", D: "7", E: "12" },
        correct: "A",
        explanation: "Pola pengelompokan suku dengan penyela:\n• Kelompok 1: (9, 5, 1) dengan penyela 2 (selisih -4, -4)\n• Kelompok 2: (10, 6, 2) dengan penyela 3 (selisih -4, -4)\n• Kelompok 3: (11, 7, ...) dengan selisih -4: 7 - 4 = 3.\nJadi, angka selanjutnya adalah 3 (Pilihan A)."
      },
      {
        id: 42,
        question: "13 - 14 - 13 - 14 - 11 - 12 - 11 - 12 - 15 - 16 - 15 - 16 - 13 - ...",
        options: { A: "14 - 13 - 14", B: "16 - 17 - 16", C: "13 - 14 - 13", D: "15 - 16 - 15", E: "12 - 11 - 12" },
        correct: "A",
        explanation: "Pola blok berulang 4 bilangan selang-seling:\n• Blok 1: 13-14-13-14\n• Blok 2: 11-12-11-12 (-2)\n• Blok 3: 15-16-15-16 (+4)\n• Blok 4 dimulai kembali dengan pola dasar: 13-14-13-14\nSetelah angka 13 pada blok 4, tiga bilangan berikutnya adalah 14 - 13 - 14 (Pilihan A)."
      },
      {
        id: 43,
        question: "92, 88, 84, 80, 76, ..., ...",
        options: { A: "72 dan 68", B: "71 dan 69", C: "70 dan 68", D: "69 dan 65", E: "68 dan 62" },
        correct: "A",
        explanation: "Pola pengurangan konstan 4 (-4):\n• 76 - 4 = 72\n• 72 - 4 = 68\nJadi, dua bilangan selanjutnya adalah 72 dan 68 (Pilihan A)."
      },
      {
        id: 44,
        question: "2, 5, 10, 17, 26, ..., ...",
        options: { A: "41 dan 54", B: "39 dan 52", C: "37 dan 50", D: "35 dan 48", E: "33 dan 47" },
        correct: "C",
        explanation: "Pola pertambahan bilangan ganjil berurutan (+3, +5, +7, +9, +11, +13):\n• 26 + 11 = 37\n• 37 + 13 = 50\nJadi, dua bilangan selanjutnya adalah 37 dan 50 (Pilihan C)."
      },
      {
        id: 45,
        question: "2040, 2040, 1020, 340, 85, ...",
        options: { A: "68", B: "51", C: "42", D: "21", E: "17" },
        correct: "E",
        explanation: "Pola pembagian bilangan bertingkat (:1, :2, :3, :4, :5):\n• 2040 : 1 = 2040\n• 2040 : 2 = 1020\n• 1020 : 3 = 340\n• 340 : 4 = 85\n• 85 : 5 = 17\nJadi, bilangan selanjutnya adalah 17 (Pilihan E)."
      },
      {
        id: 46,
        question: "3, 8, 6, 12, 11, ..., ...",
        options: { A: "18 dan 18", B: "17 dan 21", C: "17 dan 15", D: "16 dan 22", E: "16 dan 18" },
        correct: "A",
        explanation: "Pola selang-seling operasi:\n• 3 (+5) 8 (-2) 6 (+6) 12 (-1) 11 (+7) 18 (-0) 18.\n• X = 11 + 7 = 18\n• Y = 18 - 0 = 18\nJadi, dua bilangan selanjutnya adalah 18 dan 18 (Pilihan A)."
      },
      {
        id: 47,
        question: "2, 3, 6, 7, 14, 15, ..., ...",
        options: { A: "22 dan 32", B: "23 dan 32", C: "30 dan 31", D: "30 dan 32", E: "33 dan 30" },
        correct: "C",
        explanation: "Pola bergantian operasi (+1) dan (x2):\n• 2 (+1) 3 (x2) 6 (+1) 7 (x2) 14 (+1) 15 (x2) 30 (+1) 31.\n• X = 15 x 2 = 30\n• Y = 30 + 1 = 31\nJadi, dua bilangan selanjutnya adalah 30 dan 31 (Pilihan C)."
      },
      {
        id: 48,
        question: "10, 12, 24, 26, 52, 54, 108, ...",
        options: { A: "112", B: "216", C: "110", D: "124", E: "214" },
        correct: "C",
        explanation: "Pola bergantian operasi (+2) dan (x2):\n• 10 (+2) 12 (x2) 24 (+2) 26 (x2) 52 (+2) 54 (x2) 108 (+2) 110.\nJadi, bilangan selanjutnya adalah 108 + 2 = 110 (Pilihan C)."
      },
      {
        id: 49,
        question: "Suatu deret 3-5-8-12- deret selanjutnya:",
        options: { A: "15", B: "16", C: "17", D: "18", E: "19" },
        correct: "C",
        explanation: "Pola pertambahan selisih bertingkat (+2, +3, +4, +5):\n• 3 (+2) 5 (+3) 8 (+4) 12 (+5) 17.\nJadi, bilangan selanjutnya adalah 12 + 5 = 17 (Pilihan C)."
      },
      {
        id: 50,
        question: "Suatu deret 3, -1, 6, 2, 9, 5, 12, X deret selanjutnya:",
        options: { A: "5", B: "6", C: "8", D: "9", E: "12" },
        correct: "C",
        explanation: "Pola 2 larik berselang dengan penambahan 3 (+3):\n• Larik ganjil: 3 (+3) 6 (+3) 9 (+3) 12\n• Larik genap: -1 (+3) 2 (+3) 5 (+3) 8\nAtau pola selang-seling (-4, +7):\n• 12 - 4 = 8.\nJadi, nilai X deret selanjutnya adalah 8 (Pilihan C)."
      }
    ]
  }
];

/**
 * Storage Helpers untuk Riwayat Percobaan Peserta
 */
const STORAGE_PREFIX = "cscp_practice_history_";

export function getUserId(userData) {
  return userData?.profile?.id || userData?.user?.id || "guest";
}

export function getUserHistory(userId, packageId = null) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    if (packageId) {
      return list.filter(item => item.packageId === packageId);
    }
    return list;
  } catch (e) {
    console.warn("Gagal membaca riwayat latihan:", e);
    return [];
  }
}

export function saveUserAttempt(userId, attemptData) {
  try {
    const currentList = getUserHistory(userId);
    const newAttempt = {
      attemptId: "att_" + Date.now(),
      timestamp: new Date().toISOString(),
      formattedDate: new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date()),
      ...attemptData
    };
    currentList.unshift(newAttempt);
    // Simpan maksimal 50 riwayat latihan terakhir
    const trimmed = currentList.slice(0, 50);
    localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify(trimmed));
    return newAttempt;
  } catch (e) {
    console.error("Gagal menyimpan riwayat latihan:", e);
    return null;
  }
}

export function getPackageById(packageId) {
  return PRACTICE_PACKAGES.find(p => p.id === packageId) || null;
}

export function getOverallUserStats(userId) {
  const history = getUserHistory(userId);
  if (!history.length) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      highestScore: 0,
      passedCount: 0,
      latestAttempt: null
    };
  }

  const totalScore = history.reduce((sum, h) => sum + (h.score || 0), 0);
  const highestScore = Math.max(...history.map(h => h.score || 0));
  const passedCount = history.filter(h => h.isPassed).length;

  return {
    totalAttempts: history.length,
    averageScore: Math.round(totalScore / history.length),
    highestScore,
    passedCount,
    latestAttempt: history[0]
  };
}
