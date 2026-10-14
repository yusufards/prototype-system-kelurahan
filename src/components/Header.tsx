'use client';

import React from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  HeartHandshake, 
  ChevronDown,
  Upload,
  PlusCircle,
  Database
} from 'lucide-react';

export type RoleType = 'lurah' | 'sekkel' | 'pemerintahan' | 'ekbang' | 'kesra';

interface HeaderProps {
  currentRole: RoleType;
  setCurrentRole: (role: RoleType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNewModal: () => void;
  onOpenUploadExcel: () => void;
}

export const roleDetails: Record<RoleType, { label: string; sub: string; color: string; icon: React.ReactNode }> = {
  lurah: {
    label: 'Lurah',
    sub: 'Pengawasan, Eksekutif & Persetujuan',
    color: 'bg-blue-600 text-white',
    icon: <ShieldCheck className="w-5 h-5 text-blue-400" />
  },
  sekkel: {
    label: 'Sekretaris Kelurahan',
    sub: 'Administrasi, Kepegawaian & BMD',
    color: 'bg-indigo-600 text-white',
    icon: <FileText className="w-5 h-5 text-indigo-400" />
  },
  pemerintahan: {
    label: 'Sie Pemerintahan',
    sub: 'Kependudukan, Pertanahan, RT/RW & Trantib',
    color: 'bg-emerald-600 text-white',
    icon: <UserCheck className="w-5 h-5 text-emerald-400" />
  },
  ekbang: {
    label: 'Sie Ekonomi & Pembangunan',
    sub: 'Musrenbang, UMKM, Kebersihan & Infrastruktur',
    color: 'bg-amber-600 text-white',
    icon: <Briefcase className="w-5 h-5 text-amber-400" />
  },
  kesra: {
    label: 'Sie Kesejahteraan Sosial',
    sub: 'Posyandu, Stunting, Lansia & Karta',
    color: 'bg-rose-600 text-white',
    icon: <HeartHandshake className="w-5 h-5 text-rose-400" />
  }
};

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setCurrentRole,
  searchQuery,
  setSearchQuery,
  onOpenNewModal,
  onOpenUploadExcel
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Kelurahan Name */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg text-white leading-tight">Satu Data Kelurahan</h1>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Lebakgede
                </span>
              </div>
              <p className="text-xs text-slate-400">Kecamatan Coblong, Kota Bandung</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Penduduk (NIK/Nama/No.KK), Surat, UMKM, RW..."
                className="w-full bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-800 border border-slate-700/80 focus:border-emerald-500 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-400 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Role Switcher & Action buttons */}
          <div className="flex items-center space-x-2.5 shrink-0">
            
            {/* Upload Excel Button */}
            <button
              onClick={onOpenUploadExcel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg shadow-sm border border-emerald-500/30 transition"
              title="Upload file Excel (.xlsx, .xls, .csv)"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload Excel</span>
            </button>

            {/* Quick Action Button */}
            <button
              onClick={onOpenNewModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Input Data</span>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg px-3 py-1.5 cursor-pointer transition">
                {roleDetails[currentRole].icon}
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-semibold text-white leading-tight">
                    {roleDetails[currentRole].label}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Modul Aktif
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-1.5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Pilih Peran / Seksi
                </div>
                {(Object.keys(roleDetails) as RoleType[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setCurrentRole(role)}
                    className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg transition text-xs ${
                      currentRole === role
                        ? 'bg-emerald-600/20 border border-emerald-500/30 text-white font-medium'
                        : 'hover:bg-slate-700/60 text-slate-300'
                    }`}
                  >
                    <div className="mt-0.5">{roleDetails[role].icon}</div>
                    <div>
                      <div className="font-semibold text-slate-100">{roleDetails[role].label}</div>
                      <div className="text-[11px] text-slate-400">{roleDetails[role].sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* In-Memory Badge */}
            <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono" title="Data berjalan in-memory tanpa database. Refresh halaman untuk mereset">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>In-Memory</span>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
