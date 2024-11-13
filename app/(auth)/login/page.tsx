'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../utils/AuthProvider';
import TextInput from '@/components/TextInput';

export default function Login() {
  const { signIn } = useAuth(); // Use `signIn` function from AuthProvider
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div
      style={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <header>
        <h1 style={{ color: 'darkgreen' }}>Log In</h1>
      </header>
      <TextInput
        id="email-input"
        type="email"
        label="Email"
        onChange={setEmail}
        value={email}
        placeholder="Email"
      />
      {/* Email input*/}
      <TextInput
        id="password-input"
        type="password"
        label="Password"
        onChange={setPassword}
        value={password}
        placeholder="Password"
        isVisible={showPassword}
        toggleVisibility={() => setShowPassword(!showPassword)}
      />
      <button type="button" onClick={handleLogin}>
        Sign in
      </button>{' '}
      {/* Sign in button */}
    </div>
  );
}
