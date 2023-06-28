import React from 'react';
import { useAppSelector } from '../shared/hooks/store.hooks';

import CharacterRequest from '../shared/requests/CharacterRequest';
import '../styles/emporium.styles.scss';
import { Link } from 'react-router-dom';
import { Character } from '../models';
import { CCircularLoading } from '../components';

interface EmporiumContentProps {
    characterState: Character[];
}

const EmporiumGrid = ({ characterState }: EmporiumContentProps) => {
    const content = React.useMemo(() => {
        return characterState.map((char) => {
            const img = new Image();
            img.src = char.image as string;
            const resolution = img.width / img.height;
            console.log(`${char.name}: ${resolution}`);

            return (
                <div className={'emporium-grid-item'} key={char.id}>
                    <Link
                        to={`/characters/${char.id}`}
                        className={'character-card'}
                        draggable={false}
                    >
                        <div className={'character-card-image'}>
                            <img
                                className={resolution < 0.9 ? 'tall' : 'wide'}
                                src={char.image}
                                alt={char.name}
                            />
                            <div className={'blur'} />
                        </div>

                        <div className={'character-card-info'}>
                            <div>
                                <span className={'character-card-info-name'}>
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
                    </Link>
                </div>
            );
        });
    }, [characterState]);

    return <>{content}</>;
};

const EmporiumView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Emporium';
    }, []);

    const characterState = useAppSelector((state) => state.characters);

    const loadTables = async () => {
        await CharacterRequest();
    };

    React.useEffect(() => {
        loadTables().catch((e) => console.log(e));
    }, []);

    // const originState = useAppSelector((state) => state.origins.origins);
    // const tagState = useAppSelector((state) => state.tags.tags);

    return (
        <div id={'emporium'}>
            <div className={'emporium-toolbar bg-color-2-light'}>Toolbar</div>
            <div className={'emporium-content shadow-box bg-color-2-subtle'}>
                {characterState.loading ? (
                    <CCircularLoading additionalClasses={'color-2'} />
                ) : (
                    <div className={'emporium-grid'}>
                        <EmporiumGrid
                            characterState={characterState.characters}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmporiumView;
