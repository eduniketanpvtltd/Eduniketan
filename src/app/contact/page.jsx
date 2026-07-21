'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Building2, User, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    product: 'Placement Mastery Program',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
        setErrorMsg(data.error || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrorMsg('Network error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="blue">Get In Touch</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Connect with Our <span className="gradient-text">University Solutions Team</span>
        </h1>
        <p className="text-slate-600 text-lg">
          Whether you need a custom proposal for your institution or want to schedule a live demonstration, we are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-blue-200 bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-6">
            <h3 className="text-2xl font-bold text-white">Contact Information</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Reach out directly to our institutional partnership desk or founders.
            </p>

            <div className="space-y-4 pt-2 text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Office Location</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Ground Floor, Shri Ravi Building, Garthama Bazar, Sindhora Road, Varanasi, Uttar Pradesh, 221208
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">HR Email</div>
                  <a href="mailto:hr.shreya@eduniketanpvtltd.com" className="text-xs text-teal-300 hover:underline">
                    hr.shreya@eduniketanpvtltd.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">HR Phone (Reach Out)</div>
                  <a href="tel:+919596400127" className="text-xs text-slate-300 hover:underline">
                    +91 95964 00127 (Ms. Shreya Khajuria)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Response Commitment</div>
                  <div className="text-xs text-slate-300">Within 24 Hours on Working Days</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Form Main */}
        <div className="lg:col-span-3">
          <Card className="p-8 sm:p-10 border-slate-200 shadow-lg">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">Enquiry Saved to Database!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-blue-700">{formData.name}</span>. Your request has been logged in our system. Our team will respond to <span className="font-semibold">{formData.email}</span> shortly.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="primary">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Institutional Enquiry Form</h3>

                {errorMsg && (
                  <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Institution / College *</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Lovely Professional University"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Interested In *</label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Placement Mastery Program">Placement Mastery Program (Flagship Combo)</option>
                    <option value="TheEduCode">TheEduCode (Autograder & Test Platform)</option>
                    <option value="TheEduLive">TheEduLive (Mentor-Led Mentorship)</option>
                    <option value="TheEduBootCamp">TheEduBootCamp (Placement Enhancement Program)</option>
                    <option value="General Partnership">General Campus MoU / Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Student Batch Details</label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <textarea
                      rows={4}
                      placeholder="Share details regarding batch size, semester timeline, or specific curriculum requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full gap-2">
                  {loading ? 'Submitting to Database...' : 'Submit Institutional Enquiry'} <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
