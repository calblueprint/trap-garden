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

      // Map the user data to AuthUser type
      const user: AuthUser = {
        id: data.user.id,
        email: data.user.email,
      };

      setAuthUser(user);
      setIsLoggedIn(true);
      push('/dashboard'); // Redirect to dashboard after sign-up
    } catch (error) {
      console.error('Sign-up Error:', error.message);
      // Handle error accordingly (e.g., show a toast notification)
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
        id: data.user.id,
        email: data.user.email,
      };

      setAuthUser(user);
      setIsLoggedIn(true);
      push('/dashboard'); // Redirect to dashboard after sign-in
    } catch (error) {
      console.error('Sign-in Error:', error.message);
      // Handle error accordingly (e.g., show a toast notification)
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
      console.error('Sign-out Error:', error.message);
      // Handle error accordingly
    }
  };

  // Fetch the currently logged-in user on mount and redirect to dashboard if signed in
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
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
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const user: AuthUser = {
            id: session.user.id,
            email: session.user.email,
          };

          setAuthUser(user);
          setIsLoggedIn(true);
        } else {
          setAuthUser(null);
          setIsLoggedIn(false);
          push('/login');
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
