'use client';

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  fetchProfileById,
  upsertProfile,
} from '@/api/supabase/queries/profiles';
import { Profile } from '@/types/schema';

// Define a placeholder user ID for development purposes
const placeholderUserId = '0802d796-ace8-480d-851b-d16293c74a21';

export interface ProfileContextType {
  profileData: Profile | null;
  profileReady: boolean;
  has_plot: boolean | null;
  setProfile: (completeProfile: Profile) => Promise<void>; // Now expects full Profile
  loadProfile: () => Promise<void>;
  setHasPlot: (plotValue: boolean | null) => void;
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
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [profileReady, setProfileReady] = useState<boolean>(false);
  const [hasPlot, setHasPlot] = useState<boolean | null>(null);

  const loadProfile = useCallback(async () => {
    setProfileReady(false);

    const fetchedProfile = await fetchProfileById(placeholderUserId);

    setProfileData(fetchedProfile);
    setProfileReady(true);
  }, []);

  const setProfile = useCallback(async (completeProfile: Profile) => {
    try {
      const updatedProfile = await upsertProfile(completeProfile);
      setProfileData(updatedProfile);
      // Update has_plot if necessary by separate logic
    } catch (error) {
      console.error('Error setting profile:', error);
      throw new Error('Error setting profile');
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      profileData,
      profileReady,
      has_plot: hasPlot,
      setProfile,
      loadProfile,
      setHasPlot,
    }),
    [profileData, profileReady, hasPlot, setProfile, loadProfile, setHasPlot],
  );

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
}
