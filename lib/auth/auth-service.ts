import { AuthResponse, LoginCredentials } from '@/types/auth';

export const DEMO_CREDENTIALS = {
  email: 'alex@nexus.ai',
  password: 'Enterprise2026!',
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates an email address.
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address';
  }
  return null;
}

/**
 * Validates a password input.
 */
export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return null;
}

/**
 * Mock Authentication Service
 */
export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const email = credentials.email.trim().toLowerCase();
  const password = credentials.password;

  // Simulate network latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check demo credentials or valid format with demo password
  if (
    (email === DEMO_CREDENTIALS.email.toLowerCase() && password === DEMO_CREDENTIALS.password) ||
    password === DEMO_CREDENTIALS.password
  ) {
    return {
      success: true,
      message: 'Authentication successful',
      token: 'mock_jwt_token_' + Math.random().toString(36).substring(2),
      user: {
        id: 'usr_98472918',
        name: 'Alex Rivera',
        email: email,
        role: 'Team Member',
        organization: 'Acme Corp',
      },
    };
  }

  // Failed authentication
  return {
    success: false,
    error: 'Invalid email or password. Please try again.',
  };
}

/**
 * Mock password reset request
 */
export async function sendPasswordResetEmail(email: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
    };
  }

  return {
    success: true,
    message: `Password reset instructions sent to ${email}.`,
  };
}
