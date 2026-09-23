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
          className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
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
          className={`w-full h-10 px-3.5 text-sm rounded-lg border outline-none transition-colors
            bg-white text-zinc-900 placeholder:text-zinc-400
            dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500
            ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-zinc-900 dark:focus:border-white focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white'
            }
            disabled:opacity-50 disabled:cursor-not-allowed ${className}`.trim()}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 pt-0.5"
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
