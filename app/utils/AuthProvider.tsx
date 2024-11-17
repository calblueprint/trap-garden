'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import supabase from '../../api/supabase/createClient';

interface AuthContextType {
  userId: string | null;
  email: string | null;
  session: Session | null;
  isLoggedIn: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
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

// AuthProvider component that wraps around your app or specific pages
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  // Sign Up function
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);

      if (data.user) {
        setUserId(data.user.id ?? null);
        setEmail(data.user.email ?? null);
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Sign-up Error:', error.message);
      }
    }
  };

  // Sign In function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);

      setUserId(data.user.id ?? null);
      setEmail(data.user.email ?? null);
      setIsLoggedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Sign-in Error:', error.message);
      }
    }
  };

  // Sign Out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      setUserId(null);
      setEmail(null);
      setIsLoggedIn(false);
      setSession(null);
      // push('/login'); // Redirect to login after sign-out
    } catch (error) {
      if (error instanceof Error) {
        console.error('Sign-out Error:', error.message);
      }
    }
  };

  // Fetch the currently logged-in user on mount and redirect to dashboard if signed in
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session Error:', error.message);
      } else if (data.session) {
        setSession(data.session);
        const { user } = data.session;
        if (user) {
          setUserId(user.id ?? null);
          setEmail(user.email ?? null);
          setIsLoggedIn(true);
        }
      } else {
        setUserId(null);
        setEmail(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    };
    getUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        const { user } = session;
        if (user) {
          setUserId(user.id ?? null);
          setEmail(user.email ?? null);
          setIsLoggedIn(true);
        }
      } else {
        setUserId(null);
        setEmail(null);
        setIsLoggedIn(false);
        setSession(null);

        // if (!loading && window.location.pathname !== '/signup') {
        // push('/login');
        // }
      }
    });

    return () => subscription?.unsubscribe();
  }, [push, loading]);

  const value: AuthContextType = {
    userId,
    email,
    session,
    isLoggedIn,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
