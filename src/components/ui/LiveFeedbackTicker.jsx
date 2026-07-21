'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Quote, RefreshCw } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

export function LiveFeedbackTicker() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      if (data.success) {
        setFeedbackList(data.data);
      }
    } catch (err) {
      console.error('Error fetching live feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    const interval = setInterval(fetchFeedback, 15000); // Polling every 15s for live updates
    return () => clearInterval(interval);
  }, []);

  const averageRating = feedbackList.length > 0
    ? (feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length).toFixed(1)
    : '4.9';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="emerald">Live Feedback Stream</Badge>
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {averageRating} / 5.0 Rating
          </span>
        </div>
        <button
          onClick={fetchFeedback}
          className="text-xs text-slate-500 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Feed
        </button>
      </div>

      {feedbackList.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-500 bg-slate-100 rounded-2xl">
          No feedback submitted yet. Be the first to rate Eduniketan!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbackList.slice(0, 6).map((item) => (
            <Card key={item.id} className="p-6 border-slate-200 hover:border-teal-300 space-y-3 relative">
              <Quote className="w-6 h-6 text-teal-200 absolute top-4 right-4" />
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-3">
                &ldquo;{item.comment}&rdquo;
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{item.authorName}</div>
                  <div className="text-[10px] font-semibold text-teal-700">{item.institution}</div>
                </div>
                <Badge variant={item.role === 'TPO' ? 'amber' : item.role === 'Faculty' ? 'indigo' : 'blue'}>
                  {item.role}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
