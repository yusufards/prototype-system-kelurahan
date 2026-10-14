export interface Penduduk {
  id: string;
  nik: string;
  nama: string;
  gender: 'L' | 'P';
  usia: number;
  rw: string;
  rt: string;
  alamat: string;
  statusSipil: 'Tetap' | 'Pindah' | 'Sementara';
  pekerjaan: string;
  // Extended fields from DataPendudukKelurahanLebakGede-main
  noKk?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  statusPerkawinan?: string;
  agama?: string;
  pendidikan?: string;
  kedudukanKeluarga?: string;
  golonganDarah?: string;
  kewarganegaraan?: string;
  namaAyah?: string;
  namaIbu?: string;
  suku?: string;
  tglKawin?: string;
  catatanImpor?: string;
}

export interface SuratMasuk {
  id: string;
  nomorSurat: string;
  pengirim: string;
  perihal: string;
  tanggalMasuk: string;
  disposisi: string;
  status: 'Diterima' | 'Proses' | 'Selesai';
}

export interface SuratKeluar {
  id: string;
  nomorSurat: string;
  tujuan: string;
  perihal: string;
  tanggalKeluar: string;
  penandatangan: string;
  status: 'Draft' | 'Menunggu TTD' | 'Telah Terbit';
}

export interface MusrenbangUsulan {
  id: string;
  judulUsulan: string;
  rw: string;
  kategori: 'Infrastruktur' | 'Pemberdayaan' | 'Sosial' | 'Ekonomi';
  anggaran: number;
  skalaPrioritas: 'Tinggi' | 'Sedang' | 'Rendah';
  status: 'Usulan RW' | 'Verifikasi Kelurahan' | 'Disetujui' | 'Ditolak';
}

export interface DataUMKM {
  id: string;
  namaUsaha: string;
  pemilik: string;
  kategori: 'Kuliner' | 'Kerajinan' | 'Jasa' | 'Perdagangan';
  rw: string;
  rt: string;
  kontak: string;
  omzetBulanan: number;
  bantuanPemerintah: boolean;
}

export interface DataKesehatanKesra {
  id: string;
  nik: string;
  nama: string;
  kategori: 'Balita' | 'Baduta' | 'Ibu Hamil' | 'Lansia';
  rw: string;
  rt: string;
  statusKesehatan: 'Sehat' | 'Perlu Perhatian / Risk Stunting' | 'Resti (Risiko Tinggi)';
  posyandu: string;
  pemeriksaanTerakhir: string;
}

export interface PengurusLembaga {
  id: string;
  lembaga: 'Posyandu' | 'Karang Taruna' | 'PKK RW' | 'LPM' | 'RW' | 'RT';
  namaPengurus: string;
  jabatan: string;
  rw: string;
  rt?: string;
  kontak: string;
  periode: string;
}

export interface RencanaGiat {
  id: string;
  seksi: 'Kelurahan' | 'Pemerintahan' | 'Ekbang' | 'Kesra';
  namaKegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  penanggungJawab: string;
  status: 'Rencana' | 'Berjalan' | 'Selesai' | 'Tunda';
}

export interface ItemBMD {
  id: string;
  kodeBarang: string;
  namaBarang: string;
  kategori: 'Elektronik' | 'Kendaraan' | 'Mebel' | 'Bangunan';
  tahunPerolehan: number;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  lokasiRuang: string;
}

// Initial Mock Data
export const mockPenduduk: Penduduk[] = [
  { id: 'P01', nik: '3273011508850001', nama: 'Ahmad Subagja', gender: 'L', usia: 42, rw: 'RW 01', rt: 'RT 02', alamat: 'Jl. Lebak Gede No. 12', statusSipil: 'Tetap', pekerjaan: 'Wiraswasta', agama: 'Islam', pendidikan: 'Tamat SLTA/sederajat', noKk: '3273012301010001' },
  { id: 'P02', nik: '3273015203900004', nama: 'Siti Nurhalizah', gender: 'P', usia: 34, rw: 'RW 01', rt: 'RT 01', alamat: 'Jl. Dipatiukur No. 45', statusSipil: 'Tetap', pekerjaan: 'PNS', agama: 'Islam', pendidikan: 'Tamat S-1/sederajat', noKk: '3273012301010002' },
  { id: 'P03', nik: '3273012111780002', nama: 'Budi Santoso', gender: 'L', usia: 46, rw: 'RW 02', rt: 'RT 03', alamat: 'Jl. Coblong No. 8', statusSipil: 'Tetap', pekerjaan: 'Buruh Harian', agama: 'Islam', pendidikan: 'Tamat SLTP/sederajat', noKk: '3273012301010003' },
  { id: 'P04', nik: '3273016406980005', nama: 'Rina Rahmawati', gender: 'P', usia: 26, rw: 'RW 03', rt: 'RT 01', alamat: 'Gang Lumbung No. 3', statusSipil: 'Tetap', pekerjaan: 'Karyawan Swasta', agama: 'Islam', pendidikan: 'Tamat S-1/sederajat', noKk: '3273012301010004' },
  { id: 'P05', nik: '3273010501600003', nama: 'H. Suherman', gender: 'L', usia: 64, rw: 'RW 04', rt: 'RT 02', alamat: 'Jl. Lebak Siliwangi No. 19', statusSipil: 'Tetap', pekerjaan: 'Pensiunan', agama: 'Islam', pendidikan: 'Tamat SLTA/sederajat', noKk: '3273012301010005' },
];

export const mockSuratMasuk: SuratMasuk[] = [
  { id: 'SM01', nomorSurat: '005/124/Kec.Cbl/2026', pengirim: 'Kecamatan Coblong', perihal: 'Undangan Rapat Koordinasi Penanganan Banjir', tanggalMasuk: '2026-09-22', disposisi: 'Lurah -> Sekkel -> Sie Ekbang', status: 'Selesai' },
  { id: 'SM02', nomorSurat: '440/089/Pusk-Cbl/2026', pengirim: 'Puskesmas Coblong', perihal: 'Laporan Intervensi Stunting Bulanan', tanggalMasuk: '2026-09-24', disposisi: 'Lurah -> Sie Kesra', status: 'Proses' },
  { id: 'SM03', nomorSurat: '100/012/RW03/2026', pengirim: 'Pengurus RW 03', perihal: 'Permohonan Perbaikan Penerangan Jalan Umum', tanggalMasuk: '2026-09-25', disposisi: 'Sekkel -> Sie Ekbang', status: 'Diterima' },
];

export const mockSuratKeluar: SuratKeluar[] = [
  { id: 'SK01', nomorSurat: '470/102-Kel.Lbg/2026', tujuan: 'Dinas Kependudukan & Pencatatan Sipil', perihal: 'Laporan Rekapitulasi Mutasi Penduduk Bulan Agustus', tanggalKeluar: '2026-09-20', penandatangan: 'Lurah Lebakgede', status: 'Telah Terbit' },
  { id: 'SK02', nomorSurat: '005/105-Kel.Lbg/2026', tujuan: 'Para Ketua RW 01 - 06', perihal: 'Undangan Musrenbang Kelurahan Tahun 2027', tanggalKeluar: '2026-09-25', penandatangan: 'Lurah Lebakgede', status: 'Menunggu TTD' },
];

export const mockMusrenbang: MusrenbangUsulan[] = [
  { id: 'M01', judulUsulan: 'Pengaspalan & Perbaikan Drainase Gang Keramat', rw: 'RW 02', kategori: 'Infrastruktur', anggaran: 45000000, skalaPrioritas: 'Tinggi', status: 'Disetujui' },
  { id: 'M02', judulUsulan: 'Pelatihan Olahan Pangan Maggot untuk KUB Bersama', rw: 'RW 04', kategori: 'Ekonomi', anggaran: 15000000, skalaPrioritas: 'Sedang', status: 'Verifikasi Kelurahan' },
  { id: 'M03', judulUsulan: 'Pengadaan Timbangan & Pengukur Tinggi Badan Posyandu Melati', rw: 'RW 01', kategori: 'Sosial', anggaran: 8500000, skalaPrioritas: 'Tinggi', status: 'Disetujui' },
  { id: 'M04', judulUsulan: 'Pemasangan 5 Titik CCTV Lingkungan RW 03', rw: 'RW 03', kategori: 'Infrastruktur', anggaran: 22000000, skalaPrioritas: 'Sedang', status: 'Usulan RW' },
];

export const mockUMKM: DataUMKM[] = [
  { id: 'U01', namaUsaha: 'Warung Nasi Sunda Ibu Cucun', pemilik: 'Cucun Sukaesih', kategori: 'Kuliner', rw: 'RW 01', rt: 'RT 02', kontak: '08123456789', omzetBulanan: 12000000, bantuanPemerintah: true },
  { id: 'U02', namaUsaha: 'Kerajinan Bambu Lebak Siliwangi', pemilik: 'Asep Saepudin', kategori: 'Kerajinan', rw: 'RW 04', rt: 'RT 01', kontak: '08567890123', omzetBulanan: 8500000, bantuanPemerintah: false },
  { id: 'U03', namaUsaha: 'Servis Elektronik FastRep', pemilik: 'Deni Kurnia', kategori: 'Jasa', rw: 'RW 02', rt: 'RT 03', kontak: '08789012345', omzetBulanan: 6000000, bantuanPemerintah: true },
];

export const mockKesehatan: DataKesehatanKesra[] = [
  { id: 'K01', nik: '3273016010240001', nama: 'Ananda Algifari', kategori: 'Balita', rw: 'RW 01', rt: 'RT 02', statusKesehatan: 'Perlu Perhatian / Risk Stunting', posyandu: 'Posyandu Melati 1', pemeriksaanTerakhir: '2026-09-15' },
  { id: 'K02', nik: '3273014502250003', nama: 'Bayi Kenzo', kategori: 'Baduta', rw: 'RW 03', rt: 'RT 01', statusKesehatan: 'Sehat', posyandu: 'Posyandu Mawar 3', pemeriksaanTerakhir: '2026-09-18' },
  { id: 'K03', nik: '3273015504950002', nama: 'Ibu Ratna Dewi', kategori: 'Ibu Hamil', rw: 'RW 02', rt: 'RT 02', statusKesehatan: 'Resti (Risiko Tinggi)', posyandu: 'Posyandu Melati 2', pemeriksaanTerakhir: '2026-09-21' },
  { id: 'K04', nik: '3273010101500001', nama: 'Kakek Sukarna', kategori: 'Lansia', rw: 'RW 05', rt: 'RT 03', statusKesehatan: 'Sehat', posyandu: 'Posyandu Lansia Dahlia', pemeriksaanTerakhir: '2026-09-10' },
];

export const mockPengurus: PengurusLembaga[] = [
  { id: 'L01', lembaga: 'RW', namaPengurus: 'Drs. H. Mulyana', jabatan: 'Ketua RW 01', rw: 'RW 01', kontak: '081122334455', periode: '2024 - 2027' },
  { id: 'L02', lembaga: 'RT', namaPengurus: 'Eko Prasetyo', jabatan: 'Ketua RT 02 / RW 01', rw: 'RW 01', rt: 'RT 02', kontak: '081299887766', periode: '2024 - 2027' },
  { id: 'L03', lembaga: 'Posyandu', namaPengurus: 'Endah Suhaeni', jabatan: 'Ketua Kader Posyandu Melati 1', rw: 'RW 01', kontak: '085711223344', periode: '2025 - 2028' },
  { id: 'L04', lembaga: 'Karang Taruna', namaPengurus: 'Fajar Nugraha', jabatan: 'Ketua Karang Taruna Kelurahan', rw: 'RW 03', kontak: '089677889900', periode: '2024 - 2027' },
  { id: 'L05', lembaga: 'PKK RW', namaPengurus: 'Hj. Nenden Mardiah', jabatan: 'Ketua TP PKK Kelurahan', rw: 'RW 02', kontak: '081344556677', periode: '2024 - 2029' },
  { id: 'L06', lembaga: 'LPM', namaPengurus: 'Ir. Hendra Gunawan', jabatan: 'Ketua LPM Kelurahan', rw: 'RW 04', kontak: '081233445566', periode: '2024 - 2029' },
];

export const mockRencanaGiat: RencanaGiat[] = [
  { id: 'G01', seksi: 'Kelurahan', namaKegiatan: 'Rapat Mingguan Evaluasi Kinerja Kelurahan & Seksi', tanggal: '2026-09-28', waktu: '09:00 - 11:30', lokasi: 'Aula Kelurahan Lebakgede', penanggungJawab: 'Sekkel', status: 'Rencana' },
  { id: 'G02', seksi: 'Pemerintahan', namaKegiatan: 'Jemput Bola Perekaman KTP-El Lansia & Disabilitas', tanggal: '2026-09-29', waktu: '08:30 - 14:00', lokasi: 'Pos RW 05', penanggungJawab: 'Kasie Pemerintahan', status: 'Rencana' },
  { id: 'G03', seksi: 'Ekbang', namaKegiatan: 'Monitoring Lapangan Proyek Drainase RW 02 & Pembinaan Rumah Maggot', tanggal: '2026-09-30', waktu: '10:00 - 12:30', lokasi: 'Wilayah RW 02 & Rumah Maggot RW 04', penanggungJawab: 'Kasie Ekbang', status: 'Rencana' },
  { id: 'G04', seksi: 'Kesra', namaKegiatan: 'Pemberian Makanan Tambahan (PMT) Balita & Penyuluhan Ibu Hamil', tanggal: '2026-10-02', waktu: '08:00 - 11:00', lokasi: 'Posyandu Melati RW 01', penanggungJawab: 'Kasie Kesra & Kader PKK', status: 'Rencana' },
];

export const mockBMD: ItemBMD[] = [
  { id: 'B01', kodeBarang: 'BMD-2023-001', namaBarang: 'Laptop Operational Asus ExpertBook', kategori: 'Elektronik', tahunPerolehan: 2023, kondisi: 'Baik', lokasiRuang: 'Ruang Sekkel' },
  { id: 'B02', kodeBarang: 'BMD-2022-004', namaBarang: 'Motor Dinas Honda Vario 125', kategori: 'Kendaraan', tahunPerolehan: 2022, kondisi: 'Baik', lokasiRuang: 'Garasi Kelurahan' },
  { id: 'B03', kodeBarang: 'BMD-2020-012', namaBarang: 'Printer Heavy Duty Canon Maxify', kategori: 'Elektronik', tahunPerolehan: 2020, kondisi: 'Rusak Ringan', lokasiRuang: 'Ruang Pelayanan' },
];
