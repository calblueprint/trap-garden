'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton } from '@/components/Buttons';
import { ProfileIcon } from '@/components/NavColumn/styles';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H4, P1, P2, P3 } from '@/styles/text';
import { UserTypeEnum } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import { plotOptions } from '@/utils/dropdownOptions';
import { toTitleCase, userTypeLabels } from '@/utils/helpers';
import { useProfile } from '@/utils/ProfileProvider';
import { BackButton } from '../plant-page/style';
import {
  GardenInformationContainer,
  InfoField,
  PersonalInformationContainer,
  ProfilePictureContainer,
} from './styles';

export default function MyAccount() {
  const { userEmail, signOut, userId, loading } = useAuth();

  const { profileData, profileReady } = useProfile();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push(CONFIG.login);
  };

  useEffect(() => {
    if (!loading && !userEmail) {
      router.push(CONFIG.login);
    }
  }, [userEmail, loading, router]);

  return (
    <Flex $direction="column">
      {/* User profile image and name */}
      <ProfilePictureContainer>
        <div
          style={{
            display: 'flex',
            paddingLeft: '1.5rem',
            width: '100%',
          }}
        >
          <BackButton
            onClick={() => {
              router.back();
            }}
          >
            ←
          </BackButton>
        </div>

        <ProfileIcon type="profile" />
        <H4
          $color={COLORS.shrub}
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
          }}
        >
          My Account
        </H4>
      </ProfilePictureContainer>

      {/* Information regarding user personal information */}
      <PersonalInformationContainer>
        <P1
          $color={COLORS.shrub}
          style={{
            marginBottom: '1rem',
            marginTop: '1.5rem',
          }}
        >
          Personal Information
        </P1>
        <InfoField>
          <P2 $fontWeight={400} $color={COLORS.darkgray}>
            Name
          </P2>
          <P2
            style={{
              marginBottom: '1.5rem',
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
              marginBottom: '2.5rem',
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
        <P1
          $color={COLORS.shrub}
          style={{
            marginBottom: '1rem',
          }}
        >
          Garden Information
        </P1>

        {/* Displays onboarding button if user profile is not ready */}
        {profileReady && !profileData ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <BigButton
              $primaryColor={COLORS.shrub}
              onClick={() => router.push('/onboarding')}
              style={{
                width: '100%',
              }}
            >
              Go To Onboarding
            </BigButton>

            <P3
              $fontWeight={300}
              $color={COLORS.errorRed}
              style={{
                marginTop: '0.6875rem',
                textAlign: 'center',
              }}
            >
              Profile Information Incomplete
            </P3>
          </div>
        ) : (
          <>
            {/* Displays garden information if user profile is ready */}
            <InfoField>
              <P2 $fontWeight={400} $color={COLORS.darkgray}>
                Location
              </P2>
              <P2
                style={{
                  marginBottom: '1.5rem',
                }}
                $fontWeight={300}
                $color={COLORS.darkgray}
              >
                {userId && profileReady && toTitleCase(profileData!.us_state)}
              </P2>
            </InfoField>

            <InfoField>
              <P2 $fontWeight={400} $color={COLORS.darkgray}>
                Garden Type
              </P2>
              <P2
                style={{
                  marginBottom: '1.5rem',
                }}
                $fontWeight={300}
                $color={COLORS.darkgray}
              >
                {profileReady &&
                  userTypeLabels[profileData?.user_type as UserTypeEnum]}
              </P2>
            </InfoField>

            <InfoField>
              <P2 $fontWeight={400} $color={COLORS.darkgray}>
                Plot Status
              </P2>
              <P2 $fontWeight={300} $color={COLORS.darkgray}>
                {
                  plotOptions.find(
                    option => option.value === profileData?.has_plot,
                  )?.label
                }
              </P2>
            </InfoField>
          </>
        )}
      </GardenInformationContainer>

      {/* Log out button*/}
      <div
        style={{
          padding: '0 1.5rem',
        }}
      >
        <BigButton
          $secondaryColor={COLORS.errorRed}
          onClick={handleSignOut}
          style={{
            marginTop: profileReady && !profileData ? '9.0625rem' : '45px',
          }}
        >
          Log Out
        </BigButton>
      </div>
    </Flex>
  );
}
