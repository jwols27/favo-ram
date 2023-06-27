import React from 'react';

interface IAnchorProps {
    children: React.ReactNode;
}

export const CAnchor = ({
    children,
    ...props
}: IAnchorProps & React.HTMLProps<HTMLAnchorElement>) => {
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={'#'}
            draggable={false}
            {...props}
        >
            {children}
        </a>
    );
};
