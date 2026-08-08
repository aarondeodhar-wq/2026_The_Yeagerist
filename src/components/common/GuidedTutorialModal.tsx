import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  X, 
  Camera, 
  Bot, 
  Pill, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

interface GuidedTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidedTutorialModal: React.FC<GuidedTutorialModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isOpen) return null;

  const STEPS = [
    {
      title: '📸 ' + (language === 'hi' ? 'डॉक्टर पर्ची / रिपोर्ट की फोटो लें' : language === 'mr' ? 'अहवालाचा फोटो काढा' : 'Upload Lab Test or Prescription'),
      description: t('tutorial_step1'),
      icon: Camera,
      badge: 'Step 1 of 4'
    },
    {
      title: '🗣️ ' + (language === 'hi' ? 'अपनी भाषा में सवाल पूछें' : language === 'mr' ? 'तुमच्या भाषेत प्रश्न विचारा' : 'Ask AI in your Language'),
      description: t('tutorial_step2'),
      icon: Bot,
      badge: 'Step 2 of 4'
    },
    {
      title: '💊 ' + (language === 'hi' ? 'दवाओं की सूची और समय देखें' : language === 'mr' ? 'औषधांची वेळ आणि यादी पहा' : 'Check Daily Medicines & Holds'),
      description: t('tutorial_step3'),
      icon: Pill,
      badge: 'Step 3 of 4'
    },
    {
      title: '📞 ' + (language === 'hi' ? '24/7 आपातकालीन डॉक्टर सहायता' : language === 'mr' ? '२४/७ आपत्कालीन डॉक्टर मदत' : '24/7 Telemetry & Emergency Support'),
      description: language === 'hi' ? 'आवश्यकता पड़ने पर सीधे अस्पताल हेल्पलाइन 108 या विशेषज्ञ डॉक्टर से परामर्श लें।' : 'Connect directly with ICU nurses or hospital helpline in 1 tap.',
      icon: PhoneCall,
      badge: 'Step 4 of 4'
    }
  ];

  const step = STEPS[currentStep - 1];
  const StepIcon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans animate-fade-in">
      <div className="bg-[#0c182c] border border-cyan-500/30 text-slate-100 rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-cyan-500/20 blur-[80px] pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="font-black text-base">{t('tutorial_title')}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Card Content */}
        <div className="space-y-4 text-center py-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 mx-auto shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full bg-[#070a12] rounded-[22px] flex items-center justify-center text-cyan-400">
              <StepIcon className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          <span className="inline-block text-[10px] bg-cyan-500/20 text-cyan-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-cyan-400/30">
            {step.badge}
          </span>

          <h4 className="text-lg font-black text-slate-100">{step.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
            {step.description}
          </p>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i + 1)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentStep === i + 1 ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'
              }`}
            ></button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-1 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
              currentStep === 1 ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600' : 'border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              className="flex items-center gap-1 text-xs font-black px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-black px-5 py-2.5 rounded-xl bg-emerald-400 text-slate-950 shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Got it! Start Using</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
