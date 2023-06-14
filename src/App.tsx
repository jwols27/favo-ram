import React from 'react';

import './App.css';
import { NavLink } from 'react-router-dom';

interface IAppProps {
    children: React.ReactNode;
}

const App = ({ children }: IAppProps) => {
    return (
        <div>
            <div className={'navbar'}>
                <NavLink to={''}>Home</NavLink>
                <NavLink to={'characters'}>Characters</NavLink>
                <NavLink to={'origins'}>Origins</NavLink>
                <NavLink to={'tags'}>Tags</NavLink>
            </div>
            {children}
        </div>
    );
};

export default App;
