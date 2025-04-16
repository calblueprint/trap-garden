import type { UUID } from 'crypto';

export type SunlightEnum = 'SHADE' | 'PARTIAL_SHADE' | 'PARTIAL_SUN' | 'FULL';

export type SeasonEnum = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER';

export type DifficultyLevelEnum = 'EASY' | 'MODERATE' | 'HARD';

export type PlantingTypeEnum = 'INDOORS' | 'OUTDOORS' | 'TRANSPLANT';

export type UserTypeEnum = 'INDIV' | 'SCHOOL' | 'ORG';

export interface Profile {
  user_id: UUID;
  us_state: string;
  user_type: string;
  has_plot: boolean;
}

export interface Plant {
  id: UUID;
  plant_name: string;
  us_state: string;
  harvest_season: SeasonEnum;
  water_frequency: string;
  weeding_frequency: string;
  indoors_start: string;
  indoors_end: string;
  outdoors_start: string;
  outdoors_end: string;
  transplant_start: string;
  transplant_end: string;
  harvest_start: string;
  harvest_end: string;
  beginner_friendly: boolean;
  plant_tips: string;
  img: string;
  difficulty_level: DifficultyLevelEnum;
  sunlight_min_hours: int;
  sunlight_max_hours: int;
}

export interface UserPlant {
  id: UUID;
  user_id: UUID;
  plant_id: UUID;
  date_added: string;
  date_removed: string;
  recent_harvest: string;
  num_harvested: number;
  planting_type: PlantingTypeEnum;
  user_notes: string;
  water_frequency: string;
  weeding_frequency: string;
  last_watered: string;
  last_weeded: string;
  plant_name: string;
  date_added_to_db: string;
  previous_last_watered: string;
  previous_last_weeded: string;
  due_date: string;
}

export interface DropdownOption<T = string> {
  label: string;
  value: T;
}
export interface OwnedPlant {
  userPlantId: UUID;
  plant: Plant;
}

export interface ConfirmAlertProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface InputProps {
  initialValue?: string;
}

export interface PlantTip {
  id: UUID;
  category: TipCategory;
  body_text: string;
}

export type TipCategory =
  | 'Helpful Flowers for Your Garden'
  | 'Water Management'
  | 'Mulching'
  | 'Harvesting'
  | 'Planting'
  | 'Weeding';
