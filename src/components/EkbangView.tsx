'use client';

import React from 'react';
import { useKelurahanData } from '../data/KelurahanContext';
import { 
  Briefcase, 
  Plus, 
  Upload,
  Trash2,
  TrendingUp, 
  ShoppingBag, 
  Sparkles, 
  Building, 
  Layers 
} from 'lucide-react';

interface EkbangViewProps {
  subTab: string;
  onOpenModal: (type: string) => void;
  onOpenUploadExcel: (type: string) => void;
}

export const EkbangView: React.FC<EkbangViewProps> = ({ 
  subTab, 
  onOpenModal,
  onOpenUploadExcel 
}) => {
  const { 
    musrenbangList, 
    deleteMusrenbang, 
    umkmList, 
    deleteUMKM 
  } = useKelurahanData();

  return (
    <div className="space-y-6">
      
      {/* SubTab Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            Seksi Ekonomi &amp; Pembangunan &mdash; {getEkbangTabTitle(subTab)}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Modul pengawalan Musrenbang, pemberdayaan UMKM, kebersihan lingkungan, rumah maggot, dan proyek infrastruktur.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => onOpenUploadExcel(subTab)}
            className="px-3 py-2 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5 border border-amber-500/30"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Excel</span>
          </button>
          <button 
            onClick={() => onOpenModal(subTab)}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data {getEkbangShortLabel(subTab)}</span>
          </button>
        </div>
      </div>

      {/* Musrenbang SubTab View */}
      {subTab === 'musrenbang' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-white">Daftar Usulan Musrenbang Kelurahan</h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Total {musrenbangList.length} Usulan
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-slate-300">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-3 px-4">Usulan Kegiatan</th>
                  <th className="py-3 px-4">RW</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Pagu Anggaran</th>
                  <th className="py-3 px-4">Prioritas</th>
                  <th className="py-3 px-4 text-center">Status Usulan</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {musrenbangList.length === 0 ? (
                  <tr><td colSpan={7} className="py-6 text-center text-slate-500">Belum ada data usulan Musrenbang</td></tr>
                ) : (
                  musrenbangList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 font-semibold text-white max-w-sm">{item.judulUsulan}</td>
                      <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">{item.rw}</td>
                      <td className="py-3 px-4 text-slate-300">{item.kategori}</td>
                      <td className="py-3 px-4 font-mono text-amber-300">Rp {item.anggaran.toLocaleString('id-ID')}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.skalaPrioritas === 'Tinggi' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {item.skalaPrioritas}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Disetujui' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          onClick={() => deleteMusrenbang(item.id)}
                          className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UMKM SubTab View */}
      {subTab === 'umkm' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {umkmList.map((u) => (
              <div key={u.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg relative group">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {u.kategori}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-slate-400">{u.rw} / {u.rt}</span>
                    <button
                      onClick={() => deleteUMKM(u.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition"
                      title="Hapus UMKM"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mt-2">{u.namaUsaha}</h4>
                <p className="text-xs text-slate-400">Pemilik: {u.pemilik}</p>
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Omzet Bulanan</span>
                    <span className="font-mono font-semibold text-emerald-400">Rp {u.omzetBulanan.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Status Bantuan</span>
                    <span className={`text-[10px] font-bold ${u.bantuanPemerintah ? 'text-teal-400' : 'text-slate-400'}`}>
                      {u.bantuanPemerintah ? 'Menerima Bantuan' : 'Mandiri'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sarpras, Kebersihan, Maggot, Infrastruktur, Pemberdayaan */}
      {['sarpras', 'kebersihan', 'maggot', 'infrastruktur', 'pemberdayaan', 'progker'].includes(subTab) && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white capitalize">
            {getEkbangTabTitle(subTab)}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Kelola data dan laporan {getEkbangTabTitle(subTab)} di sistem kelurahan secara real-time.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => onOpenUploadExcel(subTab)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-lg border border-slate-700 shadow transition flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Excel</span>
            </button>
            <button 
              onClick={() => onOpenModal(subTab)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow transition"
            >
              + Input Data {getEkbangShortLabel(subTab)}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

function getEkbangTabTitle(subTab: string): string {
  switch (subTab) {
    case 'progker': return 'Rencana Program Kerja Sie Ekbang';
    case 'musrenbang': return 'Musrenbang Tingkat Kelurahan';
    case 'umkm': return 'Data Koperasi & UMKM';
    case 'sarpras': return 'Data Sarana & Prasarana Fisik';
    case 'kebersihan': return 'Data Petugas Kebersihan';
    case 'maggot': return 'Pengelolaan Rumah Maggot & Kompos';
    case 'infrastruktur': return 'Proyek Pekerjaan Infrastruktur';
    case 'pemberdayaan': return 'Pemberdayaan Ekonomi Masyarakat';
    case 'rencana-giat': return 'Rencana Giat Ekbang';
    default: return subTab;
  }
}

function getEkbangShortLabel(subTab: string): string {
  switch (subTab) {
    case 'musrenbang': return 'Musrenbang';
    case 'umkm': return 'UMKM';
    case 'sarpras': return 'Sarpras';
    case 'kebersihan': return 'Petugas';
    case 'maggot': return 'Maggot';
    case 'infrastruktur': return 'Infrastruktur';
    case 'pemberdayaan': return 'Pemberdayaan';
    default: return 'Giat';
  }
}
