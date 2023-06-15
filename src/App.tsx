import React from 'react';

import './App.css';
import { CNavbar, CFooter } from './components';

interface IAppProps {
    children: React.ReactNode;
}

const App = ({ children }: IAppProps) => {
    const path = location.pathname.split('/')[1];

    React.useEffect(() => window.scrollTo(0, 0), [path]);

    return (
        <div>
            <CNavbar />
            <div id={'content'}> {children} </div>
            <CFooter />
        </div>
    );
};

export default App;
