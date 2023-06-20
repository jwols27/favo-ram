import Select from 'react-select';
import GenericObject from '../models/GenericObject';

interface ISelectProps {
    options: GenericObject[];
    labelField?: string;
    objectName: string;
    field: any;
    multi?: boolean;
    error?: boolean;
}

export const CSelect = ({
    options,
    labelField = 'name',
    objectName,
    field,
    multi,
    error,
}: ISelectProps) => {
    const handleChange = (selectedOption: any) => {
        if (multi) {
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
        if (multi) return options.filter((c) => field.value.includes(c.id));
        return options.find((c) => c.id === field.value);
    };

    return (
        <Select
            className={`custom-select-container ${error ? 'select-error' : ''}`}
            classNamePrefix={'custom-select'}
            placeholder={`${objectName}s`}
            ref={field.ref}
            getOptionValue={(option) => option.id.toString()}
            getOptionLabel={(option) => option[labelField]}
            value={handleValue()}
            onChange={handleChange}
            options={options}
            isMulti={multi}
            unstyled
            styles={{
                noOptionsMessage: (provided) => ({
                    ...provided,
                    padding: '16px',
                }),
            }}
            noOptionsMessage={() => `No ${objectName.toLowerCase()}s available`}
        />
    );
};
