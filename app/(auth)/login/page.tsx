'use client';

import { useState } from 'react';
import { AuthProvider, useAuth } from '../../utils/AuthProvider';

export default function LoginLayout() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

function Login() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignUp = async () => {
    // Define handleSignUp
    try {
      await signUp(email, password);
    } catch (error) {
      console.error(error.message);
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
      <button type="button" onClick={handleSignUp}>
        Sign up
      </button>{' '}
      {/* Sign up button */}
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>{' '}
      {/* Sign in button */}
    </>
  );
}
