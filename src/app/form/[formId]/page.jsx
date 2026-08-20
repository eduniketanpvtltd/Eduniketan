'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, UploadCloud, XCircle, ArrowRight, Briefcase, GraduationCap, Clock, Check } from 'lucide-react';

// ─── File Upload Field ─────────────────────────────────────────────────────

function FileUploadField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/recruitment-upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        onChange(data.url);
        setUploadedName(data.fileName || file.name);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {field.label}
        {field.required && <span className="text-emerald-500 ml-1">*</span>}
      </label>
      {field.helpText && <p className="text-xs text-slate-500 mb-3">{field.helpText}</p>}
      
      <div className="relative">
        <input
          type="file"
          id={field.id}
          required={field.required && !value}
          onChange={handleFile}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={uploading}
          accept=".pdf,.doc,.docx"
        />
        <div className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-2xl transition-all duration-300 ${
          value ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-indigo-400 bg-slate-50/50'
        }`}>
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-medium text-indigo-700">Uploading file...</p>
            </div>
          ) : value ? (
            <div className="flex flex-col items-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8 mb-2" />
              <p className="text-sm font-bold text-emerald-700 text-center">{uploadedName || 'File uploaded successfully'}</p>
              <p className="text-xs text-emerald-600/70 mt-1">Click to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-500">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-indigo-500">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 mb-1">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 10MB</p>
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
    </div>
  );
}

// ─── Dynamic Field Renderer ────────────────────────────────────────────────

function DynamicField({ field, value, onChange, error }) {
  const inputBase = `w-full px-5 py-3.5 text-sm bg-slate-50/50 border rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all duration-300 shadow-sm ${
    error ? 'border-red-400 bg-red-50/50' : 'border-slate-200 hover:border-indigo-300'
  }`;

  const labelEl = (
    <label htmlFor={field.id} className="block text-sm font-semibold text-slate-700 mb-2">
      {field.label}
      {field.required && <span className="text-emerald-500 ml-1">*</span>}
    </label>
  );

  if (field.type === 'file') return <FileUploadField field={field} value={value || ''} onChange={onChange} />;

  if (field.type === 'textarea') {
    return (
      <div className="w-full">
        {labelEl}
        {field.helpText && <p className="text-xs text-slate-500 mb-2">{field.helpText}</p>}
        <textarea
          id={field.id}
          rows={4}
          required={field.required}
          placeholder={field.placeholder || ''}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} resize-none`}
        />
        {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
      </div>
    );
  }

  if (field.type === 'select') {
    const opts = Array.isArray(field.options) ? field.options : [];
    return (
      <div className="w-full">
        {labelEl}
        {field.helpText && <p className="text-xs text-slate-500 mb-2">{field.helpText}</p>}
        <select id={field.id} required={field.required} value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputBase}>
          <option value="" disabled>{field.placeholder || `-- Select ${field.label} --`}</option>
          {opts.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
      </div>
    );
  }

  if (field.type === 'radio' || field.type === 'checkbox') {
    const opts = Array.isArray(field.options) ? field.options : [];
    const isRadio = field.type === 'radio';
    const selected = Array.isArray(value) ? value : [];
    
    const toggle = (opt) => {
      if (isRadio) { onChange(opt); return; }
      const updated = selected.includes(opt) ? selected.filter((v) => v !== opt) : [...selected, opt];
      onChange(updated);
    };

    return (
      <div className="w-full">
        {labelEl}
        {field.helpText && <p className="text-xs text-slate-500 mb-3">{field.helpText}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {opts.map((opt) => {
            const isChecked = isRadio ? value === opt : selected.includes(opt);
            return (
              <label 
                key={opt} 
                className={`flex items-center gap-3 p-4 cursor-pointer rounded-2xl border-2 transition-all duration-300 ${
                  isChecked ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-slate-50 hover:border-indigo-200'
                }`}
              >
                <div className={`flex-shrink-0 flex items-center justify-center w-5 h-5 border-2 rounded transition-colors ${
                  isRadio ? 'rounded-full' : 'rounded-md'
                } ${isChecked ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'}`}>
                  {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </div>
                <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-indigo-900' : 'text-slate-600'}`}>{opt}</span>
              </label>
            );
          })}
        </div>
        {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      {labelEl}
      {field.helpText && <p className="text-xs text-slate-500 mb-2">{field.helpText}</p>}
      <input
        id={field.id}
        type={field.type}
        required={field.required}
        placeholder={field.placeholder || ''}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      />
      {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function FormFillPage({ params }) {
  const [formId, setFormId] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

  const setFieldValue = useCallback((fieldId, val) => {
    setFormData((prev) => ({ ...prev, [fieldId]: val }));
    setErrors((prev) => ({ ...prev, [fieldId]: '' }));
  }, []);

  const validate = () => {
    if (!form) return false;
    const newErrors = {};
    for (const field of form.fields || []) {
      if (!field.required) continue;
      const val = formData[field.id];
      if (field.type === 'checkbox') {
        if (!Array.isArray(val) || val.length === 0) newErrors[field.id] = 'Please select at least one option.';
      } else if (field.type === 'file') {
        if (!val) newErrors[field.id] = 'Please upload a file.';
      } else {
        if (!val || (typeof val === 'string' && !val.trim())) newErrors[field.id] = `${field.label} is required.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/recruitment-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId: form.id, formTitle: form.title, data: formData }),
      });
      const result = await res.json();

      if (result.success) setSubmitted(true);
      else setSubmitError(result.error || 'Submission failed. Please try again.');
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Animation Variants ──────────────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  // ─── Shared UI States ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium tracking-wide animate-pulse">Loading Application...</p>
        </div>
      </div>
    );
  }

  if (notFound || isClosed) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{notFound ? 'Form Not Found' : 'Applications Closed'}</h1>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            {notFound 
              ? "This recruitment form doesn't exist or the link is broken." 
              : `The deadline for ${form?.title || 'this position'} has passed or we are no longer accepting applications.`}
          </p>
          <Link href="/recruitment" className="mt-8 flex items-center justify-center gap-2 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md">
            View Open Positions <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Success View ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          className="bg-white/80 backdrop-blur-xl border border-white p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/30"
          >
            <Check className="w-12 h-12 text-white stroke-[3]" />
          </motion.div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Application Sent!</h2>
          <p className="text-slate-600 text-base leading-relaxed mb-10">
            {form.confirmationMessage || "Thank you for your application! We will review your details and get back to you soon."}
          </p>
          
          <div className="flex flex-col gap-3">
            <Link href="/recruitment" className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
              Back to Careers
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Main Premium Split-Screen Layout ────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-white selection:bg-indigo-500/30">
      
      {/* Left Panel: Sticky Hero (Hidden on Mobile) */}
      <div className="hidden lg:flex w-5/12 relative flex-col justify-between p-12 overflow-hidden bg-slate-900 fixed left-0 top-0 bottom-0 h-screen">
        <div className="absolute inset-0 z-0">
          <img src="/edtech-hero.jpg" alt="Hero Illustration" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-emerald-900/40 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold tracking-widest uppercase text-xs">Eduniketan Careers</span>
        </div>

        <div className="relative z-10 mt-auto mb-auto max-w-md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
              {form.title}
            </h1>
            {form.description && (
              <p className="mt-6 text-lg text-slate-300 leading-relaxed font-light">
                {form.description}
              </p>
            )}
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-sm font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>{(form.fields || []).length} Requirements</span>
          </div>
          {form.deadline && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Apply by {new Date(form.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Scrollable Form Area */}
      <div className="w-full lg:w-7/12 flex flex-col relative bg-white lg:ml-auto">
        <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12 sm:px-12 sm:py-20 lg:py-24">
          
          {/* Mobile Header (Only visible on small screens) */}
          <div className="lg:hidden mb-12">
            <Link href="/recruitment" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm mb-6 hover:text-indigo-800 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Openings
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">{form.title}</h1>
            {form.description && <p className="mt-4 text-slate-600 text-base leading-relaxed">{form.description}</p>}
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {(form.fields || []).map((field) => (
              <motion.div key={field.id} variants={itemVariants} className="w-full">
                <DynamicField
                  field={field}
                  value={formData[field.id]}
                  onChange={(val) => setFieldValue(field.id, val)}
                  error={errors[field.id]}
                />
              </motion.div>
            ))}

            {submitError && (
              <motion.div variants={itemVariants} className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3 text-red-700">
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{submitError}</p>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="pt-6">
              <button
                type="submit"
                disabled={submitting || (form.fields || []).length === 0}
                className="w-full py-4 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg group"
              >
                {submitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-center mt-6 text-xs font-medium text-slate-400">
                Secure application process. Your information is kept confidential.
              </p>
            </motion.div>
          </motion.form>

        </div>
      </div>

    </div>
  );
}
