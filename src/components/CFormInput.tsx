import {
    FieldError,
    FieldErrorsImpl,
    Merge,
    UseFormRegister,
} from 'react-hook-form';

interface IFormInputProps {
    register: UseFormRegister<any>;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    field: string;
    placeholder?: string;
}

export const CFormInput = ({
    register,
    error,
    field,
    placeholder,
}: IFormInputProps) => {
    return (
        <div className={'form-input'}>
            <input
                className={`input${error ? ' form-error' : ''}`}
                placeholder={placeholder}
                {...register(field)}
            />
            {error?.message && (
                <span className={'form-error-message'}>
                    {error.message.toString()}
                </span>
            )}
        </div>
    );
};
