import React from 'react';
import { useAppSelector } from '../shared/hooks/store.hooks';

import CharacterRequest from '../shared/requests/CharacterRequest';
import '../styles/emporium.styles.scss';
import { Link } from 'react-router-dom';
import { Character, Origin } from '../models';
import { CCircularLoading, CSelect } from '../components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OriginRequest from '../shared/requests/OriginRequest.ts';
import TagRequest from '../shared/requests/TagRequest.ts';

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

    const [search, setSearch] = React.useState<string>('');
    const [selected, setSelected] = React.useState<any>();

    const loadTables = async () => {
        await CharacterRequest();
        await OriginRequest();
        await TagRequest();
    };

    React.useEffect(() => {
        loadTables().catch((e) => console.log(e));
    }, []);

    const originState = useAppSelector((state) => state.origins);
    const tagState = useAppSelector((state) => state.tags);

    const filtered: Character[] =
        search.length > 0
            ? characterState.characters.filter((char) =>
                  char.name.toLowerCase().includes(search.toLowerCase()),
              )
            : characterState.characters;

    return (
        <div id={'emporium'}>
            <div className={'emporium-container shadow-box bg-color-2-subtle'}>
                <div className={'emporium-toolbar bg-color-2-light'}>
                    <div className={'input-wrapper'}>
                        <FontAwesomeIcon
                            className={'input-icon'}
                            icon={faSearch}
                        />
                        <input
                            name={'search'}
                            className={'input-search'}
                            placeholder={'Search...'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <CSelect
                        additionalClasses={'select-color-alt'}
                        options={originState.origins}
                        objectName={'Search Origin'}
                        getOptionValue={(option) =>
                            (option as Origin).id.toString()
                        }
                        getOptionLabel={(option) => (option as Origin).name}
                        onChange={(selectedOptions) => {
                            setSelected(
                                (selectedOptions as Origin[]).map(
                                    (option: Origin) => option.id,
                                ),
                            );
                        }}
                        isMulti
                    />
                </div>
                <div className={'emporium-content '}>
                    {characterState.loading ? (
                        <div className={'center-box'}>
                            <CCircularLoading additionalClasses={'color-2'} />
                        </div>
                    ) : (
                        <div className={'emporium-grid'}>
                            <EmporiumGrid characterState={filtered} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmporiumView;
