import { Plant } from '@/types/schema';

export default function PlantDetails({ plant }: { plant: Plant }) {
  function getDate() {
    const curr = new Date();
    curr.setDate(curr.getDate());
    return curr.toISOString().substring(0, 10);
  }
  return (
    <div>
      <h2>{plant.plant_name}</h2>

      <label htmlFor="date">Date Planted:</label>
      <input id="date" type="date" defaultValue={getDate()} />

      <label htmlFor="plantingType">Planting type:</label>
      <select id="plantingType">
        <option value={'TRANSPLANT'}>Transplant</option>
        <option value="INDOORS">Indoors</option>
        <option value="OUTDOORS">Outdoors</option>
      </select>
    </div>
  );
}
