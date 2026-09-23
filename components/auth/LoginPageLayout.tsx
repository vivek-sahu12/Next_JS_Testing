'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

function subscribeToColorScheme(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getSystemDarkSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getServerSnapshot() {
  return false;
}

export function LoginPageLayout() {
  const [userThemeOverride, setUserThemeOverride] = useState<'light' | 'dark' | null>(null);

  const systemPrefersDark = useSyncExternalStore(
    subscribeToColorScheme,
    getSystemDarkSnapshot,
    getServerSnapshot
  );

  const isDarkMode = userThemeOverride !== null ? userThemeOverride === 'dark' : systemPrefersDark;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setUserThemeOverride((current) => {
      const active = current !== null ? current === 'dark' : systemPrefersDark;
      return active ? 'light' : 'dark';
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      {/* Subtle theme toggle in the top right */}
      <div className="fixed top-4 right-4 z-10">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Moon className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Main Login Form Container */}
      <main className="w-full py-8 flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
}
