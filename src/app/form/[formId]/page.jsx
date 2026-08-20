'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ChevronRight, ChevronDown, UploadCloud, XCircle,
  ArrowRight, Award, Users, Briefcase, Clock, Check, FileText, Star,
  Sparkles, ArrowDown
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
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 250, damping: 20 } },
};

/* ────────────────────────────────────────────────────────────────────────────
   SCROLL-ANIMATED SECTION WRAPPER
   ──────────────────────────────────────────────────────────────────────────── */
function Section({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   FLOATING SHAPES (subtle parallax decorations)
   ──────────────────────────────────────────────────────────────────────────── */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[12%] right-[8%] w-16 h-16 rounded-2xl rotate-12"
        style={{ background: `${BRAND.orange}15` }}
      />
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[30%] left-[5%] w-10 h-10 rounded-full"
        style={{ background: `${BRAND.orange}10` }}
      />
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[20%] right-[12%] w-20 h-20 rounded-full"
        style={{ background: `${BRAND.orange}08` }}
      />
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[60%] left-[10%] w-8 h-8 rounded-lg rotate-45"
        style={{ background: `${BRAND.navy}08` }}
      />
      {/* small dots */}
      {[
        { top: '18%', left: '20%', size: 6 },
        { top: '45%', right: '18%', size: 5 },
        { top: '75%', left: '25%', size: 4 },
        { top: '85%', right: '30%', size: 6 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          className="absolute rounded-full"
          style={{ top: dot.top, left: dot.left, right: dot.right, width: dot.size, height: dot.size, background: BRAND.orange }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   BENEFIT CARD
   ──────────────────────────────────────────────────────────────────────────── */
function BenefitCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: '0 12px 40px -8px rgba(245,73,0,0.12)' }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-all duration-300 cursor-default"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: BRAND.orangeLight }}
      >
        <Icon className="w-6 h-6" style={{ color: BRAND.orange }} />
      </div>
      <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   FILE UPLOAD FIELD
   ──────────────────────────────────────────────────────────────────────────── */
function FileUploadField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState('');
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file) => {
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
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {field.label}
        {field.required && <span style={{ color: BRAND.orange }} className="ml-1">*</span>}
      </label>
      {field.helpText && <p className="text-xs text-gray-400 mb-3">{field.helpText}</p>}

      <div
        className="relative"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
      >
        <input
          type="file"
          id={field.id}
          required={field.required && !value}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={uploading}
          accept=".pdf,.doc,.docx"
        />
        <motion.div
          animate={dragOver ? { scale: 1.02, borderColor: BRAND.orange } : { scale: 1 }}
          className={`flex flex-col items-center justify-center w-full py-10 px-6 border-2 border-dashed rounded-2xl transition-all duration-300 ${
            value ? 'border-emerald-400 bg-emerald-50/60' : dragOver ? '' : 'border-gray-200 bg-gray-50/50 hover:border-orange-300'
          }`}
          style={dragOver ? { borderColor: BRAND.orange, background: BRAND.orangeLight } : {}}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-orange-200 rounded-full animate-spin" style={{ borderTopColor: BRAND.orange }} />
              <p className="text-sm font-semibold text-gray-600">Uploading your file...</p>
            </div>
          ) : value ? (
            <div className="flex flex-col items-center text-emerald-600 gap-2">
              <CheckCircle2 className="w-10 h-10" />
              <p className="text-sm font-bold text-emerald-700 text-center">{uploadedName || 'File uploaded!'}</p>
              <p className="text-xs text-emerald-500">Click or drop to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center" style={{ color: BRAND.orange }}>
                <UploadCloud className="w-7 h-7" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700">Drop your file here or <span style={{ color: BRAND.orange }}>browse</span></p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX — Max 10 MB</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   DYNAMIC FIELD RENDERER
   ──────────────────────────────────────────────────────────────────────────── */
function DynamicField({ field, value, onChange, error }) {
  const inputClasses = `w-full px-4 py-3.5 text-sm bg-white border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300 ${
    error
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-gray-200 hover:border-gray-300 focus:border-orange-400 focus:ring-orange-100'
  }`;

  const labelEl = (
    <label htmlFor={field.id} className="block text-sm font-semibold text-gray-800 mb-2">
      {field.label}
      {field.required && <span style={{ color: BRAND.orange }} className="ml-1">*</span>}
    </label>
  );

  if (field.type === 'file') return <FileUploadField field={field} value={value || ''} onChange={onChange} />;

  if (field.type === 'textarea') {
    return (
      <div className="w-full">
        {labelEl}
        {field.helpText && <p className="text-xs text-gray-400 mb-2">{field.helpText}</p>}
        <textarea
          id={field.id}
          rows={4}
          required={field.required}
          placeholder={field.placeholder || 'write your answer here...'}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClasses} resize-none`}
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
        {field.helpText && <p className="text-xs text-gray-400 mb-2">{field.helpText}</p>}
        <div className="relative">
          <select
            id={field.id}
            required={field.required}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClasses} appearance-none pr-10`}
          >
            <option value="" disabled>{field.placeholder || `-- Select ${field.label} --`}</option>
            {opts.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
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
        {field.helpText && <p className="text-xs text-gray-400 mb-3">{field.helpText}</p>}
        <div className="flex flex-wrap gap-2.5">
          {opts.map((opt) => {
            const isChecked = isRadio ? value === opt : selected.includes(opt);
            return (
              <motion.label
                key={opt}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center gap-2.5 px-4 py-3 cursor-pointer rounded-xl border-2 transition-all duration-200 text-sm font-medium select-none ${
                  isChecked
                    ? 'border-orange-400 bg-orange-50 text-orange-800 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
                style={isChecked ? { borderColor: BRAND.orange, background: BRAND.orangeLight } : {}}
              >
                <div className={`flex-shrink-0 flex items-center justify-center w-5 h-5 border-2 transition-all duration-200 ${
                  isRadio ? 'rounded-full' : 'rounded-md'
                } ${isChecked ? 'border-transparent' : 'border-gray-300 bg-white'}`}
                  style={isChecked ? { background: BRAND.orange } : {}}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </div>
                {opt}
              </motion.label>
            );
          })}
        </div>
        {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
      </div>
    );
  }

  // text / email / tel / number / date
  return (
    <div className="w-full">
      {labelEl}
      {field.helpText && <p className="text-xs text-gray-400 mb-2">{field.helpText}</p>}
      <input
        id={field.id}
        type={field.type}
        required={field.required}
        placeholder={field.placeholder || ''}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses}
      />
      {error && <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
   ──────────────────────────────────────────────────────────────────────────── */
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

  const formRef = useRef(null);

  // ── Resolve params ──
  useEffect(() => {
    params.then?.((p) => setFormId(p.formId)).catch?.(() => {});
    if (params.formId) setFormId(params.formId);
  }, [params]);

  // ── Fetch form data ──
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
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      if (result.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(result.error || 'Submission failed. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-orange-200 rounded-full animate-spin" style={{ borderTopColor: BRAND.orange }} />
          <p className="text-gray-400 text-sm font-medium animate-pulse">Loading application...</p>
        </div>
      </div>
    );
  }

  /* ─── Not Found / Closed ─── */
  if (notFound || isClosed) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <FloatingShapes />
        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 max-w-md w-full">
          <img src="/college campus-rafiki.svg" alt="Campus" className="w-52 h-52 mx-auto mb-6 opacity-80" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {notFound ? 'Form Not Found' : 'Applications Closed'}
          </h1>
          <p className="text-gray-500 text-base mt-3 leading-relaxed">
            {notFound
              ? "This form doesn't exist or the link is broken."
              : `The deadline for ${form?.title || 'this position'} has passed.`}
          </p>
          <Link
            href="/recruitment"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: BRAND.orange }}
          >
            View Open Positions <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ─── Success State ─── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
        <FloatingShapes />
        {/* Confetti burst */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: `${10 + Math.random() * 80}%`, opacity: 1, rotate: 0 }}
              animate={{ y: '110vh', opacity: 0, rotate: Math.random() * 720 - 360 }}
              transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5, ease: 'easeIn' }}
              className="absolute w-2.5 h-2.5 rounded-sm"
              style={{
                background: [BRAND.orange, BRAND.navy, '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'][i % 6],
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="bg-white rounded-3xl p-10 md:p-14 max-w-lg w-full text-center relative z-10 border border-gray-100 shadow-2xl shadow-gray-200/50"
        >
          <motion.img
            src="/success-celebration.jpg"
            alt="Success"
            className="w-48 h-48 mx-auto mb-6 object-contain"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, delay: 0.15 }}
          />
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Application Submitted!</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            {form.confirmationMessage || "Thank you for your application! We'll review your details and get back to you soon."}
          </p>
          <Link
            href="/recruitment"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: BRAND.navy }}
          >
            Back to Careers <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ─── Computed values ─── */
  const daysLeft = form.deadline ? Math.ceil((new Date(form.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;
  const fieldCount = (form.fields || []).length;
  const requiredCount = (form.fields || []).filter((f) => f.required).length;

  /* ─── MAIN RENDER ─── */
  return (
    <div className="min-h-screen bg-white relative" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>
      <FloatingShapes />

      {/* ────────────── HERO SECTION ────────────── */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 px-6">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full -translate-y-1/3 translate-x-1/3 opacity-[0.04]" style={{ background: BRAND.orange }} />

        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-gray-400 mb-10">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/recruitment" className="hover:text-gray-700 transition-colors">Careers</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium truncate max-w-[200px]">{form.title}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6" style={{ background: BRAND.orangeLight, color: BRAND.orange }}>
                <Sparkles className="w-3.5 h-3.5" />
                Now accepting applications
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]" style={{ color: BRAND.navy }}>
                {form.title}
              </motion.h1>

              {form.description && (
                <motion.p variants={fadeUp} className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {form.description}
                </motion.p>
              )}

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-base group"
                  style={{ background: BRAND.orange }}
                >
                  Apply Now
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                </button>

                {daysLeft !== null && (
                  <div className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-amber-50 text-amber-700 font-semibold text-sm border border-amber-100">
                    <Clock className="w-4 h-4" />
                    {daysLeft <= 0 ? 'Closing today!' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                  </div>
                )}
              </motion.div>

              {/* Stats pills */}
              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-5 text-sm text-gray-400 font-medium justify-center lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> {fieldCount} fields
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4" /> {requiredCount} required
                </span>
              </motion.div>
            </motion.div>

            {/* Hero illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
              className="flex-shrink-0 w-full max-w-md lg:max-w-lg"
            >
              <img src="/hero-student.jpg" alt="Campus Ambassador" className="w-full h-auto rounded-3xl" />
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12 flex justify-center cursor-pointer"
            onClick={scrollToForm}
          >
            <ChevronDown className="w-6 h-6 text-gray-300" />
          </motion.div>
        </div>
      </section>

      {/* ────────────── BENEFITS SECTION ────────────── */}
      <Section className="py-16 md:py-24 px-6 bg-gray-50/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: BRAND.navy }}>
              Why become a Campus Ambassador?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-gray-500 text-lg max-w-xl mx-auto">
              Gain real-world skills while making an impact on your campus.
            </motion.p>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <BenefitCard icon={Award} title="Certificate & Rewards" description="Earn official certificates and performance-based incentives." />
            <BenefitCard icon={Briefcase} title="Build Your Resume" description="Gain marketing, leadership, and communication experience." />
            <BenefitCard icon={Users} title="Mentorship & Network" description="Get mentored by industry professionals and grow your network." />
            <BenefitCard icon={Star} title="Priority Placements" description="Get early access to internship and placement opportunities." />
          </motion.div>
        </div>
      </Section>

      {/* ────────────── APPLICATION FORM ────────────── */}
      <Section className="py-16 md:py-24 px-6" delay={0.1}>
        <div className="max-w-2xl mx-auto" ref={formRef}>
          <div className="text-center mb-10">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: BRAND.navy }}>
              Apply Now
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-gray-500 text-base max-w-md mx-auto">
              Fill out the form below to submit your application. All fields marked with <span style={{ color: BRAND.orange }}>*</span> are required.
            </motion.p>
          </div>

          {/* Form card */}
          <motion.div
            variants={scaleIn}
            className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 p-8 md:p-10"
          >
            <motion.form
              onSubmit={handleSubmit}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-7"
            >
              {(form.fields || []).map((field) => (
                <motion.div key={field.id} variants={fadeUp}>
                  <DynamicField
                    field={field}
                    value={formData[field.id]}
                    onChange={(val) => setFieldValue(field.id, val)}
                    error={errors[field.id]}
                  />
                </motion.div>
              ))}

              {/* Submit error */}
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 text-red-700"
                  >
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{submitError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.div variants={fadeUp} className="pt-4">
                <motion.button
                  type="submit"
                  disabled={submitting || fieldCount === 0}
                  whileHover={{ scale: submitting ? 1 : 1.01, y: submitting ? 0 : -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-8 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg group"
                  style={{ background: submitting ? BRAND.gray400 : BRAND.orange }}
                >
                  {submitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Your data is secure and will only be used for this application.</span>
                </div>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Back link */}
          <div className="text-center mt-8">
            <Link href="/recruitment" className="text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center gap-1">
              <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to all openings
            </Link>
          </div>
        </div>
      </Section>

      {/* ────────────── FOOTER STRIP ────────────── */}
      <div className="py-8 px-6 text-center text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} Eduniketan Private Limited. All rights reserved.
      </div>
    </div>
  );
}
