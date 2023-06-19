import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Character, CharacterSchema } from '../models';
import { ColumnSettings, CTable } from '../components';
import { useAppSelector } from '../shared/hooks/store.hooks';
import CharacterRequest from '../shared/requests/CharacterRequest';
import OriginRequest from '../shared/requests/OriginRequest';
import { Draw } from '@mui/icons-material';
import TagRequest from '../shared/requests/TagRequest';
import { useYupValidationResolver } from '../shared/hooks/validation.hooks';
import { CharacterService } from '../shared/services/CharacterService';
import { CSelect } from '../components/CSelect';

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
    {
        header: 'Image',
        field: 'image',
        width: '74px',
    },
];

const CharactersView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Characters';
    }, []);

    const characterState = useAppSelector(
        (state) => state.characters.characters,
    );
    const originState = useAppSelector((state) => state.origins.origins);
    const tagState = useAppSelector((state) => state.tags.tags);

    const resolver = useYupValidationResolver(CharacterSchema);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver });
    const onSubmit: SubmitHandler<Omit<Character, 'id'>> = async (data) => {
        console.log(data);
        await CharacterService.create(data);
        refreshTables();
    };

    const refreshTables = () => {
        CharacterRequest();
        OriginRequest();
        TagRequest();
    };

    React.useEffect(() => {
        refreshTables();
    }, []);

    return (
        <div id={'character-crud'}>
            <div className={'grid-crud-container'}>
                <div className={'center-box'}>
                    <CTable
                        tableName={'Characters'}
                        settings={settings}
                        objects={characterState}
                    />
                </div>
                <div className={'center-box responsive-align'}>
                    <div className={'crud-title color-2-dark'}>
                        <h3>Create a character</h3>
                        <Draw />
                    </div>
                    <form
                        className={'crud-form'}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input placeholder={'Name'} {...register('name')} />
                        {errors.name && <span>This field is required</span>}

                        <textarea
                            cols={16}
                            placeholder={'Description'}
                            {...register('desc')}
                        />

                        <Controller
                            control={control}
                            defaultValue={originState.map((c) => c.id)}
                            name="origin"
                            render={({ field }) => (
                                <CSelect
                                    options={originState}
                                    objectName={'Origin'}
                                    field={field}
                                />
                            )}
                        />
                        {errors.origin && <span>This field is required</span>}

                        <input
                            placeholder={'Image URL'}
                            type={'url'}
                            {...register('image')}
                        />

                        <Controller
                            control={control}
                            defaultValue={tagState.map((c) => c.id)}
                            name="tags"
                            render={({ field }) => (
                                <CSelect
                                    options={tagState}
                                    objectName={'Tag'}
                                    field={field}
                                    multi
                                />
                            )}
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CharactersView;
