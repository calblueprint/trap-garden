'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../utils/AuthProvider';

export default function Login() {
  const { signIn } = useAuth(); // Use `signIn` function from AuthProvider
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // Define handleLogin
    try {
      await signIn(email, password);
      router.push('/'); // Redirect to the home page on success
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login Error:', error.message);
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
      <button type="button" onClick={handleLogin}>
        Sign in
      </button>
    </>
  );
}
