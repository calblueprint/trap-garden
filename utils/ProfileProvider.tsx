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
import { upsertProfile } from '@/api/supabase/queries/profiles';
import { Profile } from '@/types/schema';

// Define a placeholder user ID for development purposes
const placeholderUserId = '2abd7296-374a-42d1-bb4f-b813da1615ae';

export interface ProfileContextType {
  profileData: Profile | null;
  profileReady: boolean;
  has_plot: boolean;
  setProfile: (completeProfile: Profile) => Promise<void>; // Now expects full Profile
  loadProfile: () => Promise<void>;
  updateHasPlot: (plotValue: boolean) => Promise<void>; // Add this line
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
export default function ProfileProvider({
  children,
}: ProfileProviderProps): JSX.Element {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [profileReady, setProfileReady] = useState<boolean>(false);
  const [hasPlot, setHasPlot] = useState<boolean>(false);

  const loadProfile = useCallback(async () => {
    setProfileReady(false);
    try {
      const profile: Profile = {
        user_id: placeholderUserId,
        state: '',
        user_type: 'INDIV', //default for now
        // Removed has_plot as it's not part of Profile
      };
      const fetchedProfile = await upsertProfile(profile);
      setProfileData(fetchedProfile);
      // Set has_plot independently, assuming it needs separate handling
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setProfileReady(true);
    }
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

  const updateHasPlot = useCallback(async (plotValue: boolean) => {
    try {
      setHasPlot(plotValue);
    } catch (error) {
      console.error('Error updating has_plot:', error);
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      profileData,
      profileReady,
      has_plot: hasPlot,
      setProfile,
      loadProfile,
      updateHasPlot, // Ensure this is included
    }),
    [
      profileData,
      profileReady,
      hasPlot,
      setProfile,
      loadProfile,
      updateHasPlot,
    ],
  );

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
}
