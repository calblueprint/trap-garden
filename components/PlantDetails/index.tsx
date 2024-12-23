import Image from 'next/image';
import BPLogo from '@/assets/images/bp-logo.png'; // TODO: remove this

import COLORS from '@/styles/colors';
import { Box, Flex } from '@/styles/containers';
import { H3 } from '@/styles/text';
import { Plant } from '@/types/schema';
import { plantingTypeOptions } from '@/utils/dropdownOptions';
import CustomSelect from '../CustomSelect';
import DateInput from '../DateInput';

export default function PlantDetails({
  plant,
  date,
  plantingType,
  onDateChange,
  onPlantingTypeChange,
}: {
  plant: Plant;
  date: string;
  plantingType: string;
  onDateChange: (date: string) => void;
  onPlantingTypeChange: (type: string) => void;
}) {
  return (
    <>
      <Flex
        $h="186px"
        $background={COLORS.glimpse}
        $justify="center"
        $align="center"
      >
        <Image
          src={plant.img ?? BPLogo} // TODO: change the default image
          alt={`Plant Image for ${plant.plant_name}`}
          style={{ height: '120px', width: 'max-content' }}
        />
      </Flex>
      <Box $p="24px" $pb="0">
        <H3
          $color={COLORS.shrub}
          $fontWeight={500}
          style={{ marginBottom: '8px' }}
        >
          {plant.plant_name}
        </H3>
        <Flex $direction="column" $gap="24px">
          <DateInput
            label="Date Planted"
            value={date}
            onChange={onDateChange}
            placeholder="Select planting date"
          />
          <CustomSelect
            label="Planting Type"
            placeholder="Choose Planting Type"
            value={plantingType}
            options={plantingTypeOptions}
            onChange={onPlantingTypeChange}
            isContainerClickable={true}
          />
        </Flex>
      </Box>
    </>
  );
}
