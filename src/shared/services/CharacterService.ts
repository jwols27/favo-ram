import { api } from './api';
import { Character } from '../../models';

const route = 'characters';

const getAll = async () => {
    const defaultError =
        'Something went wrong when trying to get all characters.';

    try {
        const { data } = await api.get(route);

        if (!data) return new Error(defaultError);

        return data;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message: string }).message || defaultError,
        );
    }
};

const getById = async (id: number) => {
    const defaultError =
        'Something went wrong when trying to get this character.';

    try {
        const { data } = await api.get(`${route}/${id}`);

        if (!data) return new Error(defaultError);

        return data;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message: string }).message || defaultError,
        );
    }
};

const create = async (body: Omit<Character, 'id'>) => {
    const defaultError =
        'Something went wrong when trying to create a new character.';

    try {
        const { data } = await api.post(route, body);

        if (!data) return new Error(defaultError);

        return data;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message: string }).message || defaultError,
        );
    }
};

const updateById = async (body: Omit<Character, 'id'>) => {
    const defaultError =
        'Something went wrong when trying to update this character.';

    console.log(body);
    return new Error(defaultError);
};

const deleteById = async (id: number) => {
    const defaultError =
        'Something went wrong when trying to delete this character.';

    console.log(`Character ${id} was not deleted`);
    return new Error(defaultError);
};

export const CharacterService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};