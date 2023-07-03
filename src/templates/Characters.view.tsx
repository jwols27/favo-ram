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
            <div className={'character shadow-box bg-color-3'}>
                <div className={'char-info-wrapper'}>
                    <div id={'char-info'}>
                        <span id={'title'}>{character.name}</span>
                        <p id={'desc'}>{character.desc}</p>
                        <img src={character.origin.image} alt={''} />
                    </div>
                    <img
                        height={400}
                        src={character.image}
                        alt={character.name}
                    />
                </div>
                <div id={'char-tags'}>
                    {character.tags?.map((tag) => {
                        if (typeof tag === 'number') return undefined;

                        return (
                            <div className={'tag'} key={tag.id}>
                                {tag.name}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className={'background'}
                style={{ backgroundImage: `url(${character.origin.image})` }}
            />
        </div>
    );
};

export default CharactersView;
