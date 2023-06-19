import { object, ObjectSchema, string } from 'yup';

export type Origin = {
    id: number;
    name: string;
    image?: string;
};

export const OriginSchema: ObjectSchema<Omit<Origin, 'id'>> = object({
    name: string().min(3).required(),
    image: string(),
});
