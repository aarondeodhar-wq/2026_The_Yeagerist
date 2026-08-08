import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { FloatingRightSidebar } from './components/layout/FloatingRightSidebar';
import { AlertDrawer } from './components/layout/AlertDrawer';
import { LoadingScreen } from './components/common/LoadingScreen';
import { PDFExportModal } from './components/common/PDFExportModal';

import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { LongitudinalTimeline } from './components/timeline/LongitudinalTimeline';
import { OCRDocumentViewer } from './components/ocr/OCRDocumentViewer';
import { VitalsLabTrends } from './components/trends/VitalsLabTrends';
import { RiskAndDrugChecker } from './components/risk/RiskAndDrugChecker';
import { RAGClinicalAssistant } from './components/rag/RAGClinicalAssistant';
import { HospitalAnalytics } from './components/analytics/HospitalAnalytics';

import { PatientPortal } from './components/patient/PatientPortal';
import { LoginPage } from './components/auth/LoginPage';

const AppContent: React.FC = () => {
  const { 
    isAuthenticated, 
    isLoading, 
    activeTab, 
    currentUser,
    theme 
  } = useApp();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isPatient = currentUser?.role === 'patient';

  const renderTabContent = () => {
    if (isPatient) {
      return <PatientPortal />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <PatientDashboard />;
      case 'timeline':
        return <LongitudinalTimeline />;
      case 'ocr':
        return <OCRDocumentViewer />;
      case 'trends':
        return <VitalsLabTrends />;
      case 'risk':
        return <RiskAndDrugChecker />;
      case 'rag':
        return <RAGClinicalAssistant />;
      case 'analytics':
        return <HospitalAnalytics />;
      default:
        return <PatientDashboard />;
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'dark-gradient-bg text-slate-100' : 'light-gradient-bg text-slate-900'} transition-colors duration-500 flex flex-col font-sans relative`}>
      <Header />
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 relative">
        <main className="w-full">
          {renderTabContent()}
        </main>
      </div>

      {/* Floating Collapsible Right Navigation Bar matching Reference Screenshots 1, 2, 3 */}
      <FloatingRightSidebar />

      {/* Mobile Bottom Dock Sidebar */}
      <Sidebar />

      {/* Slide-over Alert Drawer */}
      <AlertDrawer />

      {/* Printable EHR PDF Modal */}
      <PDFExportModal />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
