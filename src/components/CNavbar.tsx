import { NavLink } from 'react-router-dom';
import { Group, Home, Label, PersonPinCircle } from '@mui/icons-material';

interface INavbarProps {}
export const CNavbar = ({}: INavbarProps) => {
    return (
        <div className={'navbar'}>
            <NavLink to={''}>
                <Home />
                <span>Home</span>
            </NavLink>

            <NavLink to={'characters'}>
                <Group />
                <span>Characters</span>
            </NavLink>
            <NavLink to={'origins'}>
                <PersonPinCircle />
                <span>Origins</span>
            </NavLink>
            <NavLink to={'tags'}>
                <Label />
                <span>Tags</span>
            </NavLink>
        </div>
    );
};
