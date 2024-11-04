'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../api/supabase/createClient';

interface AuthContextType {
  authUser: AuthUser | null;
  isLoggedIn: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

interface AuthUser {
  id: string;
  email: string;
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
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter(); // Get Next.js router for navigation

  // Sign Up function
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);

      if (data.user) {
        // Map the user data to AuthUser type, ensuring `id` and `email` are defined
        const user: AuthUser = {
          id: data.user.id ?? '', // Fallback to an empty string if `id` is undefined
          email: data.user.email ?? '', // Fallback to an empty string if `email` is undefined
        };

        setAuthUser(user);
        setIsLoggedIn(true);
        push('/dashboard'); // Redirect to dashboard after sign-up
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

      // Map the user data to AuthUser type
      const user: AuthUser = {
        id: data.user.id ?? '', // Fallback to an empty string if `id` is undefined
        email: data.user.email ?? '', // Fallback to an empty string if `email` is undefined
      };

      setAuthUser(user);
      setIsLoggedIn(true);
      push('/dashboard'); // Redirect to dashboard after sign-in
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
      setAuthUser(null);
      setIsLoggedIn(false);
      push('/login'); // Redirect to login after sign-out
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
      const { data } = await supabase.auth.getUser();
      if (data.user && data.user.id && data.user.email) {
        // Map the user data to AuthUser type
        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email,
        };

        setAuthUser(user);
        setIsLoggedIn(true);
      } else {
        setAuthUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    getUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user: AuthUser = {
          id: session.user.id ?? '', // Fallback to empty string if `id` is undefined
          email: session.user.email ?? '', // Fallback to empty string if `email` is undefined
        };

        setAuthUser(user);
        setIsLoggedIn(true);
      } else {
        setAuthUser(null);
        setIsLoggedIn(false);

        if (!loading) {
          if (window.location.pathname !== '/signup') {
            push('/login');
          }
        }
      }
    });

    return () => subscription?.unsubscribe();
  }, [push]);

  const value: AuthContextType = {
    authUser,
    isLoggedIn,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}
