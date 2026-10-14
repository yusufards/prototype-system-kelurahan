'use client';

import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useKelurahanData } from '../data/KelurahanContext';

interface ExcelUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCategory: string; // 'kependudukan' | 'surat-masuk' | 'umkm' | etc.
}

export const ExcelUploadModal: React.FC<ExcelUploadModalProps> = ({
  isOpen,
  onClose,
  targetCategory,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importGenericExcel } = useKelurahanData();

  const [fileName, setFileName] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [replaceAll, setReplaceAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const buffer = evt.target?.result;
        const workbook = XLSX.read(buffer, { type: 'binary' });

        // Prefer first sheet or MASTER sheet if present
        let sheetName = workbook.SheetNames[0];
        if (workbook.SheetNames.includes('MASTER')) {
          sheetName = 'MASTER';
        } else if (workbook.SheetNames.includes('Penduduk')) {
          sheetName = 'Penduduk';
        }

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!jsonData || jsonData.length === 0) {
          setErrorMessage(`Sheet "${sheetName}" kosong atau tidak memiliki baris data.`);
          setIsLoading(false);
          return;
        }

        setParsedRows(jsonData);
        setColumns(Object.keys(jsonData[0] as object));
        setIsLoading(false);
      } catch (err: any) {
        setErrorMessage('Gagal membaca file Excel/CSV: ' + (err.message || 'Format tidak didukung'));
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setErrorMessage('Terjadi kesalahan saat membaca file.');
      setIsLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const handleImport = () => {
    if (parsedRows.length === 0) return;

    try {
      importGenericExcel(targetCategory, parsedRows, replaceAll);
      setSuccessMessage(`Berhasil mengimpor ${parsedRows.length} data ke modul ${targetCategory}!`);
      setTimeout(() => {
        onClose();
        setParsedRows([]);
        setFileName('');
        setSuccessMessage('');
      }, 1200);
    } catch (err: any) {
      setErrorMessage('Terjadi kesalahan saat memasukkan data: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Upload &amp; Impor Excel (.xlsx, .xls, .csv)
              </h3>
              <p className="text-xs text-slate-400">
                Impor data untuk modul: <span className="font-semibold text-emerald-400 uppercase">{targetCategory}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition text-sm"
          >
            ✕
          </button>
        </div>

        {/* Upload Dropzone */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-6 text-center cursor-pointer transition bg-slate-950/40 hover:bg-slate-800/40"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".xlsx, .xls, .csv" 
            className="hidden" 
          />
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-200">
            {fileName ? fileName : 'Pilih atau Tarik File Excel / CSV'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Mendukung file Excel (.xlsx, .xls) &amp; CSV. Otomatis membaca sheet pertama / MASTER.
          </p>
        </div>

        {/* Error / Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Preview Info */}
        {parsedRows.length > 0 && !successMessage && (
          <div className="space-y-3 bg-slate-800/40 p-3 rounded-lg border border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-white">Pratinjau Data Ditemukan:</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                {parsedRows.length} Baris
              </span>
            </div>
            <div className="text-slate-400 text-[11px] truncate">
              Kolom terdeteksi: {columns.slice(0, 6).join(', ')}{columns.length > 6 ? ` + ${columns.length - 6} lainnya` : ''}
            </div>

            {/* Replace all option */}
            <label className="flex items-center gap-2 cursor-pointer pt-2 border-t border-slate-700/60 text-slate-300">
              <input 
                type="checkbox" 
                checked={replaceAll} 
                onChange={(e) => setReplaceAll(e.target.checked)} 
                className="rounded border-slate-700 text-emerald-500 focus:ring-0"
              />
              <span>Gantikan seluruh data lama dengan file ini (Timpa data)</span>
            </label>
          </div>
        )}

        {/* In-memory notice */}
        <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
          <span className="font-semibold text-amber-400">Catatan:</span> Sistem bekerja secara <span className="text-slate-200 font-medium">In-Memory (tanpa database)</span>. Data dapat di-CRUD dan di-upload sesuka hati, dan jika halaman di-refresh data akan kembali kosong/reset awal.
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition"
          >
            Tutup
          </button>
          <button
            type="button"
            disabled={parsedRows.length === 0 || isLoading}
            onClick={handleImport}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Membaca file...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Impor {parsedRows.length > 0 ? `${parsedRows.length} Baris` : ''}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
