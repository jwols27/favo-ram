import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUserGroup,
    faUserGear,
    faLocationDot,
    faTags,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/navbar.styles.scss';

interface INavbarProps {}
export const CNavbar = ({}: INavbarProps) => {
    return (
        <div className={'navbar'}>
            <NavLink to={''} className={'navbar-link'}>
                <FontAwesomeIcon icon={faHome} fontSize={16} />
                <span>Home</span>
            </NavLink>

            <NavLink to={'emporium'} className={'navbar-link'}>
                <FontAwesomeIcon icon={faUserGroup} fontSize={16} />
                <span>Emporium</span>
            </NavLink>

            <NavLink to={'characters'} className={'navbar-link'}>
                <FontAwesomeIcon icon={faUserGear} fontSize={16} />
                <span>Characters</span>
            </NavLink>
            <NavLink to={'origins'} className={'navbar-link'}>
                <FontAwesomeIcon icon={faLocationDot} fontSize={16} />
                <span>Origins</span>
            </NavLink>
            <NavLink to={'tags'} className={'navbar-link'}>
                <FontAwesomeIcon icon={faTags} fontSize={16} />
                <span>Tags</span>
            </NavLink>
        </div>
    );
};
