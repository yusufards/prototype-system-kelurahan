'use client';

import React from 'react';
import { useKelurahanData } from '../data/KelurahanContext';
import { 
  HeartHandshake, 
  Plus, 
  Upload,
  Trash2,
  HeartPulse, 
  Baby, 
  UserPlus, 
  Users, 
  Sparkles, 
  Activity 
} from 'lucide-react';

interface KesraViewProps {
  subTab: string;
  onOpenModal: (type: string) => void;
  onOpenUploadExcel: (type: string) => void;
}

export const KesraView: React.FC<KesraViewProps> = ({ 
  subTab, 
  onOpenModal,
  onOpenUploadExcel 
}) => {
  const { 
    kesehatanList, 
    deleteKesehatan, 
    pengurusList, 
    deletePengurus 
  } = useKelurahanData();

  // Health Category Filtering
  const isHealthCategory = ['balita', 'baduta', 'ibu-hamil', 'lansia'].includes(subTab);
  const healthCategoryLabel = 
    subTab === 'balita' ? 'Balita' :
    subTab === 'baduta' ? 'Baduta' :
    subTab === 'ibu-hamil' ? 'Ibu Hamil' : 'Lansia';

  const filteredHealth = kesehatanList.filter((k) => k.kategori === healthCategoryLabel);

  // Lembaga Pengurus Filtering
  const isLembagaCategory = ['posyandu', 'karang-taruna', 'pkk-rw', 'lpm'].includes(subTab);
  const lembagaKey = 
    subTab === 'posyandu' ? 'Posyandu' :
    subTab === 'karang-taruna' ? 'Karang Taruna' :
    subTab === 'pkk-rw' ? 'PKK RW' : 'LPM';

  const filteredLembaga = pengurusList.filter((p) => p.lembaga === lembagaKey);

  return (
    <div className="space-y-6">
      
      {/* SubTab Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-rose-400" />
            Seksi Kesejahteraan Sosial &mdash; {getKesraTabTitle(subTab)}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Modul pengawasan kesehatan ibu, anak, lansia, pencegahan stunting, serta pembinaan lembaga kemasyarakatan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => onOpenUploadExcel(subTab)}
            className="px-3 py-2 bg-rose-700/80 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5 border border-rose-500/30"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Excel</span>
          </button>
          <button 
            onClick={() => onOpenModal(subTab)}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data {getKesraShortLabel(subTab)}</span>
          </button>
        </div>
      </div>

      {/* Render Health View (Balita, Baduta, Bumil, Lansia) */}
      {isHealthCategory && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              Monitoring Sasaran {healthCategoryLabel}
            </h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Total {filteredHealth.length} Terdata
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left border-collapse text-xs text-slate-300">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-3 px-4">NIK</th>
                  <th className="py-3 px-4">Nama Lengkap</th>
                  <th className="py-3 px-4">RW / RT</th>
                  <th className="py-3 px-4">Posyandu</th>
                  <th className="py-3 px-4">Pemeriksaan Terakhir</th>
                  <th className="py-3 px-4 text-center">Status Kesehatan / Gizi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHealth.length === 0 ? (
                  <tr><td colSpan={7} className="py-6 text-center text-slate-500">Tidak ada sasaran {healthCategoryLabel} terdaftar</td></tr>
                ) : (
                  filteredHealth.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4 font-mono font-medium text-rose-400">{item.nik}</td>
                      <td className="py-3 px-4 font-semibold text-white">{item.nama}</td>
                      <td className="py-3 px-4 font-mono text-slate-300">{item.rw} / {item.rt}</td>
                      <td className="py-3 px-4 text-slate-300">{item.posyandu}</td>
                      <td className="py-3 px-4 text-slate-400">{item.pemeriksaanTerakhir}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.statusKesehatan.includes('Risk') || item.statusKesehatan.includes('Resti')
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {item.statusKesehatan}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          onClick={() => deleteKesehatan(item.id)}
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

      {/* Render Lembaga View (Posyandu, Karang Taruna, PKK, LPM) */}
      {isLembagaCategory && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-400" />
              Susunan Pengurus {lembagaKey}
            </h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Total {filteredLembaga.length} Pengurus
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLembaga.length === 0 ? (
              <div className="col-span-2 py-8 text-center text-slate-500">Belum ada pengurus terdata untuk lembaga ini.</div>
            ) : (
              filteredLembaga.map((p) => (
                <div key={p.id} className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20">
                      {p.rw}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{p.namaPengurus}</h4>
                    <p className="text-xs text-slate-400">{p.jabatan}</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">Kontak: {p.kontak}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] text-slate-400 bg-slate-700 px-2 py-1 rounded">
                      Periode: {p.periode}
                    </span>
                    <button 
                      onClick={() => deletePengurus(p.id)}
                      className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Potensi Kesra, Pembinaan Lembaga, Progker */}
      {['potensi-kesra', 'pembinaan-lembaga', 'progker'].includes(subTab) && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white capitalize">
            {getKesraTabTitle(subTab)}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Dokumentasi dan pengawasan program {getKesraTabTitle(subTab)} terintegrasi dengan database profil kelurahan.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => onOpenUploadExcel(subTab)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-semibold rounded-lg border border-slate-700 shadow transition flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Excel</span>
            </button>
            <button 
              onClick={() => onOpenModal(subTab)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow transition"
            >
              + Input Data {getKesraShortLabel(subTab)}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

function getKesraTabTitle(subTab: string): string {
  switch (subTab) {
    case 'progker': return 'Rencana Program Kerja Sie Kesra';
    case 'potensi-kesra': return 'Data Inventarisasi Potensi Kesra';
    case 'pembinaan-lembaga': return 'Pembinaan Lembaga Kemasyarakatan';
    case 'posyandu': return 'Data Pengurus Posyandu';
    case 'karang-taruna': return 'Data Pengurus Karang Taruna';
    case 'pkk-rw': return 'Data Pengurus PKK RW';
    case 'lpm': return 'Data Pengurus LPM';
    case 'balita': return 'Data Balita & Deteksi Gizi';
    case 'baduta': return 'Data Baduta (Bawah Dua Tahun)';
    case 'ibu-hamil': return 'Data Ibu Hamil & Resti';
    case 'lansia': return 'Data Lansia Produktif & Risti';
    case 'rencana-giat': return 'Rencana Giat Kesra';
    default: return subTab;
  }
}

function getKesraShortLabel(subTab: string): string {
  switch (subTab) {
    case 'balita': return 'Balita';
    case 'baduta': return 'Baduta';
    case 'ibu-hamil': return 'Ibu Hamil';
    case 'lansia': return 'Lansia';
    case 'posyandu': return 'Pengurus Posyandu';
    case 'karang-taruna': return 'Pengurus Karang Taruna';
    case 'pkk-rw': return 'Pengurus PKK';
    case 'lpm': return 'Pengurus LPM';
    default: return 'Data';
  }
}
