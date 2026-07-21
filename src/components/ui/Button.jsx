'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white shadow-md hover:shadow-lg focus:ring-blue-500 rounded-full',
    secondary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg focus:ring-teal-500 rounded-full',
    outline: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-500 rounded-full',
    ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-slate-400 rounded-lg',
    accent: 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg focus:ring-teal-400 rounded-full',
    white: 'bg-white text-blue-900 hover:bg-slate-50 shadow-md hover:shadow-lg focus:ring-white rounded-full',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs tracking-wide',
    md: 'px-5 py-2.5 text-sm tracking-wide',
    lg: 'px-7 py-3 text-base tracking-wide',
    xl: 'px-9 py-4 text-lg tracking-wide',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  );
}
