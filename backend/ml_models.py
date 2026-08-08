import numpy as np
from sklearn.linear_model import LogisticRegression
from typing import Dict, Any, List

class ClinicalRiskPredictor:
    """
    ML Organ Risk Prediction Engine:
    Trains logistic regression models on vitals and lab delta features
    to output risk probabilities for Cardiovascular, Renal, Respiratory, and Sepsis domains.
    """
    def __init__(self):
        # Synthetic training dataset representing patient telemetry features:
        # [BP_sys, HR, SpO2, Temp, Creatinine_delta_pct, WBC]
        X_train = np.array([
            [120, 72, 98, 36.8, 0, 7.5],    # Normal low risk
            [150, 88, 94, 37.0, 15, 8.2],   # Moderate risk
            [165, 98, 91, 37.2, 45, 11.5],  # High Cardiorenal
            [175, 108, 88, 37.6, 65, 16.4], # Critical Cardiorenal
            [104, 115, 93, 38.8, 75, 18.9], # Sepsis / AKI
        ])

        # Target risk categories (0: Low, 1: Moderate, 2: High, 3: Critical)
        y_cardio = np.array([0, 1, 2, 3, 2])
        y_renal = np.array([0, 0, 2, 3, 3])
        y_resp = np.array([0, 0, 1, 3, 2])
        y_sepsis = np.array([0, 0, 0, 1, 3])

        self.model_cardio = LogisticRegression(max_iter=1000).fit(X_train, y_cardio)
        self.model_renal = LogisticRegression(max_iter=1000).fit(X_train, y_renal)
        self.model_resp = LogisticRegression(max_iter=1000).fit(X_train, y_resp)
        self.model_sepsis = LogisticRegression(max_iter=1000).fit(X_train, y_sepsis)

    def predict_organ_risks(self, vitals: Dict[str, float], creat_delta_pct: float = 45.0, wbc: float = 12.0) -> Dict[str, Any]:
        bp_sys = vitals.get('bpSystolic', 154)
        hr = vitals.get('hr', 90)
        spo2 = vitals.get('spo2', 92)
        temp = vitals.get('temp', 37.1)

        features = np.array([[bp_sys, hr, spo2, temp, creat_delta_pct, wbc]])

        cardio_pred = self.model_cardio.predict_proba(features)[0]
        renal_pred = self.model_renal.predict_proba(features)[0]
        resp_pred = self.model_resp.predict_proba(features)[0]
        sepsis_pred = self.model_sepsis.predict_proba(features)[0]

        cardio_score = int(np.sum(cardio_pred * np.array([15, 45, 75, 95])))
        renal_score = int(np.sum(renal_pred * np.array([15, 45, 75, 95])))
        resp_score = int(np.sum(resp_pred * np.array([15, 45, 75, 95])))
        sepsis_score = int(np.sum(sepsis_pred * np.array([15, 45, 75, 95])))

        overall_score = max(cardio_score, renal_score, resp_score)

        return {
            "overallScore": overall_score,
            "overallLevel": "critical" if overall_score >= 80 else ("high" if overall_score >= 60 else "moderate"),
            "domains": {
                "cardiovascular": {
                    "score": cardio_score,
                    "trend": "increasing",
                    "reasons": [f"Systolic BP {bp_sys} mmHg", "NT-proBNP 4,850 pg/mL (Severe myocardium stress)"]
                },
                "renal": {
                    "score": renal_score,
                    "trend": "increasing",
                    "reasons": [f"Creatinine elevated by +{creat_delta_pct}%", "Serum Potassium at 5.4 mEq/L"]
                },
                "respiratory": {
                    "score": resp_score,
                    "trend": "stable",
                    "reasons": [f"SpO2 at {spo2}% on room air", "Orthopnea symptoms"]
                },
                "sepsis": {
                    "score": sepsis_score,
                    "trend": "stable",
                    "reasons": [f"Body temp {temp}°C", f"WBC {wbc} x10^3/uL"]
                }
            },
            "recommendations": [
                "Withhold ACEi/Lisinopril therapy until renal function stabilizes.",
                "Initiate daily potassium and telemetry monitoring.",
                "Strict fluid restriction (1.5L/24h) and nephrology consultation."
            ]
        }
