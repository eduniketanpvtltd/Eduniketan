'use client';

import React, { useEffect, useState, useRef } from 'react';

export function StatsCounter({ end, suffix = '', duration = 2000, label, icon: Icon }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <div
      ref={counterRef}
      className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 text-center hover:shadow-lg transition-all duration-300 group"
    >
      {Icon && (
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-600">{label}</div>
    </div>
  );
}
