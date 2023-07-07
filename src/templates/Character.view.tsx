import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { CharacterService } from '../shared/services/CharacterService';
import { Character } from '../models';
import { CCarousel, CCircularLoading, CResolutionImage } from '../components';
import '../styles/character-view.styles.scss';
import '../styles/character-card.styles.scss';
import { useResolution } from '../shared/hooks/resolution.ts';

const CharacterView = () => {
    const { char_id } = useParams<'char_id'>();
    const [character, setCharacter] = React.useState<Character>();
    const [related, setRelated] = React.useState<Character[]>([]);
    const {
        maxWidth: { small },
    } = useResolution();

    const getInfo = async () => {
        if (!char_id) return;
        console.log('oi');
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

        const relatedRes = await CharacterService.getRelated(
            id,
            origin,
            tagIds,
        );
        if (relatedRes instanceof Error) return console.log(relatedRes.message);
        setRelated(relatedRes);
    };

    React.useEffect(() => {
        getInfo().catch((e) => console.log(e));
    }, [char_id]);

    React.useEffect(() => {
        if (character?.name) document.title = `FAVO-Ram | ${character.name}`;
        else document.title = 'FAVO-Ram';
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
                        <Link to={`/origins/${character.origin.id}`}>
                            <img src={character.origin.image} alt={''} />
                        </Link>
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
            <div
                id={'related-characters'}
                className={'shadow-box bg-color-2-light'}
            >
                <span className={'shadow-box-title'}>Related characters</span>
                <CCarousel itemsOnScreen={small ? 3 : 6}>
                    {related.map((char) => (
                        <Link
                            to={`/characters/${char.id}`}
                            key={char.id}
                            className={'character-card'}
                            draggable={false}
                        >
                            <span className={'related-name'}>{char.name}</span>
                            <CResolutionImage src={char.image} />
                        </Link>
                    ))}
                </CCarousel>
            </div>
        </div>
    );
};

export default CharacterView;
