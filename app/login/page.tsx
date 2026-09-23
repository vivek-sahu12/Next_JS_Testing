import type { Metadata } from 'next';
import { SignInForm } from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In — Nexus',
  description: 'Sign in to access your enterprise workspace.',
};

export default function LoginPage() {
  return <SignInForm />;
}
