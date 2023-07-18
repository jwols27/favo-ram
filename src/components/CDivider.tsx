import React from 'react';

interface IDividerProps {
    divColor?: 1 | 2 | 3 | 4;
    opacity?: number;
    width?: string | number;
}

export const CDivider = ({
    divColor = 4,
    opacity,
    width,
    ...props
}: IDividerProps & React.HTMLProps<HTMLTableElement>) => {
    return (
        <div
            className={`divider bg-color-${divColor}`}
            {...props}
            style={{ opacity, width, ...props.style }}
        />
    );
};
