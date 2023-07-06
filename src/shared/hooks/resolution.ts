import React from 'react';

export const breakpoints = {
    mobile: 520,
    tablet: 768,
    small: 1024,
    laptop: 1366,
    highRes: 1920,
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
            tablet: breakpoints.tablet >= windowSize[0],
            small: breakpoints.small >= windowSize[0],
            laptop: breakpoints.laptop >= windowSize[0],
            highRes: breakpoints.highRes >= windowSize[0],
        },
        minWidth: {
            mobile: breakpoints.mobile <= windowSize[0],
            tablet: breakpoints.tablet <= windowSize[0],
            small: breakpoints.small <= windowSize[0],
            laptop: breakpoints.laptop <= windowSize[0],
            highRes: breakpoints.highRes <= windowSize[0],
        },
    };
};
