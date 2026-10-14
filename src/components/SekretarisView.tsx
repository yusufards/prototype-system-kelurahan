'use client';

import React from 'react';
import { useKelurahanData } from '../data/KelurahanContext';
import { 
  FileText, 
  Plus, 
  Upload,
  Trash2,
  Boxes, 
  Users, 
  Home, 
  CheckCircle2, 
  Clock, 
  Layers 
} from 'lucide-react';

interface SekretarisViewProps {
  subTab: string;
  onOpenModal: (type: string) => void;
  onOpenUploadExcel: (type: string) => void;
}

export const SekretarisView: React.FC<SekretarisViewProps> = ({ 
  subTab, 
  onOpenModal,
  onOpenUploadExcel,
}) => {
  const { 
    suratMasukList, 
    deleteSuratMasuk,
    suratKeluarList, 
    deleteSuratKeluar,
    bmdList, 
    deleteBMD 
  } = useKelurahanData();

  return (
    <div className="space-y-6">
      
      {/* SubTab Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Sekretaris Kelurahan &mdash; {getSubTabTitle(subTab)}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Modul pengelolaan surat-menyurat, kepegawaian, kerumahtanggan, dan penatausahaan BMD.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => onOpenUploadExcel(subTab)}
            className="px-3 py-2 bg-indigo-700/80 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5 border border-indigo-500/30"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Excel</span>
          </button>
          <button 
            onClick={() => onOpenModal(subTab)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data {getSubTabShortLabel(subTab)}</span>
          </button>
        </div>
      </div>

      {/* Render view based on active subTab */}
      {subTab === 'surat-masuk' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-white">Buku Register Surat Masuk</h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Total {suratMasukList.length} Surat
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-slate-300">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-3 px-4">No. Surat</th>
                  <th className="py-3 px-4">Pengirim</th>
                  <th className="py-3 px-4">Perihal</th>
                  <th className="py-3 px-4">Tgl Masuk</th>
                  <th className="py-3 px-4">Disposisi</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {suratMasukList.length === 0 ? (
                  <tr><td colSpan={7} className="py-6 text-center text-slate-500">Tidak ada surat masuk</td></tr>
                ) : (
                  suratMasukList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 font-mono font-medium text-blue-400">{item.nomorSurat}</td>
                      <td className="py-3 px-4 font-semibold text-white">{item.pengirim}</td>
                      <td className="py-3 px-4 max-w-xs">{item.perihal}</td>
                      <td className="py-3 px-4 text-slate-400">{item.tanggalMasuk}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-amber-300">{item.disposisi}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Selesai' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          onClick={() => deleteSuratMasuk(item.id)}
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

      {subTab === 'surat-keluar' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-white">Buku Register Surat Keluar</h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Total {suratKeluarList.length} Surat
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-slate-300">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-3 px-4">No. Surat</th>
                  <th className="py-3 px-4">Tujuan</th>
                  <th className="py-3 px-4">Perihal</th>
                  <th className="py-3 px-4">Tgl Keluar</th>
                  <th className="py-3 px-4">Penandatangan</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {suratKeluarList.length === 0 ? (
                  <tr><td colSpan={7} className="py-6 text-center text-slate-500">Tidak ada surat keluar</td></tr>
                ) : (
                  suratKeluarList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 font-mono font-medium text-teal-400">{item.nomorSurat}</td>
                      <td className="py-3 px-4 font-semibold text-white">{item.tujuan}</td>
                      <td className="py-3 px-4 max-w-xs">{item.perihal}</td>
                      <td className="py-3 px-4 text-slate-400">{item.tanggalKeluar}</td>
                      <td className="py-3 px-4 text-slate-300">{item.penandatangan}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          onClick={() => deleteSuratKeluar(item.id)}
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

      {subTab === 'bmd' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-white">Inventaris Barang Milik Daerah (BMD)</h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Total {bmdList.length} Barang
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-slate-300">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-3 px-4">Kode Barang</th>
                  <th className="py-3 px-4">Nama Barang</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Tahun</th>
                  <th className="py-3 px-4">Lokasi Ruang</th>
                  <th className="py-3 px-4 text-center">Kondisi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bmdList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-3 px-4 font-mono font-medium text-rose-400">{item.kodeBarang}</td>
                    <td className="py-3 px-4 font-semibold text-white">{item.namaBarang}</td>
                    <td className="py-3 px-4 text-slate-300">{item.kategori}</td>
                    <td className="py-3 px-4 text-slate-400">{item.tahunPerolehan}</td>
                    <td className="py-3 px-4 text-slate-300">{item.lokasiRuang}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.kondisi === 'Baik' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {item.kondisi}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => deleteBMD(item.id)}
                        className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(subTab === 'kerumahtanggaan' || subTab === 'kepegawaian' || subTab === 'progker') && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white capitalize">
            {getSubTabTitle(subTab)}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Kelola arsip {getSubTabTitle(subTab)} dengan input formulir atau impor file Excel.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => onOpenUploadExcel(subTab)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 text-xs font-semibold rounded-lg border border-slate-700 shadow transition flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Excel</span>
            </button>
            <button 
              onClick={() => onOpenModal(subTab)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow transition"
            >
              + Input Data {getSubTabShortLabel(subTab)}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

function getSubTabTitle(subTab: string): string {
  switch (subTab) {
    case 'progker': return 'Rencana Program Kerja Kelurahan';
    case 'surat-masuk': return 'Administrasi Surat Masuk';
    case 'surat-keluar': return 'Administrasi Surat Keluar';
    case 'kerumahtanggaan': return 'Pengelolaan Kerumahtanggan';
    case 'kepegawaian': return 'Dokumentasi Kepegawaian';
    case 'bmd': return 'Penatausahaan Barang Milik Daerah (BMD)';
    case 'rencana-giat': return 'Rencana Giat Sekkel';
    default: return subTab;
  }
}

function getSubTabShortLabel(subTab: string): string {
  switch (subTab) {
    case 'surat-masuk': return 'Surat Masuk';
    case 'surat-keluar': return 'Surat Keluar';
    case 'bmd': return 'Barang Milik Daerah';
    default: return 'Giat';
  }
}
