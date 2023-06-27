import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { pushTag, removeTagById, setTagById } from '../shared/stores/tag.slice';
import { useAppSelector } from '../shared/hooks/store.hooks';
import { useYupValidationResolver } from '../shared/hooks/validation.hooks';
import { TagService } from '../shared/services/TagService';
import TagRequest from '../shared/requests/TagRequest';
import { ColumnSettings, CTableManager } from '../components';
import { Tag, TagSchema } from '../models';

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

const TagsManager = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Tags';
    }, []);

    const refreshTables = TagRequest;

    React.useEffect(() => refreshTables(), []);

    const [editID, setEditID] = React.useState<number | undefined>();

    const tagState = useAppSelector((state) => state.tags.tags);
    const dispatch = useDispatch();

    const resolver = useYupValidationResolver(TagSchema);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver, mode: 'onSubmit' });

    const clearForm = () => {
        setEditID(undefined);
        setValue('name', null);
        setValue('desc', null);
    };

    const onSubmit: SubmitHandler<Omit<Tag, 'id'>> = async (data) => {
        let res;

        if (editID) {
            res = await TagService.updateById(editID, data);
            if (res instanceof Error) return console.log(res.message);
            dispatch(setTagById(res));
        } else {
            res = await TagService.create(data);
            if (res instanceof Error) return console.log(res.message);
            dispatch(pushTag(res));
        }

        console.log(res);
        clearForm();
    };

    const onEdit = async (id: number) => {
        setEditID(id);
        const res = await TagService.getById(id);
        if (res instanceof Error) return console.log(res.message);

        const tag: Tag = res;

        console.log(tag);

        setValue('name', tag.name);
        setValue('desc', tag.desc);
    };

    const onDelete = async (id: number) => {
        const res = await TagService.deleteById(id);
        if (res instanceof Error) return console.log(res.message);
        console.log(res);
        dispatch(removeTagById(id));
    };

    return (
        <div id={'tag-crud'}>
            <CTableManager
                editOrCreate={'a tag'}
                table={{
                    tableName: 'tags',
                    caption: 'Tags',
                    settings,
                    objects: tagState,
                    deleteCallback: onDelete,
                    editCallback: onEdit,
                }}
                editID={editID}
                onClear={clearForm}
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className={errors.name && 'crud-error'}
                    placeholder={'Name'}
                    {...register('name')}
                />
                {errors.name?.message && (
                    <span>{errors.name.message.toString()}</span>
                )}

                <textarea
                    cols={16}
                    placeholder={'Description'}
                    {...register('desc')}
                />
            </CTableManager>
        </div>
    );
};

export default TagsManager;
