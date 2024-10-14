import type { UUID } from 'crypto';

export type Season = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER';

export interface Plant {
  id: UUID;
  plant_name: string;
  state: string;
  harvest_season: Season;
  water_num_times_per_week: number;
  plant_seed_indoors_start: string;
  plant_seed_indoors_end: string;
  plant_seed_outdoors_start: string;
  plant_seed_outdoors_end: string;
  plant_transplant_start: string;
  plant_transplant_end: string;
  harvest_start: string;
  harvest_end: string;
  water_inches_per_week: number;
  harvest_days_after_plant: number;
  sunlight_required: string;
  beginner_friendly: boolean;
  plant_tips: string;
  img: string;
}
