import { Origin } from './Origin';
import { Tag } from './Tag';

export type Character = {
    id: number;
    name: string;
    desc?: string;
    image?: string;
    origin?: string | Origin;
    tags?: Tag[];
};
