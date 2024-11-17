import { SmallRoundedButton } from '@/components/Button';
import DifficultyLevelBar from '@/components/DifficultyLevelBar';
import GardeningTips from '@/components/GardeningTips';
import PlantCareDescription from '@/components/PlantCareDescription';
import YourPlantDetails from '@/components/YourPlantDetails';

export default function Home() {
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
        plantTips="1. Use a trellis for vertical growth. 2. Stake or cage to support growth. 3. Water deeply but infrequently."
      ></GardeningTips>
      <SmallRoundedButton secondaryColor="green"></SmallRoundedButton>
      <YourPlantDetails
        datePlanted="01/01/2024"
        plantingType="INDOORS"
        recentHarvestDate="01/05/2024"
      ></YourPlantDetails>
    </div>
  );
}
