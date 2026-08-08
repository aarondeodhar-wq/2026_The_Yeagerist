export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export type UserRole = 'doctor' | 'patient' | 'admin';

export interface BoundingBox {
  id: string;
  text: string;
  category: 'diagnosis' | 'medication' | 'lab' | 'vital' | 'symptom';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ExtractedEntities {
  diagnoses: string[];
  medications: string[];
  allergies: string[];
  vitals: Record<string, string>;
  labValues: Record<string, string>;
  symptoms: string[];
  surgeries: string[];
}

export interface MedicalDocument {
  id: string;
  patientId: string;
  title: string;
  type: 'lab_report' | 'prescription' | 'discharge_summary' | 'imaging_report' | 'progress_note';
  uploadDate: string;
  fileSize: string;
  author: string;
  ocrConfidence: number;
  rawOcrText: string;
  boundingBoxes: BoundingBox[];
  entities: ExtractedEntities;
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  riskScore: number;
  riskLevel: RiskLevel;
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  allergies: string[];
  activeMedications: string[];
  admissionDate: string;
  attendingPhysician: string;
  roomNumber?: string;
  primaryDoctor?: string;
  department?: string;
}

export interface ClinicalEvent {
  id: string;
  patientId: string;
  timestamp: string;
  date?: string;
  title: string;
  category: 'admission' | 'lab' | 'medication' | 'procedure' | 'vital_alert' | 'note';
  description: string;
  severity?: 'normal' | 'warning' | 'critical';
  author: string;
  insights?: string[];
  keyInsights?: string[];
}

export interface DomainAssessment {
  score: number;
  factors: string[];
  reasons?: string[];
}

export interface RiskAssessment {
  patientId: string;
  overallScore: number;
  level: RiskLevel;
  overallLevel?: RiskLevel;
  calculatedAt: string;
  domains: {
    cardiovascular: DomainAssessment;
    renal: DomainAssessment;
    respiratory: DomainAssessment;
    sepsis: DomainAssessment;
  };
  recommendations: string[];
  contraindications: string[];
}

export type PatientRiskAssessment = RiskAssessment;

export interface VitalSign {
  id?: string;
  patientId?: string;
  timestamp: string;
  bpSystolic?: number;
  bpDiastolic?: number;
  hr?: number;
  temp?: number;
  spo2?: number;
  rr?: number;
  isAnomaly?: boolean;
}

export interface LabResult {
  id: string;
  patientId?: string;
  timestamp: string;
  testName: string;
  category?: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status?: 'normal' | 'abnormal' | 'critical';
  isAbnormal?: boolean;
  deltaPercent?: number;
}

export interface DrugInteraction {
  id: string;
  drugA: string;
  drugB: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  description: string;
  recommendation: string;
}
