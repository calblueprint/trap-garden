import { useState } from 'react';
import { Profile } from '../types/schema';

const initialProfiles: Profile[] = [];

export const useProfile = () => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);

  const addProfile = (newProfile: Profile) => {
    setProfiles(prev => [...prev, newProfile]);
  };

  const updateProfile = (index: number, updates: Partial<Profile>) => {
    setProfiles(prev =>
      prev.map((profile, i) =>
        i === index ? { ...profile, ...updates } : profile,
      ),
    );
  };

  const removeProfile = (index: number) => {
    setProfiles(prev => prev.filter((_, i) => i !== index));
  };

  return {
    profiles,
    addProfile,
    updateProfile,
    removeProfile,
  };
};
