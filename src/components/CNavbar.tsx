import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUserGroup,
    faUserGear,
    faLocationDot,
    faTags,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

import { store } from '../shared/stores/store.ts';
import '../styles/navbar.styles.scss';

export const CNavbar = () => {
    const location = useLocation();
    const loggedIn = store.getState().user.loggedIn;
    return (
        <>
            <NavLink to={''} className={'nav-link'} draggable={false}>
                <FontAwesomeIcon icon={faHome} fontSize={16} />
                <span>Home</span>
            </NavLink>

            <NavLink to={'emporium'} className={'nav-link'} draggable={false}>
                <FontAwesomeIcon icon={faUserGroup} fontSize={16} />
                <span>Emporium</span>
            </NavLink>

            {loggedIn ? (
                <>
                    <NavLink
                        to={'characters/manage'}
                        className={'nav-link'}
                        draggable={false}
                    >
                        <FontAwesomeIcon icon={faUserGear} fontSize={16} />
                        <span>Characters</span>
                    </NavLink>
                    <NavLink
                        to={'origins/manage'}
                        className={'nav-link'}
                        draggable={false}
                    >
                        <FontAwesomeIcon icon={faLocationDot} fontSize={16} />
                        <span>Origins</span>
                    </NavLink>
                    <NavLink
                        to={'tags/manage'}
                        className={'nav-link'}
                        draggable={false}
                    >
                        <FontAwesomeIcon icon={faTags} fontSize={16} />
                        <span>Tags</span>
                    </NavLink>
                </>
            ) : (
                <NavLink
                    to={'login'}
                    className={'nav-link'}
                    draggable={false}
                    onClick={() =>
                        localStorage.setItem('lastVisited', location.pathname)
                    }
                >
                    <FontAwesomeIcon icon={faRightToBracket} fontSize={18} />
                    <span>Login</span>
                </NavLink>
            )}
        </>
    );
};
