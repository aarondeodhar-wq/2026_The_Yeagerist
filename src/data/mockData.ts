import type { Patient, VitalSign, LabResult, MedicalDocument, ClinicalEvent, PatientRiskAssessment } from '../types/clinical';

export const MOCK_USERS = [
  {
    id: 'usr-1',
    name: 'Dr. Rajesh Sharma',
    role: 'doctor',
    email: 'dr.sharma@deepsea-guardian.ai',
    department: 'Cardiology & Critical Care',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-2',
    name: 'Dr. Ananya Sen',
    role: 'doctor',
    email: 'dr.sen@deepsea-guardian.ai',
    department: 'Nephrology Unit',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-78a01174622b?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-3',
    name: 'Eleanor Vance (Patient)',
    role: 'patient',
    patientId: 'pat-1',
    email: 'eleanor.vance@patient.ai',
    department: 'ICU Patient Telemetry',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    mrn: 'DSG-90241',
    name: 'Eleanor Vance',
    age: 68,
    gender: 'Female',
    bloodType: 'A+',
    riskScore: 88,
    riskLevel: 'critical',
    primaryDiagnosis: 'Decompensated Heart Failure with Acute-on-Chronic Kidney Injury',
    secondaryDiagnoses: ['Cardiorenal Syndrome Type 1', 'Type 2 Diabetes Mellitus', 'Hypertension'],
    allergies: ['Penicillin', 'Sulfa Drugs'],
    activeMedications: ['IV Furosemide 40mg BID', 'Lisinopril 20mg QD (Hold)', 'Spironolactone 25mg QD', 'Metformin 500mg BID'],
    admissionDate: '2026-08-01',
    attendingPhysician: 'Dr. Rajesh Sharma',
    roomNumber: 'ICU Bed 04',
    primaryDoctor: 'Dr. Rajesh Sharma',
    department: 'Cardiology ICU'
  },
  {
    id: 'pat-2',
    mrn: 'DSG-88192',
    name: 'Marcus Chen',
    age: 54,
    gender: 'Male',
    bloodType: 'O+',
    riskScore: 74,
    riskLevel: 'high',
    primaryDiagnosis: 'Post-Operative Acute Kidney Injury (Stage 2) & Early Sepsis Warning',
    secondaryDiagnoses: ['Acute Tubular Necrosis', 'Type 2 Diabetes', 'Coronary Artery Disease'],
    allergies: ['Contrast Dye'],
    activeMedications: ['IV Vancomycin 1g q12h', 'Cefepime 2g q8h', 'Norepinephrine Infusion'],
    admissionDate: '2026-08-03',
    attendingPhysician: 'Dr. Ananya Sen',
    roomNumber: 'Step-Down 12',
    primaryDoctor: 'Dr. Ananya Sen',
    department: 'Nephrology Unit'
  },
  {
    id: 'pat-3',
    mrn: 'DSG-77301',
    name: 'Sarah Jenkins',
    age: 42,
    gender: 'Female',
    bloodType: 'B+',
    riskScore: 35,
    riskLevel: 'moderate',
    primaryDiagnosis: 'Uncontrolled Primary Hypertension & Subclinical Hypothyroidism',
    secondaryDiagnoses: ['Essential Hypertension', 'Dyslipidemia'],
    allergies: ['Latex'],
    activeMedications: ['Amlodipine 10mg QD', 'Levothyroxine 50mcg QD'],
    admissionDate: '2026-08-04',
    attendingPhysician: 'Dr. Rajesh Sharma',
    roomNumber: 'Ward 204',
    primaryDoctor: 'Dr. Rajesh Sharma',
    department: 'Internal Medicine'
  },
  {
    id: 'pat-4',
    mrn: 'DSG-66482',
    name: 'Vikram Patel',
    age: 61,
    gender: 'Male',
    bloodType: 'AB+',
    riskScore: 92,
    riskLevel: 'critical',
    primaryDiagnosis: 'Severe COPD Exacerbation with Community-Acquired Pneumonia',
    secondaryDiagnoses: ['Chronic Respiratory Failure', 'Pulmonary Hypertension'],
    allergies: ['Codeine'],
    activeMedications: ['Solu-Medrol 60mg IV q6h', 'DuoNeb Nebulizers q4h', 'Azithromycin 500mg QD'],
    admissionDate: '2026-08-02',
    attendingPhysician: 'Dr. Rajesh Sharma',
    roomNumber: 'ICU Bed 08',
    primaryDoctor: 'Dr. Rajesh Sharma',
    department: 'Pulmonology ICU'
  },
  {
    id: 'pat-5',
    mrn: 'DSG-55120',
    name: 'Priya Kulkarni',
    age: 29,
    gender: 'Female',
    bloodType: 'O-',
    riskScore: 14,
    riskLevel: 'low',
    primaryDiagnosis: 'Uncomplicated Postpartum Observation',
    secondaryDiagnoses: ['Postpartum Status Post Normal Vaginal Delivery'],
    allergies: ['No Known Drug Allergies (NKDA)'],
    activeMedications: ['Prenatal Multivitamins', 'Iron Supplement 65mg'],
    admissionDate: '2026-08-06',
    attendingPhysician: 'Dr. Ananya Sen',
    roomNumber: 'Maternity 102',
    primaryDoctor: 'Dr. Ananya Sen',
    department: 'Obstetrics'
  }
];

export const MOCK_VITALS: Record<string, VitalSign[]> = {
  'pat-1': [
    { timestamp: '2026-08-01 08:00', bpSystolic: 158, bpDiastolic: 96, hr: 88, temp: 36.8, spo2: 93, rr: 20 },
    { timestamp: '2026-08-02 08:00', bpSystolic: 148, bpDiastolic: 90, hr: 84, temp: 37.0, spo2: 94, rr: 18 },
    { timestamp: '2026-08-03 08:00', bpSystolic: 162, bpDiastolic: 100, hr: 96, temp: 37.2, spo2: 91, rr: 24, isAnomaly: true },
    { timestamp: '2026-08-04 08:00', bpSystolic: 170, bpDiastolic: 104, hr: 102, temp: 37.5, spo2: 89, rr: 26, isAnomaly: true },
    { timestamp: '2026-08-05 08:00', bpSystolic: 154, bpDiastolic: 94, hr: 90, temp: 37.1, spo2: 92, rr: 22 },
    { timestamp: '2026-08-06 08:00', bpSystolic: 142, bpDiastolic: 88, hr: 82, temp: 36.9, spo2: 95, rr: 18 },
    { timestamp: '2026-08-07 08:00', bpSystolic: 138, bpDiastolic: 84, hr: 78, temp: 36.8, spo2: 96, rr: 17 }
  ]
};

export const MOCK_LABS: Record<string, LabResult[]> = {
  'pat-1': [
    { id: 'l1', testName: 'Serum Creatinine', category: 'Renal', value: 1.4, unit: 'mg/dL', referenceRange: '0.6 - 1.1', isAbnormal: true, timestamp: '2026-08-01 09:00' },
    { id: 'l2', testName: 'Serum Creatinine', category: 'Renal', value: 1.8, unit: 'mg/dL', referenceRange: '0.6 - 1.1', isAbnormal: true, deltaPercent: 28.5, timestamp: '2026-08-03 09:00' },
    { id: 'l3', testName: 'Serum Creatinine', category: 'Renal', value: 2.3, unit: 'mg/dL', referenceRange: '0.6 - 1.1', isAbnormal: true, deltaPercent: 64.2, timestamp: '2026-08-05 09:00' },
    { id: 'l4', testName: 'eGFR', category: 'Renal', value: 24, unit: 'mL/min/1.73m2', referenceRange: '> 60', isAbnormal: true, deltaPercent: -35.1, timestamp: '2026-08-05 09:00' },
    { id: 'l5', testName: 'Serum Potassium', category: 'Metabolic', value: 5.4, unit: 'mEq/L', referenceRange: '3.5 - 5.0', isAbnormal: true, timestamp: '2026-08-05 09:00' },
    { id: 'l6', testName: 'NT-proBNP', category: 'Cardiology', value: 4850, unit: 'pg/mL', referenceRange: '< 300', isAbnormal: true, timestamp: '2026-08-04 09:00' }
  ]
};

export const MOCK_CLINICAL_EVENTS: ClinicalEvent[] = [
  {
    id: 'evt-1',
    patientId: 'pat-1',
    timestamp: '2026-08-05 09:30',
    date: '2026-08-05 09:30',
    title: 'Critical Lab Delta Alert: Creatinine Spike (+64%)',
    category: 'lab',
    severity: 'critical',
    description: 'Serum Creatinine increased sharply from 1.4 mg/dL to 2.3 mg/dL within 48h. eGFR dropped to 24 mL/min. Indicates Cardiorenal Syndrome Type 1.',
    author: 'Dr. Rajesh Sharma',
    insights: [
      '64% increase in Creatinine indicates acute kidney injury stage 2.',
      'Serum Potassium at 5.4 mEq/L requires close cardiac tele monitoring.',
      'Dual Lisinopril + Spironolactone administration contributed to hyperkalemia risk.'
    ],
    keyInsights: [
      '64% increase in Creatinine indicates acute kidney injury stage 2.',
      'Serum Potassium at 5.4 mEq/L requires close cardiac tele monitoring.'
    ]
  },
  {
    id: 'evt-2',
    patientId: 'pat-1',
    timestamp: '2026-08-04 14:00',
    date: '2026-08-04 14:00',
    title: 'Cardiac Biomarker Elevation: NT-proBNP 4,850 pg/mL',
    category: 'vital_alert',
    severity: 'critical',
    description: 'Severe myocardial stretch and volume overload confirmed. JVD 12cm, pulmonary crackles present.',
    author: 'Dr. Rajesh Sharma',
    insights: ['Significantly exceeds normal threshold (<300 pg/mL). High risk of acute heart failure decompensation.'],
    keyInsights: ['Significantly exceeds normal threshold (<300 pg/mL).']
  }
];

export const MOCK_EVENTS = MOCK_CLINICAL_EVENTS;

export const MOCK_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-101',
    patientId: 'pat-1',
    title: 'Discharge Summary & Progress Note - Cardiology ICU',
    type: 'discharge_summary',
    uploadDate: '2026-08-05',
    fileSize: '1.4 MB',
    author: 'Dr. Rajesh Sharma',
    ocrConfidence: 97.8,
    rawOcrText: 'DEEPSEA GUARDIAN CLINICAL CENTER - CARDIOLOGY ICU\nPATIENT: Eleanor Vance | AGE: 68 | MRN: DSG-90241\nDIAGNOSIS: Decompensated Heart Failure (HFpEF) with Acute-on-Chronic Kidney Disease.',
    boundingBoxes: [
      { id: 'b1', text: 'Serum Creatinine: 2.3 mg/dL', category: 'lab', x: 20, y: 40, width: 45, height: 5 }
    ],
    entities: {
      diagnoses: ['Cardiorenal Syndrome Type 1', 'Acute Kidney Injury Stage 2'],
      medications: ['IV Furosemide 40mg BID', 'Hold Lisinopril 20mg'],
      allergies: ['Penicillin'],
      vitals: { BP: '162/100 mmHg', HR: '96 bpm' },
      labValues: { Creatinine: '2.3 mg/dL', eGFR: '24 mL/min' },
      symptoms: ['Orthopnea', 'Bilateral Leg Edema'],
      surgeries: []
    }
  }
];

export const MOCK_RISK_ASSESSMENTS: Record<string, PatientRiskAssessment> = {
  'pat-1': {
    patientId: 'pat-1',
    overallScore: 88,
    level: 'critical',
    overallLevel: 'critical',
    calculatedAt: '2026-08-05 10:00',
    domains: {
      cardiovascular: { score: 92, factors: ['NT-proBNP 4,850 pg/mL', 'BP 162/100 mmHg'], reasons: ['NT-proBNP 4,850 pg/mL', 'BP 162/100 mmHg'] },
      renal: { score: 85, factors: ['Creatinine +64% delta (2.3 mg/dL)'], reasons: ['Creatinine +64% delta (2.3 mg/dL)'] },
      respiratory: { score: 78, factors: ['SpO2 91% on room air'], reasons: ['SpO2 91% on room air'] },
      sepsis: { score: 25, factors: ['WBC 8.2 (Normal)'], reasons: ['WBC 8.2 (Normal)'] }
    },
    recommendations: ['Hold Lisinopril', 'Titrate IV Furosemide'],
    contraindications: ['ACE Inhibitors in AKI Stage 2']
  }
};
