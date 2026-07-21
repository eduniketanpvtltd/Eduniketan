'use client';

import React, { useState } from 'react';
import { Star, MessageSquarePlus, X, Send, CheckCircle2, User, Building2 } from 'lucide-react';
import { Button } from './Button';

export function FeedbackWidget({ onFeedbackSubmitted }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    authorName: '',
    institution: '',
    role: 'Student',
    rating: 5,
    comment: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onFeedbackSubmitted) onFeedbackSubmitted(data.data);
      } else {
        alert(data.error || 'Failed to submit feedback');
      }
    } catch (err) {
      console.error('Feedback error:', err);
      alert('Error connecting to feedback service');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      authorName: '',
      institution: '',
      role: 'Student',
      rating: 5,
      comment: '',
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
      >
        <Star className="w-4 h-4 fill-amber-300 text-amber-300 animate-spin-slow" />
        <span>Live Feedback</span>
      </button>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="gradient-bg-accent px-6 py-5 text-white relative flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200">
                  Real-Time Ratings
                </span>
                <h3 className="text-xl font-extrabold text-white">Share Your Campus Feedback</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Feedback Published!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Thank you for rating Eduniketan. Your feedback is now live on our campus performance stream.
                  </p>
                  <Button onClick={handleReset} variant="primary" size="sm">
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Star Rating *</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= formData.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Aman Sharma"
                          value={formData.authorName}
                          onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">College / University *</label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="LPU Punjab"
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                    >
                      <option value="Student">Student</option>
                      <option value="TPO">TPO / Placement Officer</option>
                      <option value="Faculty">Faculty / HOD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Feedback / Review *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your experience with TheEduCode autograder or live mentorship sessions..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="accent" size="sm" disabled={loading} className="gap-1.5">
                      {loading ? 'Submitting...' : 'Post Live Feedback'} <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
