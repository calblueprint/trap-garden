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

interface ProfileContextType {
  profileData: Profile | null;
  profileReady: boolean;
  setProfile: (newProfileData: Partial<Profile>) => Promise<void>;
  loadProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [profileReady, setProfileReady] = useState<boolean>(false);

  const loadProfile = useCallback(async () => {
    setProfileReady(false);

    try {
      const profile: Profile = {
        user_id: placeholderUserId,
        state: '',
        user_type: '',
        has_plot: false,
      };
      // Fetch or upsert the profile for the placeholder user ID
      const fetchedProfile = await upsertProfile(profile);
      setProfileData(fetchedProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setProfileReady(true);
    }
  }, []);

  const setProfile = useCallback(
    async (newProfileData: Partial<Profile>) => {
      const profileToUpdate: Profile = {
        ...profileData!,
        ...newProfileData,
        user_id: placeholderUserId, // Using placeholder user ID for now
      };

      try {
        const updatedProfile = await upsertProfile(profileToUpdate);
        setProfileData(updatedProfile);
      } catch (error) {
        console.error('Error updating profile:', error);
        throw new Error('Error updating profile');
      }
    },
    [profileData],
  );

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const providerValue = useMemo(
    () => ({
      profileData,
      profileReady,
      setProfile,
      loadProfile,
    }),
    [profileData, profileReady, setProfile, loadProfile],
  );

  return (
    <ProfileContext.Provider value={providerValue}>
      {children}
    </ProfileContext.Provider>
  );
};
