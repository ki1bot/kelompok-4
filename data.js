export const destinationCosts = {
  Bali: {
    transport: 1000000,
    hotel: 1500000,
    food: 650000,
    attraction: 350000,
    shopping: 0,
    otherExpense: 0,
  },
  Yogyakarta: {
    transport: 650000,
    hotel: 900000,
    food: 550000,
    attraction: 400000,
    shopping: 0,
    otherExpense: 0,
  },
  Bandung: {
    transport: 500000,
    hotel: 750000,
    food: 450000,
    attraction: 300000,
    shopping: 0,
    otherExpense: 0,
  },
  Tokyo: {
    transport: 4000000,
    hotel: 2000000,
    food: 1200000,
    attraction: 800000,
    shopping: 0,
    otherExpense: 0,
  },
};

export const expenseFields = [
  "transport",
  "hotel",
  "food",
  "attraction",
  "shopping",
  "otherExpense",
];

export const itineraryTemplates = {
  Bali: {
    1: [
      ["08:00", "Berangkat menuju Bali", "Bandara Soekarno-Hatta"],
      ["11:00", "Check-in penginapan", "Seminyak, Bali"],
      ["13:00", "Makan siang", "Seminyak"],
      ["16:00", "Menikmati suasana pantai", "Pantai Kuta"],
      ["19:00", "Makan malam", "Seminyak"],
    ],
    2: [
      ["07:30", "Sarapan", "Penginapan"],
      ["09:00", "Mengunjungi Pura Tanah Lot", "Tabanan, Bali"],
      ["13:00", "Makan siang", "Canggu"],
      ["15:30", "Jalan-jalan di Canggu", "Canggu, Bali"],
      ["19:30", "Kembali ke penginapan", "Seminyak"],
    ],
    3: [
      ["08:00", "Sarapan pagi", "Penginapan"],
      ["10:00", "Belanja oleh-oleh", "Kuta"],
      ["12:00", "Check-out penginapan", "Seminyak"],
      ["15:00", "Menuju bandara", "Bandara Ngurah Rai"],
    ],
  },
  Yogyakarta: {
    1: [
      ["07:00", "Berangkat menuju Yogyakarta", "Jakarta"],
      ["12:00", "Makan siang", "Yogyakarta"],
      ["14:00", "Check-in hotel", "Pusat Kota Yogyakarta"],
      ["16:00", "Jalan-jalan di Malioboro", "Jalan Malioboro"],
      ["19:00", "Wisata kuliner malam", "Kawasan Malioboro"],
    ],
    2: [
      ["07:00", "Sarapan", "Hotel"],
      ["08:30", "Mengunjungi Candi Prambanan", "Prambanan"],
      ["12:30", "Makan siang", "Sekitar Prambanan"],
      ["15:00", "Wisata Taman Sari", "Kraton, Yogyakarta"],
      ["19:00", "Makan malam", "Pusat Kota"],
    ],
    3: [
      ["08:00", "Sarapan pagi", "Hotel"],
      ["10:00", "Belanja oleh-oleh", "Kawasan Malioboro"],
      ["12:00", "Check-out hotel", "Yogyakarta"],
      ["14:00", "Perjalanan pulang", "Yogyakarta"],
    ],
  },
  Bandung: {
    1: [
      ["07:00", "Berangkat menuju Bandung", "Jakarta"],
      ["10:00", "Jalan-jalan di Braga", "Jalan Braga"],
      ["12:30", "Makan siang", "Pusat Kota Bandung"],
      ["14:00", "Check-in hotel", "Bandung"],
      ["17:00", "Menikmati suasana kota", "Kawasan Dago"],
    ],
    2: [
      ["07:30", "Sarapan", "Hotel"],
      ["09:00", "Wisata alam Lembang", "Lembang"],
      ["12:30", "Makan siang", "Lembang"],
      ["15:00", "Mengunjungi tempat wisata", "Lembang"],
      ["19:00", "Makan malam", "Bandung"],
    ],
    3: [
      ["08:00", "Sarapan", "Hotel"],
      ["10:00", "Belanja oleh-oleh", "Kartika Sari"],
      ["12:00", "Check-out hotel", "Bandung"],
      ["14:00", "Kembali ke Jakarta", "Bandung"],
    ],
  },
  Tokyo: {
    1: [
      ["09:00", "Tiba di Tokyo", "Bandara Haneda"],
      ["12:00", "Makan siang", "Shinjuku"],
      ["14:00", "Check-in hotel", "Shinjuku, Tokyo"],
      ["16:00", "Jalan-jalan di Shibuya", "Shibuya Crossing"],
      ["19:00", "Makan malam", "Shibuya"],
    ],
    2: [
      ["08:00", "Sarapan", "Hotel"],
      ["09:30", "Mengunjungi Senso-ji", "Asakusa"],
      ["12:30", "Makan siang", "Asakusa"],
      ["15:00", "Menjelajahi Akihabara", "Akihabara"],
      ["19:30", "Kembali ke hotel", "Shinjuku"],
    ],
    3: [
      ["08:00", "Sarapan", "Hotel"],
      ["10:00", "Belanja oleh-oleh", "Shinjuku"],
      ["12:00", "Check-out hotel", "Shinjuku"],
      ["15:00", "Menuju bandara", "Bandara Haneda"],
    ],
  },
};

export function createDefaultItineraries() {
  const result = {};

  Object.entries(itineraryTemplates).forEach(([destination, days]) => {
    result[destination] = {};

    Object.entries(days).forEach(([day, activities]) => {
      result[destination][day] = activities.map((activity, index) => ({
        id: `${destination}-${day}-${index + 1}`,
        time: activity[0],
        title: activity[1],
        location: activity[2],
      }));
    });
  });

  return result;
}
