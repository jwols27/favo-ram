import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Character } from '../models';
import { CTable } from '../components';
import { useAppSelector } from '../shared/hooks/store.hooks';
import CharacterRequest from '../shared/requests/CharacterRequest';
import OriginRequest from '../shared/requests/OriginRequest';
import { Draw } from '@mui/icons-material';

const header: string[] = ['ID', 'Name', 'Description', 'Image'];
const columns: string[] = ['id', 'name', 'desc', 'image'];

const CharactersView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Characters';
    }, []);

    const characterState = useAppSelector((state) => state.characters);
    const originState = useAppSelector((state) => state.origins);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Omit<Character, 'id'>>();
    const onSubmit: SubmitHandler<Omit<Character, 'id'>> = (data) => {
        console.log(data);
    };

    const loadList = () => {
        CharacterRequest();
    };

    React.useEffect(() => {
        loadList();
        OriginRequest();
    }, []);

    return (
        <div id={'character-crud'}>
            <div className={'grid-crud-container'}>
                <div className={'center-box'}>
                    <CTable
                        tableName={'Characters'}
                        headerTitles={header}
                        columnFields={columns}
                        objects={characterState.characters}
                    />
                </div>
                <div className={'center-box responsive-align'}>
                    <div className={'crud-title'}>
                        <h3 className={'color-2-dark crud-title'}>
                            Create a character
                        </h3>
                        <Draw />
                    </div>
                    <form
                        className={'crud-form'}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            placeholder={'Name'}
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span>This field is required</span>}

                        <textarea
                            cols={16}
                            placeholder={'Description'}
                            {...register('desc')}
                        />

                        <select
                            defaultValue={''}
                            {...register('origin', { required: true })}
                        >
                            <option
                                value=""
                                disabled
                                style={{ display: 'none' }}
                            >
                                Origin
                            </option>
                            {originState.origins.map((origin) => (
                                <option key={origin.id} value={origin.id}>
                                    {origin.name}
                                </option>
                            ))}
                        </select>
                        {errors.origin && <span>This field is required</span>}

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

export default CharactersView;
