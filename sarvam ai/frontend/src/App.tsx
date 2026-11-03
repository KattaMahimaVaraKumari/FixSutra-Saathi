import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CaptureFlow } from './components/CaptureFlow';
import { SearchFlow } from './components/SearchFlow';
import { LearnMode } from './components/LearnMode';
import { CallRelay } from './components/CallRelay';
import { SkillPathway } from './components/SkillPathway';
import { TechnicianDirectory } from './components/TechnicianDirectory';
import { ImpactDashboard } from './components/ImpactDashboard';
import { A11yModal } from './components/A11yModal';
import { GuidedDemoModal } from './components/GuidedDemoModal';
import { Language } from './i18n';
import { RepairCase, Booking } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [currentLang, setCurrentLang] = useState<Language>('hi');
  const [isMock, setIsMock] = useState<boolean>(false);

  // Accessibility state
  const [a11yOpen, setA11yOpen] = useState(false);
  const [guidedDemoOpen, setGuidedDemoOpen] = useState(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [reduceTransparency, setReduceTransparency] = useState<boolean>(false);
  const [dyslexiaFont, setDyslexiaFont] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speaker, setSpeaker] = useState<string>('shubh_enhi_ads');

  // Currently selected case for Learn Mode
  const [activeCase, setActiveCase] = useState<RepairCase | null>(null);

  // Check health and mock status on mount
  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => {
        setIsMock(data.is_mock);
      })
      .catch((e) => {
        console.warn('API health check error, running in mock-ready state:', e);
        setIsMock(true);
      });

    // Default load first case so Learn mode has instant fallback
    fetch('/api/cases/wp-01')
      .then((r) => r.json())
      .then((c) => {
        if (!activeCase) setActiveCase(c);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSelectCase = (c: RepairCase) => {
    setActiveCase(c);
    setCurrentTab('learn');
  };

  const handleCaseCreated = (c: any) => {
    setActiveCase(c);
    setCurrentTab('learn');
  };

  const handleReportResult = async (status: string, notes?: string) => {
    if (!activeCase) return;
    try {
      await fetch('/api/cases/report-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_id: activeCase.id,
          technician_name: "Auto Technician",
          status,
          notes: notes || ""
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      style={{ fontSize: `${fontSize}px` }}
      className={`min-h-screen text-slate-100 selection:bg-orange-500 selection:text-white ${
        highContrast ? 'high-contrast' : ''
      } ${reducedMotion ? 'reduced-motion' : ''} ${
        reduceTransparency ? 'reduce-transparency' : ''
      } ${dyslexiaFont ? 'dyslexic-font' : ''}`}
    >
      {/* Background Animated Gradient Mesh */}
      <div className="bg-mesh" aria-hidden="true" />

      {/* A11y Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content (सुलभता नेव्हिगेशन)
      </a>

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setTab={setCurrentTab}
        currentLang={currentLang}
        setLang={setCurrentLang}
        openA11y={() => setA11yOpen(true)}
        isMock={isMock}
        onGuidedDemo={() => setGuidedDemoOpen(true)}
      />

      {/* Main Container */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'landing' && (
          <LandingPage
            setTab={setCurrentTab}
            onGuidedDemo={() => setGuidedDemoOpen(true)}
            currentLang={currentLang}
          />
        )}

        {currentTab === 'capture' && (
          <CaptureFlow
            onCaseCreated={handleCaseCreated}
            currentLang={currentLang}
          />
        )}

        {currentTab === 'search' && (
          <SearchFlow
            onSelectCase={handleSelectCase}
            currentLang={currentLang}
          />
        )}

        {currentTab === 'learn' && activeCase && (
          <LearnMode
            activeCase={activeCase}
            currentLang={currentLang}
            onBack={() => setCurrentTab('search')}
            onReportResult={handleReportResult}
            speaker={speaker}
            speechRate={speechRate}
          />
        )}

        {currentTab === 'relay' && (
          <CallRelay
            currentLang={currentLang}
            speaker={speaker}
            speechRate={speechRate}
            onBookingCreated={(b) => console.log('Booking created:', b)}
          />
        )}

        {currentTab === 'pathway' && (
          <SkillPathway
            currentLang={currentLang}
            onSelectCategory={(cat) => setCurrentTab('search')}
          />
        )}

        {currentTab === 'directory' && (
          <TechnicianDirectory
            currentLang={currentLang}
            onBookTech={(name) => setCurrentTab('relay')}
          />
        )}

        {currentTab === 'impact' && (
          <ImpactDashboard
            currentLang={currentLang}
          />
        )}
      </main>

      {/* Accessibility Settings Modal */}
      <A11yModal
        isOpen={a11yOpen}
        onClose={() => setA11yOpen(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        reduceTransparency={reduceTransparency}
        setReduceTransparency={setReduceTransparency}
        dyslexiaFont={dyslexiaFont}
        setDyslexiaFont={setDyslexiaFont}
        speechRate={speechRate}
        setSpeechRate={setSpeechRate}
        speaker={speaker}
        setSpeaker={setSpeaker}
        currentLang={currentLang}
      />

      {/* 3-Minute Guided Demo Walkthrough Tour */}
      <GuidedDemoModal
        isOpen={guidedDemoOpen}
        onClose={() => setGuidedDemoOpen(false)}
        setTab={setCurrentTab}
        currentLang={currentLang}
      />
    </div>
  );
}

export default App;
