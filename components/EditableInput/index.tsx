import { DropdownOption } from '@/types/schema';
import CustomSelect from '../CustomSelect';
import { EditContainer, Label } from './styles';

interface LabeledCustomSelectProps<T> {
  label: string;
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
}
const LabeledCustomSelect = <T extends string | number | boolean>({
  label,
  value,
  options,
  onChange,
}: LabeledCustomSelectProps<T>) => {
  return (
    <EditContainer>
      <Label>{label}</Label>
      <CustomSelect value={value} options={options} onChange={onChange} />
    </EditContainer>
  );
};

export default LabeledCustomSelect;
