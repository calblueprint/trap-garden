import type { UUID } from 'crypto';

export type SeasonEnum = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER';

export type DifficultyLevelEnum = 'EASY' | 'MODERATE' | 'HARD';

export interface Plant {
  id: UUID;
  plant_name: string;
  us_state: string;
  harvest_season: SeasonEnum;
  water_frequency: string;
  weeding_frequency: string;
  plant_seed_indoors_start: string;
  plant_seed_indoors_end: string;
  plant_seed_outdoors_start: string;
  plant_seed_outdoors_end: string;
  plant_transplant_start: string;
  plant_transplant_end: string;
  harvest_start: string;
  harvest_end: string;
  beginner_friendly: boolean;
  plant_tips: string;
  img: string;
  difficulty_level: DifficultyLevelEnum;
  sunlight_min_hours: int;
  sunlight_max_hours: int;
}

export interface UserPlants {
  id: UUID;
  user_id: UUID;
  plant_id: UUID;
  date_added: string;
  date_harvested: string;
  planting_type: string;
}
