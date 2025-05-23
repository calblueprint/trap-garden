import React from 'react';
import Select, {
  components,
  GroupBase,
  MultiValue,
  MultiValueProps,
  OptionProps,
} from 'react-select';
import { DropdownOption } from '@/types/schema';
import { customSelectStyles, ResponsiveP3 } from './styles';

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
  // CustomMultiValue appears for each selected option, so if more than 1 is selected,
  // the rest of the selected options are not shown, instead the + n is shown as part of the first option
  const CustomMultiValue = ({
    ...props
  }: MultiValueProps<
    DropdownOption<T>,
    true,
    GroupBase<DropdownOption<T>>
  >) => {
    const { selectProps, data, index } = props;
    if (Array.isArray(selectProps.value)) {
      const isFirst = index === 0;
      // find number of remaining selected options
      const additionalCount = selectProps.value.length - 1;

      return (
        <ResponsiveP3 $fontWeight={400}>
          {/* display label of first selected option */}
          {isFirst ? (
            <>
              {data.label}
              {/* display additional count only if more than one option is selected*/}
              {additionalCount > 0 && ` +${additionalCount}`}
            </>
          ) : // don't display anything if not the first selected option
          null}
        </ResponsiveP3>
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
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null} //no-op
          style={{ marginRight: 8 }} // spacing between checkbox and text
        />
        {props.label}
      </components.Option>
    );
  };

  return (
    <div style={{ padding: '1px' }}>
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
        // use custom styled components instead of default components
        components={{ MultiValue: CustomMultiValue, Option: CustomOption }}
        menuPosition="fixed"
        instanceId="dropdown-multiple"
      />
    </div>
  );
}
