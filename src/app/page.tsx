'use client';

import React, { useState } from 'react';
import { Header, RoleType } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { DashboardOverview } from '../components/DashboardOverview';
import { SekretarisView } from '../components/SekretarisView';
import { PemerintahanView } from '../components/PemerintahanView';
import { EkbangView } from '../components/EkbangView';
import { KesraView } from '../components/KesraView';
import { RencanaGiatTimeline } from '../components/RencanaGiatTimeline';
import { FormModal } from '../components/FormModal';
import { ExcelUploadModal } from '../components/ExcelUploadModal';
import { KelurahanDataProvider } from '../data/KelurahanContext';

function KelurahanAppContent() {
  const [currentRole, setCurrentRole] = useState<RoleType>('pemerintahan');
  const [activeSubTab, setActiveSubTab] = useState<string>('kependudukan');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalFormType, setModalFormType] = useState<string>('kependudukan');

  // Excel Upload states
  const [isUploadExcelOpen, setIsUploadExcelOpen] = useState<boolean>(false);
  const [uploadCategory, setUploadCategory] = useState<string>('kependudukan');

  // Handle Role Switch
  const handleRoleChange = (newRole: RoleType) => {
    setCurrentRole(newRole);
    if (newRole === 'lurah') {
      setActiveSubTab('overview');
    } else if (newRole === 'sekkel') {
      setActiveSubTab('progker');
    } else if (newRole === 'pemerintahan') {
      setActiveSubTab('kependudukan');
    } else if (newRole === 'ekbang') {
      setActiveSubTab('musrenbang');
    } else if (newRole === 'kesra') {
      setActiveSubTab('balita');
    }
  };

  // Open Form Modal
  const handleOpenModal = (formType?: string) => {
    setModalFormType(formType || activeSubTab);
    setIsModalOpen(true);
  };

  // Open Excel Upload Modal
  const handleOpenUploadExcel = (category?: string) => {
    setUploadCategory(category || activeSubTab);
    setIsUploadExcelOpen(true);
  };

  const handleSaveSuccess = (data: any) => {
    console.log('Record saved successfully:', data);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      
      {/* Top Header */}
      <Header 
        currentRole={currentRole}
        setCurrentRole={handleRoleChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewModal={() => handleOpenModal()}
        onOpenUploadExcel={() => handleOpenUploadExcel()}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        
        {/* Sidebar Navigation */}
        <Sidebar
          currentRole={currentRole}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
        />

        {/* Main Dynamic View Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {activeSubTab === 'rencana-giat' ? (
            <RencanaGiatTimeline onOpenModal={handleOpenModal} />
          ) : currentRole === 'lurah' ? (
            <DashboardOverview onNavigateSubTab={(tab) => {
              if (['kependudukan', 'pengurus-rw', 'pengurus-rt', 'sipil', 'pertanahan', 'trantibum'].includes(tab)) {
                setCurrentRole('pemerintahan');
              } else if (['surat-masuk', 'surat-keluar', 'bmd', 'kepegawaian', 'kerumahtanggaan'].includes(tab)) {
                setCurrentRole('sekkel');
              } else if (['musrenbang', 'umkm', 'sarpras', 'kebersihan', 'maggot', 'infrastruktur'].includes(tab)) {
                setCurrentRole('ekbang');
              } else if (['balita', 'baduta', 'ibu-hamil', 'lansia', 'posyandu', 'karang-taruna', 'pkk-rw', 'lpm'].includes(tab)) {
                setCurrentRole('kesra');
              }
              setActiveSubTab(tab);
            }} />
          ) : currentRole === 'sekkel' ? (
            <SekretarisView 
              subTab={activeSubTab} 
              onOpenModal={handleOpenModal} 
              onOpenUploadExcel={handleOpenUploadExcel}
            />
          ) : currentRole === 'pemerintahan' ? (
            <PemerintahanView 
              subTab={activeSubTab} 
              onOpenModal={handleOpenModal} 
              onOpenUploadExcel={handleOpenUploadExcel}
              searchQuery={searchQuery} 
            />
          ) : currentRole === 'ekbang' ? (
            <EkbangView 
              subTab={activeSubTab} 
              onOpenModal={handleOpenModal} 
              onOpenUploadExcel={handleOpenUploadExcel}
            />
          ) : currentRole === 'kesra' ? (
            <KesraView 
              subTab={activeSubTab} 
              onOpenModal={handleOpenModal} 
              onOpenUploadExcel={handleOpenUploadExcel}
            />
          ) : null}
        </main>

      </div>

      {/* Dynamic Data Input Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType={modalFormType}
        onSaveSuccess={handleSaveSuccess}
      />

      {/* Excel Upload Modal */}
      <ExcelUploadModal
        isOpen={isUploadExcelOpen}
        onClose={() => setIsUploadExcelOpen(false)}
        targetCategory={uploadCategory}
      />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-3 text-center text-xs text-slate-500">
        Satu Data Kelurahan Lebakgede &copy; 2026 &bull; System Aplikasi Kelurahan Terpadu &bull; In-Memory Data Engine (Tanpa Database)
      </footer>

    </div>
  );
}

export default function KelurahanPage() {
  return (
    <KelurahanDataProvider>
      <KelurahanAppContent />
    </KelurahanDataProvider>
  );
}
