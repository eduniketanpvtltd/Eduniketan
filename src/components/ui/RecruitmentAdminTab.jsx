'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Plus, Trash2, Eye, EyeOff, Edit3, Share2, CheckCircle2, X,
  ChevronDown, ChevronUp, GripVertical, FileText, Users, BarChart3,
  Download, RefreshCw, ExternalLink, Copy, Check, Inbox, Filter
} from 'lucide-react';

// ─── Constants ─────────────────────────────────────────────────────────────

const FIELD_TYPES = [
  { value: 'text', label: 'Short Text' },
  { value: 'textarea', label: 'Long Text / Paragraph' },
  { value: 'email', label: 'Email Address' },
  { value: 'tel', label: 'Phone Number' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date Picker' },
  { value: 'select', label: 'Dropdown (Single Select)' },
  { value: 'radio', label: 'Radio Buttons (Single Choice)' },
  { value: 'checkbox', label: 'Checkboxes (Multi Select)' },
  { value: 'file', label: 'File Upload' },
];

const SUBMISSION_STATUS_COLORS = {
  NEW: 'amber',
  REVIEWED: 'blue',
  SHORTLISTED: 'emerald',
  REJECTED: 'slate',
};

const SUBMISSION_STATUS_LABELS = {
  NEW: 'New',
  REVIEWED: 'Reviewed',
  SHORTLISTED: 'Shortlisted',
  REJECTED: 'Rejected',
};

function generateFieldId() {
  return `field-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

// ─── Empty state illustrations ─────────────────────────────────────────────

function EmptyFormsIllustration() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-32 mx-auto opacity-60">
      <rect x="40" y="30" width="180" height="120" rx="10" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="130" cy="85" r="24" fill="#e2e8f0" />
      <path d="M121 85 L129 93 L139 75" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <rect x="80" y="125" width="100" height="10" rx="5" fill="#dbeafe" />
    </svg>
  );
}

function EmptySubmissionsIllustration() {
  return (
    <svg viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-44 h-28 mx-auto opacity-60">
      <rect x="30" y="20" width="200" height="120" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="50" y="45" width="160" height="12" rx="6" fill="#f1f5f9" />
      <rect x="50" y="65" width="130" height="10" rx="5" fill="#f1f5f9" />
      <rect x="50" y="82" width="100" height="10" rx="5" fill="#f1f5f9" />
      <rect x="50" y="99" width="140" height="10" rx="5" fill="#f1f5f9" />
      <circle cx="200" cy="70" r="14" fill="#dbeafe" />
      <path d="M194 70 L198 74 L206 62" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

// ─── Field Option Manager ──────────────────────────────────────────────────

function FieldOptionsManager({ options, onChange }) {
  const [newOpt, setNewOpt] = useState('');

  const add = () => {
    const trimmed = newOpt.trim();
    if (!trimmed || options.includes(trimmed)) return;
    onChange([...options, trimmed]);
    setNewOpt('');
  };

  const remove = (opt) => onChange(options.filter((o) => o !== opt));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <span key={opt} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {opt}
            <button type="button" onClick={() => remove(opt)} className="hover:text-red-600 ml-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newOpt}
          onChange={(e) => setNewOpt(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="Type an option and press Enter"
          className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button type="button" onClick={add} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors">
          Add
        </button>
      </div>
    </div>
  );
}

// ─── Single Field Editor ───────────────────────────────────────────────────

function FieldEditor({ field, index, total, onChange, onDelete, onMove }) {
  const [expanded, setExpanded] = useState(true);
  const needsOptions = ['select', 'radio', 'checkbox'].includes(field.type);

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
      {/* Field header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div className="cursor-grab text-slate-300 hover:text-slate-500">
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-slate-700 truncate block">
            {index + 1}. {field.label || `Field ${index + 1}`}
          </span>
          <span className="text-[11px] text-slate-400">{FIELD_TYPES.find((t) => t.value === field.type)?.label || field.type}</span>
        </div>
        <div className="flex items-center gap-1">
          {field.required && (
            <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold rounded-full">Required</span>
          )}
          <button type="button" onClick={() => onMove(index, 'up')} disabled={index === 0} className="p-1 rounded-lg hover:bg-slate-200 disabled:opacity-30 transition-colors" title="Move up">
            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
          </button>
          <button type="button" onClick={() => onMove(index, 'down')} disabled={index === total - 1} className="p-1 rounded-lg hover:bg-slate-200 disabled:opacity-30 transition-colors" title="Move down">
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>
          <button type="button" onClick={() => setExpanded((v) => !v)} className="p-1 rounded-lg hover:bg-slate-200 transition-colors">
            {expanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
          </button>
          <button type="button" onClick={() => onDelete(field.id)} className="p-1 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Field settings */}
      {expanded && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Label */}
            <div className="col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Field Label *</label>
              <input
                type="text"
                required
                value={field.label}
                onChange={(e) => onChange({ ...field, label: e.target.value })}
                placeholder="e.g. Full Name"
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Field Type</label>
              <select
                value={field.type}
                onChange={(e) => onChange({ ...field, type: e.target.value, options: [] })}
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                {FIELD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Required toggle */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Required?</label>
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => onChange({ ...field, required: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
              </label>
            </div>
          </div>

          {/* Placeholder (not for file/radio/checkbox) */}
          {!['file', 'radio', 'checkbox', 'date'].includes(field.type) && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Placeholder Text</label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
                placeholder="Hint text shown inside the field…"
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          {/* Help text */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Help Text (optional)</label>
            <input
              type="text"
              value={field.helpText || ''}
              onChange={(e) => onChange({ ...field, helpText: e.target.value })}
              placeholder="Brief instruction shown below the label…"
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* File accept */}
          {field.type === 'file' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Accepted File Types</label>
              <input
                type="text"
                value={field.accept || ''}
                onChange={(e) => onChange({ ...field, accept: e.target.value })}
                placeholder=".pdf,.doc,.docx (leave blank to allow all)"
                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          {/* Options for select/radio/checkbox */}
          {needsOptions && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-2">Options</label>
              <FieldOptionsManager
                options={field.options || []}
                onChange={(opts) => onChange({ ...field, options: opts })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Share Link Modal ──────────────────────────────────────────────────────

function ShareModal({ form, onClose }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? `${window.location.origin}/form/${form.id}` : `/form/${form.id}`;

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl p-7 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-900">Share Form Link</h3>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 transition-colors"><X className="w-4 h-4 text-slate-500" /></button>
        </div>

        <div className="mb-5">
          <div className="text-sm font-semibold text-slate-700 mb-1">{form.title}</div>
          <div className="flex items-center gap-1 mt-2">
            <span className={`w-2 h-2 rounded-full ${form.isPublished ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            <span className={`text-xs font-medium ${form.isPublished ? 'text-emerald-700' : 'text-slate-500'}`}>
              {form.isPublished ? 'Published — Students can apply' : 'Draft — Not yet public'}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-mono"
          />
          <button
            onClick={copy}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${copied ? 'bg-emerald-600 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open in New Tab
        </a>
      </div>
    </div>
  );
}

// ─── Submission Detail Modal ───────────────────────────────────────────────

function SubmissionDetailModal({ submission, form, onClose, onStatusChange, onDelete }) {
  const fields = form?.fields || [];
  const statusOptions = ['NEW', 'REVIEWED', 'SHORTLISTED', 'REJECTED'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Submission Details</h3>
            <div className="text-xs text-slate-400 mt-0.5">
              {new Date(submission.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 transition-colors"><X className="w-4 h-4 text-slate-500" /></button>
        </div>

        {/* Status changer */}
        <div className="flex flex-wrap gap-2 mb-5">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(submission.id, s)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                submission.status === s
                  ? s === 'NEW' ? 'bg-amber-500 text-white border-amber-500' :
                    s === 'REVIEWED' ? 'bg-blue-600 text-white border-blue-600' :
                    s === 'SHORTLISTED' ? 'bg-emerald-600 text-white border-emerald-600' :
                    'bg-slate-600 text-white border-slate-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {SUBMISSION_STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Field responses */}
        <div className="space-y-4">
          {fields.length > 0 ? fields.map((field) => {
            const val = submission.data?.[field.id];
            const displayVal = Array.isArray(val)
              ? val.join(', ')
              : val || <span className="text-slate-400 italic text-xs">Not answered</span>;

            return (
              <div key={field.id} className="bg-slate-50 rounded-xl p-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">{field.label}</div>
                {field.type === 'file' && val ? (
                  <a
                    href={val}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-700 font-semibold hover:underline"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    View / Download File
                  </a>
                ) : (
                  <div className="text-sm text-slate-800 font-medium break-words">{displayVal}</div>
                )}
              </div>
            );
          }) : (
            // Fallback: show raw data keys
            Object.entries(submission.data || {}).map(([key, val]) => (
              <div key={key} className="bg-slate-50 rounded-xl p-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">{key}</div>
                <div className="text-sm text-slate-800 font-medium">
                  {Array.isArray(val) ? val.join(', ') : String(val || '')}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
          <div className="text-[11px] text-slate-400">ID: {submission.id}</div>
          <button
            onClick={() => { if (confirm('Delete this submission?')) { onDelete(submission.id); onClose(); } }}
            className="flex items-center gap-1.5 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Recruitment Admin Tab ────────────────────────────────────────────

export default function RecruitmentAdminTab() {
  const [subTab, setSubTab] = useState('forms'); // 'forms' | 'submissions'
  const [forms, setForms] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState('ALL');
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState('ALL');
  const [shareModal, setShareModal] = useState(null); // form object
  const [detailModal, setDetailModal] = useState(null); // { submission, form }
  const [editingForm, setEditingForm] = useState(null); // form object or null (null = create new)
  const [savingForm, setSavingForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');

  // New form draft
  const defaultDraft = {
    title: '',
    description: '',
    deadline: '',
    isPublished: false,
    fields: [],
  };
  const [draft, setDraft] = useState(defaultDraft);

  // ── Load data ────────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [fRes, sRes] = await Promise.all([
        fetch('/api/recruitment-forms'),
        fetch('/api/recruitment-submissions'),
      ]);
      const [fData, sData] = await Promise.all([fRes.json(), sRes.json()]);
      if (fData.success) setForms(fData.data);
      if (sData.success) setSubmissions(sData.data);
    } catch (err) {
      console.error('Error fetching recruitment data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Field operations on draft/editing form ───────────────────────────────
  const getActiveDraft = () => editingForm || draft;
  const setActiveDraft = (upd) => {
    if (editingForm) setEditingForm(upd);
    else setDraft(upd);
  };

  const addField = (type = 'text') => {
    const newField = {
      id: generateFieldId(),
      type,
      label: '',
      placeholder: '',
      helpText: '',
      required: false,
      options: [],
      accept: '',
    };
    const curr = getActiveDraft();
    setActiveDraft({ ...curr, fields: [...(curr.fields || []), newField] });
  };

  const updateField = (fieldObj) => {
    const curr = getActiveDraft();
    setActiveDraft({ ...curr, fields: curr.fields.map((f) => (f.id === fieldObj.id ? fieldObj : f)) });
  };

  const deleteField = (fieldId) => {
    const curr = getActiveDraft();
    setActiveDraft({ ...curr, fields: curr.fields.filter((f) => f.id !== fieldId) });
  };

  const moveField = (index, direction) => {
    const curr = getActiveDraft();
    const fields = [...(curr.fields || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= fields.length) return;
    [fields[index], fields[targetIndex]] = [fields[targetIndex], fields[index]];
    setActiveDraft({ ...curr, fields });
  };

  // ── Save form (create or update) ─────────────────────────────────────────
  const handleSaveForm = async (e) => {
    e.preventDefault();
    const curr = getActiveDraft();
    if (!curr.title.trim()) return;

    setSavingForm(true);
    try {
      const isEdit = Boolean(editingForm);
      const url = isEdit ? `/api/recruitment-forms/${editingForm.id}` : '/api/recruitment-forms';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: curr.title,
          description: curr.description,
          fields: curr.fields,
          isPublished: curr.isPublished,
          deadline: curr.deadline || null,
        }),
      });
      const data = await res.json();

      if (data.success) {
        if (isEdit) {
          setForms((prev) => prev.map((f) => (f.id === data.data.id ? data.data : f)));
          setFormSuccess('Form updated successfully!');
        } else {
          setForms((prev) => [data.data, ...prev]);
          setFormSuccess('Form created successfully!');
        }
        setEditingForm(null);
        setDraft(defaultDraft);
        setTimeout(() => setFormSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error saving form:', err);
    } finally {
      setSavingForm(false);
    }
  };

  // ── Toggle publish ────────────────────────────────────────────────────────
  const togglePublish = async (form) => {
    try {
      const res = await fetch(`/api/recruitment-forms/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !form.isPublished }),
      });
      const data = await res.json();
      if (data.success) setForms((prev) => prev.map((f) => (f.id === form.id ? data.data : f)));
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  // ── Delete form ───────────────────────────────────────────────────────────
  const deleteForm = async (id) => {
    if (!confirm('Delete this form and all its submissions?')) return;
    try {
      await fetch(`/api/recruitment-forms/${id}`, { method: 'DELETE' });
      setForms((prev) => prev.filter((f) => f.id !== id));
      setSubmissions((prev) => prev.filter((s) => s.formId !== id));
    } catch (err) {
      console.error('Error deleting form:', err);
    }
  };

  // ── Update submission status ──────────────────────────────────────────────
  const updateSubmissionStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/recruitment-submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions((prev) => prev.map((s) => (s.id === id ? data.data : s)));
        if (detailModal && detailModal.submission.id === id) {
          setDetailModal((prev) => ({ ...prev, submission: data.data }));
        }
      }
    } catch (err) {
      console.error('Error updating submission status:', err);
    }
  };

  // ── Delete submission ─────────────────────────────────────────────────────
  const deleteSubmission = async (id) => {
    try {
      await fetch(`/api/recruitment-submissions/${id}`, { method: 'DELETE' });
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  // ── CSV Export ────────────────────────────────────────────────────────────
  const exportCSV = () => {
    const filtered = selectedFormId === 'ALL' ? submissions : submissions.filter((s) => s.formId === selectedFormId);
    if (filtered.length === 0) return;

    const form = forms.find((f) => f.id === (selectedFormId !== 'ALL' ? selectedFormId : filtered[0]?.formId));
    const fields = form?.fields || [];
    const fieldLabels = fields.map((f) => f.label);

    const headers = ['ID', 'Form', 'Status', 'Submitted At', ...fieldLabels];
    const rows = filtered.map((sub) => {
      const fieldVals = fields.map((f) => {
        const v = sub.data?.[f.id];
        return Array.isArray(v) ? v.join('; ') : String(v || '');
      });
      return [
        sub.id,
        sub.formTitle,
        sub.status,
        new Date(sub.createdAt).toLocaleString(),
        ...fieldVals,
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',');
    });

    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Eduniketan_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ── Filtered submissions ──────────────────────────────────────────────────
  const filteredSubmissions = submissions
    .filter((s) => selectedFormId === 'ALL' || s.formId === selectedFormId)
    .filter((s) => submissionStatusFilter === 'ALL' || s.status === submissionStatusFilter);

  const activeDraft = getActiveDraft();
  const isEditing = Boolean(editingForm);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalSubs = filteredSubmissions.length;
  const newSubs = filteredSubmissions.filter((s) => s.status === 'NEW').length;
  const shortlistedSubs = filteredSubmissions.filter((s) => s.status === 'SHORTLISTED').length;
  const publishedForms = forms.filter((f) => f.isPublished).length;

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { key: 'forms', icon: FileText, label: `Form Builder (${forms.length})` },
          { key: 'submissions', icon: Users, label: `Submissions (${submissions.length})` },
        ].map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setSubTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              subTab === key
                ? 'bg-white shadow-sm text-blue-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
        <button
          onClick={fetchAll}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-slate-500 hover:text-blue-700 hover:bg-white transition-all"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* ── FORMS TAB ─────────────────────────────────────────────────────── */}
      {subTab === 'forms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Builder panel */}
          <div className="lg:col-span-6 xl:col-span-5">
            <Card className="p-6 border-slate-200 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  {isEditing ? (
                    <><Edit3 className="w-4 h-4 text-blue-600" /> Edit Form</>
                  ) : (
                    <><Plus className="w-4 h-4 text-blue-600" /> Create New Form</>
                  )}
                </h3>
                {isEditing && (
                  <button
                    onClick={() => { setEditingForm(null); setDraft(defaultDraft); }}
                    className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel Edit
                  </button>
                )}
              </div>

              {formSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> {formSuccess}
                </div>
              )}

              <form onSubmit={handleSaveForm} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Form Title *</label>
                  <input
                    type="text"
                    required
                    value={activeDraft.title}
                    onChange={(e) => setActiveDraft({ ...activeDraft, title: e.target.value })}
                    placeholder="e.g. Campus Recruitment Drive 2026"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={activeDraft.description}
                    onChange={(e) => setActiveDraft({ ...activeDraft, description: e.target.value })}
                    placeholder="Brief description of this drive shown to students…"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none resize-none"
                  />
                </div>

                {/* Deadline + Publish */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Application Deadline</label>
                    <input
                      type="date"
                      value={activeDraft.deadline || ''}
                      onChange={(e) => setActiveDraft({ ...activeDraft, deadline: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                    <label className="flex items-center gap-2 cursor-pointer mt-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={activeDraft.isPublished}
                          onChange={(e) => setActiveDraft({ ...activeDraft, isPublished: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-emerald-500 transition-colors" />
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
                      </div>
                      <span className={`text-xs font-bold ${activeDraft.isPublished ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {activeDraft.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Fields */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Form Fields ({(activeDraft.fields || []).length})
                    </span>
                  </div>

                  {/* Field list */}
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-0.5">
                    {(activeDraft.fields || []).length === 0 ? (
                      <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                        No fields yet. Add your first field below.
                      </div>
                    ) : (
                      activeDraft.fields.map((field, i) => (
                        <FieldEditor
                          key={field.id}
                          field={field}
                          index={i}
                          total={activeDraft.fields.length}
                          onChange={updateField}
                          onDelete={deleteField}
                          onMove={moveField}
                        />
                      ))
                    )}
                  </div>

                  {/* Add field */}
                  <div className="flex gap-2">
                    <select
                      id="add-field-type-select"
                      defaultValue="text"
                      className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const sel = document.getElementById('add-field-type-select');
                        addField(sel?.value || 'text');
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Field
                    </button>
                  </div>
                </div>

                {/* Save button */}
                <button
                  type="submit"
                  disabled={savingForm || !activeDraft.title.trim()}
                  className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  id="save-recruitment-form-btn"
                >
                  {savingForm ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Saving…</>
                  ) : isEditing ? (
                    <><CheckCircle2 className="w-4 h-4" /> Update Form</>
                  ) : (
                    <><Plus className="w-4 h-4" /> Create Form</>
                  )}
                </button>
              </form>
            </Card>
          </div>

          {/* Forms list */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total Forms', value: forms.length, color: 'from-blue-600 to-indigo-600' },
                { label: 'Published', value: publishedForms, color: 'from-emerald-500 to-teal-600' },
                { label: 'Total Submissions', value: submissions.length, color: 'from-amber-500 to-orange-600' },
              ].map((stat) => (
                <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white`}>
                  <div className="text-2xl font-extrabold">{stat.value}</div>
                  <div className="text-xs font-medium text-white/75 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Form cards */}
            {forms.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <EmptyFormsIllustration />
                <p className="text-slate-500 text-sm mt-4 font-medium">No forms created yet</p>
                <p className="text-slate-400 text-xs mt-1">Create your first recruitment form using the builder on the left.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {forms.map((form) => {
                  const formSubs = submissions.filter((s) => s.formId === form.id);
                  const now = new Date();
                  const isExpired = form.deadline && new Date(form.deadline) < now;

                  return (
                    <Card key={form.id} className="p-5 border-slate-200 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{form.title}</h4>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              form.isPublished && !isExpired
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : isExpired && form.isPublished
                                  ? 'bg-red-50 text-red-700 border-red-100'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                form.isPublished && !isExpired ? 'bg-emerald-500 animate-pulse' :
                                isExpired && form.isPublished ? 'bg-red-500' : 'bg-slate-400'
                              }`} />
                              {form.isPublished && !isExpired ? 'Live' : isExpired && form.isPublished ? 'Expired' : 'Draft'}
                            </span>
                          </div>
                          {form.description && <p className="text-xs text-slate-500 mt-1 line-clamp-1">{form.description}</p>}
                          <div className="flex flex-wrap gap-2 mt-2 text-[11px] text-slate-400">
                            <span>{(form.fields || []).length} fields</span>
                            {form.deadline && <span>· Deadline: {new Date(form.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                            <span>· {formSubs.length} submission{formSubs.length !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          onClick={() => togglePublish(form)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            form.isPublished
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          {form.isPublished ? <><EyeOff className="w-3.5 h-3.5" /> Unpublish</> : <><Eye className="w-3.5 h-3.5" /> Publish</>}
                        </button>
                        <button
                          onClick={() => { setEditingForm(form); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => setShareModal(form)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                        >
                          <Share2 className="w-3.5 h-3.5" /> Share Link
                        </button>
                        <button
                          onClick={() => { setSelectedFormId(form.id); setSubTab('submissions'); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-colors"
                        >
                          <Inbox className="w-3.5 h-3.5" /> View {formSubs.length > 0 ? `${formSubs.length} ` : ''}Submissions
                        </button>
                        <button
                          onClick={() => deleteForm(form.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors ml-auto"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SUBMISSIONS TAB ───────────────────────────────────────────────── */}
      {subTab === 'submissions' && (
        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total', value: totalSubs, bg: 'bg-blue-600' },
              { label: 'New', value: newSubs, bg: 'bg-amber-500' },
              { label: 'Shortlisted', value: shortlistedSubs, bg: 'bg-emerald-600' },
              { label: 'Reviewed', value: filteredSubmissions.filter((s) => s.status === 'REVIEWED').length, bg: 'bg-indigo-600' },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-white`}>
                <div className="text-3xl font-extrabold">{s.value}</div>
                <div className="text-xs font-medium text-white/75 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters + Export */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedFormId}
                onChange={(e) => setSelectedFormId(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                id="submission-form-filter"
              >
                <option value="ALL">All Forms</option>
                {forms.map((f) => (
                  <option key={f.id} value={f.id}>{f.title}</option>
                ))}
              </select>
              <select
                value={submissionStatusFilter}
                onChange={(e) => setSubmissionStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                id="submission-status-filter"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <button
              onClick={exportCSV}
              disabled={filteredSubmissions.length === 0}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV ({filteredSubmissions.length})
            </button>
          </div>

          {/* Submissions list */}
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-2xl border border-slate-100">
              <EmptySubmissionsIllustration />
              <p className="text-slate-500 text-sm mt-4 font-medium">No submissions found</p>
              <p className="text-slate-400 text-xs mt-1">
                {forms.length === 0 ? 'Create and publish a form first.' : 'Share the form link with students to collect applications.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSubmissions.map((sub) => {
                const form = forms.find((f) => f.id === sub.formId);
                const fields = form?.fields || [];
                // Show first 3 text-ish fields as preview
                const previewFields = fields.filter((f) => !['file', 'checkbox'].includes(f.type)).slice(0, 3);

                return (
                  <Card key={sub.id} className="p-5 border-slate-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={SUBMISSION_STATUS_COLORS[sub.status] || 'slate'}>
                            {SUBMISSION_STATUS_LABELS[sub.status] || sub.status}
                          </Badge>
                          <span className="text-xs text-slate-500 font-medium">{sub.formTitle}</span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {/* Preview */}
                        <div className="flex flex-wrap gap-3">
                          {previewFields.map((f) => {
                            const val = sub.data?.[f.id];
                            if (!val) return null;
                            return (
                              <div key={f.id} className="text-xs">
                                <span className="text-slate-400 font-medium">{f.label}: </span>
                                <span className="text-slate-700 font-semibold">{String(val).slice(0, 40)}{String(val).length > 40 ? '…' : ''}</span>
                              </div>
                            );
                          })}
                          {fields.some((f) => f.type === 'file' && sub.data?.[f.id]) && (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                              Has file attachment
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setDetailModal({ submission: sub, form })}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                        <button
                          onClick={() => { if (confirm('Delete this submission?')) deleteSubmission(sub.id); }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Share Modal */}
      {shareModal && <ShareModal form={shareModal} onClose={() => setShareModal(null)} />}

      {/* Detail Modal */}
      {detailModal && (
        <SubmissionDetailModal
          submission={detailModal.submission}
          form={detailModal.form}
          onClose={() => setDetailModal(null)}
          onStatusChange={updateSubmissionStatus}
          onDelete={deleteSubmission}
        />
      )}
    </div>
  );
}
