import React from 'react';
import { useLocation } from 'react-router-dom';

import './styles/app.scss';
import './styles/crud.styles.scss';
import './styles/input-wrapper.styles.scss';
import './styles/button.styles.scss';
import './styles/select.styles.scss';
import { CNavbar, CFooter } from './components';
import { useOutsideCallback } from './shared/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface IAppProps {
    children: React.ReactNode;
}

const App = ({ children }: IAppProps) => {
    const location = useLocation();

    const ref = React.useRef(null);

    React.useEffect(() => window.scrollTo(0, 0), [location]);

    const [hamburger, setHamburger] = React.useState<boolean>(false);

    const callback = React.useCallback(() => {
        if (hamburger) setHamburger(false);
    }, [ref, hamburger]);

    useOutsideCallback({
        ref,
        callback,
    });

    return (
        <>
            <div id={'navbar'}>
                <button
                    id={'hamburger-btn'}
                    onClick={() => setHamburger(!hamburger)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div
                    id={'hamburger-nav'}
                    ref={ref}
                    className={hamburger ? 'ham-open' : ''}
                >
                    <div className={'logo-box'}>Logo</div>
                    <CNavbar />
                </div>
                <CNavbar />
            </div>

            <div id={'content'}>
                {children}

                <CFooter />
            </div>
        </>
    );
};

export default App;
