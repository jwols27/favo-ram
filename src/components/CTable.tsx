import React from 'react';

import '../styles/table.styles.css';

type GenericObject = { id: number; [key: string]: any };

interface ITableProps {
    tableName: string;
    headerTitles: string[];
    columnFields: string[];
    objects: GenericObject[];

    imagePlaceholder?: string;
}

export const CTable = ({
    tableName,
    headerTitles,
    columnFields,
    objects,
    imagePlaceholder = 'name',
    ...props
}: ITableProps & React.HTMLProps<HTMLTableElement>) => {
    // React.useEffect(() => {}, [columnFields])

    return (
        <div className={'table-container'}>
            <table className={'jpl-table'} title={tableName} {...props}>
                <caption>{tableName}</caption>
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
                                    if (column === 'image')
                                        return (
                                            <th
                                                key={column}
                                                className={'table-image'}
                                            >
                                                <img
                                                    src={object['image']}
                                                    alt={
                                                        object[imagePlaceholder]
                                                            ? object[
                                                                  imagePlaceholder
                                                              ]
                                                            : ''
                                                    }
                                                />
                                            </th>
                                        );
                                    return (
                                        <th key={column}>{object[column]}</th>
                                    );
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
        </div>
    );
};
