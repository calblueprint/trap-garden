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

// Define the shape of the context
interface AuthContextType {
  authUser: any;
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
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter(); // Get Next.js router for navigation

  // Sign Up function
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    setAuthUser(data.user);
    setIsLoggedIn(true);
    push('/dashboard'); // Redirect to dashboard after sign-up
  };

  // Sign In function
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    setAuthUser(data.user);
    setIsLoggedIn(true);
    push('/dashboard'); // Redirect to dashboard after sign-in
  };

  // Sign Out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    setAuthUser(null);
    setIsLoggedIn(false);
    push('/login'); // Redirect to login after sign-out
  };

  // Fetch the currently logged-in user on mount and redirect to dashboard if signed in
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setAuthUser(data.user);
        setIsLoggedIn(true);
      } else {
        setAuthUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    getUser();

    // Listen for auth state changes
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setAuthUser(session.user);
          setIsLoggedIn(true);
        } else {
          setAuthUser(null);
          setIsLoggedIn(false);
        }
      },
    );

    return () => subscription?.unsubscribe();
  }, [push]); // Add push to dependencies to avoid stale closures

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
