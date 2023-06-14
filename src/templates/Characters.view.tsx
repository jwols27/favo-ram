import React from 'react';
import { Character } from '../models';
import { CharacterService } from '../shared/services/CharacterService';

const CharactersView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Characters';
    }, []);

    const [characterList, setCharacterList] = React.useState<Character[]>([]);
    const loadList = () => {
        CharacterService.getAll().then((res) => {
            if (res instanceof Error) return console.log(res.message);
            console.log(res);
            setCharacterList(res);
        });
    };

    React.useEffect(loadList, []);

    return (
        <div className={'center-box'}>
            <button onClick={loadList}>Teste</button>
            <table className={'my-table'}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>desc</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {characterList.map((character) => (
                        <tr key={character.id}>
                            <th>{character.id}</th>
                            <th>{character.name}</th>
                            <th>{character.desc}</th>
                            <th>
                                <div className={'table-image'}>
                                    <img
                                        src={character.image}
                                        alt={character.name}
                                    />
                                </div>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CharactersView;
