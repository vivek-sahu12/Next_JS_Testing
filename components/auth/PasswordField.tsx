'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  rightAction?: React.ReactNode;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      error,
      id = 'password',
      name = 'password',
      rightAction,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id;
    const errorId = `${inputId}-error`;

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 select-none"
          >
            {label}
          </label>
          {rightAction}
        </div>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={`w-full h-10 pl-3.5 pr-10 text-sm rounded-lg border outline-none transition-all
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
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            tabIndex={0}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

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

PasswordField.displayName = 'PasswordField';
