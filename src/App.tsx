import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { LoginPage } from './components/auth/LoginPage';
import { Header } from './components/layout/Header';
import { FloatingRightSidebar } from './components/layout/FloatingRightSidebar';
import { BottomMobileNav } from './components/layout/BottomMobileNav';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { PatientPortal } from './components/patient/PatientPortal';
import { ContactAndFaqPage } from './components/patient/ContactAndFaqPage';
import { LongitudinalTimeline } from './components/timeline/LongitudinalTimeline';
import { VitalsLabTrends } from './components/trends/VitalsLabTrends';
import { RiskAndDrugChecker } from './components/risk/RiskAndDrugChecker';
import { RAGClinicalAssistant } from './components/rag/RAGClinicalAssistant';
import { GuidedTutorialModal } from './components/common/GuidedTutorialModal';
import { PDFExportModal } from './components/common/PDFExportModal';

export const App: React.FC = () => {
  const { currentUser, activeTab, theme } = useApp();
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);

  if (!currentUser) {
    return <LoginPage />;
  }

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'dark-gradient-bg text-slate-100' : 'light-gradient-bg text-slate-900'} transition-colors duration-300 font-sans`}>
      {/* Header */}
      <Header onOpenTutorial={() => setIsTutorialOpen(true)} />

      {/* Collapsible Dot Pill Right Navigation Sidebar */}
      <FloatingRightSidebar />

      {/* Main Content Area (FULL WIDE SCREEN NO UNNECESSARY SIDE GAPS) */}
      <main className="w-full px-4 sm:px-8 lg:pr-20 pt-6 pb-24 lg:pb-16">
        {activeTab === 'dashboard' && (
          currentUser.role === 'patient' ? <PatientPortal /> : <PatientDashboard />
        )}

        {activeTab === 'timeline' && <LongitudinalTimeline />}
        {activeTab === 'trends' && <VitalsLabTrends />}
        {activeTab === 'risk' && <RiskAndDrugChecker />}
        {activeTab === 'rag' && <RAGClinicalAssistant />}
        {activeTab === 'analytics' && <ContactAndFaqPage />}
      </main>

      {/* Native Bottom Mobile Navigation for Phones */}
      <BottomMobileNav />

      {/* Onboarding Tour Modal */}
      <GuidedTutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />

      {/* Multi-Format EHR Export Modal */}
      <PDFExportModal />
    </div>
  );
};

export default App;
