import React from 'react';

const HomeView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram';
    }, []);

    return (
        <div className={'center-box-fill'}>
            <h1 className={'main-title color-2'}>FAVO-Ram</h1>
        </div>
    );
};

export default HomeView;
