const API_BASE = 'http://127.0.0.1:8000/api';

export interface OCRUploadResponse {
  id: string;
  patientId: string;
  title: string;
  uploadDate: string;
  ocrConfidence: number;
  rawOcrText: string;
  boundingBoxes: Array<{ id: string; text: string; category: 'diagnosis' | 'medication' | 'lab' | 'vital'; x: number; y: number; width: number; height: number }>;
  entities: {
    diagnoses: string[];
    medications: string[];
    allergies: string[];
    vitals: Record<string, string>;
    labValues: Record<string, string>;
    symptoms: string[];
    surgeries: string[];
  };
}

export const apiService = {
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  async uploadOcrDocument(file?: File, patientId: string = 'pat-1', rawNotes?: string): Promise<OCRUploadResponse | null> {
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('patientId', patientId);
      if (rawNotes) formData.append('rawNotes', rawNotes);

      const res = await fetch(`${API_BASE}/upload-ocr`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async predictRisk(vitals: Record<string, number>, creatDelta?: number) {
    try {
      const res = await fetch(`${API_BASE}/predict-risk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vitals, creatDelta })
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async checkDrugInteraction(drugA: string, drugB: string | string[]) {
    try {
      const secondDrug = Array.isArray(drugB) ? drugB[0] : drugB;
      const res = await fetch(`${API_BASE}/check-drug-interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugA, drugB: secondDrug })
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async queryRAGAssistant(query: string, patientId: string = 'pat-1') {
    try {
      const res = await fetch(`${API_BASE}/rag-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, patientId })
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
};
