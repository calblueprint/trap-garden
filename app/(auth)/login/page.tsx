'use client';

import { useState } from 'react';
import { useAuth } from '../../utils/AuthProvider';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
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
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>{' '}
      {/* Sign in button */}
    </>
  );
}
