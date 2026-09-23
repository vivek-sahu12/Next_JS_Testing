'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { authenticateUser, validateEmail, validatePassword } from '@/lib/auth/auth-service';
import { AuthUser, SignInErrors } from '@/types/auth';
import { InputField } from '@/components/auth/InputField';
import { PasswordField } from '@/components/auth/PasswordField';
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal';
import { AuthCard } from '@/components/auth/AuthCard';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<SignInErrors>({});
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
        general: 'An unexpected system error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Authenticated state
  if (authenticatedUser) {
    return (
      <AuthCard
        title="Authentication Verified"
        subtitle="Your session has been established."
        footerText="Need to switch user?"
        footerLinkText="Sign out"
        footerLinkHref="/login"
      >
        <div className="text-center py-2 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Welcome back, {authenticatedUser.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {authenticatedUser.email}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setAuthenticatedUser(null);
                setPassword('');
              }}
              className="w-full h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Please enter your credentials to sign in."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup"
    >
      {errors.general && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200/80 dark:border-red-900/40 text-xs text-red-700 dark:text-red-400 flex items-start gap-2.5 animate-auth-fade"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" aria-hidden="true" />
          <span>{errors.general}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4.5">
        {/* Email Field */}
        <InputField
          id="signin-email"
          name="email"
          type="email"
          label="Email address"
          placeholder="name@company.com"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
          disabled={isSubmitting}
          autoComplete="email"
        />

        {/* Password Field */}
        <PasswordField
          id="signin-password"
          name="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
          disabled={isSubmitting}
          autoComplete="current-password"
          rightAction={
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          }
        />

        {/* Remember me row */}
        <div className="flex items-center pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isSubmitting}
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-slate-900 focus:ring-slate-900 dark:focus:ring-slate-100 cursor-pointer"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Remember me
            </span>
          </label>
        </div>

        {/* Submit button */}
        <div className="pt-1.5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10.5 px-4 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 active:bg-slate-950 transition-all flex items-center justify-center gap-2 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white dark:active:bg-slate-200 shadow-xs disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </div>
      </form>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        initialEmail={email}
      />
    </AuthCard>
  );
}
