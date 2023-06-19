import { Origin } from './Origin';
import { Tag } from './Tag';
import { array, number, object, string } from 'yup';

export type Character = {
    id: number;
    name: string;
    desc?: string;
    image?: string;
    origin: number | Origin;
    tags?: number[] | Tag[];
};

export const CharacterSchema = object().shape({
    name: string().min(3).required(),
    desc: string(),
    image: string(),
    origin: number().required(),
    tags: array().of(number()),
});
