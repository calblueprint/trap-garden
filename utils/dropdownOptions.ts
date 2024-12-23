import {
  DropdownOption,
  PlantingTypeEnum,
  SeasonEnum,
  UserTypeEnum,
} from '@/types/schema';
import { plantingTypeLabels, userTypeLabels } from '@/utils/helpers';

// Turn plantingTypeLabels into dropdown options
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

// ONBOARDING QUESTIONS
// Turn userTypeLabels into dropdown options
export const gardenTypeOptions: DropdownOption<UserTypeEnum>[] = Object.entries(
  userTypeLabels,
).map(([key, label]) => ({
  value: key as UserTypeEnum,
  label,
}));

export const plotOptions: DropdownOption<boolean>[] = [
  { label: 'Yes, I own a plot', value: true },
  { label: "No, I don't own a plot", value: false },
];
