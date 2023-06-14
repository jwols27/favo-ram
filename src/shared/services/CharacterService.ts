import { api } from './api';

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

export const CharacterService = { getAll };
