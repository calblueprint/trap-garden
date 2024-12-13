'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UUID } from 'crypto';
import { AuthError, AuthResponse, Session } from '@supabase/supabase-js';
import { checkEmailExists } from '@/api/supabase/queries/users';
import supabase from '../api/supabase/createClient';

interface AuthContextType {
  userId: UUID | null;
  userEmail: string | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  loading: boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// AuthProvider component that wraps around the app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState<UUID | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const setAll = useCallback((newSession: Session | null) => {
    if (!newSession) return;
    setSession(newSession);
    const sessionUserId = (newSession.user.id as UUID) ?? null;
    const sessionUserEmail = newSession.user.email ?? null;
    setUserId(sessionUserId);
    setUserEmail(sessionUserEmail);
  }, []);

  // Fetch the current user
  useEffect(() => {
    const initializeSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session Error:', error.message);
      }
      setAll(data.session);
      setLoading(false);
    };
    initializeSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setAll(newSession);
    });

    return () => subscription?.unsubscribe();
  }, [setAll]);

  // Sign Up function
  const signUp = useCallback(async (email: string, password: string) => {
    // will trigger onAuthStateChange to update the session
    // check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      const authError = new AuthError('Account already exists for this email');
      // return the authError in an AuthResponse object
      return { data: { user: null, session: null }, error: authError };
    }
    const value = await supabase.auth.signUp({ email, password });
    return value;
  }, []);

  // Sign In function
  const signIn = useCallback(async (email: string, password: string) => {
    const value = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // will trigger onAuthStateChange to update the session
    return value;
  }, []);

  // Sign Out function
  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    // signOut also triggers onAuthStateChange
    if (!error) {
      setUserId(null);
      setUserEmail(null);
      setSession(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      session,
      userId,
      userEmail,
      signIn,
      signOut,
      signUp,
      loading,
    }),
    [session, userId, userEmail, signIn, signOut, signUp, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/*
EXAMPLE USAGE: app/dashboard/page.tsx
'use client';

import { useAuth } from '@/utils/AuthProvider';

export default function Dashboard() {
  const { userId, email, signOut } = useAuth();

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <p>User is currently: {userId ? 'Logged In' : 'Logged Out'}</p>
        {userId && <p>User name: {email}</p>}{' '}
        <button onClick={signOut}>Log Out</button>
      </main>
    </>
  );
}
*/
