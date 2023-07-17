import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTags } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from '../shared/hooks';
import CharacterRequest from '../shared/requests/CharacterRequest';
import OriginRequest from '../shared/requests/OriginRequest.ts';
import TagRequest from '../shared/requests/TagRequest.ts';
import { Origin, Tag } from '../models';
import { CCharacterCard, CCircularLoading, CSelect } from '../components';
import '../styles/character-card.styles.scss';
import '../styles/emporium.styles.scss';

const EmporiumView = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getTagQuery = React.useMemo((): number[] => {
        const tags = searchParams.get('tags');
        return tags ? tags.split(',').map(Number) : [];
    }, [searchParams]);

    React.useEffect(() => {
        document.title = 'FAVO-Ram | Emporium';

        CharacterRequest().catch((e) => console.log(e));
        OriginRequest().catch((e) => console.log(e));
        TagRequest().catch((e) => console.log(e));
    }, []);

    const characterState = useAppSelector((state) => state.characters);
    const originState = useAppSelector((state) => state.origins);
    const tagState = useAppSelector((state) => state.tags);

    const [name, setName] = React.useState<string>('');
    const [tagName, setTagName] = React.useState<string>('');
    const [origins, setOrigins] = React.useState<number[]>([]);
    const [tags, setTags] = React.useState<number[]>(getTagQuery);

    React.useEffect(() => {
        if (tags.length > 0) {
            setSearchParams({ tags: tags.join(',') });
        } else {
            searchParams.delete('tags');
            setSearchParams(searchParams);
        }
    }, [tags]);

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
                <div className={'character-card-grid'}>
                    {filtered.map((char) => (
                        <CCharacterCard
                            key={char.id}
                            character={char}
                            origin={char.origin}
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <span className={'center-box-fill'}>
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
                    checked={tags.includes(tag.id)}
                />
                <span className={tag.desc && 'tooltip-bottom'}>
                    {tag.name}
                    {tag.desc && (
                        <span className={'tooltip-text'}>{tag.desc}</span>
                    )}
                </span>
            </label>
        ));
    }, [tags, tagState.tags, tagName]);

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
