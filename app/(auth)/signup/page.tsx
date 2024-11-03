'use client';

import { useState } from 'react';
import { AuthProvider, useAuth } from '../../utils/AuthProvider';

export default function SignUpLayout() {
  return (
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
}

function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // Define handleSignUp
    try {
      await signUp(email, password);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <input
        name="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
      />
      <input
        type="password"
        name="Confirm Password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        placeholder="Confirm Password"
      />
      <button type="button" onClick={handleSignUp}>
        Sign up
      </button>{' '}
      {/* Sign up button */}
    </>
  );
}
