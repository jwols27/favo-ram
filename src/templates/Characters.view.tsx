import React from 'react';
import { useParams } from 'react-router-dom';

import { CharacterService } from '../shared/services/CharacterService';
import { Character } from '../models';
import { CCircularLoading } from '../components';
import '../styles/character.scss';

const CharactersView = () => {
    const { id } = useParams<'id'>();
    const [character, setCharacter] = React.useState<Character>();
    React.useEffect(() => {
        if (!id) return;
        CharacterService.getById(+id).then((res) => {
            if (res instanceof Error) return console.log(res.message);
            setCharacter(res);
        });
    }, []);

    if (!character)
        return (
            <div className={'center-box'} style={{ flex: 1 }}>
                <CCircularLoading additionalClasses={'color-1'} />
            </div>
        );

    return (
        <div id={'character'}>
            <div
                className={'character-bg'}
                style={{ backgroundImage: `url(${character.origin.image})` }}
            />
            <div className={'shadow-box bg-color-3'}>
                <h3>{character.name}</h3>
                <img height={400} src={character.image} alt={character.name} />
                <br />
                <span>{character.desc}</span>
                <br />
                <span>{character.origin.name}</span>
                <br />
                <div>
                    {character.tags?.map((tag) => (
                        <div
                            className={'tag'}
                            key={typeof tag === 'number' ? tag : tag.id}
                        >
                            <div className={'tag-label'}>
                                {typeof tag === 'number' ? tag : tag.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CharactersView;
