import type { Metadata } from 'next';
import { SignUpForm } from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up — Nexus',
  description: 'Create an enterprise account and start your 14-day free trial.',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
