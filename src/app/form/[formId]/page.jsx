'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

// ─── SVG Illustrations ─────────────────────────────────────────────────────

function SuccessIllustration() {
  return (
    <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56 h-44 mx-auto">
      {/* Glow rings */}
      <circle cx="150" cy="120" r="90" fill="rgba(16,185,129,0.05)" />
      <circle cx="150" cy="120" r="65" fill="rgba(16,185,129,0.08)" />
      <circle cx="150" cy="120" r="46" fill="rgba(16,185,129,0.12)" />
      <circle cx="150" cy="120" r="32" fill="#d1fae5" />
      {/* Check */}
      <path d="M136 120 L146 131 L166 108" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stars */}
      <path d="M60 60 L63 70 L73 70 L65 76 L68 86 L60 80 L52 86 L55 76 L47 70 L57 70 Z" fill="#f59e0b" opacity="0.7" />
      <path d="M240 50 L242 57 L249 57 L243 61 L245 68 L240 64 L235 68 L237 61 L231 57 L238 57 Z" fill="#06b6d4" opacity="0.6" />
      <path d="M50 190 L52 197 L59 197 L53 201 L55 208 L50 204 L45 208 L47 201 L41 197 L48 197 Z" fill="#8b5cf6" opacity="0.5" />
      <path d="M255 180 L257 185 L262 185 L258 188 L259 193 L255 190 L251 193 L252 188 L248 185 L253 185 Z" fill="#ec4899" opacity="0.5" />
      {/* Confetti dots */}
      {[
        [90, 55, '#2563eb'], [200, 75, '#0d9488'], [70, 170, '#f59e0b'],
        [230, 160, '#10b981'], [120, 200, '#6366f1'], [185, 195, '#ef4444'],
      ].map(([cx, cy, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill={fill} opacity="0.5" />
      ))}
    </svg>
  );
}

function FormLoadIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-32 mx-auto animate-pulse opacity-60">
      <rect x="30" y="20" width="140" height="120" rx="10" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="46" y="38" width="108" height="8" rx="4" fill="#dbeafe" />
      <rect x="46" y="54" width="80" height="6" rx="3" fill="#e0f2fe" />
      <rect x="46" y="72" width="108" height="14" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="46" y="92" width="108" height="14" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="46" y="112" width="60" height="12" rx="6" fill="#dbeafe" />
    </svg>
  );
}

function ClosedIllustration() {
  return (
    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56 h-40 mx-auto opacity-70">
      <rect x="70" y="40" width="160" height="120" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="150" cy="95" r="28" fill="#fee2e2" />
      <path d="M141 86 L159 104 M159 86 L141 104" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      <rect x="100" y="140" width="100" height="10" rx="5" fill="#fee2e2" />
    </svg>
  );
}

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
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.helpText && <p className="text-xs text-slate-500 mb-2">{field.helpText}</p>}

      {value && !uploading ? (
        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
          <svg className="w-8 h-8 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-emerald-800 truncate">{uploadedName}</div>
            <div className="text-[11px] text-emerald-600">Uploaded successfully</div>
          </div>
          <button
            type="button"
            onClick={() => { onChange(''); setUploadedName(''); }}
            className="text-emerald-700 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ) : (
        <div className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
          uploading ? 'border-blue-300 bg-blue-50' : 'border-slate-200 hover:border-blue-400 bg-slate-50/50 cursor-pointer'
        }`}>
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-xs font-semibold text-blue-700">Uploading file…</span>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept={field.accept || '*'}
                onChange={handleFile}
                required={field.required && !value}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label={field.label}
              />
              <svg className="w-8 h-8 mx-auto text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <div className="text-sm font-semibold text-slate-700">Click to upload or drag & drop</div>
              <div className="text-xs text-slate-400 mt-1">
                {field.accept ? field.accept.replace(/\./g, '').toUpperCase() : 'Any file'} · Max 10 MB
              </div>
            </>
          )}
        </div>
      )}
      {error && <p className="text-xs text-red-600 mt-2 font-medium">{error}</p>}
    </div>
  );
}

// ─── Dynamic Field Renderer ────────────────────────────────────────────────

function DynamicField({ field, value, onChange, error }) {
  const inputBase = `w-full px-4 py-3 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors bg-white ${
    error ? 'border-red-400 focus:ring-red-300' : 'border-slate-200 hover:border-slate-300'
  }`;

  const labelEl = (
    <label htmlFor={field.id} className="block text-sm font-semibold text-slate-700 mb-2">
      {field.label}
      {field.required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  if (field.type === 'file') {
    return <FileUploadField field={field} value={value || ''} onChange={onChange} />;
  }

  if (field.type === 'textarea') {
    return (
      <div>
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
          aria-describedby={error ? `${field.id}-error` : undefined}
        />
        {error && <p id={`${field.id}-error`} className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>}
      </div>
    );
  }

  if (field.type === 'select') {
    const opts = Array.isArray(field.options) ? field.options : [];
    return (
      <div>
        {labelEl}
        {field.helpText && <p className="text-xs text-slate-500 mb-2">{field.helpText}</p>}
        <select
          id={field.id}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
        >
          <option value="">{field.placeholder || `-- Select ${field.label} --`}</option>
          {opts.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {error && <p className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>}
      </div>
    );
  }

  if (field.type === 'radio') {
    const opts = Array.isArray(field.options) ? field.options : [];
    return (
      <div>
        {labelEl}
        {field.helpText && <p className="text-xs text-slate-500 mb-2">{field.helpText}</p>}
        <div className="space-y-2">
          {opts.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name={field.id}
                value={opt}
                required={field.required}
                checked={value === opt}
                onChange={() => onChange(opt)}
                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700 group-hover:text-blue-700 transition-colors">{opt}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>}
      </div>
    );
  }

  if (field.type === 'checkbox') {
    const opts = Array.isArray(field.options) ? field.options : [];
    const selected = Array.isArray(value) ? value : [];
    const toggle = (opt) => {
      const updated = selected.includes(opt) ? selected.filter((v) => v !== opt) : [...selected, opt];
      onChange(updated);
    };
    return (
      <div>
        {labelEl}
        {field.helpText && <p className="text-xs text-slate-500 mb-2">{field.helpText}</p>}
        <div className="space-y-2">
          {opts.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value={opt}
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700 group-hover:text-blue-700 transition-colors">{opt}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>}
      </div>
    );
  }

  // text / email / tel / number / date
  return (
    <div>
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
        aria-describedby={error ? `${field.id}-error` : undefined}
      />
      {error && <p id={`${field.id}-error`} className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>}
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

  // Resolve params (Next.js async params)
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
        if (!data.success || !data.data) {
          setNotFound(true);
          return;
        }
        const f = data.data;
        if (!f.isPublished) {
          setIsClosed(true);
          return;
        }
        // Check deadline
        if (f.deadline) {
          const dl = new Date(f.deadline);
          dl.setHours(23, 59, 59, 999);
          if (new Date() > dl) {
            setIsClosed(true);
            setForm(f);
            return;
          }
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
        if (!val || (typeof val === 'string' && !val.trim())) {
          newErrors[field.id] = `${field.label} is required.`;
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
      } else {
        setSubmitError(result.error || 'Submission failed. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Loading State ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <FormLoadIllustration />
        <p className="text-slate-500 text-sm font-medium mt-4">Loading form…</p>
      </div>
    );
  }

  // ─── Not Found ───────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
        <ClosedIllustration />
        <h1 className="text-2xl font-extrabold text-slate-800 mt-6">Form Not Found</h1>
        <p className="text-slate-500 text-sm mt-2 max-w-xs">
          This recruitment form doesn't exist or the link may be incorrect.
        </p>
        <Link
          href="/recruitment"
          className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          View All Openings
        </Link>
      </div>
    );
  }

  // ─── Closed / Expired ────────────────────────────────────────────────────
  if (isClosed) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
        <ClosedIllustration />
        <h1 className="text-2xl font-extrabold text-slate-800 mt-6">
          {form?.title || 'This Form'}
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-100 text-red-700 rounded-full text-xs font-bold mt-3">
          Applications Closed
        </div>
        <p className="text-slate-500 text-sm mt-4 max-w-xs">
          {form?.deadline
            ? `The deadline for this form was ${new Date(form.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.`
            : 'This form is currently not accepting applications.'}
        </p>
        <Link
          href="/recruitment"
          className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          View Other Openings
        </Link>
      </div>
    );
  }

  // ─── Success State ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-10 max-w-md w-full">
          <SuccessIllustration />
          <h2 className="text-2xl font-extrabold text-slate-900 mt-6">Application Submitted!</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Your application for <span className="font-semibold text-slate-700">{form.title}</span> has been received successfully. We'll get back to you soon.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { setSubmitted(false); setFormData({}); setErrors({}); }}
              className="px-6 py-2.5 border-2 border-blue-700 text-blue-700 font-bold text-sm rounded-full hover:bg-blue-50 transition-colors"
            >
              Submit Another
            </button>
            <Link
              href="/recruitment"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all"
            >
              View All Openings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Form ────────────────────────────────────────────────────────────────
  const requiredCount = (form.fields || []).filter((f) => f.required).length;
  const now = new Date();
  const daysLeft = form.deadline
    ? Math.ceil((new Date(form.deadline) - now) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="max-w-2xl mx-auto mb-6">
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/recruitment" className="hover:text-blue-700 transition-colors">Recruitment</Link>
          <span>/</span>
          <span className="text-slate-600 line-clamp-1">{form.title}</span>
        </nav>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header gradient banner */}
          <div className="gradient-bg-primary px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
            </div>
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-extrabold text-white leading-tight">{form.title}</h1>
                  {form.description && (
                    <p className="text-white/75 text-sm mt-2 leading-relaxed">{form.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 border border-white/25 rounded-full text-white text-xs font-semibold">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
                      {(form.fields || []).length} fields
                    </span>
                    {requiredCount > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 border border-white/25 rounded-full text-white text-xs font-semibold">
                        <span className="text-red-300">*</span>
                        {requiredCount} required
                      </span>
                    )}
                    {daysLeft !== null && (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                        daysLeft <= 3
                          ? 'bg-red-500/25 border-red-300/40 text-red-100'
                          : 'bg-amber-500/20 border-amber-300/40 text-amber-100'
                      }`}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {daysLeft <= 0 ? 'Closing today' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {(form.fields || []).length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                This form has no fields configured yet.
              </div>
            ) : (
              (form.fields || []).map((field) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  value={formData[field.id]}
                  onChange={(val) => setFieldValue(field.id, val)}
                  error={errors[field.id]}
                />
              ))
            )}

            {/* Submit error */}
            {submitError && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {submitError}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting || (form.fields || []).length === 0}
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              id="submit-application-btn"
            >
              {submitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting Application…
                </>
              ) : (
                <>
                  Submit Application
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-400">
              Your data is safe and will only be used for this application process.
            </p>
          </form>
        </div>

        {/* Footer link */}
        <div className="text-center mt-6 text-xs text-slate-400">
          <Link href="/recruitment" className="hover:text-blue-700 transition-colors">← Back to all openings</Link>
        </div>
      </div>
    </div>
  );
}
