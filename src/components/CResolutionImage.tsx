import React from 'react';

export const CResolutionImage = ({
    src,
    alt = '',
    className = '',
    ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const imgRef = React.useRef<HTMLImageElement>(null);

    const onLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = event.currentTarget;
        // console.log(`${alt}: ${naturalWidth} x ${naturalHeight}`);
        if (!imgRef.current) return;
        imgRef.current.classList.add(
            naturalWidth / naturalHeight < 0.9 ? 'tall' : 'wide',
        );
    };

    return (
        <img
            className={`res-image ${className}`}
            src={src}
            alt={alt}
            ref={imgRef}
            draggable={false}
            onLoad={onLoad}
            {...props}
        />
    );
};
