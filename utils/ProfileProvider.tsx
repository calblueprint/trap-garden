'use client';

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  fetchProfileById,
  upsertProfile,
} from '@/api/supabase/queries/profiles';
import { Plant, Profile } from '@/types/schema';
import { useAuth } from './AuthProvider';

export interface ProfileContextType {
  profileData: Profile | null;
  profileReady: boolean;
  plantsToAdd: Plant[];
  setProfile: (completeProfile: Profile) => Promise<void>; // Now expects full Profile
  loadProfile: () => Promise<void>;
  setPlantsToAdd: (plants: Plant[]) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}
export default function ProfileProvider({ children }: ProfileProviderProps) {
  const { userId, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [profileReady, setProfileReady] = useState<boolean>(false);
  const [plantsToAdd, setPlantsToAdd] = useState<Plant[]>([]);

  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfileData(null);
      setProfileReady(true);
      return;
    }
    try {
      setProfileReady(false);
      const fetchedProfile = await fetchProfileById(userId);
      setProfileData(fetchedProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileReady(true);
    }
  }, [userId]);

  useEffect(() => {
    if (!authLoading) {
      loadProfile();
    }
  }, [authLoading, loadProfile]);

  const setProfile = useCallback(async (completeProfile: Profile) => {
    try {
      const updatedProfile = await upsertProfile(completeProfile);
      setProfileData(updatedProfile);
    } catch (error) {
      // TODO: maybe add some additional type checking of the error
      // if we only want error.message
      console.error('Error setting profile:', error);
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      profileData,
      profileReady,
      plantsToAdd,
      setPlantsToAdd,
      setProfile,
      loadProfile,
    }),
    [
      profileData,
      profileReady,
      plantsToAdd,
      setPlantsToAdd,
      setProfile,
      loadProfile,
    ],
  );

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
}
