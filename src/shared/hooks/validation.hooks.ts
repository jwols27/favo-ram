import { useCallback } from 'react';
import { ObjectSchema, ValidationError } from 'yup';

type ValidationResult = {
    values: any;
    errors: Record<string, { type: string; message: string }>;
};

export const useYupValidationResolver = (
    validationSchema: ObjectSchema<any>,
): ((data: any) => Promise<ValidationResult>) =>
    useCallback(
        async (data) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            } catch (errors: any) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors: any, currentError: ValidationError) => ({
                            ...allErrors,
                            [currentError.path as string]: {
                                type: currentError.type ?? 'validation',
                                message: currentError.message,
                            },
                        }),
                        {},
                    ),
                };
            }
        },
        [validationSchema],
    );
