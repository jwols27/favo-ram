import { api } from './api';
import { Origin } from '../../models';

const route = 'origins';

const getAll = async () => {
    const defaultError = 'Something went wrong when trying to get all origins.';

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
    const defaultError = 'Something went wrong when trying to get this origin.';

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

const create = async (body: Omit<Origin, 'id'>) => {
    const defaultError =
        'Something went wrong when trying to create a new origin.';

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

const updateById = async (id: number, body: Partial<Origin>) => {
    const defaultError =
        'Something went wrong when trying to update this origin.';

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
    const defaultError =
        'Something went wrong when trying to delete this origin.';

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

export const OriginService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
