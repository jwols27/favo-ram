import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTags } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../shared/hooks/store.hooks';
import CharacterRequest from '../shared/requests/CharacterRequest';
import OriginRequest from '../shared/requests/OriginRequest.ts';
import TagRequest from '../shared/requests/TagRequest.ts';
import { Character, Origin, Tag } from '../models';
import { CCircularLoading, CResolutionImage, CSelect } from '../components';
import '../styles/emporium.styles.scss';

interface EmporiumContentProps {
    characters: Character[];
}

const EmporiumGrid = ({ characters }: EmporiumContentProps) => {
    return characters.map((char) => {
        return (
            <div className={'emporium-grid-item'} key={char.id}>
                <Link
                    to={`/characters/${char.id}`}
                    className={'character-card'}
                    draggable={false}
                >
                    <div className={'character-card-image'}>
                        <CResolutionImage src={char.image} alt={char.name} />
                        <div className={'blur'} />
                    </div>

                    <div className={'character-card-info'}>
                        <div>
                            <span className={'character-card-name'}>
                                {char.name}
                            </span>
                            <span className={'character-card-origin'}>
                                {char.origin.name}
                            </span>
                        </div>
                        <img src={char.origin.image} alt={''} />
                    </div>
                </Link>
            </div>
        );
    });
};

const EmporiumView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Emporium';

        const loadTables = async () => {
            await CharacterRequest();
            await OriginRequest();
            await TagRequest();
        };

        loadTables().catch((e) => console.log(e));
    }, []);

    const characterState = useAppSelector((state) => state.characters);
    const originState = useAppSelector((state) => state.origins);
    const tagState = useAppSelector((state) => state.tags);

    const [name, setName] = React.useState<string>('');
    const [tagName, setTagName] = React.useState<string>('');
    const [origins, setOrigins] = React.useState<number[]>([]);
    const [tags, setTags] = React.useState<number[]>([]);

    const RenderContent = React.useMemo(() => {
        let filtered = characterState.characters;

        if (name.length > 0) {
            filtered = characterState.characters.filter((char) =>
                char.name.toLowerCase().includes(name.toLowerCase()),
            );
        }

        if (origins.length > 0) {
            filtered = filtered.filter((char) =>
                origins.includes(char.origin.id),
            );
        }

        if (tags.length > 0) {
            filtered = filtered.filter((char) => {
                if (!char.tags) char.tags = [];
                const arr: readonly (Tag | number)[] = char.tags;

                if (arr.every((e) => typeof e === 'number')) {
                    return tags.every((tag) => arr.includes(tag));
                }
                return false;
            });
        }

        if (filtered.length > 0) {
            return (
                <div className={'emporium-grid'}>
                    <EmporiumGrid characters={filtered} />
                </div>
            );
        } else {
            return (
                <span className={'center-box'} style={{ height: '100%' }}>
                    No characters found! Consider refreshing your browser or
                    changing your filters.
                </span>
            );
        }
    }, [characterState.characters, name, tags, origins]);

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const tagId = Number(value);

        if (checked) {
            if (!tags.includes(tagId)) {
                setTags((prevTags) => [...prevTags, tagId]);
            }
        } else {
            setTags((prevTags) => prevTags.filter((tag) => tag !== tagId));
        }
    };

    const RenderTags = React.useMemo(() => {
        const filtered =
            tagName.length > 0
                ? tagState.tags.filter((tag) =>
                      tag.name.toLowerCase().includes(tagName.toLowerCase()),
                  )
                : tagState.tags;
        return filtered.map((tag) => (
            <label className={'checkbox'} key={tag.id}>
                <input
                    type={'checkbox'}
                    value={tag.id}
                    onChange={handleCheckbox}
                />
                <span>{tag.name}</span>
            </label>
        ));
    }, [tagState.tags, tagName]);

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
                            className={'input-control search'}
                            placeholder={'Search...'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <CSelect
                        additionalClasses={'select-color-alt'}
                        options={originState.origins}
                        placeholder={'Filter Origins'}
                        getOptionValue={(option) =>
                            (option as Origin).id.toString()
                        }
                        getOptionLabel={(option) => (option as Origin).name}
                        onChange={(selectedOptions) => {
                            setOrigins(
                                (selectedOptions as Origin[]).map(
                                    (option: Origin) => option.id,
                                ),
                            );
                        }}
                        isMulti
                        isFilter
                    />
                </div>
                <div className={`emporium-content`}>
                    {characterState.loading ? (
                        <div className={'center-box'}>
                            <CCircularLoading additionalClasses={'color-2'} />
                        </div>
                    ) : (
                        RenderContent
                    )}
                    <div className={'emporium-sidebar'}>
                        <h4>Tags</h4>
                        <div className={'input-wrapper'}>
                            <FontAwesomeIcon
                                className={'input-icon'}
                                icon={faTags}
                            />
                            <input
                                name={'search'}
                                className={'input-control search'}
                                placeholder={'Search tags...'}
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                            />
                        </div>

                        <div className={'emporium-tags'}>{RenderTags}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmporiumView;
