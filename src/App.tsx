import React from 'react';
import { useLocation } from 'react-router-dom';

import './styles/app.scss';
import './styles/crud.styles.scss';
import './styles/input-wrapper.styles.scss';
import './styles/select.styles.scss';
import { CNavbar, CFooter } from './components';

interface IAppProps {
    children: React.ReactNode;
}

const App = ({ children }: IAppProps) => {
    const location = useLocation();

    React.useEffect(() => window.scrollTo(0, 0), [location]);

    return (
        <>
            <div id={'navbar'}>
                <CNavbar />
            </div>
            <div id={'content'}> {children} </div>
            <CFooter />
        </>
    );
};

export default App;
