import React from 'react';

type useOutsideCallbackProps = {
    ref: React.RefObject<HTMLElement>;
    callback: () => void;
};

export const useOutsideCallback = ({
    ref,
    callback,
}: useOutsideCallbackProps) => {
    React.useEffect(() => {
        const onClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [ref, callback]);
};
