'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import {
  registerUser,
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/lib/auth/auth-service';
import { AuthUser, SignUpErrors } from '@/types/auth';
import { InputField } from '@/components/auth/InputField';
import { PasswordField } from '@/components/auth/PasswordField';
import { AuthCard } from '@/components/auth/AuthCard';

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUser, setCreatedUser] = useState<AuthUser | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name || errors.general) {
      setErrors((prev) => ({ ...prev, name: undefined, general: undefined }));
    }
  };

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

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword || errors.general) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined, general: undefined }));
    }
  };

  const validate = (): boolean => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    if (nameErr || emailErr || passErr || confirmErr) {
      setErrors({
        name: nameErr || undefined,
        email: emailErr || undefined,
        password: passErr || undefined,
        confirmPassword: confirmErr || undefined,
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
      const response = await registerUser({
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.success && response.user) {
        setCreatedUser(response.user);
      } else {
        setErrors({
          general: response.error || 'Failed to create account. Please try again.',
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

  // Registration Success State
  if (createdUser) {
    return (
      <AuthCard
        title="Account Created"
        subtitle="Your enterprise account is ready."
        footerText="Ready to explore?"
        footerLinkText="Go to sign in"
        footerLinkHref="/login"
      >
        <div className="text-center py-2 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Welcome, {createdUser.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Account created for {createdUser.email}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full h-10 px-4 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white transition-colors"
            >
              Proceed to Sign In
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create an account"
      subtitle="Start your 14-day free trial. No credit card required."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
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

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name Field */}
        <InputField
          id="signup-name"
          name="name"
          type="text"
          label="Full name"
          placeholder="Alex Rivera"
          value={name}
          onChange={handleNameChange}
          error={errors.name}
          disabled={isSubmitting}
          autoComplete="name"
        />

        {/* Email Field */}
        <InputField
          id="signup-email"
          name="email"
          type="email"
          label="Work email"
          placeholder="name@company.com"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
          disabled={isSubmitting}
          autoComplete="email"
        />

        {/* Password Field */}
        <PasswordField
          id="signup-password"
          name="password"
          label="Password"
          placeholder="At least 8 characters"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
          disabled={isSubmitting}
          autoComplete="new-password"
        />

        {/* Confirm Password Field */}
        <PasswordField
          id="signup-confirm-password"
          name="confirmPassword"
          label="Confirm password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={errors.confirmPassword}
          disabled={isSubmitting}
          autoComplete="new-password"
        />

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10.5 px-4 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 active:bg-slate-950 transition-all flex items-center justify-center gap-2 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white dark:active:bg-slate-200 shadow-xs disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Create account</span>
            )}
          </button>
        </div>
      </form>
    </AuthCard>
  );
}
