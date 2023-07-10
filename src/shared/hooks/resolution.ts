import React from 'react';

export const breakpoints = {
    mobile: 600,
    small: 900,
    medium: 1200,
    big: 1500,
};

export const useResolution = () => {
    const [windowSize, setWindowSize] = React.useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    React.useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return {
        width: windowSize[0],
        height: windowSize[1],
        maxWidth: {
            mobile: breakpoints.mobile >= windowSize[0],
            small: breakpoints.small >= windowSize[0],
            medium: breakpoints.medium >= windowSize[0],
            big: breakpoints.big >= windowSize[0],
        },
        minWidth: {
            mobile: breakpoints.mobile <= windowSize[0],
            small: breakpoints.small <= windowSize[0],
            medium: breakpoints.medium <= windowSize[0],
            big: breakpoints.big <= windowSize[0],
        },
    };
};
