'use client';

import React from 'react';
import { mockRencanaGiat, RencanaGiat } from '../data/kelurahanData';
import { Calendar, Plus, Clock, MapPin, User, CheckCircle, AlertCircle } from 'lucide-react';

interface RencanaGiatTimelineProps {
  onOpenModal: (type: string) => void;
}

export const RencanaGiatTimeline: React.FC<RencanaGiatTimelineProps> = ({ onOpenModal }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            Agenda &amp; Rencana Giat Kelurahan Lebakgede
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitoring pelaksanaan kegiatan seluruh Seksi (Kelurahan, Pemerintahan, Ekbang, &amp; Kesra).
          </p>
        </div>
        <button 
          onClick={() => onOpenModal('rencana-giat')}
          className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Jadwalkan Giat Baru</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white mb-2">Timeline Agenda Kegiatan</h3>

        <div className="relative border-l-2 border-slate-800 ml-4 space-y-6 pl-6 py-2">
          {mockRencanaGiat.map((giat) => (
            <div key={giat.id} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-purple-600 border-4 border-slate-900 group-hover:scale-125 transition-transform" />

              <div className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl p-4 transition shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Seksi: {giat.seksi}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {giat.tanggal} | {giat.waktu}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-slate-700 text-slate-200">
                    Status: {giat.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1.5">{giat.namaKegiatan}</h4>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{giat.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>PIC: {giat.penanggungJawab}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
