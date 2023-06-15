import { NavLink } from 'react-router-dom';
import { Group, Home, Label, PersonPinCircle } from '@mui/icons-material';

import '../styles/navbar.styles.css';

interface INavbarProps {}
export const CNavbar = ({}: INavbarProps) => {
    return (
        <div className={'navbar'}>
            <NavLink to={''} className={'navbar-link'}>
                <Home />
                <span>Home</span>
            </NavLink>

            <NavLink to={'characters'} className={'navbar-link'}>
                <Group />
                <span>Characters</span>
            </NavLink>
            <NavLink to={'origins'} className={'navbar-link'}>
                <PersonPinCircle />
                <span>Origins</span>
            </NavLink>
            <NavLink to={'tags'} className={'navbar-link'}>
                <Label />
                <span>Tags</span>
            </NavLink>
        </div>
    );
};
