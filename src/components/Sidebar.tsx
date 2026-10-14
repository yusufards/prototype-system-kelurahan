'use client';

import React from 'react';
import { RoleType } from './Header';
import { 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  Briefcase, 
  HeartHandshake, 
  Calendar, 
  Users, 
  Home, 
  MapPin, 
  Boxes, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  Layers,
  HeartPulse,
  Baby,
  UserPlus
} from 'lucide-react';

interface SidebarProps {
  currentRole: RoleType;
  activeSubTab: string;
  setActiveSubTab: (tabId: string) => void;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const menuByRole: Record<RoleType, MenuItem[]> = {
  lurah: [
    { id: 'overview', label: 'Ringkasan Eksekutif & KPI', icon: <ShieldCheck className="w-4 h-4 text-blue-400" /> },
    { id: 'approval', label: 'Persetujuan & TTD Digital', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, badge: '2 Baru' },
    { id: 'rencana-giat', label: 'Rencana Giat Kelurahan', icon: <Calendar className="w-4 h-4 text-purple-400" /> },
  ],
  sekkel: [
    { id: 'progker', label: '1. Rencana Program Kerja Kelurahan', icon: <Layers className="w-4 h-4 text-indigo-400" /> },
    { id: 'surat-masuk', label: '2. Administrasi Surat Masuk', icon: <FileText className="w-4 h-4 text-blue-400" />, badge: '3' },
    { id: 'surat-keluar', label: '3. Administrasi Surat Keluar', icon: <FileText className="w-4 h-4 text-teal-400" /> },
    { id: 'kerumahtanggaan', label: '4. Pengelolaan Kerumahtanggan', icon: <Home className="w-4 h-4 text-slate-400" /> },
    { id: 'kepegawaian', label: '5. Dokumentasi Kepegawaian', icon: <Users className="w-4 h-4 text-amber-400" /> },
    { id: 'bmd', label: '6. Penatausahaan Barang Milik Daerah (BMD)', icon: <Boxes className="w-4 h-4 text-rose-400" /> },
    { id: 'rencana-giat', label: '7. Rencana Giat Sekkel', icon: <Calendar className="w-4 h-4 text-violet-400" /> },
  ],
  pemerintahan: [
    { id: 'progker', label: '1. Rencana Program Kerja Sie Pemerintahan', icon: <Layers className="w-4 h-4 text-emerald-400" /> },
    { id: 'kependudukan', label: '2. Administrasi Kependudukan', icon: <Users className="w-4 h-4 text-emerald-400" />, badge: '5 Data' },
    { id: 'sipil', label: '3. Administrasi Pencatatan Sipil', icon: <FileText className="w-4 h-4 text-teal-400" /> },
    { id: 'pertanahan', label: '4. Administrasi Pertanahan (PBB/Letter C)', icon: <MapPin className="w-4 h-4 text-amber-400" /> },
    { id: 'trantibum', label: '5. Administrasi Trantibum & Linmas', icon: <ShieldCheck className="w-4 h-4 text-cyan-400" /> },
    { id: 'pengurus-rw', label: '6. Data Pengurus RW', icon: <Users className="w-4 h-4 text-blue-400" /> },
    { id: 'pengurus-rt', label: '7. Data Pengurus RT', icon: <Users className="w-4 h-4 text-indigo-400" /> },
    { id: 'rencana-giat', label: '8. Rencana Giat Pemerintahan', icon: <Calendar className="w-4 h-4 text-emerald-400" /> },
  ],
  ekbang: [
    { id: 'progker', label: '1. Rencana Program Kerja Sie Ekbang', icon: <Layers className="w-4 h-4 text-amber-400" /> },
    { id: 'musrenbang', label: '2. Musrenbang Tingkat Kelurahan', icon: <Activity className="w-4 h-4 text-amber-400" />, badge: '4 Usulan' },
    { id: 'umkm', label: '3. Data Koperasi & UMKM', icon: <Briefcase className="w-4 h-4 text-emerald-400" /> },
    { id: 'sarpras', label: '4. Data Sarana & Prasarana Fisik', icon: <Home className="w-4 h-4 text-blue-400" /> },
    { id: 'kebersihan', label: '5. Data Petugas Kebersihan', icon: <Users className="w-4 h-4 text-teal-400" /> },
    { id: 'maggot', label: '6. Data Petugas Maggot', icon: <Sparkles className="w-4 h-4 text-lime-400" /> },
    { id: 'infrastruktur', label: '7. Pekerjaan Infrastruktur', icon: <Boxes className="w-4 h-4 text-orange-400" /> },
    { id: 'pemberdayaan', label: '8. Pemberdayaan Masyarakat', icon: <Users className="w-4 h-4 text-purple-400" /> },
    { id: 'rencana-giat', label: '9. Rencana Giat Ekbang', icon: <Calendar className="w-4 h-4 text-amber-400" /> },
  ],
  kesra: [
    { id: 'progker', label: '1. Rencana Program Kerja Sie Kesra', icon: <Layers className="w-4 h-4 text-rose-400" /> },
    { id: 'potensi-kesra', label: '2. Data Inventarisasi Potensi Kesra', icon: <Sparkles className="w-4 h-4 text-pink-400" /> },
    { id: 'pembinaan-lembaga', label: '3. Pembinaan Lembaga Kemasyarakatan', icon: <Users className="w-4 h-4 text-purple-400" /> },
    { id: 'posyandu', label: '4. Data Pengurus Posyandu', icon: <HeartPulse className="w-4 h-4 text-rose-400" /> },
    { id: 'karang-taruna', label: '5. Data Pengurus Karang Taruna', icon: <Users className="w-4 h-4 text-blue-400" /> },
    { id: 'pkk-rw', label: '6. Data Pengurus PKK RW', icon: <Users className="w-4 h-4 text-pink-400" /> },
    { id: 'lpm', label: '7. Data Pengurus LPM', icon: <Users className="w-4 h-4 text-indigo-400" /> },
    { id: 'balita', label: '8. Data Balita & Gizi', icon: <Baby className="w-4 h-4 text-cyan-400" />, badge: 'Monitor' },
    { id: 'baduta', label: '9. Data Baduta', icon: <Baby className="w-4 h-4 text-teal-400" /> },
    { id: 'ibu-hamil', label: '10. Data Ibu Hamil', icon: <UserPlus className="w-4 h-4 text-rose-400" /> },
    { id: 'lansia', label: '11. Data Lansia', icon: <Users className="w-4 h-4 text-amber-400" /> },
    { id: 'rencana-giat', label: '12. Rencana Giat Kesra', icon: <Calendar className="w-4 h-4 text-rose-400" /> },
  ]
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeSubTab,
  setActiveSubTab
}) => {
  const menuItems = menuByRole[currentRole] || [];

  return (
    <aside className="w-full lg:w-72 bg-slate-900/90 border-r border-slate-800 p-4 shrink-0">
      <div className="mb-4 pb-3 border-b border-slate-800">
        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Menu Aplikasi Kelurahan
        </span>
        <h2 className="text-sm font-semibold text-white capitalize mt-0.5">
          Sie / Modul: {currentRole}
        </h2>
      </div>

      <nav className="space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto pr-1 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = activeSubTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSubTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition text-left ${
                isActive
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 shrink-0 ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
