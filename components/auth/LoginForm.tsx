'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { authenticateUser, validateEmail, validatePassword } from '@/lib/auth/auth-service';
import { AuthUser, FormErrors } from '@/types/auth';
import { InputField } from '@/components/auth/InputField';
import { PasswordField } from '@/components/auth/PasswordField';
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthUser | null>(null);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email || errors.general) {
      setErrors((prev) => ({ ...prev, email: undefined, general: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password || errors.general) {
      setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
    }
  };

  const validate = (): boolean => {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({
        email: emailErr || undefined,
        password: passErr || undefined,
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await authenticateUser({ email, password, rememberMe });
      if (response.success && response.user) {
        setAuthenticatedUser(response.user);
      } else {
        setErrors({
          general: response.error || 'Invalid email or password. Please try again.',
        });
      }
    } catch {
      setErrors({
        general: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Authenticated Success State
  if (authenticatedUser) {
    return (
      <div className="w-full max-w-[380px] mx-auto p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Signed In Successfully
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Welcome back, {authenticatedUser.name}
        </p>

        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => {
              setAuthenticatedUser(null);
              setPassword('');
            }}
            className="w-full h-10 px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[380px] mx-auto">
      {/* Brand & Heading */}
      <div className="text-center mb-8">
        {/* Minimalist Logo Mark */}
        <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center mx-auto mb-5 shadow-sm">
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

        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome back
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
          Please enter your details to sign in.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-zinc-900 p-7 sm:p-8 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        {/* Error Alert */}
        {errors.general && (
          <div
            role="alert"
            className="mb-5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200/80 dark:border-red-900/40 text-xs text-red-700 dark:text-red-400 flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" aria-hidden="true" />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email / Username Field */}
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email address"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
            disabled={isSubmitting}
            autoComplete="email"
            placeholder="name@company.com"
          />

          {/* Password Field */}
          <PasswordField
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
            disabled={isSubmitting}
            autoComplete="current-password"
            placeholder="••••••••"
          />

          {/* Remember Me and Forgot Password Row */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-zinc-900 dark:focus:ring-white cursor-pointer"
              />
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                Remember me
              </span>
            </label>

            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 px-4 rounded-lg bg-zinc-900 text-white font-medium text-sm hover:bg-zinc-800 active:bg-zinc-950 transition-colors flex items-center justify-center gap-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        initialEmail={email}
      />
    </div>
  );
}
