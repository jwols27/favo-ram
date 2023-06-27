import React from 'react';
import { useParams } from 'react-router-dom';
import { Character } from '../models';
import { CharacterService } from '../shared/services/CharacterService';

const CharactersView = () => {
    const { id } = useParams<'id'>();
    const [character, setCharacter] = React.useState<Character>();
    React.useEffect(() => {
        if (!id) return;
        CharacterService.getById(+id).then((res) => {
            if (res instanceof Error) return console.log(res.message);
            setCharacter(res);
            console.log(res);
        });
    }, []);
    return (
        <div>
            {character &&
                Object.values(character).map((value, index) => {
                    if (typeof value === 'object') {
                        return undefined;
                    }
                    return <p key={index}>{value}</p>;
                })}
        </div>
    );
};

export default CharactersView;
