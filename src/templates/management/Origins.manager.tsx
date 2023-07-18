import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
    pushOrigin,
    removeOriginById,
    setOriginById,
} from '../../shared/stores/origin.slice';
import { useAppSelector, useYupValidationResolver } from '../../shared/hooks';
import OriginRequest from '../../shared/requests/OriginRequest';
import { OriginService } from '../../shared/services/OriginService';
import {
    CCircularLoading,
    CFormInput,
    ColumnSettings,
    CTableManager,
} from '../../components';
import { Origin, OriginSchema } from '../../models';

const settings: ColumnSettings[] = [
    {
        header: '',
        field: 'image',
        width: '74px',
    },
    {
        header: 'id',
        field: 'id',
        width: '50px',
    },
    {
        header: 'Name',
        field: 'name',
    },
];

const OriginsManager = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Origins';
    }, []);

    const refreshTables = OriginRequest;

    React.useEffect(() => {
        refreshTables().catch((e) => console.log(e));
    }, []);

    const [editID, setEditID] = React.useState<number | undefined>();

    const originState = useAppSelector((state) => state.origins);
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

    if (originState.loading) {
        return (
            <div id={'origin-crud'}>
                <CCircularLoading additionalClasses={'color-1'} />
            </div>
        );
    }

    return (
        <div id={'origin-crud'}>
            <CTableManager
                editOrCreate={'an origin'}
                table={{
                    tableName: 'origins',
                    caption: 'Origins',
                    settings,
                    objects: originState.origins,
                    deleteCallback: onDelete,
                    editCallback: onEdit,
                }}
                onSubmit={handleSubmit(onSubmit)}
                editID={editID}
                onClear={clearForm}
            >
                <CFormInput
                    register={register}
                    field={'name'}
                    placeholder={'Name'}
                    error={errors.name}
                />

                <input
                    className={'input'}
                    placeholder={'Image URL'}
                    type={'url'}
                    {...register('image')}
                />
            </CTableManager>
        </div>
    );
};

export default OriginsManager;
