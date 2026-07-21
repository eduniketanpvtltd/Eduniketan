'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({
  children,
  className = '',
  hoverEffect = true,
  glass = false,
  ...props
}) {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 transition-all duration-300',
          hoverEffect && 'hover:-translate-y-1 hover:shadow-xl hover:border-blue-200',
          glass && 'glass-panel',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
