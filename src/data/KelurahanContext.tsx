'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Penduduk,
  SuratMasuk,
  SuratKeluar,
  MusrenbangUsulan,
  DataUMKM,
  DataKesehatanKesra,
  PengurusLembaga,
  RencanaGiat,
  ItemBMD,
  mockPenduduk,
  mockSuratMasuk,
  mockSuratKeluar,
  mockMusrenbang,
  mockUMKM,
  mockKesehatan,
  mockPengurus,
  mockRencanaGiat,
  mockBMD,
} from '../data/kelurahanData';
import { initialPendudukData } from '../data/initialPenduduk';

// Helper to calculate age from dd/mm/yyyy or year
function calculateAge(tglLahir?: string): number {
  if (!tglLahir) return 0;
  const parts = tglLahir.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const birthDate = new Date(year, month, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return Math.max(0, age);
  }
  return 0;
}

// Convert raw prepared import item into typed Penduduk
function mapPreparedToPenduduk(item: any, index: number): Penduduk {
  const rwStr = item.RW ? (item.RW.startsWith('RW') ? item.RW : `RW ${item.RW}`) : 'RW 01';
  const rtStr = item.RT ? (item.RT.startsWith('RT') ? item.RT : `RT ${item.RT}`) : 'RT 01';
  const genderCode = (item.JenisKelamin && item.JenisKelamin.toLowerCase().includes('perempuan')) ? 'P' : 'L';
  const usia = calculateAge(item.TanggalLahir);

  return {
    id: `PDK-${String(index + 1).padStart(4, '0')}`,
    nik: item.NIK || `327301${String(index + 1).padStart(10, '0')}`,
    nama: item.Nama || (item.NIK ? `Warga (${item.NIK})` : `Warga No. ${index + 1}`),
    gender: genderCode,
    usia: usia > 0 ? usia : 25,
    rw: rwStr,
    rt: rtStr,
    alamat: item.Alamat || 'Kelurahan Lebakgede',
    statusSipil: (item.StatusPerkawinan?.toLowerCase().includes('kawin') ? 'Tetap' : 'Tetap') as any,
    pekerjaan: item.Pekerjaan || 'Wiraswasta',
    noKk: item.NoKK || '',
    tempatLahir: item.TempatLahir || '',
    tanggalLahir: item.TanggalLahir || '',
    statusPerkawinan: item.StatusPerkawinan || '',
    agama: item.Agama || 'Islam',
    pendidikan: item.Pendidikan || '',
    kedudukanKeluarga: item.KedudukanKeluarga || '',
    golonganDarah: item.GolonganDarah || '',
    kewarganegaraan: item.Kewarganegaraan || 'WNI',
    namaAyah: item.NamaAyah || '',
    namaIbu: item.NamaIbu || '',
    suku: item.Suku || 'Sunda',
    tglKawin: item.TglKawin || '',
    catatanImpor: item.CatatanImpor || '',
  };
}

// Initial combined penduduk data: mockPenduduk + DataPendudukKelurahanLebakGede
const defaultPendudukList: Penduduk[] = [
  ...mockPenduduk,
  ...initialPendudukData.map((d, i) => mapPreparedToPenduduk(d, mockPenduduk.length + i)),
];

interface KelurahanContextType {
  // Penduduk
  pendudukList: Penduduk[];
  addPenduduk: (item: Omit<Penduduk, 'id'>) => void;
  updatePenduduk: (id: string, updated: Partial<Penduduk>) => void;
  deletePenduduk: (id: string) => void;
  importPendudukExcel: (items: any[], replaceAll?: boolean) => void;
  clearPenduduk: () => void;

  // Surat Masuk
  suratMasukList: SuratMasuk[];
  addSuratMasuk: (item: Omit<SuratMasuk, 'id'>) => void;
  updateSuratMasuk: (id: string, updated: Partial<SuratMasuk>) => void;
  deleteSuratMasuk: (id: string) => void;
  importSuratMasukExcel: (items: any[], replaceAll?: boolean) => void;

  // Surat Keluar
  suratKeluarList: SuratKeluar[];
  addSuratKeluar: (item: Omit<SuratKeluar, 'id'>) => void;
  updateSuratKeluar: (id: string, updated: Partial<SuratKeluar>) => void;
  deleteSuratKeluar: (id: string) => void;
  importSuratKeluarExcel: (items: any[], replaceAll?: boolean) => void;

  // Musrenbang
  musrenbangList: MusrenbangUsulan[];
  addMusrenbang: (item: Omit<MusrenbangUsulan, 'id'>) => void;
  updateMusrenbang: (id: string, updated: Partial<MusrenbangUsulan>) => void;
  deleteMusrenbang: (id: string) => void;
  importMusrenbangExcel: (items: any[], replaceAll?: boolean) => void;

  // UMKM
  umkmList: DataUMKM[];
  addUMKM: (item: Omit<DataUMKM, 'id'>) => void;
  updateUMKM: (id: string, updated: Partial<DataUMKM>) => void;
  deleteUMKM: (id: string) => void;
  importUMKMExcel: (items: any[], replaceAll?: boolean) => void;

  // Kesehatan
  kesehatanList: DataKesehatanKesra[];
  addKesehatan: (item: Omit<DataKesehatanKesra, 'id'>) => void;
  updateKesehatan: (id: string, updated: Partial<DataKesehatanKesra>) => void;
  deleteKesehatan: (id: string) => void;
  importKesehatanExcel: (items: any[], replaceAll?: boolean) => void;

  // Pengurus
  pengurusList: PengurusLembaga[];
  addPengurus: (item: Omit<PengurusLembaga, 'id'>) => void;
  updatePengurus: (id: string, updated: Partial<PengurusLembaga>) => void;
  deletePengurus: (id: string) => void;
  importPengurusExcel: (items: any[], replaceAll?: boolean) => void;

  // Rencana Giat
  rencanaGiatList: RencanaGiat[];
  addRencanaGiat: (item: Omit<RencanaGiat, 'id'>) => void;
  updateRencanaGiat: (id: string, updated: Partial<RencanaGiat>) => void;
  deleteRencanaGiat: (id: string) => void;
  importRencanaGiatExcel: (items: any[], replaceAll?: boolean) => void;

  // BMD
  bmdList: ItemBMD[];
  addBMD: (item: Omit<ItemBMD, 'id'>) => void;
  updateBMD: (id: string, updated: Partial<ItemBMD>) => void;
  deleteBMD: (id: string) => void;
  importBMDExcel: (items: any[], replaceAll?: boolean) => void;

  // Generic record add / import for modal
  addGenericRecord: (type: string, data: any) => void;
  importGenericExcel: (type: string, rows: any[], replaceAll?: boolean) => void;
}

const KelurahanDataContext = createContext<KelurahanContextType | undefined>(undefined);

export const KelurahanDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In-memory state only (no database, no localStorage persistence so refresh = reset to default)
  const [pendudukList, setPendudukList] = useState<Penduduk[]>(defaultPendudukList);
  const [suratMasukList, setSuratMasukList] = useState<SuratMasuk[]>(mockSuratMasuk);
  const [suratKeluarList, setSuratKeluarList] = useState<SuratKeluar[]>(mockSuratKeluar);
  const [musrenbangList, setMusrenbangList] = useState<MusrenbangUsulan[]>(mockMusrenbang);
  const [umkmList, setUmkmList] = useState<DataUMKM[]>(mockUMKM);
  const [kesehatanList, setKesehatanList] = useState<DataKesehatanKesra[]>(mockKesehatan);
  const [pengurusList, setPengurusList] = useState<PengurusLembaga[]>(mockPengurus);
  const [rencanaGiatList, setRencanaGiatList] = useState<RencanaGiat[]>(mockRencanaGiat);
  const [bmdList, setBmdList] = useState<ItemBMD[]>(mockBMD);

  // Penduduk CRUD
  const addPenduduk = (item: Omit<Penduduk, 'id'>) => {
    const newItem: Penduduk = {
      ...item,
      id: `PDK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    setPendudukList(prev => [newItem, ...prev]);
  };

  const updatePenduduk = (id: string, updated: Partial<Penduduk>) => {
    setPendudukList(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deletePenduduk = (id: string) => {
    setPendudukList(prev => prev.filter(p => p.id !== id));
  };

  const clearPenduduk = () => {
    setPendudukList([]);
  };

  const importPendudukExcel = (items: any[], replaceAll = false) => {
    const newItems: Penduduk[] = items.map((raw, idx) => {
      const rw = raw.RW || raw.rw || raw['Rukun Warga'] || 'RW 01';
      const rt = raw.RT || raw.rt || raw['Rukun Tetangga'] || 'RT 01';
      const gender = (raw.JenisKelamin || raw.gender || raw['Jenis Kelamin'] || raw['L/P'] || 'L').toString().toUpperCase().startsWith('P') ? 'P' : 'L';
      const usiaVal = raw.Usia || raw.usia || calculateAge(raw.TanggalLahir || raw['Tanggal Lahir']);
      
      return {
        id: `PDK-IMP-${Date.now()}-${idx}`,
        nik: String(raw.NIK || raw.nik || raw['No NIK'] || `327301${Date.now()}${idx}`),
        nama: raw.Nama || raw.nama || raw['Nama Lengkap'] || raw.Name || 'Warga Tanpa Nama',
        gender: gender as 'L' | 'P',
        usia: Number(usiaVal) || 25,
        rw: rw.toString().startsWith('RW') ? rw.toString() : `RW ${rw}`,
        rt: rt.toString().startsWith('RT') ? rt.toString() : `RT ${rt}`,
        alamat: raw.Alamat || raw.alamat || 'Kelurahan Lebakgede',
        statusSipil: (raw.StatusSipil || raw.statusSipil || raw['Status'] || 'Tetap') as any,
        pekerjaan: raw.Pekerjaan || raw.pekerjaan || 'Wiraswasta',
        noKk: raw.NoKK || raw.noKk || raw['No. KK'] || raw['Nomor KK'] || '',
        tempatLahir: raw.TempatLahir || raw.tempatLahir || raw['Tempat Lahir'] || '',
        tanggalLahir: raw.TanggalLahir || raw.tanggalLahir || raw['Tanggal Lahir'] || '',
        statusPerkawinan: raw.StatusPerkawinan || raw.statusPerkawinan || raw['Status Perkawinan'] || '',
        agama: raw.Agama || raw.agama || 'Islam',
        pendidikan: raw.Pendidikan || raw.pendidikan || '',
        kedudukanKeluarga: raw.KedudukanKeluarga || raw.kedudukanKeluarga || raw['Kedudukan dalam Keluarga'] || '',
        golonganDarah: raw.GolonganDarah || raw.golonganDarah || raw['Gol. Darah'] || '',
        kewarganegaraan: raw.Kewarganegaraan || raw.kewarganegaraan || 'WNI',
        namaAyah: raw.NamaAyah || raw.namaAyah || raw['Nama Ayah'] || '',
        namaIbu: raw.NamaIbu || raw.namaIbu || raw['Nama Ibu'] || '',
        suku: raw.Suku || raw.suku || 'Sunda',
        tglKawin: raw.TglKawin || raw.tglKawin || '',
        catatanImpor: raw.CatatanImpor || raw.catatanImpor || 'Impor Excel',
      };
    });

    if (replaceAll) {
      setPendudukList(newItems);
    } else {
      setPendudukList(prev => [...newItems, ...prev]);
    }
  };

  // Surat Masuk CRUD
  const addSuratMasuk = (item: Omit<SuratMasuk, 'id'>) => {
    setSuratMasukList(prev => [{ ...item, id: `SM-${Date.now()}` }, ...prev]);
  };
  const updateSuratMasuk = (id: string, updated: Partial<SuratMasuk>) => {
    setSuratMasukList(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };
  const deleteSuratMasuk = (id: string) => {
    setSuratMasukList(prev => prev.filter(s => s.id !== id));
  };
  const importSuratMasukExcel = (items: any[], replaceAll = false) => {
    const mapped: SuratMasuk[] = items.map((r, i) => ({
      id: `SM-IMP-${Date.now()}-${i}`,
      nomorSurat: r['Nomor Surat'] || r.nomorSurat || r.NoSurat || `SURAT-${i+1}`,
      pengirim: r['Pengirim'] || r.pengirim || 'Instansi Terkait',
      perihal: r['Perihal'] || r.perihal || 'Perihal Surat',
      tanggalMasuk: r['Tanggal Masuk'] || r.tanggalMasuk || new Date().toISOString().split('T')[0],
      disposisi: r['Disposisi'] || r.disposisi || 'Lurah -> Sekkel',
      status: (r['Status'] || r.status || 'Diterima') as any,
    }));
    setSuratMasukList(prev => replaceAll ? mapped : [...mapped, ...prev]);
  };

  // Surat Keluar CRUD
  const addSuratKeluar = (item: Omit<SuratKeluar, 'id'>) => {
    setSuratKeluarList(prev => [{ ...item, id: `SK-${Date.now()}` }, ...prev]);
  };
  const updateSuratKeluar = (id: string, updated: Partial<SuratKeluar>) => {
    setSuratKeluarList(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };
  const deleteSuratKeluar = (id: string) => {
    setSuratKeluarList(prev => prev.filter(s => s.id !== id));
  };
  const importSuratKeluarExcel = (items: any[], replaceAll = false) => {
    const mapped: SuratKeluar[] = items.map((r, i) => ({
      id: `SK-IMP-${Date.now()}-${i}`,
      nomorSurat: r['Nomor Surat'] || r.nomorSurat || `SK-${i+1}`,
      tujuan: r['Tujuan'] || r.tujuan || 'Penerima Surat',
      perihal: r['Perihal'] || r.perihal || 'Perihal Surat',
      tanggalKeluar: r['Tanggal Keluar'] || r.tanggalKeluar || new Date().toISOString().split('T')[0],
      penandatangan: r['Penandatangan'] || r.penandatangan || 'Lurah Lebakgede',
      status: (r['Status'] || r.status || 'Draft') as any,
    }));
    setSuratKeluarList(prev => replaceAll ? mapped : [...mapped, ...prev]);
  };

  // Musrenbang CRUD
  const addMusrenbang = (item: Omit<MusrenbangUsulan, 'id'>) => {
    setMusrenbangList(prev => [{ ...item, id: `M-${Date.now()}` }, ...prev]);
  };
  const updateMusrenbang = (id: string, updated: Partial<MusrenbangUsulan>) => {
    setMusrenbangList(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };
  const deleteMusrenbang = (id: string) => {
    setMusrenbangList(prev => prev.filter(m => m.id !== id));
  };
  const importMusrenbangExcel = (items: any[], replaceAll = false) => {
    const mapped: MusrenbangUsulan[] = items.map((r, i) => ({
      id: `M-IMP-${Date.now()}-${i}`,
      judulUsulan: r['Judul Usulan'] || r.judulUsulan || 'Usulan Kegiatan',
      rw: r['RW'] || r.rw || 'RW 01',
      kategori: (r['Kategori'] || r.kategori || 'Infrastruktur') as any,
      anggaran: Number(r['Anggaran'] || r.anggaran) || 10000000,
      skalaPrioritas: (r['Skala Prioritas'] || r.skalaPrioritas || 'Sedang') as any,
      status: (r['Status'] || r.status || 'Usulan RW') as any,
    }));
    setMusrenbangList(prev => replaceAll ? mapped : [...mapped, ...prev]);
  };

  // UMKM CRUD
  const addUMKM = (item: Omit<DataUMKM, 'id'>) => {
    setUmkmList(prev => [{ ...item, id: `U-${Date.now()}` }, ...prev]);
  };
  const updateUMKM = (id: string, updated: Partial<DataUMKM>) => {
    setUmkmList(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
  };
  const deleteUMKM = (id: string) => {
    setUmkmList(prev => prev.filter(u => u.id !== id));
  };
  const importUMKMExcel = (items: any[], replaceAll = false) => {
    const mapped: DataUMKM[] = items.map((r, i) => ({
      id: `U-IMP-${Date.now()}-${i}`,
      namaUsaha: r['Nama Usaha'] || r.namaUsaha || 'Nama Usaha',
      pemilik: r['Pemilik'] || r.pemilik || 'Nama Pemilik',
      kategori: (r['Kategori'] || r.kategori || 'Kuliner') as any,
      rw: r['RW'] || r.rw || 'RW 01',
      rt: r['RT'] || r.rt || 'RT 01',
      kontak: String(r['Kontak'] || r.kontak || '-'),
      omzetBulanan: Number(r['Omzet Bulanan'] || r.omzetBulanan) || 5000000,
      bantuanPemerintah: Boolean(r['Bantuan Pemerintah'] || r.bantuanPemerintah),
    }));
    setUmkmList(prev => replaceAll ? mapped : [...mapped, ...prev]);
  };

  // Kesehatan CRUD
  const addKesehatan = (item: Omit<DataKesehatanKesra, 'id'>) => {
    setKesehatanList(prev => [{ ...item, id: `K-${Date.now()}` }, ...prev]);
  };
  const updateKesehatan = (id: string, updated: Partial<DataKesehatanKesra>) => {
    setKesehatanList(prev => prev.map(k => k.id === id ? { ...k, ...updated } : k));
  };
  const deleteKesehatan = (id: string) => {
    setKesehatanList(prev => prev.filter(k => k.id !== id));
  };
  const importKesehatanExcel = (items: any[], replaceAll = false) => {
    const mapped: DataKesehatanKesra[] = items.map((r, i) => ({
      id: `K-IMP-${Date.now()}-${i}`,
      nik: String(r['NIK'] || r.nik || `327301${Date.now()}${i}`),
      nama: r['Nama'] || r.nama || 'Nama Sasaran',
      kategori: (r['Kategori'] || r.kategori || 'Balita') as any,
      rw: r['RW'] || r.rw || 'RW 01',
      rt: r['RT'] || r.rt || 'RT 01',
      statusKesehatan: (r['Status Kesehatan'] || r.statusKesehatan || 'Sehat') as any,
      posyandu: r['Posyandu'] || r.posyandu || 'Posyandu Melati',
      pemeriksaanTerakhir: r['Pemeriksaan Terakhir'] || r.pemeriksaanTerakhir || new Date().toISOString().split('T')[0],
    }));
    setKesehatanList(prev => replaceAll ? mapped : [...mapped, ...prev]);
  };

  // Pengurus CRUD
  const addPengurus = (item: Omit<PengurusLembaga, 'id'>) => {
    setPengurusList(prev => [{ ...item, id: `L-${Date.now()}` }, ...prev]);
  };
  const updatePengurus = (id: string, updated: Partial<PengurusLembaga>) => {
    setPengurusList(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };
  const deletePengurus = (id: string) => {
    setPengurusList(prev => prev.filter(p => p.id !== id));
  };
  const importPengurusExcel = (items: any[], replaceAll = false) => {
    const mapped: PengurusLembaga[] = items.map((r, i) => ({
      id: `L-IMP-${Date.now()}-${i}`,
      lembaga: (r['Lembaga'] || r.lembaga || 'RW') as any,
      namaPengurus: r['Nama Pengurus'] || r.namaPengurus || 'Nama Pengurus',
      jabatan: r['Jabatan'] || r.jabatan || 'Pengurus',
      rw: r['RW'] || r.rw || 'RW 01',
      rt: r['RT'] || r.rt,
      kontak: String(r['Kontak'] || r.kontak || '-'),
      periode: r['Periode'] || r.periode || '2024 - 2027',
    }));
    setPengurusList(prev => replaceAll ? mapped : [...mapped, ...prev]);
  };

  // Rencana Giat CRUD
  const addRencanaGiat = (item: Omit<RencanaGiat, 'id'>) => {
    setRencanaGiatList(prev => [{ ...item, id: `G-${Date.now()}` }, ...prev]);
  };
  const updateRencanaGiat = (id: string, updated: Partial<RencanaGiat>) => {
    setRencanaGiatList(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g));
  };
  const deleteRencanaGiat = (id: string) => {
    setRencanaGiatList(prev => prev.filter(g => g.id !== id));
  };
  const importRencanaGiatExcel = (items: any[], replaceAll = false) => {
    const mapped: RencanaGiat[] = items.map((r, i) => ({
      id: `G-IMP-${Date.now()}-${i}`,
      seksi: (r['Seksi'] || r.seksi || 'Kelurahan') as any,
      namaKegiatan: r['Nama Kegiatan'] || r.namaKegiatan || 'Nama Kegiatan',
      tanggal: r['Tanggal'] || r.tanggal || new Date().toISOString().split('T')[0],
      waktu: r['Waktu'] || r.waktu || '09:00 - 12:00',
      lokasi: r['Lokasi'] || r.lokasi || 'Aula Kelurahan',
      penanggungJawab: r['Penanggung Jawab'] || r.penanggungJawab || 'Sekkel',
      status: (r['Status'] || r.status || 'Rencana') as any,
    }));
    setRencanaGiatList(prev => replaceAll ? mapped : [...mapped, ...prev]);
  };

  // BMD CRUD
  const addBMD = (item: Omit<ItemBMD, 'id'>) => {
    setBmdList(prev => [{ ...item, id: `B-${Date.now()}` }, ...prev]);
  };
  const updateBMD = (id: string, updated: Partial<ItemBMD>) => {
    setBmdList(prev => prev.map(b => b.id === id ? { ...b, ...updated } : b));
  };
  const deleteBMD = (id: string) => {
    setBmdList(prev => prev.filter(b => b.id !== id));
  };
  const importBMDExcel = (items: any[], replaceAll = false) => {
    const mapped: ItemBMD[] = items.map((r, i) => ({
      id: `B-IMP-${Date.now()}-${i}`,
      kodeBarang: r['Kode Barang'] || r.kodeBarang || `BMD-${Date.now()}`,
      namaBarang: r['Nama Barang'] || r.namaBarang || 'Nama Barang',
      kategori: (r['Kategori'] || r.kategori || 'Elektronik') as any,
      tahunPerolehan: Number(r['Tahun Perolehan'] || r.tahunPerolehan) || 2024,
      kondisi: (r['Kondisi'] || r.kondisi || 'Baik') as any,
      lokasiRuang: r['Lokasi Ruang'] || r.lokasiRuang || 'Ruang Kelurahan',
    }));
    setBmdList(prev => replaceAll ? mapped : [...mapped, ...prev]);
  };

  // Generic record add router
  const addGenericRecord = (type: string, data: any) => {
    if (type === 'kependudukan') {
      addPenduduk({
        nik: data.nik || `327301${Date.now()}`,
        nama: data.nama || 'Warga Baru',
        gender: data.gender || 'L',
        usia: Number(data.usia) || 30,
        rw: data.rw || 'RW 01',
        rt: data.rt || 'RT 01',
        alamat: data.alamat || 'Jl. Lebak Gede',
        statusSipil: data.statusSipil || 'Tetap',
        pekerjaan: data.pekerjaan || 'Wiraswasta',
        noKk: data.noKk || '',
        tempatLahir: data.tempatLahir || '',
        tanggalLahir: data.tanggalLahir || '',
        statusPerkawinan: data.statusPerkawinan || '',
        agama: data.agama || 'Islam',
        pendidikan: data.pendidikan || '',
        kedudukanKeluarga: data.kedudukanKeluarga || '',
        golonganDarah: data.golonganDarah || '',
        kewarganegaraan: data.kewarganegaraan || 'WNI',
        namaAyah: data.namaAyah || '',
        namaIbu: data.namaIbu || '',
        suku: data.suku || 'Sunda',
        tglKawin: data.tglKawin || '',
        catatanImpor: '',
      });
    } else if (type === 'surat-masuk') {
      addSuratMasuk({
        nomorSurat: data.nomorSurat || `005/${Date.now()}/Kel.Lbg`,
        pengirim: data.nama || data.pengirim || 'Pengirim Surat',
        perihal: data.keterangan || data.perihal || 'Perihal Surat',
        tanggalMasuk: data.tanggalMasuk || new Date().toISOString().split('T')[0],
        disposisi: data.disposisi || 'Lurah -> Sekkel',
        status: 'Diterima',
      });
    } else if (type === 'surat-keluar') {
      addSuratKeluar({
        nomorSurat: data.nomorSurat || `470/${Date.now()}-Kel.Lbg/2026`,
        tujuan: data.nama || data.tujuan || 'Penerima Surat',
        perihal: data.keterangan || data.perihal || 'Perihal Surat Keluar',
        tanggalKeluar: data.tanggalKeluar || new Date().toISOString().split('T')[0],
        penandatangan: 'Lurah Lebakgede',
        status: 'Draft',
      });
    } else if (type === 'musrenbang') {
      addMusrenbang({
        judulUsulan: data.nama || 'Usulan Kegiatan',
        rw: data.rw || 'RW 01',
        kategori: data.kategori || 'Infrastruktur',
        anggaran: Number(data.anggaran) || 15000000,
        skalaPrioritas: data.skalaPrioritas || 'Sedang',
        status: 'Usulan RW',
      });
    } else if (type === 'umkm') {
      addUMKM({
        namaUsaha: data.nama || 'Nama Usaha',
        pemilik: data.pemilik || 'Nama Pemilik',
        kategori: data.kategori || 'Kuliner',
        rw: data.rw || 'RW 01',
        rt: data.rt || 'RT 01',
        kontak: data.kontak || '-',
        omzetBulanan: Number(data.omzetBulanan) || 5000000,
        bantuanPemerintah: false,
      });
    } else if (['balita', 'baduta', 'ibu-hamil', 'lansia'].includes(type)) {
      const kat = type === 'balita' ? 'Balita' : type === 'baduta' ? 'Baduta' : type === 'ibu-hamil' ? 'Ibu Hamil' : 'Lansia';
      addKesehatan({
        nik: data.nik || `327301${Date.now()}`,
        nama: data.nama || 'Nama Sasaran',
        kategori: kat as any,
        rw: data.rw || 'RW 01',
        rt: data.rt || 'RT 01',
        statusKesehatan: data.statusKesehatan || 'Sehat',
        posyandu: data.posyandu || 'Posyandu Melati',
        pemeriksaanTerakhir: new Date().toISOString().split('T')[0],
      });
    } else if (['pengurus-rw', 'pengurus-rt', 'posyandu', 'karang-taruna', 'pkk-rw', 'lpm'].includes(type)) {
      const lembagaMap: Record<string, any> = {
        'pengurus-rw': 'RW',
        'pengurus-rt': 'RT',
        'posyandu': 'Posyandu',
        'karang-taruna': 'Karang Taruna',
        'pkk-rw': 'PKK RW',
        'lpm': 'LPM',
      };
      addPengurus({
        lembaga: lembagaMap[type] || 'RW',
        namaPengurus: data.nama || 'Nama Pengurus',
        jabatan: data.jabatan || 'Pengurus',
        rw: data.rw || 'RW 01',
        rt: data.rt,
        kontak: data.kontak || '-',
        periode: data.periode || '2024 - 2027',
      });
    } else if (type === 'bmd') {
      addBMD({
        kodeBarang: data.kodeBarang || `BMD-${Date.now()}`,
        namaBarang: data.nama || 'Nama Barang',
        kategori: data.kategori || 'Elektronik',
        tahunPerolehan: 2026,
        kondisi: 'Baik',
        lokasiRuang: data.lokasiRuang || 'Ruang Kelurahan',
      });
    } else if (type === 'rencana-giat') {
      addRencanaGiat({
        seksi: data.seksi || 'Kelurahan',
        namaKegiatan: data.nama || 'Kegiatan Kelurahan',
        tanggal: data.tanggal || new Date().toISOString().split('T')[0],
        waktu: data.waktu || '09:00 - 12:00',
        lokasi: data.lokasi || 'Aula Kelurahan',
        penanggungJawab: data.penanggungJawab || 'Sekkel',
        status: 'Rencana',
      });
    }
  };

  // Generic import router
  const importGenericExcel = (type: string, rows: any[], replaceAll = false) => {
    switch (type) {
      case 'kependudukan':
        importPendudukExcel(rows, replaceAll);
        break;
      case 'surat-masuk':
        importSuratMasukExcel(rows, replaceAll);
        break;
      case 'surat-keluar':
        importSuratKeluarExcel(rows, replaceAll);
        break;
      case 'musrenbang':
        importMusrenbangExcel(rows, replaceAll);
        break;
      case 'umkm':
        importUMKMExcel(rows, replaceAll);
        break;
      case 'balita':
      case 'baduta':
      case 'ibu-hamil':
      case 'lansia':
        importKesehatanExcel(rows, replaceAll);
        break;
      case 'pengurus-rw':
      case 'pengurus-rt':
      case 'posyandu':
      case 'karang-taruna':
      case 'pkk-rw':
      case 'lpm':
        importPengurusExcel(rows, replaceAll);
        break;
      case 'bmd':
        importBMDExcel(rows, replaceAll);
        break;
      case 'rencana-giat':
        importRencanaGiatExcel(rows, replaceAll);
        break;
      default:
        importPendudukExcel(rows, replaceAll);
    }
  };

  return (
    <KelurahanDataContext.Provider
      value={{
        pendudukList,
        addPenduduk,
        updatePenduduk,
        deletePenduduk,
        importPendudukExcel,
        clearPenduduk,

        suratMasukList,
        addSuratMasuk,
        updateSuratMasuk,
        deleteSuratMasuk,
        importSuratMasukExcel,

        suratKeluarList,
        addSuratKeluar,
        updateSuratKeluar,
        deleteSuratKeluar,
        importSuratKeluarExcel,

        musrenbangList,
        addMusrenbang,
        updateMusrenbang,
        deleteMusrenbang,
        importMusrenbangExcel,

        umkmList,
        addUMKM,
        updateUMKM,
        deleteUMKM,
        importUMKMExcel,

        kesehatanList,
        addKesehatan,
        updateKesehatan,
        deleteKesehatan,
        importKesehatanExcel,

        pengurusList,
        addPengurus,
        updatePengurus,
        deletePengurus,
        importPengurusExcel,

        rencanaGiatList,
        addRencanaGiat,
        updateRencanaGiat,
        deleteRencanaGiat,
        importRencanaGiatExcel,

        bmdList,
        addBMD,
        updateBMD,
        deleteBMD,
        importBMDExcel,

        addGenericRecord,
        importGenericExcel,
      }}
    >
      {children}
    </KelurahanDataContext.Provider>
  );
};

export const useKelurahanData = () => {
  const context = useContext(KelurahanDataContext);
  if (!context) {
    throw new Error('useKelurahanData must be used within a KelurahanDataProvider');
  }
  return context;
};
