import { UUID } from 'crypto';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { P1 } from '@/styles/text';
import { DropdownOption, PlantingTypeEnum, UserPlant } from '@/types/schema';
import CustomSelect from '../CustomSelect';
import DateInput from '../DateInput';
import { ReviewContainer } from './styles';

export default function ReviewAddDetails({
  details,
  updateInput,
  plantDictionary,
}: {
  details: Record<string, Partial<UserPlant>>;
  updateInput: (field: string, value: string, plant_id: UUID) => void;
  plantDictionary: Record<UUID, string>;
}) {
  const plantingTypeOptions: DropdownOption<PlantingTypeEnum>[] = [
    { value: 'TRANSPLANT', label: 'Transplant' },
    { value: 'INDOORS', label: 'Indoors' },
    { value: 'OUTDOORS', label: 'Outdoors' },
  ];

  return (
    <ReviewContainer>
      {Object.entries(details).map(([plant_id, detail]) => (
        <Flex $direction="column" $gap="8px" $mb="16px" key={plant_id}>
          <P1 $color={COLORS.shrub}>{plantDictionary[plant_id as UUID]}</P1>
          <CustomSelect
            label="Planting Type"
            value={detail.planting_type as string}
            options={plantingTypeOptions}
            onChange={value =>
              updateInput('planting_type', value, plant_id as UUID)
            }
          />
          <DateInput
            value={detail.date_added as string}
            onChange={value =>
              updateInput('date_added', value, plant_id as UUID)
            }
          />
        </Flex>
      ))}
    </ReviewContainer>
  );
}
