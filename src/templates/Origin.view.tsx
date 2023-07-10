import React from 'react';
import { useParams } from 'react-router-dom';

import { Character, Origin } from '../models';
import { OriginService } from '../shared/services/OriginService.ts';
import { CCharacterCard, CCircularLoading } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/character-card.styles.scss';
import '../styles/origin-view.styles.scss';

type TEnhancedOrigin = Origin & {
    characters: Character[];
};

const OriginView = () => {
    const { origin_id } = useParams<'origin_id'>();
    const [origin, setOrigin] = React.useState<TEnhancedOrigin>();
    const [filter, setFilter] = React.useState<string>('');

    React.useEffect(() => {
        if (origin?.name) document.title = `FAVO-Ram | ${origin.name}`;
        else document.title = 'FAVO-Ram';
    }, [origin]);

    const getInfo = async () => {
        if (!origin_id) return;
        const originRes = await OriginService.getById(+origin_id);
        if (originRes instanceof Error) return console.log(originRes.message);
        setOrigin(originRes);
    };

    React.useEffect(() => {
        getInfo().catch((e) => console.log(e));
    }, [origin_id]);

    const RenderInfoSize = React.useMemo((): string => {
        if (!origin) return '';
        const len = origin.characters.length;
        if (len === 1) {
            return '01 character';
        } else {
            return `${len < 10 && '0'}${len} characters`;
        }
    }, [origin?.characters.length]);

    const RenderContent = React.useMemo(() => {
        if (!origin?.characters) return;

        const filtered =
            filter.length > 0
                ? origin.characters.filter((char) =>
                      char.name.toLowerCase().includes(filter.toLowerCase()),
                  )
                : origin.characters;

        return filtered.map((char) => (
            <CCharacterCard key={char.id} character={char} />
        ));
    }, [filter, origin?.characters]);

    if (!origin)
        return (
            <div className={'center-box'} style={{ flex: 1 }}>
                <CCircularLoading additionalClasses={'color-1'} />
            </div>
        );

    return (
        <div id={'origin'}>
            <div className={'origin-container shadow-box bg-color-2-light'}>
                <div className={'character-card-grid'}>{RenderContent}</div>
                <div className={'origin-info shadow-box bg-color-3'}>
                    <img
                        className={'shadow-box bg-color-3'}
                        src={origin.image}
                        alt={''}
                    />
                    <span className={'origin-info-name'}>{origin.name}</span>
                    <span className={'origin-info-size'}>{RenderInfoSize}</span>

                    <div className={'input-wrapper'}>
                        <FontAwesomeIcon
                            className={'input-icon'}
                            icon={faSearch}
                        />
                        <input
                            name={'search'}
                            className={'input-control search'}
                            placeholder={'Search characters...'}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OriginView;
