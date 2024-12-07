import React from 'react';
import Select, {
  ActionMeta,
  components,
  GroupBase,
  MultiValue,
  MultiValueProps,
  OptionProps,
} from 'react-select';
import { P3 } from '@/styles/text';
import { DropdownOption } from '@/types/schema';
import { customSelectStyles, StyledOption } from './styles';

interface FilterDropdownProps<T> {
  value: DropdownOption<T>[];
  setStateAction: React.Dispatch<React.SetStateAction<DropdownOption<T>[]>>;
  options: DropdownOption<T>[];
  placeholder: string;
  disabled?: boolean;
}

export default function FilterDropdownMultiple<T>({
  value,
  setStateAction,
  options,
  placeholder,
  disabled = false,
}: FilterDropdownProps<T>) {
  const handleChange = (selectedOptions: MultiValue<DropdownOption<T>>) => {
    setStateAction(selectedOptions as DropdownOption<T>[]);
  };

  // overrides the default MultiValue to display custom text
  // displays first selected value followed by + n if more than 1 selected
  // StyledMultiValue appears for each selected option, so if more than 1 is selected,
  // the rest of the selected options are not shown, instead the + n is shown as part of the first option
  const StyledMultiValue = ({
    ...props
  }: MultiValueProps<
    DropdownOption<T>,
    true,
    GroupBase<DropdownOption<T>>
  >) => {
    const { selectProps, data } = props;
    if (Array.isArray(selectProps.value)) {
      // find index of the selected option and check if its the first
      const index = selectProps.value.findIndex(
        (option: DropdownOption<T>) => option.value === data.value,
      );
      const isFirst = index === 0;
      // find number of remaining selected options
      const additionalCount = selectProps.value.length - 1;

      return (
        <P3>
          {/* display label of first selected option */}
          {isFirst ? (
            <>
              {data.label}
              {/* display additional count only if more than one option is selected*/}
              {additionalCount > 0 && ` +${additionalCount}`}
            </>
          ) : // don't display anything if not the first selected option
          null}
        </P3>
      );
    }

    // nothing is selected yet
    return null;
  };

  // overrides the default Options to display a checkbox that ticks when option selected
  const CustomOption = (
    props: OptionProps<DropdownOption<T>, true, GroupBase<DropdownOption<T>>>,
  ) => {
    return (
      <components.Option {...props}>
        <StyledOption>
          <input
            type="checkbox"
            checked={props.isSelected}
            style={{ marginRight: 8 }} // spacing between checkbox and text
          />
          {props.label}
        </StyledOption>
      </components.Option>
    );
  };

  return (
    <Select
      options={options}
      isMulti
      value={value}
      isDisabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
      closeMenuOnSelect={false}
      styles={customSelectStyles<T>()}
      isSearchable={false}
      hideSelectedOptions={false}
      // can bring this back if we want an 'x' to clear filters for each dropdown
      isClearable={false}
      // use custom styled components instead of default components
      components={{ MultiValue: StyledMultiValue, Option: CustomOption }}
    />
  );
}
