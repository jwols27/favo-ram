import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

import { Tag, TagSchema } from '../models';

import { useAppSelector } from '../shared/hooks/store.hooks';
import { useYupValidationResolver } from '../shared/hooks/validation.hooks';
import { TagService } from '../shared/services/TagService';
import TagRequest from '../shared/requests/TagRequest';

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
        width: '175px',
    },
    {
        header: 'Description',
        field: 'desc',
    },
];

const TagsView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Tags';
    }, []);

    const tagState = useAppSelector((state) => state.tags.tags);

    const resolver = useYupValidationResolver(TagSchema);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver, mode: 'onSubmit' });

    const refreshTables = TagRequest;

    const onSubmit: SubmitHandler<Omit<Tag, 'id'>> = async (data) => {
        console.log(data);
        await TagService.create(data);
        refreshTables();
    };

    React.useEffect(() => {
        refreshTables();
    }, []);

    const nameError = errors.name;

    return (
        <div id={'tag-crud'}>
            <div className={'grid-crud-container'}>
                <div className={'center-box'}>
                    <CTable
                        tableName={'Tags'}
                        settings={settings}
                        objects={tagState}
                    />
                </div>
                <div className={'center-box responsive-align'}>
                    <div className={'crud-title color-2-dark'}>
                        <h3>Create a tag</h3>
                        <FontAwesomeIcon icon={faPaintBrush} fontSize={24} />
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

                        <textarea
                            cols={16}
                            placeholder={'Description'}
                            {...register('desc')}
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TagsView;
