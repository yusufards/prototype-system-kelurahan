'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useKelurahanData } from '../data/KelurahanContext';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: string;
  onSaveSuccess?: (data: any) => void;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  formType,
  onSaveSuccess
}) => {
  const { addGenericRecord } = useKelurahanData();
  const [formData, setFormData] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        rw: 'RW 01',
        rt: 'RT 01',
        gender: 'L',
        statusSipil: 'Tetap',
        agama: 'Islam',
      });
      setIsSubmitted(false);
    }
  }, [isOpen, formType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGenericRecord(formType, formData);
    setIsSubmitted(true);
    setTimeout(() => {
      if (onSaveSuccess) onSaveSuccess(formData);
      setIsSubmitted(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              Form Entri Data Baru ({getFormTitle(formType)})
            </h3>
            <p className="text-xs text-slate-400">Satu Data Kelurahan Lebakgede &bull; Tersimpan Langsung (In-Memory)</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {isSubmitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold text-white">Data Berhasil Disimpan!</h4>
            <p className="text-xs text-slate-400">Record baru telah berhasil ditambahkan ke dalam sistem kelurahan.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {renderDynamicInputs(formType, formData, setFormData)}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow transition"
              >
                Simpan Record
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

function getFormTitle(type: string): string {
  switch (type) {
    case 'kependudukan': return 'Administrasi Kependudukan';
    case 'surat-masuk': return 'Surat Masuk';
    case 'surat-keluar': return 'Surat Keluar';
    case 'musrenbang': return 'Usulan Musrenbang';
    case 'umkm': return 'Data Koperasi & UMKM';
    case 'balita':
    case 'baduta':
    case 'ibu-hamil':
    case 'lansia': return 'Monitoring Gizi & Kesehatan';
    case 'pengurus-rw': return 'Pengurus RW';
    case 'pengurus-rt': return 'Pengurus RT';
    case 'bmd': return 'Barang Milik Daerah (BMD)';
    case 'rencana-giat': return 'Agenda Rencana Giat';
    default: return 'Data Kelurahan';
  }
}

function renderDynamicInputs(type: string, formData: any, setFormData: any) {
  const handleChange = (key: string, val: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: val }));
  };

  if (type === 'kependudukan') {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">NIK (16 Digit) *</label>
            <input
              type="text"
              required
              placeholder="327301..."
              value={formData.nik || ''}
              onChange={(e) => handleChange('nik', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">No. KK</label>
            <input
              type="text"
              placeholder="327301..."
              value={formData.noKk || ''}
              onChange={(e) => handleChange('noKk', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap *</label>
          <input
            type="text"
            required
            placeholder="Masukkan nama lengkap warga..."
            value={formData.nama || ''}
            onChange={(e) => handleChange('nama', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Jenis Kelamin</label>
            <select
              value={formData.gender || 'L'}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="L">Laki-Laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Usia (Tahun)</label>
            <input
              type="number"
              placeholder="30"
              value={formData.usia || ''}
              onChange={(e) => handleChange('usia', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Agama</label>
            <input
              type="text"
              placeholder="Islam"
              value={formData.agama || 'Islam'}
              onChange={(e) => handleChange('agama', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Wilayah RW</label>
            <select 
              value={formData.rw || 'RW 01'}
              onChange={(e) => handleChange('rw', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              {['RW 01', 'RW 02', 'RW 03', 'RW 04', 'RW 05', 'RW 06', 'RW 13', 'RW 16'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Wilayah RT</label>
            <input
              type="text"
              placeholder="e.g. RT 02"
              value={formData.rt || ''}
              onChange={(e) => handleChange('rt', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Alamat Lengkap</label>
          <input
            type="text"
            placeholder="Jl. Dipatiukur / Jl. Lebak Gede..."
            value={formData.alamat || ''}
            onChange={(e) => handleChange('alamat', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Pekerjaan</label>
            <input
              type="text"
              placeholder="Wiraswasta / PNS / Buruh..."
              value={formData.pekerjaan || ''}
              onChange={(e) => handleChange('pekerjaan', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Pendidikan</label>
            <input
              type="text"
              placeholder="Tamat SLTA/sederajat..."
              value={formData.pendidikan || ''}
              onChange={(e) => handleChange('pendidikan', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>
    );
  }

  // Fallback generic form
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-slate-300 font-semibold mb-1">Judul / Nama Record *</label>
        <input
          type="text"
          required
          placeholder="Masukkan judul atau nama item..."
          value={formData.nama || ''}
          onChange={(e) => handleChange('nama', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Wilayah RW</label>
          <select 
            value={formData.rw || 'RW 01'}
            onChange={(e) => handleChange('rw', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          >
            {['RW 01', 'RW 02', 'RW 03', 'RW 04', 'RW 05', 'RW 06', 'RW 13', 'RW 16'].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Wilayah RT</label>
          <input
            type="text"
            placeholder="e.g. RT 02"
            value={formData.rt || ''}
            onChange={(e) => handleChange('rt', e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-300 font-semibold mb-1">Keterangan / Rincian Tambahan</label>
        <textarea
          rows={3}
          placeholder="Tuliskan rinci rincian informasi..."
          value={formData.keterangan || ''}
          onChange={(e) => handleChange('keterangan', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>
  );
}
