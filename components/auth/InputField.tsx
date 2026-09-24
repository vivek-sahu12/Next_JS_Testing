'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, name, disabled, className = '', ...props }, ref) => {
    const inputId = id || (name ? `input-${name}` : 'input');
    const errorId = `${inputId}-error`;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-slate-700 dark:text-slate-300 select-none"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full h-10 px-3.5 text-sm rounded-lg border outline-none transition-all
            bg-white text-slate-900 placeholder:text-slate-400
            dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500
            ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/15 dark:border-red-500/80 dark:focus:ring-red-500/20'
                : 'border-slate-300/80 hover:border-slate-400 dark:border-slate-700/80 dark:hover:border-slate-600 focus:border-slate-900 dark:focus:border-slate-300 focus:ring-3 focus:ring-slate-900/5 dark:focus:ring-white/10'
            }
            disabled:opacity-50 disabled:cursor-not-allowed ${className}`.trim()}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 pt-0.5 animate-auth-fade"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
