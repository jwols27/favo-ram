import { object, ObjectSchema, string } from 'yup';

export type Tag = {
    id: number;
    name: string;
    desc?: string;
};

export const TagSchema: ObjectSchema<Omit<Tag, 'id'>> = object({
    name: string().min(3).required(),
    desc: string(),
});
