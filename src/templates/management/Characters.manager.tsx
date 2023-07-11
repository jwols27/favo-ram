import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useAppSelector, useYupValidationResolver } from '../../shared/hooks';
import { Character, CharacterSchema } from '../../models';
import {
    CCircularLoading,
    ColumnSettings,
    CSelect,
    CTableManager,
} from '../../components';
import { CharacterService } from '../../shared/services/CharacterService';
import CharacterRequest from '../../shared/requests/CharacterRequest';
import OriginRequest from '../../shared/requests/OriginRequest';
import TagRequest from '../../shared/requests/TagRequest';
import {
    pushCharacter,
    removeCharacterById,
    setCharacterById,
} from '../../shared/stores/character.slice';

const settings: ColumnSettings[] = [
    {
        header: '',
        field: 'image',
        width: '74px',
        className: 'table-avatar',
    },
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

const CharactersManager = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Characters';
    }, []);

    const refreshTables = async () => {
        await CharacterRequest();
        await OriginRequest();
        await TagRequest();
    };

    React.useEffect(() => {
        refreshTables().catch((e) => console.log(e));
    }, []);

    const [editID, setEditID] = React.useState<number | undefined>();

    const characterState = useAppSelector((state) => state.characters);
    const originState = useAppSelector((state) => state.origins);
    const tagState = useAppSelector((state) => state.tags);
    const dispatch = useDispatch();

    const resolver = useYupValidationResolver(CharacterSchema);
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver, mode: 'onSubmit' });

    const clearForm = () => {
        setEditID(undefined);
        setValue('name', null);
        setValue('desc', null);
        setValue('image', null);
        setValue('origin', null);
        setValue('tags', []);
    };

    const onSubmit: SubmitHandler<Omit<Character, 'id'>> = async (data) => {
        let res;

        if (editID) {
            res = await CharacterService.updateById(editID, data);
            if (res instanceof Error) return console.log(res.message);
            dispatch(setCharacterById(res));
        } else {
            res = await CharacterService.create(data);
            if (res instanceof Error) return console.log(res.message);
            dispatch(pushCharacter(res));
        }

        console.log(res);
        clearForm();
    };

    const onEdit = async (id: number) => {
        setEditID(id);
        const res = await CharacterService.getById(id);
        if (res instanceof Error) return console.log(res.message);

        const character: Character = res;

        console.log(character);

        setValue('name', character.name);
        setValue('desc', character.desc);
        setValue('image', character.image);
        setValue('origin', character.origin.id);
        setValue(
            'tags',
            character.tags?.map((tag) =>
                typeof tag === 'number' ? tag : tag.id,
            ),
        );
    };

    const onDelete = async (id: number) => {
        const res = await CharacterService.deleteById(id);
        if (res instanceof Error) return console.log(res.message);
        console.log(res);
        dispatch(removeCharacterById(id));
    };

    if (characterState.loading || originState.loading || tagState.loading) {
        return (
            <div id={'character-crud'}>
                <CCircularLoading additionalClasses={'color-1'} />
            </div>
        );
    }

    return (
        <div id={'character-crud'}>
            <CTableManager
                editOrCreate={'a character'}
                table={{
                    tableName: 'characters',
                    caption: 'Characters',
                    settings,
                    objects: characterState.characters,
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
                    <span className={'crud-error-message'}>
                        {errors.name.message.toString()}
                    </span>
                )}

                <textarea
                    cols={16}
                    placeholder={'Description'}
                    {...register('desc')}
                />

                <Controller
                    control={control}
                    name="origin"
                    render={({ field }) => (
                        <CSelect
                            options={originState.origins}
                            placeholder={'Origins'}
                            field={field}
                            error={!!errors.origin}
                        />
                    )}
                />
                {errors.origin?.message && (
                    <span className={'crud-error-message'}>
                        {errors.origin.message.toString()}
                    </span>
                )}

                <input
                    placeholder={'Image URL'}
                    type={'url'}
                    {...register('image')}
                />

                <Controller
                    control={control}
                    defaultValue={[]}
                    name="tags"
                    render={({ field }) => (
                        <CSelect
                            options={tagState.tags}
                            placeholder={'Tags'}
                            field={field}
                            isMulti
                        />
                    )}
                />
            </CTableManager>
        </div>
    );
};

export default CharactersManager;
