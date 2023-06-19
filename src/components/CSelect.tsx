import Select from 'react-select';
import GenericObject from '../models/GenericObject';

interface ISelectProps {
    options: GenericObject[];
    labelField?: string;
    objectName: string;
    field: any;
    multi?: boolean;
}

export const CSelect = ({
    options,
    labelField = 'name',
    objectName,
    field,
    multi,
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

    return (
        <Select
            className={'custom-select-container'}
            classNamePrefix={'custom-select'}
            placeholder={`${objectName}s`}
            ref={field.ref}
            getOptionValue={(option) => option.id.toString()}
            getOptionLabel={(option) => option[labelField]}
            value={
                multi
                    ? options.filter((c) => field.value.includes(c.id))
                    : options.find((c) => c.id === field.value)
            }
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
