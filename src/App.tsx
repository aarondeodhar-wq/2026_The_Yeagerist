import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPage } from './components/auth/LoginPage';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Header } from './components/layout/Header';
import { AlertDrawer } from './components/layout/AlertDrawer';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { LongitudinalTimeline } from './components/timeline/LongitudinalTimeline';
import { OCRDocumentViewer } from './components/ocr/OCRDocumentViewer';
import { VitalsLabTrends } from './components/trends/VitalsLabTrends';
import { RiskAndDrugChecker } from './components/risk/RiskAndDrugChecker';
import { RAGClinicalAssistant } from './components/rag/RAGClinicalAssistant';
import { HospitalAnalytics } from './components/analytics/HospitalAnalytics';
import { PatientPortal } from './components/patient/PatientPortal';
import { PDFExportModal } from './components/common/PDFExportModal';

const MainLayout: React.FC = () => {
  const { isAuthenticated, isLoading, activeTab, currentUser, theme } = useApp();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'dark-gradient-bg text-slate-100' : 'light-gradient-bg text-slate-900'} flex flex-col font-sans transition-colors duration-500`}>
      {/* App Top Header */}
      <Header />

      {/* Main View Container */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-6">
        {currentUser.role === 'patient' ? (
          <PatientPortal />
        ) : (
          <>
            {activeTab === 'dashboard' && <PatientDashboard />}
            {activeTab === 'timeline' && <LongitudinalTimeline />}
            {activeTab === 'ocr' && <OCRDocumentViewer />}
            {activeTab === 'trends' && <VitalsLabTrends />}
            {activeTab === 'risk' && <RiskAndDrugChecker />}
            {activeTab === 'rag' && <RAGClinicalAssistant />}
            {activeTab === 'analytics' && <HospitalAnalytics />}
          </>
        )}
      </main>

      {/* Slide-over Alert Drawer */}
      <AlertDrawer />

      {/* Printable PDF Handoff Report Modal */}
      <PDFExportModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
