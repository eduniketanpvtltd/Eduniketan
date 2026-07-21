'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade(true); // Start fade-out animation
    }, 1500);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.85,0,0.15,1)] ${
        fade ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Decorative Mesh Blur */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl"></div>

      <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-700">
        {/* Logo Wrapper */}
        <div className="relative w-20 h-20 mx-auto overflow-hidden animate-float">
          <Image
            src="/assets/Company Logo.png"
            alt="Eduniketan Logo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Brand Text */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-white">
            EDUNIKETAN
          </h1>
          <span className="block text-xs font-bold tracking-widest text-teal-400 uppercase">
            Private Limited
          </span>
        </div>

        {/* Loading Indicator */}
        <div className="w-40 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full animate-marquee"></div>
        </div>
      </div>
    </div>
  );
}
