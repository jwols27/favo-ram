import React from 'react';

import './App.css';
import { CharacterService } from './shared/services/CharacterService';
import { Character } from './models';

const App = () => {
    const [characterList, setCharacterList] = React.useState<Character[]>([]);
    const onButtonClick = () => {
        CharacterService.getAll().then((res) => {
            if (res instanceof Error) return console.log(res.message);
            console.log(res);
            setCharacterList(res);
        });
    };

    return (
        <div className={'center-box'}>
            <p className={'secondary'}>FAVO-Ram</p>
            <button onClick={onButtonClick}>Teste</button>
            <table className={'my-table'}>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>desc</th>
                    <th>image</th>
                </tr>
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
            </table>
        </div>
    );
};

export default App;
