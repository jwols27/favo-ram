import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Draw } from '@mui/icons-material';

import { Origin, OriginSchema } from '../models';

import { useAppSelector } from '../shared/hooks/store.hooks';
import { useYupValidationResolver } from '../shared/hooks/validation.hooks';
import OriginRequest from '../shared/requests/OriginRequest';
import { OriginService } from '../shared/services/OriginService';

import { ColumnSettings, CTable } from '../components';

const settings: ColumnSettings[] = [
    {
        header: 'id',
        field: 'id',
        width: '50px',
    },
    {
        header: 'Name',
        field: 'name',
    },
    {
        header: 'Image',
        field: 'image',
        width: '74px',
    },
];

const OriginsView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Origins';
    }, []);

    const originState = useAppSelector((state) => state.origins.origins);

    const resolver = useYupValidationResolver(OriginSchema);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver, mode: 'onSubmit' });

    const refreshTables = OriginRequest;

    const onSubmit: SubmitHandler<Omit<Origin, 'id'>> = async (data) => {
        console.log(data);
        await OriginService.create(data);
        refreshTables();
    };

    React.useEffect(() => {
        refreshTables();
    }, []);

    const nameError = errors.name;

    return (
        <div id={'origin-crud'}>
            <div className={'grid-crud-container'}>
                <div className={'center-box'}>
                    <CTable
                        tableName={'Origins'}
                        settings={settings}
                        objects={originState}
                    />
                </div>
                <div className={'center-box responsive-align'}>
                    <div className={'crud-title color-2-dark'}>
                        <h3>Create an origin</h3>
                        <Draw />
                    </div>
                    <form
                        className={'crud-form'}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            className={nameError && 'crud-error'}
                            placeholder={'Name'}
                            {...register('name')}
                        />
                        {nameError?.message && (
                            <span>{nameError.message.toString()}</span>
                        )}

                        <input
                            placeholder={'Image URL'}
                            type={'url'}
                            {...register('image')}
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OriginsView;
