import React from 'react';

const HomeView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram';
    }, []);

    return (
        <div className={'center-box'}>
            <h1 className={'color-2'}>FAVO-Ram</h1>
            <h1>oi</h1>
        </div>
    );
};

export default HomeView;
