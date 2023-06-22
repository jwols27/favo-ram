import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
    pushOrigin,
    removeOriginById,
    setOriginById,
} from '../shared/stores/origin.slice';
import { useAppSelector } from '../shared/hooks/store.hooks';
import { useYupValidationResolver } from '../shared/hooks/validation.hooks';
import OriginRequest from '../shared/requests/OriginRequest';
import { OriginService } from '../shared/services/OriginService';
import { ColumnSettings, CTableManager } from '../components';
import { Origin, OriginSchema } from '../models';

const settings: ColumnSettings[] = [
    {
        header: 'id',
        field: 'id',
        width: '50px',
    },
    {
        header: '',
        field: 'image',
        width: '74px',
    },
    {
        header: 'Name',
        field: 'name',
    },
];

const OriginsView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Origins';
    }, []);

    const refreshTables = OriginRequest;

    React.useEffect(() => {
        refreshTables();
    }, []);

    const [editID, setEditID] = React.useState<number | undefined>();

    const originState = useAppSelector((state) => state.origins.origins);
    const dispatch = useDispatch();

    const resolver = useYupValidationResolver(OriginSchema);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver, mode: 'onSubmit' });

    const clearForm = () => {
        setEditID(undefined);
        setValue('name', null);
        setValue('image', null);
    };

    const onSubmit: SubmitHandler<Omit<Origin, 'id'>> = async (data) => {
        let res;

        if (editID) {
            res = await OriginService.updateById(editID, data);
            if (res instanceof Error) return console.log(res.message);
            dispatch(setOriginById(res));
        } else {
            res = await OriginService.create(data);
            if (res instanceof Error) return console.log(res.message);
            dispatch(pushOrigin(res));
        }

        console.log(res);
        clearForm();
    };

    const onEdit = async (id: number) => {
        setEditID(id);
        const res = await OriginService.getById(id);
        if (res instanceof Error) return console.log(res.message);

        const origin: Origin = res;

        console.log(origin);

        setValue('name', origin.name);
        setValue('image', origin.image);
    };

    const onDelete = async (id: number) => {
        const res = await OriginService.deleteById(id);
        if (res instanceof Error) return console.log(res.message);
        console.log(res);
        dispatch(removeOriginById(id));
    };

    return (
        <div id={'origin-crud'}>
            <CTableManager
                editOrCreate={'an origin'}
                table={{
                    tableName: 'Origins',
                    settings,
                    objects: originState,
                    deleteCallback: onDelete,
                    editCallback: onEdit,
                }}
                onSubmit={handleSubmit(onSubmit)}
                editID={editID}
                onClear={clearForm}
            >
                <input
                    className={errors.name && 'crud-error'}
                    placeholder={'Name'}
                    {...register('name')}
                />
                {errors.name?.message && (
                    <span>{errors.name.message.toString()}</span>
                )}

                <input
                    placeholder={'Image URL'}
                    type={'url'}
                    {...register('image')}
                />
            </CTableManager>
        </div>
    );
};

export default OriginsView;
