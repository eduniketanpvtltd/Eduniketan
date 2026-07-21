'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({
  children,
  variant = 'blue',
  className = '',
}) {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border shadow-2xs',
          variants[variant],
          className
        )
      )}
    >
      {children}
    </span>
  );
}
