import React from 'react';

import './App.css';
import { CNavbar } from './components';

interface IAppProps {
    children: React.ReactNode;
}

const App = ({ children }: IAppProps) => {
    const path = location.pathname.split('/')[1];

    React.useEffect(() => window.scrollTo(0, 0), [path]);

    return (
        <div>
            <CNavbar />
            {children}
        </div>
    );
};

export default App;
