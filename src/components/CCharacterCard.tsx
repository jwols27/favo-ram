import { Link } from 'react-router-dom';

import { CResolutionImage } from './CResolutionImage.tsx';
import { Character, Origin } from '../models';

interface ICharacterCardProps {
    character: Omit<Character, 'origin'>;
    origin?: Origin;
}

export const CCharacterCard = ({ character, origin }: ICharacterCardProps) => {
    return (
        <Link
            to={`/characters/${character.id}`}
            className={'character-card'}
            draggable={false}
        >
            <div className={'character-card-image'}>
                <CResolutionImage src={character.image} alt={character.name} />
                <div className={'blur'} />
            </div>

            <div className={'character-card-info'}>
                <div>
                    <span className={'character-card-name'}>
                        {character.name}
                    </span>
                    {origin && (
                        <span className={'character-card-origin'}>
                            {origin.name}
                        </span>
                    )}
                </div>
                {origin?.image && <img src={origin.image} alt={''} />}
            </div>
        </Link>
    );
};
