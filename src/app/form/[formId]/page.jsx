'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ChevronRight, ChevronDown, UploadCloud, XCircle,
  ArrowRight, Award, Users, Briefcase, Clock, Check, FileText, Star,
  Sparkles, ArrowDown, ArrowLeft, Zap, Target, BookOpen, MapPin, 
  Globe2, ShieldCheck,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────────────
   BRAND TOKENS
   ──────────────────────────────────────────────────────────────────────────── */
const BRAND = {
  orange: '#F54900',
  orangeLight: '#FFF1EB',
  orangeMid: '#FFDDD0',
  navy: '#0F1B2D',
  navyLight: '#1A2A40',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray600: '#4B5563',
  gray700: '#374151',
  gray900: '#111827',
};

/* ────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ──────────────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ────────────────────────────────────────────────────────────────────────────
   FILE UPLOAD FIELD
   ──────────────────────────────────────────────────────────────────────────── */
const FileUploadField = React.memo(({ field, value, onChange, error }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState('');
  const [localError, setLocalError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setLocalError('File size exceeds the 10 MB limit.');
      return;
    }
    setUploading(true);
    setLocalError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/recruitment-upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
        setUploadedName(data.fileName || file.name);
      } else {
        setLocalError(data.error || 'Upload failed');
      }
    } catch {
      setLocalError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const finalError = localError || error;

  return (
    <div className="w-full">
      <div
        className="relative mt-2"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
      >
        <input type="file" id={field.id} onChange={(e) => handleFile(e.target.files?.[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" disabled={uploading} accept=".pdf,.doc,.docx" />
        <motion.div
          animate={dragOver ? { scale: 1.02, borderColor: BRAND.orange } : { scale: 1 }}
          className={`flex flex-col items-center justify-center w-full py-10 px-6 border-2 border-dashed rounded-[1.5rem] transition-all duration-300 ${
            value ? 'border-emerald-400 bg-emerald-50/60' : dragOver ? '' : finalError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/30'
          }`}
          style={dragOver ? { borderColor: BRAND.orange, background: BRAND.orangeLight } : {}}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-orange-200 rounded-full animate-spin" style={{ borderTopColor: BRAND.orange }} />
              <p className="text-sm font-semibold text-gray-600">Uploading...</p>
            </div>
          ) : value ? (
            <div className="flex flex-col items-center text-emerald-600 gap-2">
              <CheckCircle2 className="w-10 h-10" />
              <p className="text-base font-bold text-emerald-700 text-center">{uploadedName || 'File uploaded!'}</p>
              <p className="text-xs text-emerald-500 font-medium mt-1 bg-white px-3 py-1 rounded-full shadow-sm">Click to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100" style={{ color: BRAND.orange }}>
                <UploadCloud className="w-7 h-7" />
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-gray-700">Drop file or <span style={{ color: BRAND.orange }}>browse</span></p>
                <p className="text-xs font-medium text-gray-400 mt-1">PDF, DOC, DOCX — Max 10 MB</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      {finalError && (
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-500 mt-3 font-bold flex items-center gap-1.5">
          <XCircle className="w-4 h-4"/> {finalError}
        </motion.p>
      )}
    </div>
  );
});
FileUploadField.displayName = 'FileUploadField';

/* ────────────────────────────────────────────────────────────────────────────
   DYNAMIC FIELD RENDERER
   ──────────────────────────────────────────────────────────────────────────── */
const DynamicField = React.memo(({ field, value, onChange, error, onEnterPress }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (field.type === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, field.type]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && field.type !== 'textarea') {
      e.preventDefault();
      onEnterPress();
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && field.type === 'textarea') {
      e.preventDefault();
      onEnterPress();
    }
  };

  const inputClasses = `w-full px-5 py-4 text-base font-medium bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 placeholder-gray-400 ${
    error ? 'border-red-400 bg-red-50 focus:bg-white text-red-900' : 'border-gray-200 focus:border-orange-500 focus:bg-white text-gray-900 hover:border-gray-300'
  }`;

  const labelEl = (
    <label htmlFor={field.id} className="block text-base font-bold text-gray-900 mb-2">
      {field.label}
      {field.required && <span style={{ color: BRAND.orange }} className="ml-1">*</span>}
    </label>
  );

  if (field.type === 'file') return <div className="mb-8">{labelEl}{field.helpText && <p className="text-sm text-gray-500 mb-3">{field.helpText}</p>}<FileUploadField field={field} value={value || ''} onChange={onChange} error={error} /></div>;

  if (field.type === 'textarea') {
    return (
      <div className="mb-8">
        {labelEl}
        {field.helpText && <p className="text-sm text-gray-500 mb-3">{field.helpText}</p>}
        <textarea
          ref={textareaRef}
          rows={3}
          placeholder={field.placeholder || 'Type your answer here...'}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`${inputClasses} resize-none overflow-hidden`}
        />
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 mt-2 font-bold flex items-center gap-1.5"><XCircle className="w-4 h-4"/> {error}</motion.p>}
      </div>
    );
  }

  if (field.type === 'select') {
    const opts = Array.isArray(field.options) ? field.options : [];
    return (
      <div className="mb-8 relative">
        {labelEl}
        {field.helpText && <p className="text-sm text-gray-500 mb-3">{field.helpText}</p>}
        <div className="relative">
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${inputClasses} appearance-none pr-12 cursor-pointer`}
          >
            <option value="" disabled>{field.placeholder || `-- Select Option --`}</option>
            {opts.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 mt-2 font-bold flex items-center gap-1.5"><XCircle className="w-4 h-4"/> {error}</motion.p>}
      </div>
    );
  }

  if (field.type === 'radio' || field.type === 'checkbox') {
    const opts = Array.isArray(field.options) ? field.options : [];
    const isRadio = field.type === 'radio';
    const selected = Array.isArray(value) ? value : [];

    const toggle = (opt) => {
      if (isRadio) {
        onChange(opt);
        return;
      }
      const updated = selected.includes(opt) ? selected.filter((v) => v !== opt) : [...selected, opt];
      onChange(updated);
    };

    return (
      <div className="mb-8">
        {labelEl}
        {field.helpText && <p className="text-sm text-gray-500 mb-4">{field.helpText}</p>}
        <div className="flex flex-wrap gap-3">
          {opts.map((opt) => {
            const isChecked = isRadio ? value === opt : selected.includes(opt);
            return (
              <label
                key={opt}
                className={`flex items-center gap-3 px-5 py-3 cursor-pointer rounded-xl border-2 transition-all duration-200 select-none ${
                  isChecked
                    ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <input type={field.type} name={field.id} value={opt} checked={isChecked} onChange={() => toggle(opt)} className="sr-only" />
                
                <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                  isRadio ? 'rounded-full' : 'rounded-md'
                } ${isChecked ? 'border-orange-500 bg-orange-500' : 'border-gray-300 bg-white'}`}>
                  {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </div>
                <span className="text-sm font-medium">{opt}</span>
              </label>
            );
          })}
        </div>
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 mt-3 font-bold flex items-center gap-1.5"><XCircle className="w-4 h-4"/> {error}</motion.p>}
      </div>
    );
  }

  // text / email / tel / number
  return (
    <div className="mb-8">
      {labelEl}
      {field.helpText && <p className="text-sm text-gray-500 mb-3">{field.helpText}</p>}
      <input
        type={field.type}
        placeholder={field.placeholder || ''}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={inputClasses}
      />
      {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 mt-2 font-bold flex items-center gap-1.5"><XCircle className="w-4 h-4"/> {error}</motion.p>}
    </div>
  );
});
DynamicField.displayName = 'DynamicField';

/* ────────────────────────────────────────────────────────────────────────────
   MODAL WIZARD (POPUP STYLE WITH CHUNKS)
   ──────────────────────────────────────────────────────────────────────────── */
function FormWizardModal({ form, isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Chunk fields into groups of 3
  const fields = form?.fields || [];
  const chunkedFields = [];
  for (let i = 0; i < fields.length; i += 3) {
    chunkedFields.push(fields.slice(i, i + 3));
  }
  const currentChunk = chunkedFields[step] || [];
  const progress = chunkedFields.length > 0 ? ((step) / chunkedFields.length) * 100 : 0;

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setErrors({});
    }
  }, [isOpen]);

  const validateCurrentStep = () => {
    const newErrors = {};
    for (const field of currentChunk) {
      const val = formData[field.id];
      
      // If field is not required and has no value, skip validation
      if (!field.required && (!val || val.length === 0)) continue;
      
      if (field.required && field.type === 'checkbox') {
        if (!Array.isArray(val) || val.length === 0) newErrors[field.id] = 'Select at least one option.';
      } else if (field.required && field.type === 'file') {
        if (!val) newErrors[field.id] = 'File is required.';
      } else {
        if (field.required && (!val || (typeof val === 'string' && !val.trim()))) {
          newErrors[field.id] = 'This field is required.';
        } else if (val) {
          // Additional validations if value exists
          const labelLower = (field.label || '').toLowerCase();
          if (field.type === 'tel' || labelLower.includes('phone') || labelLower.includes('whatsapp') || labelLower.includes('mobile')) {
            const digitsOnly = typeof val === 'string' ? val.replace(/\D/g, '') : '';
            if (digitsOnly.length !== 10) {
              newErrors[field.id] = 'Please enter a valid 10-digit phone number.';
            }
          } else if (field.type === 'email' || labelLower.includes('email')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) {
              newErrors[field.id] = 'Please enter a valid email address.';
            }
          }
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    
    if (step < chunkedFields.length - 1) {
      setErrors({});
      setStep(s => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setErrors({});
      setStep(s => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch('/api/recruitment-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId: form.id, formTitle: form.title, data: formData }),
      });
      const result = await res.json();
      if (result.success) {
        onSuccess(formData);
      } else {
        setErrors({ global: result.error || 'Submission failed.' });
      }
    } catch {
      setErrors({ global: 'Network error. Please check your connection.' });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col my-auto overflow-hidden border border-gray-100"
        >
          {/* Progress Bar Top */}
          <div className="h-1.5 w-full bg-gray-100 absolute top-0 left-0">
            <motion.div 
              className="h-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%`, background: BRAND.orange }} 
            />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 pt-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Application Form</h3>
              <p className="text-xs font-semibold text-gray-400 mt-0.5 tracking-wider uppercase">Step {step + 1} of {chunkedFields.length}</p>
            </div>
            <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-8 flex-1 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentChunk.map(field => (
                  <DynamicField
                    key={field.id}
                    field={field}
                    value={formData[field.id]}
                    onChange={(val) => {
                      setFormData(prev => ({ ...prev, [field.id]: val }));
                      setErrors(prev => { const n = {...prev}; delete n[field.id]; return n; });
                    }}
                    error={errors[field.id]}
                    onEnterPress={() => {}}
                  />
                ))}

                {errors.global && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-bold flex gap-2 items-center mt-6">
                    <XCircle className="w-5 h-5" /> {errors.global}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between rounded-b-3xl">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="px-6 py-3 font-bold text-gray-500 disabled:opacity-30 flex items-center gap-2 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step === chunkedFields.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={submitting}
                className="px-8 py-3.5 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center gap-2 disabled:opacity-70"
                style={{ background: BRAND.orange }}
              >
                {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Submit'}
                <CheckCircle2 className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3.5 text-white font-bold rounded-xl shadow-lg shadow-gray-900/10 hover:shadow-xl transition-all flex items-center gap-2"
                style={{ background: BRAND.navy }}
              >
                Next <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   LANDING PAGE (Main Entry)
   ──────────────────────────────────────────────────────────────────────────── */
export default function FormLandingPage({ params }) {
  const [formId, setFormId] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  
  const [wizardOpen, setWizardOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    params.then?.((p) => setFormId(p.formId)).catch?.(() => {});
    if (params.formId) setFormId(params.formId);
  }, [params]);

  useEffect(() => {
    if (!formId) return;
    setLoading(true);
    fetch(`/api/recruitment-forms/${formId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.success || !data.data) { setNotFound(true); return; }
        const f = data.data;
        if (!f.isPublished) { setIsClosed(true); return; }
        if (f.deadline) {
          const dl = new Date(f.deadline);
          dl.setHours(23, 59, 59, 999);
          if (new Date() > dl) { setIsClosed(true); setForm(f); return; }
        }
        setForm(f);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [formId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-100 rounded-full animate-spin" style={{ borderTopColor: BRAND.orange }} />
      </div>
    );
  }

  if (notFound || isClosed) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">{notFound ? 'Form Not Found' : 'Applications Closed'}</h1>
        <p className="text-gray-500 mt-3">{notFound ? "This form doesn't exist." : `The deadline has passed.`}</p>
        <Link href="/recruitment" className="mt-8 px-8 py-3 text-white font-bold rounded-xl" style={{ background: BRAND.orange }}>
          View Open Positions
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 max-w-xl w-full text-center border border-gray-100 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Check className="w-10 h-10 text-emerald-600 stroke-[3]" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-500 mb-8">{form.confirmationMessage || "Thank you for applying!"}</p>
          <Link href="/recruitment" className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-xl" style={{ background: BRAND.navy }}>
            Back to Careers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const daysLeft = form.deadline ? Math.ceil((new Date(form.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;
  const isAmbassador = form.title?.toLowerCase().includes('ambassador');
  const shortTitle = form.title?.split('—')[0]?.trim() || form.title;
  const paragraphs = form.description ? form.description.split('\n').filter(p => p.trim() !== '') : [];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>
      
      {/* ────────────── PREMIUM SPLIT HERO BANNER ────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.05] translate-x-1/2 -translate-y-1/2" style={{ background: BRAND.orange }} />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.03] -translate-x-1/2 translate-y-1/2" style={{ background: BRAND.navy }} />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div initial="hidden" animate="show" variants={stagger} className="lg:col-span-7 flex flex-col text-left">
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-sm text-gray-500 mb-10 font-medium">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/recruitment" className="hover:text-gray-900 transition-colors">Careers</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 truncate max-w-[200px]">{shortTitle}</span>
            </motion.nav>

            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold mb-8 tracking-widest uppercase shadow-sm border border-orange-100 bg-orange-50 text-orange-600 self-start">
              <Sparkles className="w-4 h-4" />
              Now Hiring
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-8 text-gray-900">
              {form.title}
            </motion.h1>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-5 py-3 rounded-xl text-gray-600 font-semibold shadow-sm">
                <MapPin className="w-5 h-5 text-gray-400" /> Remote / On-Campus
              </div>
              {daysLeft !== null && (
                <div className="flex items-center gap-2.5 bg-orange-50 border border-orange-100 px-5 py-3 rounded-xl text-orange-700 font-semibold shadow-sm">
                  <Clock className="w-5 h-5 text-orange-500" /> {daysLeft <= 0 ? 'Closing today!' : `${daysLeft} days left to apply`}
                </div>
              )}
            </motion.div>

            <motion.button
              variants={fadeUp}
              onClick={() => setWizardOpen(true)}
              className="self-start px-10 py-5 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all flex items-center gap-3"
              style={{ background: BRAND.orange }}
            >
              Start Application <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/60 to-transparent z-10" />
              <img 
                src={isAmbassador ? "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"} 
                alt="Role" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold border border-white/30 mb-4">
                  <ShieldCheck className="w-4 h-4" /> Trusted Program
                </div>
                <h3 className="text-3xl font-bold leading-tight">Join a network of top minds.</h3>
              </div>
            </div>
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center"><Globe2 className="w-6 h-6 text-blue-500" /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Reach</p>
                <p className="text-lg font-black text-gray-900">100+ Campuses</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ────────────── ABOUT THE ROLE ────────────── */}
      <section className="py-20 md:py-28 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-sm border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3 border-b-2 border-gray-100 pb-6"><BookOpen className="w-7 h-7 text-orange-500" /> Role Overview</h2>
              <div className="prose prose-lg text-gray-600">
                {paragraphs.length > 0 ? paragraphs.map((p, i) => <p key={i} className="mb-6 font-medium leading-relaxed">{p}</p>) : <p>Join our team and build the future of education.</p>}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="font-extrabold text-gray-900 text-2xl mb-8 flex items-center gap-3 relative z-10"><Target className="w-6 h-6 text-orange-500" /> Why Join Us?</h3>
              <ul className="space-y-6 relative z-10">
                {[{i: Award, t: 'Official Certification', d: 'Recognized credentials', c: 'orange'}, {i: Users, t: 'Direct Mentorship', d: 'Work with industry experts', c: 'blue'}, {i: Zap, t: 'Fast-track Placements', d: 'Priority internship access', c: 'emerald'}].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-${item.c}-50 flex items-center justify-center flex-shrink-0 border border-${item.c}-100`}><item.i className={`w-5 h-5 text-${item.c}-600`} /></div>
                    <div><h4 className="text-gray-900 font-bold mb-1">{item.t}</h4><p className="text-gray-500 text-sm font-medium">{item.d}</p></div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 text-center relative overflow-hidden">
               <h3 className="font-extrabold text-white text-xl mb-3 relative z-10">Ready to make an impact?</h3>
               <p className="text-gray-400 text-sm font-medium mb-6 relative z-10">Takes less than 2 minutes.</p>
               <button onClick={() => setWizardOpen(true)} className="w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1" style={{ background: BRAND.orange }}>Start Application</button>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── FOOTER ────────────── */}
      <footer className="py-12 text-center text-sm text-gray-500 bg-white font-medium border-t border-gray-200">
        © {new Date().getFullYear()} Eduniketan Private Limited. All rights reserved.
      </footer>

      {/* ────────────── WIZARD MODAL ────────────── */}
      <FormWizardModal form={form} isOpen={wizardOpen} onClose={() => setWizardOpen(false)} onSuccess={() => { setWizardOpen(false); setSubmitted(true); }} />
    </div>
  );
}
