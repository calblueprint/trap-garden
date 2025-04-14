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
import { BackButton } from '../(plant-page)/style';
import {
  BluePencilIcon,
  GardenInformationContainer,
  InfoField,
  PersonalInformationContainer,
  ProfilePictureContainer,
  StyledCancelButton,
  StyledEditCancelContainer,
  StyledInput,
  StyledP2,
  StyledSaveButton,
} from './styles';

export default function MyAccount() {
  const { userEmail, signOut, userId, loading, userName, updateUser } =
    useAuth();

  const { profileData, profileReady, setProfile } = useProfile();

  const [inEditMode, setInEditMode] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  );
  const [selectedGardenType, setSelectedGardenType] = useState<
    UserTypeEnum | undefined
  >(undefined);
  const [selectedPlot, setSelectedPlot] = useState<boolean | undefined>(
    undefined,
  );
  const [newUserName, setNewUserName] = useState<string | undefined>(undefined);

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
    if (!inEditMode) {
      setSelectedLocation(profileData?.us_state || '');
      setSelectedGardenType(
        (profileData?.user_type as UserTypeEnum) || undefined,
      );
      setSelectedPlot(
        profileData?.has_plot !== undefined ? profileData?.has_plot : false,
      );
    }
    setInEditMode(!inEditMode);
  };

  const handleSave = async () => {
    const editedProfileInfo = {
      user_id: userId!,
      us_state: selectedLocation!,
      user_type: selectedGardenType!,
      has_plot: selectedPlot!,
    };
    try {
      await setProfile(editedProfileInfo);
      await updateUser(newUserName!);
      setInEditMode(false);
    } catch (error) {
      console.error('Error saving profile edits:', error);
    }
  };
  const handleCancel = () => {
    setInEditMode(!inEditMode);
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
            {/* Left-aligned Back Button */}
            <BackButton onClick={() => router.back()}>
              <Icon type="backArrow" />
            </BackButton>

            {/* Right-aligned Edit/Save & Cancel Buttons */}
            <Flex $align="center" $gap="8px" $justify="end" $pr="1.5rem">
              {!inEditMode ? (
                // Show Edit + Pencil when NOT in edit mode
                <StyledEditCancelContainer onClick={handleEditMode}>
                  <StyledP2 $fontWeight={300} $color={COLORS.blueLink}>
                    Edit
                  </StyledP2>

                  <BluePencilIcon type="pencil" />
                </StyledEditCancelContainer>
              ) : (
                // Show Save + Cancel when in edit mode
                <>
                  <StyledSaveButton onClick={handleSave}>
                    <P2 $fontWeight={300} $color={COLORS.shrub} $align="center">
                      Save
                    </P2>
                  </StyledSaveButton>
                  <StyledCancelButton onClick={handleCancel}>
                    <P2
                      $fontWeight={300}
                      $color={COLORS.errorRed}
                      $align="center"
                    >
                      Cancel
                    </P2>
                  </StyledCancelButton>
                </>
              )}
            </Flex>
          </Flex>

          <ProfileIcon type="profile" />
          <H4
            $color={COLORS.shrub}
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
            }}
          >
            {userName ?? 'My Account'}
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

            {inEditMode ? (
              <StyledInput
                type="text"
                value={newUserName ?? userName ?? 'Your Account'}
                onChange={e => setNewUserName(e.target.value)}
                placeholder="Enter name"
              />
            ) : (
              <P2
                style={{
                  marginBottom: '1.5rem',
                }}
                $fontWeight={300}
                $color={COLORS.darkgray}
              >
                {userName ?? 'Your Account'}
              </P2>
            )}
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
                {inEditMode ? (
                  <Flex
                    style={{
                      marginBottom: '1.5rem',
                    }}
                  >
                    <CustomSelect
                      value={
                        selectedLocation ??
                        (profileData ? profileData.us_state : '')
                      }
                      options={usStateOptions}
                      onChange={setSelectedLocation}
                      border={false}
                    />
                  </Flex>
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
                  <Flex
                    style={{
                      marginBottom: '1.5rem',
                    }}
                  >
                    <CustomSelect
                      value={
                        selectedGardenType ??
                        (profileData
                          ? (profileData.user_type as UserTypeEnum)
                          : undefined)
                      }
                      options={gardenTypeOptions}
                      onChange={setSelectedGardenType}
                      border={false}
                    />
                  </Flex>
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
                  <Flex
                    style={{
                      marginBottom: '1.5rem',
                    }}
                  >
                    <CustomSelect
                      value={selectedPlot ?? profileData?.has_plot ?? false}
                      options={plotOptions}
                      onChange={value => {
                        setSelectedPlot(value);
                      }}
                      border={false}
                    />
                  </Flex>
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
