import React from 'react';
import { CCarousel } from '../components';

const HomeView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram';
    }, []);

    return (
        <div className={'center-box-fill'} style={{ flexDirection: 'column' }}>
            <h1 className={'main-title color-2'}>FAVO-Ram</h1>
            <div style={{ margin: 16 }} />
            <div style={{ width: 600, height: 300 }}>
                <CCarousel />
            </div>
        </div>
    );
};

export default HomeView;
