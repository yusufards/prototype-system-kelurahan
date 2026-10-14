'use client';

import React, { useState } from 'react';
import { 
  Penduduk, 
  PengurusLembaga 
} from '../data/kelurahanData';
import { useKelurahanData } from '../data/KelurahanContext';
import { 
  UserCheck, 
  Plus, 
  Upload, 
  Trash2, 
  Edit, 
  Search, 
  Filter, 
  ShieldCheck, 
  Users, 
  FileSpreadsheet,
  RotateCcw
} from 'lucide-react';

interface PemerintahanViewProps {
  subTab: string;
  onOpenModal: (type: string) => void;
  onOpenUploadExcel: (type: string) => void;
  searchQuery: string;
}

export const PemerintahanView: React.FC<PemerintahanViewProps> = ({
  subTab,
  onOpenModal,
  onOpenUploadExcel,
  searchQuery
}) => {
  const {
    pendudukList,
    deletePenduduk,
    clearPenduduk,
    pengurusList,
    deletePengurus,
  } = useKelurahanData();

  const [selectedRwFilter, setSelectedRwFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  // Filtered Penduduk
  const filteredPenduduk = pendudukList.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      p.nama.toLowerCase().includes(q) ||
      p.nik.includes(q) ||
      (p.noKk && p.noKk.includes(q)) ||
      p.rw.toLowerCase().includes(q) ||
      p.alamat.toLowerCase().includes(q);
    const matchesRw = selectedRwFilter === 'ALL' || p.rw === selectedRwFilter;
    return matchesSearch && matchesRw;
  });

  const totalPages = Math.ceil(filteredPenduduk.length / pageSize) || 1;
  const paginatedPenduduk = filteredPenduduk.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Filtered Pengurus RW / RT
  const pengurusRwList = pengurusList.filter(p => p.lembaga === 'RW');
  const pengurusRtList = pengurusList.filter(p => p.lembaga === 'RT');

  return (
    <div className="space-y-6">
      
      {/* SubTab Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            Seksi Pemerintahan &mdash; {getPemerintahanTabTitle(subTab)}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Modul pengawasan data kependudukan (terhubung dengan Data Penduduk Lebakgede), pencatatan sipil, pertanahan, dan kepengurusan RT/RW.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Upload Excel Button */}
          <button 
            onClick={() => onOpenUploadExcel(subTab)}
            className="px-3 py-2 bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5 border border-emerald-500/30"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Excel</span>
          </button>

          {/* New Entry Button */}
          <button 
            onClick={() => onOpenModal(subTab)}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data {getPemerintahanShortLabel(subTab)}</span>
          </button>
        </div>
      </div>

      {/* SubTab Views */}
      {subTab === 'kependudukan' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl space-y-4 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">Filter RW:</span>
              {['ALL', 'RW 01', 'RW 02', 'RW 03', 'RW 04', 'RW 05', 'RW 06', 'RW 13', 'RW 16'].map((rw) => (
                <button
                  key={rw}
                  onClick={() => { setSelectedRwFilter(rw); setCurrentPage(1); }}
                  className={`text-xs px-2.5 py-1 rounded-md transition ${
                    selectedRwFilter === rw
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {rw}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">
                Menampilkan <span className="font-semibold text-emerald-400">{filteredPenduduk.length}</span> warga
              </span>
              <button
                onClick={clearPenduduk}
                className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded border border-rose-500/30 flex items-center gap-1 transition"
                title="Kosongkan seluruh data sementara"
              >
                <Trash2 className="w-3 h-3" />
                <span>Kosongkan</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left border-collapse text-xs text-slate-300">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-800">
                  <th className="py-3 px-3">NIK</th>
                  <th className="py-3 px-3">Nama Lengkap</th>
                  <th className="py-3 px-3">No. KK</th>
                  <th className="py-3 px-3">L/P</th>
                  <th className="py-3 px-3">Usia</th>
                  <th className="py-3 px-3">RW / RT</th>
                  <th className="py-3 px-3">Alamat</th>
                  <th className="py-3 px-3">Pekerjaan</th>
                  <th className="py-3 px-3">Agama</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedPenduduk.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-8 text-center text-slate-500">
                      Tidak ada data kependudukan yang cocok. Silakan tambah warga atau upload file Excel.
                    </td>
                  </tr>
                ) : (
                  paginatedPenduduk.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-2.5 px-3 font-mono font-medium text-emerald-400 whitespace-nowrap">
                        {item.nik}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-white whitespace-nowrap">
                        {item.nama}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                        {item.noKk || '-'}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-300">
                        {item.gender}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                        {item.usia} Thn
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-300 whitespace-nowrap">
                        {item.rw} / {item.rt}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 max-w-xs truncate" title={item.alamat}>
                        {item.alamat}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                        {item.pekerjaan}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">
                        {item.agama || 'Islam'}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {item.statusSipil || 'Tetap'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => deletePenduduk(item.id)}
                          className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded transition"
                          title="Hapus Warga"
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <div>
                Halaman {currentPage} dari {totalPages} ({filteredPenduduk.length} total)
              </div>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded"
                >
                  Sebelumnya
                </button>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {(subTab === 'pengurus-rw' || subTab === 'pengurus-rt') && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">
              Daftar Pengurus {subTab === 'pengurus-rw' ? 'Rukun Warga (RW)' : 'Rukun Tetangga (RT)'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(subTab === 'pengurus-rw' ? pengurusRwList : pengurusRtList).map((pengurus) => (
              <div 
                key={pengurus.id} 
                className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                    {pengurus.rw} {pengurus.rt ? `/ ${pengurus.rt}` : ''}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{pengurus.namaPengurus}</h4>
                  <p className="text-xs text-slate-400">{pengurus.jabatan}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">Kontak: {pengurus.kontak}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] text-slate-400 bg-slate-700 px-2 py-1 rounded">
                    Masa Bakti: {pengurus.periode}
                  </span>
                  <button
                    onClick={() => deletePengurus(pengurus.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(subTab === 'sipil' || subTab === 'pertanahan' || subTab === 'trantibum' || subTab === 'progker') && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white capitalize">
            {getPemerintahanTabTitle(subTab)}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Data administrasi {getPemerintahanTabTitle(subTab)} dapat dikelola secara mandiri &amp; didukung upload Excel langsung.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => onOpenUploadExcel(subTab)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-lg border border-slate-700 shadow transition flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Excel</span>
            </button>
            <button 
              onClick={() => onOpenModal(subTab)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow transition"
            >
              + Input Data {getPemerintahanShortLabel(subTab)}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

function getPemerintahanTabTitle(subTab: string): string {
  switch (subTab) {
    case 'progker': return 'Rencana Program Kerja Sie Pemerintahan';
    case 'kependudukan': return 'Administrasi Kependudukan';
    case 'sipil': return 'Administrasi Pencatatan Sipil';
    case 'pertanahan': return 'Administrasi Pertanahan (PBB/Letter C)';
    case 'trantibum': return 'Administrasi Ketentraman, Ketertiban Umum & Linmas';
    case 'pengurus-rw': return 'Data Pengurus RW';
    case 'pengurus-rt': return 'Data Pengurus RT';
    case 'rencana-giat': return 'Rencana Giat Sie Pemerintahan';
    default: return subTab;
  }
}

function getPemerintahanShortLabel(subTab: string): string {
  switch (subTab) {
    case 'kependudukan': return 'Penduduk';
    case 'sipil': return 'Pencatatan Sipil';
    case 'pertanahan': return 'Pertanahan';
    case 'trantibum': return 'Trantibum';
    case 'pengurus-rw': return 'Pengurus RW';
    case 'pengurus-rt': return 'Pengurus RT';
    default: return 'Giat';
  }
}
