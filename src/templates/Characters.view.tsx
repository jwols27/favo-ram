import React from 'react';
import { useParams } from 'react-router-dom';

import { CharacterService } from '../shared/services/CharacterService';
import { Character } from '../models';
import { CCircularLoading } from '../components';
import '../styles/character.scss';

const CharactersView = () => {
    const { char_id } = useParams<'char_id'>();
    const [character, setCharacter] = React.useState<Character>();

    const getInfo = async () => {
        if (!char_id) return;
        const charRes = await CharacterService.getById(+char_id);
        if (charRes instanceof Error) return console.log(charRes.message);
        setCharacter(charRes);

        const {
            id,
            tags,
            origin: { id: origin },
        } = charRes as Character;

        const tagIds = tags?.map((tag) =>
            typeof tag === 'number' ? tag : tag.id,
        );

        const related = await CharacterService.getRelated(id, origin, tagIds);
        if (related instanceof Error) return console.log(related.message);
        console.log(related);
    };

    React.useEffect(() => {
        getInfo().catch((e) => console.log(e));
    }, []);

    React.useEffect(() => {
        document.title = `FAVO-Ram ${
            character?.name ? `| ${character?.name}` : ''
        }`;
    }, [character]);

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
                    <img src={character.image} alt={character.name} />
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
            <div id={'related-characters'} className={'shadow-box bg-color-3'}>
                <span className={'shadow-box-title'}>Related characters</span>
            </div>
        </div>
    );
};

export default CharactersView;
