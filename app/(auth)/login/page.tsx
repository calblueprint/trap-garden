'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../../api/supabase/createClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useRouter();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // Check if the error is due to an already registered email
      if (error.message.includes('User already registered')) {
        throw new Error(
          'This email is already registered. Please try signing in instead.',
        );
      } else {
        throw new Error(
          `An error occurred trying to sign up: ${error.message}`,
        );
      }
    }

    push('/');

    return data;
  };

  const handleSignInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`An error occurred trying to sign in: ${error}`);
    }

    push('/');

    return data;
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
      </button>
      <button type="button" onClick={handleSignInWithEmail}>
        Sign in
      </button>
    </>
  );
}
