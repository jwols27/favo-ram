import { Character } from './Character';

export type Tag = Omit<Character, 'image'> & {};
