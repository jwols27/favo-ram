import Select, { Props, components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import GenericObject from '../models/GenericObject';

interface ISelectProps {
    additionalClasses?: string;
    options: GenericObject[];
    labelField?: string;
    field?: any;
    error?: boolean;
    isFilter?: boolean;
}

const ArrowIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <FontAwesomeIcon
                className={'color-2-darker'}
                icon={faCaretDown}
                fontSize={18}
            />
        </components.DropdownIndicator>
    );
};

const FilterIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <FontAwesomeIcon
                className={'color-2-darker'}
                icon={faFilter}
                fontSize={18}
            />
        </components.DropdownIndicator>
    );
};

export const CSelect = ({
    additionalClasses = '',
    options,
    labelField = 'name',
    field,
    error,
    isFilter,
    ...props
}: ISelectProps & Props) => {
    const handleChange = (selectedOption: any) => {
        if (!field) return;
        if (props.isMulti) {
            const selectedIds = selectedOption.map(
                (option: GenericObject) => option.id,
            );
            field.onChange(selectedIds);
        } else {
            const selectedId = selectedOption ? selectedOption.id : null;
            field.onChange(selectedId);
        }
    };

    const handleValue = () => {
        if (!field) return undefined;
        if (props.isMulti)
            return options.filter((c) => field.value.includes(c.id));
        return options.find((c) => c.id === field.value);
    };

    return (
        <Select
            ref={field?.ref}
            className={`custom-select-container ${additionalClasses} ${
                error ? 'select-error' : ''
            }`}
            classNamePrefix={'custom-select'}
            components={{
                DropdownIndicator: isFilter ? FilterIndicator : ArrowIndicator,
            }}
            options={options}
            getOptionValue={(option) => (option as GenericObject).id.toString()}
            getOptionLabel={(option) => (option as GenericObject)[labelField]}
            value={handleValue()}
            onChange={handleChange}
            isClearable
            isSearchable
            unstyled
            styles={{
                noOptionsMessage: (base) => ({
                    ...base,
                    padding: '16px',
                }),
                dropdownIndicator: (base, state) => ({
                    ...base,
                    transform:
                        !isFilter && state.selectProps.menuIsOpen
                            ? 'rotate(180deg)'
                            : undefined,
                }),
            }}
            noOptionsMessage={() => `No items available`}
            {...props}
        />
    );
};
