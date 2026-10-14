'use client';

import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  ShoppingBag, 
  HeartPulse, 
  Clock, 
  ArrowUpRight,
  ShieldAlert,
  Database,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useKelurahanData } from '../data/KelurahanContext';

export const DashboardOverview: React.FC<{ onNavigateSubTab: (tab: string) => void }> = ({ onNavigateSubTab }) => {
  const {
    pendudukList,
    suratMasukList,
    musrenbangList,
    umkmList,
    kesehatanList,
    rencanaGiatList
  } = useKelurahanData();

  // Dynamic Summary Stats Data
  const statCards = [
    { 
      title: 'Total Penduduk Aktif', 
      value: pendudukList.length.toLocaleString('id-ID'), 
      sub: 'Kependudukan Lebak Gede (In-Memory)', 
      icon: <Users className="w-5 h-5 text-blue-400" />, 
      change: 'Terhubung Data Warga', 
      color: 'from-blue-600/20 to-indigo-600/10 border-blue-500/30',
      actionTab: 'kependudukan'
    },
    { 
      title: 'Surat Dalam Proses', 
      value: suratMasukList.filter(s => s.status !== 'Selesai').length.toString(), 
      sub: 'Menunggu disposisi/TTD', 
      icon: <FileText className="w-5 h-5 text-amber-400" />, 
      change: 'Perlu respon', 
      color: 'from-amber-600/20 to-orange-600/10 border-amber-500/30',
      actionTab: 'surat-masuk'
    },
    { 
      title: 'Usulan Musrenbang', 
      value: musrenbangList.length.toString(), 
      sub: `Total Rp ${musrenbangList.reduce((acc, m) => acc + m.anggaran, 0).toLocaleString('id-ID')}`, 
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, 
      change: `${musrenbangList.filter(m => m.status === 'Disetujui').length} Disetujui`, 
      color: 'from-emerald-600/20 to-teal-600/10 border-emerald-500/30',
      actionTab: 'musrenbang'
    },
    { 
      title: 'UMKM Terdaftar', 
      value: umkmList.length.toString(), 
      sub: 'Potensi Ekonomi Warga', 
      icon: <ShoppingBag className="w-5 h-5 text-purple-400" />, 
      change: `${umkmList.filter(u => u.bantuanPemerintah).length} Penerima Bantuan`, 
      color: 'from-purple-600/20 to-pink-600/10 border-purple-500/30',
      actionTab: 'umkm'
    },
    { 
      title: 'Monitoring Stunting / Risk', 
      value: kesehatanList.filter(k => k.statusKesehatan.includes('Risk') || k.statusKesehatan.includes('Perlu')).length.toString(), 
      sub: 'Target Intervensi Kesra', 
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />, 
      change: 'Prioritas Intervensi', 
      color: 'from-rose-600/20 to-red-600/10 border-rose-500/30',
      actionTab: 'balita'
    },
  ];

  // Dynamic Demografi RW Chart Data
  const rwDistribution: Record<string, number> = {};
  pendudukList.forEach(p => {
    const rw = p.rw || 'RW 01';
    rwDistribution[rw] = (rwDistribution[rw] || 0) + 1;
  });

  const demografiData = Object.entries(rwDistribution).map(([rw, count]) => ({
    rw,
    jumlahPenduduk: count,
  })).sort((a, b) => a.rw.localeCompare(b.rw));

  // Musrenbang Status Pie Data
  const statusCounts = musrenbangList.reduce((acc: any, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});

  const musrenbangPie = [
    { name: 'Disetujui', value: statusCounts['Disetujui'] || 0, color: '#10b981' },
    { name: 'Verifikasi', value: statusCounts['Verifikasi Kelurahan'] || 0, color: '#3b82f6' },
    { name: 'Usulan RW', value: statusCounts['Usulan RW'] || 0, color: '#f59e0b' },
    { name: 'Ditolak', value: statusCounts['Ditolak'] || 0, color: '#ef4444' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">

      {/* Info Banner */}
      <div className="p-4 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-blue-950/60 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Sistem Satu Data Kelurahan Terhubung DataPenduduk Lebakgede
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono border border-emerald-500/30">In-Memory / No-DB</span>
            </h3>
            <p className="text-xs text-slate-400">
              CRUD lengkap di seluruh modul &amp; upload Excel terpadu. Jika browser di-refresh, data otomatis kembali kosong/reset.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Indicator Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => (
          <div 
            key={idx}
            onClick={() => onNavigateSubTab(card.actionTab)}
            className={`p-4 rounded-xl bg-gradient-to-b ${card.color} border bg-slate-900/90 shadow-lg hover:border-slate-600 transition cursor-pointer flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">{card.title}</span>
                {card.icon}
              </div>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <p className="text-[11px] text-slate-400 mt-1">{card.sub}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span className="text-emerald-400 font-semibold">{card.change}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Demografi Penduduk per RW */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                Sebaran Data Penduduk Berdasarkan RW
              </h3>
              <p className="text-xs text-slate-400">Menghitung akumulasi data penduduk aktif</p>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Total {pendudukList.length} Jiwa
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demografiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="rw" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Bar dataKey="jumlahPenduduk" name="Jumlah Warga" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Musrenbang Status Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Status Usulan Musrenbang
            </h3>
            <p className="text-xs text-slate-400 mb-4">Progres validasi usulan pembangunan</p>
            
            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={musrenbangPie.length > 0 ? musrenbangPie : [{ name: 'N/A', value: 1, color: '#334155' }]}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {musrenbangPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
            {musrenbangPie.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-mono font-semibold text-slate-200">{item.value} Usulan</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Agenda Rencana Giat */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Agenda Prioritas Kegiatan Kelurahan &amp; Seksi
            </h3>
            <p className="text-xs text-slate-400">Jadwal kegiatan terpadu lurah dan para kepala seksi</p>
          </div>
          <button 
            onClick={() => onNavigateSubTab('rencana-giat')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            Lihat Timeline Lengkap &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {rencanaGiatList.slice(0, 4).map((giat) => (
            <div key={giat.id} className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {giat.seksi}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{giat.tanggal}</span>
              </div>
              <h4 className="text-xs font-semibold text-white line-clamp-1">{giat.namaKegiatan}</h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <span>📍</span> {giat.lokasi}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
