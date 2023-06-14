import { Origin } from './Origin';
import { Tag } from './Tag';
import { BaseModel } from './BaseModel';

export type Character = BaseModel & {
    desc?: string;
    image?: string;
    origin?: string | Origin;
    tags?: Tag[];
};
