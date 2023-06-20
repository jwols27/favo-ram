import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSteam,
    faGithub,
    faSpotify,
    faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { CAnchor } from './CAnchor';
import '../styles/footer.styles.css';

const possibleAvatars: string[] = [
    'https://cdn.discordapp.com/avatars/172660297788686336/00e1670a8a3f1c9a34bd353ccb55928f',
];

const github: string = 'https://github.com/jwols27';
const steam: string = 'https://steamcommunity.com/profiles/76561198087058358';
const discord: string = 'https://discord.com/users/172660297788686336';
const spotify: string = 'https://open.spotify.com/user/joaopedrow';
const email: string = 'mailto:joaopedrowols@gmail.com?subject=Hello!"';

export const CFooter = () => {
    const avatar =
        possibleAvatars[Math.floor(Math.random() * possibleAvatars.length)];

    return (
        <footer>
            <div className={'footer-grid'}>
                <div className={'footer-grid-item item-1'}>
                    <h3>About</h3>
                    <p>
                        This website was made purely for fun. It shows my
                        favorite characters from all sorts of cartoons, shows,
                        movies, books, comics, anime, and manga.
                    </p>
                </div>
                <div className={'footer-grid-item item-2'}>
                    <h3>Hello world!</h3>
                    <p>You can find me in any of these places:</p>
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
                    <img className={'avatar'} src={avatar} alt={''} />
                    <h5>Made by JP, aka 'Wols', for fun!</h5>
                </div>
            </div>
        </footer>
    );
};
