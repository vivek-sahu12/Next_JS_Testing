import { AuthResponse, LoginCredentials, SignUpCredentials } from '@/types/auth';

export const DEMO_CREDENTIALS = {
  email: 'alex@nexus.ai',
  password: 'Enterprise2026!',
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates a user's full name.
 */
export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Full name is required';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
}

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
 * Validates a password.
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
 * Validates confirmation password match.
 */
export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
}

/**
 * Mock Authentication (Sign In)
 */
export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const email = credentials.email.trim().toLowerCase();
  const password = credentials.password;

  // Simulate network latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (
    (email === DEMO_CREDENTIALS.email.toLowerCase() && password === DEMO_CREDENTIALS.password) ||
    password === DEMO_CREDENTIALS.password
  ) {
    return {
      success: true,
      message: 'Authentication successful',
      token: 'mock_jwt_' + Math.random().toString(36).substring(2),
      user: {
        id: 'usr_84920194',
        name: email === DEMO_CREDENTIALS.email ? 'Alex Rivera' : email.split('@')[0],
        email: email,
        organization: 'Acme Cloud',
      },
    };
  }

  return {
    success: false,
    error: 'Invalid email or password. Please try again.',
  };
}

/**
 * Mock Registration (Sign Up)
 */
export async function registerUser(credentials: SignUpCredentials): Promise<AuthResponse> {
  const name = credentials.name.trim();
  const email = credentials.email.trim().toLowerCase();

  // Simulate network latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulated email taken check
  if (email === 'taken@example.com') {
    return {
      success: false,
      error: 'An account with this email already exists. Please sign in.',
    };
  }

  return {
    success: true,
    message: 'Account created successfully',
    token: 'mock_jwt_signup_' + Math.random().toString(36).substring(2),
    user: {
      id: 'usr_new_' + Math.random().toString(36).substring(2, 8),
      name: name,
      email: email,
      organization: 'Personal Workspace',
    },
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
