import React from 'react';

import '../styles/table.styles.css';

type GenericObject = { id: number; [key: string]: any };

interface ITableProps {
    headerTitles: string[];
    columnFields: string[];
    objects: GenericObject[];
}

export const CTable = ({
    headerTitles,
    columnFields,
    objects,
    ...props
}: ITableProps & React.HTMLProps<HTMLTableElement>) => {
    // React.useEffect(() => {}, [columnFields])

    return (
        <table className={'my-table'} {...props}>
            <thead>
                <tr>
                    {headerTitles.map((title) => (
                        <th key={title}>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {objects.length ? (
                    objects.map((object) => (
                        <tr key={object.id}>
                            {columnFields.map((column) => {
                                if (
                                    column === 'image' &&
                                    object['image'] !== null
                                )
                                    return (
                                        <th
                                            key={column}
                                            className={'table-image'}
                                        >
                                            <img
                                                src={object['image']}
                                                alt={''}
                                            />
                                        </th>
                                    );
                                return <th key={column}>{object[column]}</th>;
                            })}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <th colSpan={columnFields.length}>
                            Nenhum item encontrado.
                        </th>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
