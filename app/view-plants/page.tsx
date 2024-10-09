import PlantCard from '@/components/PlantCard/PlantCard';
import { Plant } from '@/types/schema';

export default function Home() {
  const plant: Plant = {
    id: '3067b896-ba05-45b0-bb5c-e09277cf1e68',
    plant_name: 'tomato',
    state: 'tennessee',
    harvest_season: 'SPRING',
    water_num_times_per_week: 7,
    plant_seed_indoors_start: 'January',
    plant_seed_indoors_end: 'February',
    plant_seed_outdoors_start: 'March',
    plant_seed_outdoors_end: 'April',
    plant_transplant_start: 'April',
    plant_transplant_end: 'May',
    harvest_start: 'April',
    harvest_end: 'May',
    water_inches_per_week: 7,
    harvest_days_after_plant: 5,
    sunlight_required: 'Yes',
    beginner_friendly: true,
    plant_tips: 'aerg',
  };
  return <PlantCard {...plant}></PlantCard>;
}
