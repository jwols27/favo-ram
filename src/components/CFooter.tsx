import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSteam,
    faGithub,
    faSpotify,
    faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { CAnchor } from './CAnchor';
import CEmoticon, { EmoticonJunoBop } from './CEmoticon';
import '../styles/footer.styles.scss';

const possibleAvatars: string[] = [
    'https://cdn.discordapp.com/avatars/172660297788686336/00e1670a8a3f1c9a34bd353ccb55928f',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121088029067587684/collei_amazed.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121088028765593630/collei_me.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121088028480393308/collei_irritated.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121086072168919100/sapo.jpg',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085766785843363/reigen.jpg',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085766181851247/ram.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085765896650883/prefeito.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085765598842910/niko-nobg.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085765313642548/nagito.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085765015830658/mobu.jpg',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085764655124560/marcy_yeah.jpg',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085764248289310/louie.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085763971449063/ling_yao_01.jpg',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085757831000235/kaede.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085757495451678/jacko.jpg',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085757231222834/burg.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085756941807719/BMO.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085756560122018/basil-nobg.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085756270727290/basilico-nobg.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085755926786218/basil_22.png',
    'https://cdn.discordapp.com/attachments/1121085199774654577/1121085755339591780/ai_poof.jpg',
];

const github: string = 'https://github.com/jwols27';
const steam: string = 'https://steamcommunity.com/profiles/76561198087058358';
const discord: string = 'https://discord.com/users/172660297788686336';
const spotify: string = 'https://open.spotify.com/user/joaopedrow';
const email: string = 'mailto:joaopedrowols@gmail.com?subject=Hello!"';

export const CFooter = () => {
    const [avatar, setAvatar] = React.useState<number>(
        Math.floor(Math.random() * possibleAvatars.length),
    );

    const handleAvatar = React.useCallback(() => {
        setAvatar(Math.floor(Math.random() * possibleAvatars.length));
    }, []);

    return (
        <footer>
            <div className={'footer-grid'}>
                <div className={'footer-grid-item item-1'}>
                    <h3>About</h3>
                    <span>
                        This website was made purely for fun. It shows my
                        favorite characters from all sorts of cartoons, shows,
                        movies, books, comics, anime, and manga.
                    </span>
                    <CEmoticon>
                        <EmoticonJunoBop />
                    </CEmoticon>
                </div>
                <div className={'footer-grid-item item-2'}>
                    <h3>Hello world!</h3>
                    <span>You can find me in any of these places:</span>
                    <div className={'socials'}>
                        <CAnchor href={github}>
                            <FontAwesomeIcon icon={faGithub} fontSize={36} />
                        </CAnchor>

                        <CAnchor href={steam}>
                            <FontAwesomeIcon icon={faSteam} fontSize={36} />
                        </CAnchor>

                        <CAnchor href={discord}>
                            <FontAwesomeIcon icon={faDiscord} fontSize={36} />
                        </CAnchor>

                        <CAnchor href={spotify}>
                            <FontAwesomeIcon icon={faSpotify} fontSize={36} />
                        </CAnchor>

                        <CAnchor
                            onClick={(event) => {
                                window.open(email, 'mail');
                                event.preventDefault();
                            }}
                        >
                            <FontAwesomeIcon icon={faEnvelope} fontSize={36} />
                        </CAnchor>
                    </div>
                </div>
                <div className={'center-box item-3'}>
                    <img
                        className={'avatar'}
                        src={possibleAvatars[avatar]}
                        alt={''}
                        onClick={handleAvatar}
                        draggable={false}
                        style={{ cursor: 'pointer' }}
                    />
                    <h5>Made by JP, aka 'Wols', for fun!</h5>
                </div>
            </div>
        </footer>
    );
};
