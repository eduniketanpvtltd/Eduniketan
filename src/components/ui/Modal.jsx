'use client';

import React, { useState, useEffect } from 'react';
import { useDemoModal } from '@/context/DemoModalContext';
import { X, CheckCircle2, Send, Building2, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { Button } from './Button';

export function Modal() {
  const { isOpen, closeDemoModal, defaultProduct } = useDemoModal();
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    product: defaultProduct || 'General Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultProduct) {
      setFormData((prev) => ({ ...prev, product: defaultProduct }));
    }
  }, [defaultProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit demo request.');
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setErrorMsg('Network error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg('');
    setFormData({
      name: '',
      institution: '',
      email: '',
      phone: '',
      product: 'General Enquiry',
      message: '',
    });
    closeDemoModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="gradient-bg-primary px-6 py-6 text-white relative">
          <button
            onClick={closeDemoModal}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/30">
            Eduniketan Enterprise
          </span>
          <h3 className="text-2xl font-bold">Request a Live Demo & Proposal</h3>
          <p className="text-slate-300 text-sm mt-1">
            Connect with our team to elevate your institution&apos;s placement ecosystem.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Request Saved to Database!</h4>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                We have logged your demo request for <span className="font-semibold text-blue-700">{formData.product}</span>. Our university solutions team will contact you within 24 hours.
              </p>
              <Button onClick={handleReset} variant="primary">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Dr. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Institution / University *</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Lovely Professional University"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="tpo@university.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product of Interest *</label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="Placement Mastery Program">Placement Mastery Program (Flagship Combo)</option>
                  <option value="TheEduCode">TheEduCode (Autograder & Test Platform)</option>
                  <option value="TheEduLive">TheEduLive (Mentor-Led Training)</option>
                  <option value="TheEduBootCamp">TheEduBootCamp (Placement Enhancement)</option>
                  <option value="General Enquiry">General University Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements / Batch Size</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <textarea
                    rows={3}
                    placeholder="Tell us about student batch size, preferred commencement date, or custom module requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={closeDemoModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading} className="gap-2">
                  {loading ? 'Saving...' : 'Submit Request'} <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
