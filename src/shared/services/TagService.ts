import { api } from './api';
import { Tag } from '../../models';

const route = 'tags';

const getAll = async () => {
    const defaultError = 'Something went wrong when trying to get all tags.';

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
    const defaultError = 'Something went wrong when trying to get this tag.';

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

const getCharactersByTag = async (id: number) => {
    const defaultError =
        'Something went wrong when trying to get the characters related to this tag.';

    try {
        const { data } = await api.get(`${route}/${id}/characters`);

        if (!data) return new Error(defaultError);

        return data;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message: string }).message || defaultError,
        );
    }
};

const create = async (body: Omit<Tag, 'id'>) => {
    const defaultError =
        'Something went wrong when trying to create a new tag.';

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

const updateById = async (id: number, body: Partial<Tag>) => {
    const defaultError = 'Something went wrong when trying to update this tag.';

    try {
        const { data } = await api.patch(`${route}/${id}`, body);

        if (!data) return new Error(defaultError);

        return data;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message: string }).message || defaultError,
        );
    }
};

const deleteById = async (id: number) => {
    const defaultError = 'Something went wrong when trying to delete this tag.';

    try {
        const { data } = await api.delete(`${route}/${id}`);

        if (!data) return new Error(defaultError);

        return data;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message: string }).message || defaultError,
        );
    }
};

export const TagService = {
    getAll,
    getById,
    getCharactersByTag,
    create,
    updateById,
    deleteById,
};
