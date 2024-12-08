import { Plant } from '@/types/schema';
import CustomSelect from '../CustomSelect';
import DateInput from '../DateInput';

export default function PlantDetails({
  plant,
  date,
  plantingType,
  onDateChange,
  onPlantingTypeChange,
}: {
  plant: Plant;
  date: string;
  plantingType: string;
  onDateChange: (date: string) => void;
  onPlantingTypeChange: (type: string) => void;
}) {
  const plantingTypeOptions = [
    { value: 'SELECT', label: 'Select option' },
    { value: 'TRANSPLANT', label: 'Transplant' },
    { value: 'INDOORS', label: 'Indoors' },
    { value: 'OUTDOORS', label: 'Outdoors' },
  ];

  return (
    <div>
      <h2>{plant.plant_name}</h2>

      <label htmlFor="date">Date Planted:</label>
      {/* <input
        id="date"
        type="date"
        value={date}
        onChange={e => onDateChange(e.target.value)}
      /> */}
      <DateInput
        value={date}
        onChange={onDateChange}
        label="Select planting date"
      />

      <label htmlFor="plantingType">Planting type:</label>

      <CustomSelect
        value={plantingType}
        options={plantingTypeOptions}
        onChange={onPlantingTypeChange}
        label="Select option"
      />
    </div>
  );
}
