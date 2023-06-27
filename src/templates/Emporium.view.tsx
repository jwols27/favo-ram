import React from 'react';
import { useAppSelector } from '../shared/hooks/store.hooks';

import CharacterRequest from '../shared/requests/CharacterRequest';
import OriginRequest from '../shared/requests/OriginRequest';
import TagRequest from '../shared/requests/TagRequest';
import '../styles/emporium.styles.scss';

const EmporiumView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Emporium';
    }, []);

    const characterState = useAppSelector(
        (state) => state.characters.characters,
    );
    const refreshTables = () => {
        CharacterRequest();
        OriginRequest();
        TagRequest();
        console.log(characterState);
    };

    React.useEffect(() => refreshTables(), []);

    // const originState = useAppSelector((state) => state.origins.origins);
    // const tagState = useAppSelector((state) => state.tags.tags);

    return (
        <div id={'emporium'}>
            {characterState.map((char) => {
                const img = new Image();
                img.src = char.image as string;

                return (
                    <div className={'emporium-grid-item'} key={char.id}>
                        <div className={'character-card'}>
                            <div className={'character-card-image'}>
                                <img
                                    className={
                                        img.width / img.height < 0.9
                                            ? 'tall'
                                            : 'wide'
                                    }
                                    src={char.image}
                                    alt={char.name}
                                />
                                <div className={'blur'} />
                            </div>

                            <div className={'character-card-info'}>
                                <div>
                                    <span
                                        className={'character-card-info-name'}
                                    >
                                        {char.name}
                                    </span>
                                    {typeof char.origin !== 'number' && (
                                        <span
                                            className={
                                                'character-card-info-origin-name'
                                            }
                                        >
                                            {char.origin.name}
                                        </span>
                                    )}
                                </div>
                                {typeof char.origin !== 'number' && (
                                    <img
                                        className={
                                            'character-card-info-origin-image'
                                        }
                                        src={char.origin.image}
                                        alt={''}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EmporiumView;
