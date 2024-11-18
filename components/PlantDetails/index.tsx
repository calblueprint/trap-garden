import { Plant, UserPlant } from '@/types/schema';

export default function PlantDetails({
  plant,
  date,
  plantingType,
  onDateChange,
  onPlantingTypeChange,
}: {
  detail: Partial<UserPlant>;
  plant: Plant;
  date: string;
  plantingType: string;
  onDateChange: (date: string) => void;
  onPlantingTypeChange: (type: string) => void;
}) {
  return (
    <div>
      <h2>{plant.plant_name}</h2>

      <label htmlFor="date">Date Planted:</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={e => onDateChange(e.target.value)}
      />

      <label htmlFor="plantingType">Planting type:</label>
      <select
        id="plantingType"
        value={plantingType}
        onChange={e => onPlantingTypeChange(e.target.value)}
      >
        <option value="SELECT">Select option</option>
        <option value="TRANSPLANT">Transplant</option>
        <option value="INDOORS">Indoors</option>
        <option value="OUTDOORS">Outdoors</option>
      </select>
    </div>
  );
}
