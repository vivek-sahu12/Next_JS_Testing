'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/auth/ThemeToggle';

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 transition-colors duration-200">
      {/* Floating Theme Switcher */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[400px] mx-auto py-8">
        {/* Brand Header */}
        <div className="text-center mb-7">
          {/* Refined Geometric Logomark */}
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm mb-4 border border-slate-800 dark:border-slate-200">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Elevated Card */}
        <div className="bg-white dark:bg-[#111622] p-7 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_25px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_12px_32px_-4px_rgba(0,0,0,0.5)] transition-colors">
          {children}
        </div>

        {/* Card Footer Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {footerText}{' '}
            <Link
              href={footerLinkHref}
              className="font-medium text-slate-900 dark:text-slate-100 hover:underline underline-offset-4 transition-colors"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
