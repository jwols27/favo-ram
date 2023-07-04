import React, { CSSProperties } from 'react';

import '../styles/circular-loading.styles.scss';

interface ICircularLoadingProps {
    id?: string;
    additionalClasses?: string;
    color?: string;
    thickness?: number;
    size?: number;
    padding?: number;
}

export const CCircularLoading = ({
    id,
    additionalClasses = '',
    color,
    thickness,
    size,
    padding = 12,
}: ICircularLoadingProps) => {
    const styles = React.useMemo((): CSSProperties => {
        return {
            width: size,
            height: size,
            margin: padding / 2,

            borderWidth: thickness,
            borderTopColor: color,
        };
    }, [color, thickness, size, padding]);

    return (
        <div
            id={id}
            className={`circular-loading ${additionalClasses}`}
            style={
                size
                    ? { width: size + padding, height: size + padding }
                    : undefined
            }
        >
            <div style={styles}></div>
            <div style={styles}></div>
            <div style={styles}></div>
            <div style={styles}></div>
        </div>
    );
};
