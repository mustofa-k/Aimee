import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Pastikan jalur ini sesuai

// Fungsi filter untuk mencocokkan nama startup
export const filterByStartupName = (startup, startupName) => {
  return startupName
    ? startup.name.toLowerCase() === startupName.toLowerCase()
    : true; // Jika tidak ada nama startup, anggap cocok
};

// Fungsi filter untuk mencocokkan provinsi
export const filterByProvinsi = (startup, provinsi) => {
  return provinsi ? startup.provinsi === provinsi : true; // Jika tidak ada provinsi, anggap cocok
};

// Fungsi filter untuk mencocokkan model bisnis
export const filterByBisnisModel = (startup, bisnisModel) => {
  return bisnisModel ? startup.modelBisnis === bisnisModel : true;
};

// Fungsi filter untuk mencocokkan sektor industri
export const filterBySektorIndustri = (startup, sektorIndustri) => {
  return sektorIndustri ? startup.sektorIndustri === sektorIndustri : true;
};

// Fungsi untuk mencocokkan pendanaan yang mendekati
export const filterByPendanaan = (startup, pendanaan) => {
  if (!pendanaan) return true; // Jika pendanaan tidak diisi, anggap cocok

  const startupPendanaan = Number(startup.pendanaan);
  const inputPendanaan = Number(pendanaan);

  // Jika nilai pendanaan startup lebih besar atau sama dengan input, anggap kecocokan 100%
  if (startupPendanaan >= inputPendanaan) {
    return 100; // Kecocokan penuh jika nilai startup lebih tinggi atau sama
  }

  // Hitung perbedaan antara input dan pendanaan startup
  const diff = inputPendanaan - startupPendanaan;

  // Hitung kecocokan relatif: semakin kecil perbedaannya, semakin tinggi kecocokan
  const relativeDiff = (diff / inputPendanaan) * 100;

  // Kembalikan kecocokan dalam bentuk persentase, minimum 0% dan maksimum 100%
  return Math.max(100 - relativeDiff, 0);
};

// Fungsi untuk mencocokkan jumlah tim yang mendekati
export const filterByJumlahTim = (startup, jumlahTim) => {
  if (!jumlahTim) return true; // Jika tidak ada input, anggap cocok

  const startupTim = Number(startup.ukuranTim);
  const inputTim = Number(jumlahTim);

  if (startupTim >= inputTim) {
    return 100; // Kecocokan penuh jika ukuran tim startup lebih besar atau sama
  }

  const diff = inputTim - startupTim;
  const relativeDiff = (diff / inputTim) * 100;

  return Math.max(100 - relativeDiff, 0);
};

// Fungsi untuk menjalankan filter dan menghitung kecocokan
export const applyFilter = async (formValues, setFilteredData) => {
  const q = collection(db, 'StartupList'); // Ambil semua dokumen dari koleksi StartupList

  try {
    const querySnapshot = await getDocs(q);
    const startups = [];

    querySnapshot.forEach((doc) => {
      const startup = doc.data();

      // Hitung kecocokan filter
      const filters = {
        startupName: formValues.startupName?.trim() || null,
        provinsi: formValues.provinsi?.trim() || null,
        bisnisModel: formValues.bisnisModel?.trim() || null,
        sektorIndustri: formValues.sektorIndustri?.trim() || null,
        pendanaan: formValues.pendanaan || null,
        jumlahTim: formValues.jumlahTim || null,
      };

      // Hitung total filters yang aktif (tidak null)
      const totalFilters = Object.values(filters).filter(Boolean).length;
      let matchedFilters = 0;

      // Periksa kecocokan untuk masing-masing filter
      if (filterByStartupName(startup, filters.startupName)) matchedFilters++;
      if (filterByProvinsi(startup, filters.provinsi)) matchedFilters++;
      if (filterByBisnisModel(startup, filters.bisnisModel)) matchedFilters++;
      if (filterBySektorIndustri(startup, filters.sektorIndustri))
        matchedFilters++;

      // Hitung kecocokan untuk pendanaan dan jumlah tim yang mendekati
      if (filters.pendanaan) {
        const pendanaanMatch = filterByPendanaan(startup, filters.pendanaan);
        matchedFilters += pendanaanMatch / 100; // Hitung kecocokan sebagai persentase (0-1)
      } else {
        matchedFilters++;
      }

      if (filters.jumlahTim) {
        const jumlahTimMatch = filterByJumlahTim(startup, filters.jumlahTim);
        matchedFilters += jumlahTimMatch / 100; // Hitung kecocokan sebagai persentase (0-1)
      } else {
        matchedFilters++;
      }

      // Jika ada filter diterapkan, hitung persentase kecocokan
      const matchPercentage =
        totalFilters > 0
          ? (matchedFilters / totalFilters) * 100 // Persentase bervariasi
          : 100; // Jika tidak ada filter, kecocokan 100%

      // Tambahkan startup dan persentase kecocokan ke array hasil
      startups.push({
        ...startup,
        matchPercentage: Math.min(matchPercentage, 100), // Pastikan tidak lebih dari 100%
      });
    });

    // Urutkan startups berdasarkan persentase kecocokan terbesar ke terkecil
    startups.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Set hasil yang sudah diurutkan
    setFilteredData(startups);
  } catch (error) {
    console.error('Error applying filter: ', error);
  }
};
