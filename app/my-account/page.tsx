'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BigButton } from '@/components/Buttons';
import { ProfileIcon } from '@/components/NavColumn/styles';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H4, P2 } from '@/styles/text';
import { useAuth } from '@/utils/AuthProvider';
import { plotOptions } from '@/utils/dropdownOptions';
import { useProfile } from '@/utils/ProfileProvider';
import {
  GardenInformationContainer,
  InfoField,
  PersonalInformationContainer,
  ProfilePictureContainer,
} from './styles';

export default function MyAccount() {
  const { userEmail, signOut } = useAuth();
  const { profileData } = useProfile();

  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push(CONFIG.login);
  };

  return (
    <Flex $direction="column">
      {/* User profile image and name */}
      <ProfilePictureContainer>
        <ProfileIcon type="profile" />
        <H4
          $color={COLORS.shrub}
          style={{
            textAlign: 'center',
            marginTop: '16px',
          }}
        >
          My Account
        </H4>
      </ProfilePictureContainer>

      {/* Information regarding user personal information */}
      <PersonalInformationContainer>
        <H4
          $color={COLORS.shrub}
          style={{
            marginBottom: '16px',
            marginTop: '24px',
          }}
        >
          Personal Information
        </H4>
        <InfoField>
          <P2 $fontWeight={400} $color={COLORS.darkgray}>
            Name
          </P2>
          <P2
            style={{
              marginBottom: '24px',
            }}
            $fontWeight={300}
            $color={COLORS.darkgray}
          >
            Kyrene Tam
          </P2>
        </InfoField>

        <InfoField>
          <P2 $fontWeight={400} $color={COLORS.darkgray}>
            Email
          </P2>
          <P2
            style={{
              marginBottom: '40px',
            }}
            $fontWeight={300}
            $color={COLORS.darkgray}
          >
            {userEmail}
          </P2>
        </InfoField>
      </PersonalInformationContainer>

      {/* Information regarding user's garden information */}
      <GardenInformationContainer>
        <H4
          $color={COLORS.shrub}
          style={{
            marginBottom: '16px',
          }}
        >
          Garden Information
        </H4>
        <InfoField>
          <P2 $fontWeight={400} $color={COLORS.darkgray}>
            Location
          </P2>
          <P2
            style={{
              marginBottom: '24px',
            }}
            $fontWeight={300}
            $color={COLORS.darkgray}
          >
            {profileData?.us_state}
          </P2>
        </InfoField>

        <InfoField>
          <P2 $fontWeight={400} $color={COLORS.darkgray}>
            Garden Type
          </P2>
          <P2
            style={{
              marginBottom: '24px',
            }}
            $fontWeight={300}
            $color={COLORS.darkgray}
          >
            {profileData?.user_type}
          </P2>
        </InfoField>

        <InfoField>
          <P2 $fontWeight={400} $color={COLORS.darkgray}>
            Plot Status
          </P2>
          <P2
            style={{
              marginBottom: '45px',
            }}
            $fontWeight={300}
            $color={COLORS.darkgray}
          >
            {
              plotOptions.find(option => option.value === profileData?.has_plot)
                ?.label
            }
          </P2>
        </InfoField>
      </GardenInformationContainer>

      {/* Log out button*/}
      <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <BigButton $secondaryColor={COLORS.errorRed} onClick={handleSignOut}>
          Log Out
        </BigButton>
      </div>
    </Flex>
  );
}
