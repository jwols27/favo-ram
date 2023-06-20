import { setLocale } from 'yup';

setLocale({
    mixed: {
        required: 'This field is required',
        oneOf: ({ values }) => `Must be one of the following values: ${values}`,
        notOneOf: ({ values }) =>
            `Cannot be one of the following values: ${values}`,
        defined: 'This field must be a defined value',
        notType: 'Invalid type',
    },
    string: {
        length: ({ length }) =>
            `Must have exactly ${length} character${length > 1 ? 's' : ''}`,
        min: ({ min }) =>
            `Must have at least ${min} character${min > 1 ? 's' : ''}`,
        max: ({ max }) =>
            `Must have at most ${max} character${max > 1 ? 's' : ''}`,
        email: 'Must be a valid e-mail',
        url: 'Must be a valid URL',
        trim: 'Must not contain spaces at the beginning or end',
        lowercase: 'Must be lowercase',
        uppercase: 'Must be uppercase',
        matches: ({ regex }) => `The value must match the pattern: ${regex}`,
        uuid: 'Must match a valid UUID',
    },
    number: {
        min: ({ min }) => `Must be at least ${min}`,
        max: ({ max }) => `Must be at most ${max}`,
        lessThan: ({ less }) => `Must be less than ${less}`,
        moreThan: ({ more }) => `Must be greater than ${more}`,
        positive: 'Must be a positive number',
        negative: 'Must be a negative number',
        integer: 'Must be an integer',
    },
    date: {
        min: ({ min }) => `Must be from ${min} onwards`,
        max: ({ max }) => `Must be up to the date ${max}`,
    },
    array: {
        min: ({ min }) =>
            `Must have at least ${min} ${min > 1 ? 'items' : 'item'}`,
        max: ({ max }) =>
            `Must have at most ${max} ${max > 1 ? 'items' : 'item'}`,
        length: ({ length }) =>
            `Must contain exactly ${length} ${length > 1 ? 'items' : 'item'}`,
    },
    object: {
        noUnknown: 'Must be a defined value',
    },
});
