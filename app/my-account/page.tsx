'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BigButton } from '@/components/Buttons';
import CustomSelect from '@/components/CustomSelect';
import Icon from '@/components/Icon';
import { ProfileIcon } from '@/components/NavColumn/styles';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H4, P1, P2, P3 } from '@/styles/text';
import { UserTypeEnum } from '@/types/schema';
import { useAuth } from '@/utils/AuthProvider';
import {
  gardenTypeOptions,
  plotOptions,
  usStateOptions,
} from '@/utils/dropdownOptions';
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

  const { profileData, profileReady, setProfile } = useProfile();

  const [inEditMode, setInEditMode] = useState(false);
  const [name, setName] = useState(profileData?.name || '');
  // const [selectedLocation, setSelectedLocation] = useState(
  //   profileData?.us_state || '',
  // );
  // const [selectedGardenType, setSelectedGardenType] = useState(
  //   profileData?.user_type || '',
  // );
  // const [selectedPlot, setSelectedPlot] = useState(profileData?.has_plot || '');

  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  );
  const [selectedGardenType, setSelectedGardenType] = useState<
    UserTypeEnum | undefined
  >(undefined);
  const [selectedPlot, setSelectedPlot] = useState<boolean | undefined>(
    undefined,
  );

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

  const handleEditMode = () => {
    setInEditMode(!inEditMode);
  };

  const handleSavingEdits = async () => {
    const editedProfileInfo = {
      user_id: userId,
      us_state: selectedLocation,
      user_type: selectedGardenType,
      has_plot: selectedPlot,
      //TODO: add name here to edit name????
    };
    try {
      await setProfile(editedProfileInfo);
      setInEditMode(false);
      //router.push?tc
    } catch (error) {
      console.error('Error saving profile edits:', error);
    }
  };

  return (
    <Flex $direction="column" $minH="calc(100vh - 60px)" $justify="between">
      <div>
        {/* User profile image and name */}
        <ProfilePictureContainer>
          <Flex
            $pb="1.5rem"
            $pl="1.5rem"
            $maxH="0%"
            $align="center"
            $minW="100%"
          >
            <BackButton onClick={() => router.back()}>
              <Icon type="backArrow" />
            </BackButton>
          </Flex>

          {/* TODO: make this into text, add the pen incon, align to the right (put in flexbox with the arrow) */}
          <button onClick={handleEditMode} style={{}}>
            {!inEditMode ? 'Edit' : 'Cancel'}
          </button>

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
            {/* TODO: make name editable */}
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
            <Flex $direction="column" $align="center" $justify="center">
              <BigButton
                $primaryColor={COLORS.shrub}
                onClick={() => router.push(CONFIG.onboarding)}
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
            </Flex>
          ) : (
            <>
              {/* Displays garden information if user profile is ready */}
              <InfoField>
                <P2 $fontWeight={400} $color={COLORS.darkgray}>
                  Location
                </P2>
                {/* TODO: fix this to have the drop down arrow and the line  */}
                {inEditMode ? (
                  <CustomSelect
                    label="State Location"
                    value={selectedLocation}
                    options={usStateOptions}
                    onChange={setSelectedLocation}
                  />
                ) : (
                  <P2
                    style={{
                      marginBottom: '1.5rem',
                    }}
                    $fontWeight={300}
                    $color={COLORS.darkgray}
                  >
                    {userId &&
                      profileReady &&
                      toTitleCase(profileData!.us_state)}
                  </P2>
                )}
              </InfoField>

              <InfoField>
                <P2 $fontWeight={400} $color={COLORS.darkgray}>
                  Garden Type
                </P2>

                {/* TODO: fix this to have the drop down arrow and the line  */}
                {inEditMode ? (
                  <CustomSelect
                    label="Garden Type"
                    value={selectedGardenType}
                    options={gardenTypeOptions}
                    onChange={setSelectedGardenType}
                  />
                ) : (
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
                )}
              </InfoField>

              <InfoField>
                <P2 $fontWeight={400} $color={COLORS.darkgray}>
                  Plot Status
                </P2>

                {/* TODO: fix this to have the drop down arrow and the line  */}
                {inEditMode ? (
                  <CustomSelect
                    label="Plot Status"
                    value={selectedPlot}
                    options={plotOptions}
                    onChange={value => setSelectedPlot(value)}
                  />
                ) : (
                  <P2 $fontWeight={300} $color={COLORS.darkgray}>
                    {
                      plotOptions.find(
                        option => option.value === profileData?.has_plot,
                      )?.label
                    }
                  </P2>
                )}
              </InfoField>
            </>
          )}
        </GardenInformationContainer>
      </div>

      {/* Log out button*/}
      <div
        style={{
          padding: '0 1.5rem 3.5rem 1.5rem',
        }}
      >
        <BigButton $secondaryColor={COLORS.errorRed} onClick={handleSignOut}>
          Log Out
        </BigButton>
      </div>
    </Flex>
  );
}
