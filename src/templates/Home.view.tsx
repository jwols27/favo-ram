import React from 'react';
import { Home } from '@mui/icons-material';

const HomeView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram';
    }, []);

    return (
        <div className={'center-box'}>
            <p className={'secondary'}>FAVO-Ram</p>
            <Home color={'error'} />
        </div>
    );
};

export default HomeView;
