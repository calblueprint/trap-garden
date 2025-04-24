'use client';

import { useState } from 'react';
import { UUID } from 'crypto';
import { updateDateAndCompletedThroughPlantAndUserIdAndType } from '@/api/supabase/queries/tasks';
import {
  increaseHarvestedByOne,
  setRecentHarvestDateThroughId,
  updateUserPlantDetails,
} from '@/api/supabase/queries/userPlants';
import { IconType } from '@/lib/icons';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P3 } from '@/styles/text';
import { PlantingTypeEnum } from '@/types/schema';
import { plantingTypeOptions } from '@/utils/dropdownOptions';
import { formatTimestamp, toTitleCase } from '@/utils/helpers';
import { SmallButton } from '../Buttons';
import CustomSelect from '../CustomSelect';
import DateInput from '../DateInput';
import Icon from '../Icon';
import {
  Container,
  EditPlantLabel,
  HarvestButton,
  Header,
  PlantDetailsText,
} from './style';

function DetailRow(iconType: IconType, text: string) {
  return (
    <Flex $align="center" $gap="8px">
      <Icon type={iconType} />
      <P3 $fontWeight={400}>{text}</P3>
    </Flex>
  );
}

export default function YourPlantDetails({
  datePlanted,
  plantingType,
  recentHarvestDate,
  id,
  onHarvest,
  plant_id,
  user_id,
}: {
  datePlanted: string;
  plantingType: PlantingTypeEnum;
  recentHarvestDate: string | null;
  id: UUID;
  onHarvest: () => void;
  plant_id: UUID;
  user_id: UUID;
}) {
  // Local state to track the most recent harvest date.
  const [localRecentHarvestDate, setLocalRecentHarvestDate] = useState<
    string | null
  >(recentHarvestDate);

  async function harvestPlant() {
    await increaseHarvestedByOne(id);
    const currentDate = new Date();
    await setRecentHarvestDateThroughId(currentDate.toISOString(), id);
    await updateDateAndCompletedThroughPlantAndUserIdAndType(
      plant_id,
      user_id,
      'harvest',
      currentDate,
      false,
      true,
    ); //can always do true bc dashboard will correct if its not
    setLocalRecentHarvestDate(currentDate.toISOString());
    onHarvest();
  }

  // Initialize state with the passed-in props
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localDatePlanted, setLocalDatePlanted] = useState<string>(datePlanted);
  const [localPlantingType, setLocalPlantingType] =
    useState<string>(plantingType);
  const [yourPlantedDate, setYourPlantedDate] = useState<string>(datePlanted);
  const [yourPlantingType, setYourPlantingType] =
    useState<PlantingTypeEnum>(plantingType);

  function EditDateRow(iconType: IconType, currentDate: string) {
    return (
      <Flex $align="center" $gap="8px">
        <Icon type={iconType} />
        <EditPlantLabel>Date Planted: </EditPlantLabel>
        <DateInput
          value={currentDate}
          onChange={date => setYourPlantedDate(date)}
          placeholder="Select planting date"
        />
      </Flex>
    );
  }

  function EditPlantTypeRow(iconType: IconType, currentType: string) {
    return (
      <Flex $align="center" $gap="8px">
        <Icon type={iconType} />
        <EditPlantLabel>Planting Type: </EditPlantLabel>
        <CustomSelect
          placeholder="Choose Planting Type"
          value={currentType}
          options={plantingTypeOptions}
          onChange={newType => setYourPlantingType(newType as PlantingTypeEnum)}
          isContainerClickable={true}
        />
      </Flex>
    );
  }
  function handleCancel() {
    setIsEditing(false);
  }

  async function handleUpdateUserPlantDetails() {
    try {
      await updateUserPlantDetails(id, yourPlantedDate, yourPlantingType);
      // After saving, exit edit mode.
      setIsEditing(false);
      setLocalDatePlanted(yourPlantedDate);
      setLocalPlantingType(yourPlantingType);
    } catch (error) {
      console.error('Error updating plant details', error);
    }
  }

  return (
    <Container>
      {isEditing ? (
        <>
          <Header>
            <PlantDetailsText>Your Plant Details</PlantDetailsText>
            <Flex $gap="4px" $justify="end">
              <SmallButton
                onClick={handleCancel}
                $secondaryColor={COLORS.errorRed}
              >
                Cancel
              </SmallButton>
              <SmallButton
                onClick={handleUpdateUserPlantDetails}
                $secondaryColor={COLORS.shrub}
              >
                Save
              </SmallButton>
            </Flex>
          </Header>
          <Flex $direction="column" $gap="8px">
            {EditDateRow('calendar', yourPlantedDate)}
            {EditPlantTypeRow('plantHand', yourPlantingType)}
            {localRecentHarvestDate
              ? DetailRow(
                  'plant',
                  `Most Recent Harvest Date: ${formatTimestamp(localRecentHarvestDate)}`,
                )
              : DetailRow(
                  'plant',
                  `Most Recent Harvest Date: Not harvested yet`,
                )}
          </Flex>
        </>
      ) : (
        <>
          <Header>
            <PlantDetailsText>Your Plant Details</PlantDetailsText>
            <SmallButton
              onClick={() => setIsEditing(true)}
              $secondaryColor={COLORS.shrub}
            >
              Edit
            </SmallButton>
          </Header>
          <Flex $direction="column" $gap="8px" $align="center">
            {DetailRow(
              'calendar',
              `Date Planted: ${formatTimestamp(localDatePlanted)}`,
            )}
            {DetailRow(
              'plantHand',
              `Planting Type: ${toTitleCase(localPlantingType)}`,
            )}
            {localRecentHarvestDate
              ? DetailRow(
                  'plant',
                  `Most Recent Harvest Date: ${formatTimestamp(localRecentHarvestDate)}`,
                )
              : DetailRow(
                  'plant',
                  `Most Recent Harvest Date: Not harvested yet`,
                )}
            <HarvestButton onClick={harvestPlant}>Harvest</HarvestButton>
          </Flex>
        </>
      )}
    </Container>
  );
}
