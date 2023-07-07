import React from 'react';
import { useParams } from 'react-router-dom';
import { Character, Origin } from '../models';
import { OriginService } from '../shared/services/OriginService.ts';
import { CCircularLoading } from '../components';

type TEnhancedOrigin = Origin & {
    characters: Character[];
};

const OriginView = () => {
    const { origin_id } = useParams<'origin_id'>();
    const [origin, setOrigin] = React.useState<TEnhancedOrigin>();

    React.useEffect(() => {
        if (origin?.name) document.title = `FAVO-Ram | ${origin.name}`;
        else document.title = 'FAVO-Ram';
    }, [origin]);

    const getInfo = async () => {
        if (!origin_id) return;
        const originRes = await OriginService.getById(+origin_id);
        if (originRes instanceof Error) return console.log(originRes.message);
        setOrigin(originRes);
        console.log(originRes);
    };

    React.useEffect(() => {
        getInfo().catch((e) => console.log(e));
    }, [origin_id]);

    if (!origin)
        return (
            <div className={'center-box'} style={{ flex: 1 }}>
                <CCircularLoading additionalClasses={'color-1'} />
            </div>
        );

    return (
        <div id={'origin'}>
            <div className={'shadow-box bg-color-3'}>
                <div className={'origin-info'}>{origin.name}</div>
                <div className={'origin-characters'}>
                    {origin.characters.map((char) => char.name)}
                </div>
            </div>
        </div>
    );
};

export default OriginView;
