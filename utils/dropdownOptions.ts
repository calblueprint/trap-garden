import { DropdownOption, PlantingTypeEnum, SeasonEnum } from '@/types/schema';
import { plantingTypeLabels } from '@/utils/helpers';

export const plantingTypeOptions: DropdownOption<PlantingTypeEnum>[] =
  Object.entries(plantingTypeLabels).map(([key, label]) => ({
    value: key as PlantingTypeEnum,
    label,
  }));

export const seasonOptions: DropdownOption<SeasonEnum>[] = [
  { label: 'Spring', value: 'SPRING' },
  { label: 'Summer', value: 'SUMMER' },
  { label: 'Fall', value: 'FALL' },
  { label: 'Winter', value: 'WINTER' },
];

export const usStateOptions: DropdownOption[] = [
  { label: 'Tennessee', value: 'TENNESSEE' },
  { label: 'Missouri', value: 'MISSOURI' },
];
