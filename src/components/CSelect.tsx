import Select, { Props } from 'react-select';

import GenericObject from '../models/GenericObject';

interface ISelectProps {
    additionalClasses?: string;
    options: GenericObject[];
    labelField?: string;
    objectName: string;
    field?: any;
    error?: boolean;
}

export const CSelect = ({
    additionalClasses = '',
    options,
    labelField = 'name',
    objectName,
    field,
    error,
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
            placeholder={`${objectName}s`}
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
                    transform: state.selectProps.menuIsOpen
                        ? 'rotate(180deg)'
                        : undefined,
                }),
            }}
            noOptionsMessage={() => `No ${objectName.toLowerCase()}s available`}
            {...props}
        />
    );
};
