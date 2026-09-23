import type { Metadata } from 'next';
import { LoginPageLayout } from '@/components/auth/LoginPageLayout';

export const metadata: Metadata = {
  title: 'Sign In — Nexus Enterprise Cloud',
  description:
    'Sign in to your Nexus enterprise workspace with single sign-on or work email.',
};

export default function LoginPage() {
  return <LoginPageLayout />;
}
