import { SmallRoundedButton } from '@/components/Button';
import DifficultyLevelBar from '@/components/DifficultyLevelBar';
import GardeningTips from '@/components/GardeningTips';
import PlantCareDescription from '@/components/PlantCareDescription';
import YourPlantDetails from '@/components/YourPlantDetails';
import { PlantingTypeEnum } from '@/types/schema';

export default function Home() {
  const userPlant = {
    id: '10327f7b-ce30-4168-8827-557fb6f5719c',
    user_id: '0802d796-ace8-480d-851b-d16293c74a21',
    plant_id: '010ae695-6cc8-4af4-919a-d15b92fdd68d',
    date_added: '2024-10-26 00:42:16+00',
    planting_type: 'TRANSPLANT',
    date_removed: '2024-10-26 00:42:28+00',
  };
  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <DifficultyLevelBar difficultyLevel="EASY"></DifficultyLevelBar>
      <DifficultyLevelBar difficultyLevel="MODERATE"></DifficultyLevelBar>
      <DifficultyLevelBar difficultyLevel="HARD"></DifficultyLevelBar>
      <PlantCareDescription
        waterFreq="1.5 - 2 inches/week"
        weedingFreq="Weekly"
        sunlightMinHours={1}
        sunlightMaxHours={2}
      ></PlantCareDescription>
      <GardeningTips
        plantName="Tomato"
        plantTips="1. Loves full sun. 
        2. Pinch off flower buds for more leaves. 
        3. Keep well-watered but not soggy."
      ></GardeningTips>
      <SmallRoundedButton secondaryColor="green"></SmallRoundedButton>
      <YourPlantDetails
        datePlanted={userPlant.date_added}
        plantingType={userPlant.planting_type as PlantingTypeEnum}
        recentHarvestDate={userPlant.date_removed}
      ></YourPlantDetails>
    </div>
  );
}
