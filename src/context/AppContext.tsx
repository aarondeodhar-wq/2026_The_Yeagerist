import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Patient, ClinicalEvent, MedicalDocument, UserRole } from '../types/clinical';
import { MOCK_PATIENTS, MOCK_CLINICAL_EVENTS, MOCK_DOCUMENTS } from '../data/mockData';

export type NavigationTab = 'dashboard' | 'timeline' | 'ocr' | 'trends' | 'risk' | 'rag' | 'analytics';
export type AppTheme = 'dark' | 'light';

export interface UserPersona {
  role: UserRole;
  name: string;
  avatarUrl: string;
}

interface AppContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: UserPersona;
  login: (role: UserRole) => void;
  logout: () => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  patients: Patient[];
  currentPatient: Patient;
  setCurrentPatientId: (id: string) => void;
  events: ClinicalEvent[];
  documents: MedicalDocument[];
  addDocument: (doc: MedicalDocument) => void;
  isAlertDrawerOpen: boolean;
  setIsAlertDrawerOpen: (open: boolean) => void;
  isPrintModalOpen: boolean;
  setIsPrintModalOpen: (open: boolean) => void;
}

const DEFAULT_USER: UserPersona = {
  role: 'doctor',
  name: 'Dr. Rajesh Sharma',
  avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(() => {
    return (localStorage.getItem('pulse_theme') as AppTheme) || 'dark';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('pulse_auth') === 'true';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<UserPersona>(() => {
    const saved = localStorage.getItem('pulse_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [patients] = useState<Patient[]>(MOCK_PATIENTS);
  const [currentPatientId, setCurrentPatientIdState] = useState<string>('pat-1');
  const [events] = useState<ClinicalEvent[]>(MOCK_CLINICAL_EVENTS);
  const [documents, setDocuments] = useState<MedicalDocument[]>(MOCK_DOCUMENTS);
  const [isAlertDrawerOpen, setIsAlertDrawerOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Initial App Neural Loading Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('pulse_theme', next);
      return next;
    });
  };

  const login = (role: UserRole) => {
    let persona: UserPersona = DEFAULT_USER;
    if (role === 'patient') {
      persona = {
        role: 'patient',
        name: 'Eleanor Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
      };
      setCurrentPatientIdState('pat-1');
    } else if (role === 'admin') {
      persona = {
        role: 'admin',
        name: 'Operations Lead',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
      };
    }
    setCurrentUser(persona);
    setIsAuthenticated(true);
    localStorage.setItem('pulse_auth', 'true');
    localStorage.setItem('pulse_user', JSON.stringify(persona));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pulse_auth');
    localStorage.removeItem('pulse_user');
  };

  const currentPatient = patients.find(p => p.id === currentPatientId) || patients[0];

  const setCurrentPatientId = (id: string) => {
    setCurrentPatientIdState(id);
  };

  const addDocument = (doc: MedicalDocument) => {
    setDocuments(prev => [doc, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isAuthenticated,
        isLoading,
        currentUser,
        login,
        logout,
        activeTab,
        setActiveTab,
        patients,
        currentPatient,
        setCurrentPatientId,
        events,
        documents,
        addDocument,
        isAlertDrawerOpen,
        setIsAlertDrawerOpen,
        isPrintModalOpen,
        setIsPrintModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
