import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Character } from '../models';
import { CTable } from '../components';
import { useAppSelector } from '../shared/hooks/store.hooks';
import CharacterRequest from '../shared/requests/CharacterRequest';
import OriginRequest from '../shared/requests/OriginRequest';

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
        <div className={'grid-crud-container'}>
            <div className={'center-box'}>
                <button onClick={loadList}>Teste</button>
                <CTable
                    headerTitles={header}
                    columnFields={columns}
                    objects={characterState.characters}
                />
            </div>
            <div className={'center-box'}>
                <form className={'crud-form'} onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="test" {...register('name')} />

                    <input {...register('desc', { required: true })} />
                    {errors.desc && <span>This field is required</span>}

                    <select {...register('origin')}>
                        {originState.origins.map((origin) => (
                            <option value={origin.id}>{origin.name}</option>
                        ))}
                    </select>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CharactersView;
