import React from 'react';

import '../styles/table.styles.css';

type GenericObject = { id: number; [key: string]: any };

export type ColumnSettings = {
    header: string;
    field: string;
    width?: string;
};

interface ITableProps {
    tableName: string;
    settings: ColumnSettings[];
    objects: GenericObject[];
}

export const CTable = ({
    tableName,
    settings,
    objects,
    ...props
}: ITableProps & React.HTMLProps<HTMLTableElement>) => {
    return (
        <div className={'table-container'}>
            <table className={'jpl-table'} title={tableName} {...props}>
                <caption>{tableName}</caption>
                <colgroup>
                    {settings.map(({ header, width = 'auto' }) => (
                        <col key={header} style={{ width }} />
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        {settings.map(({ header }) => (
                            <th key={header} id={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {objects.length ? (
                        objects.map((object) => (
                            <tr key={object.id}>
                                {settings.map(({ field }) => {
                                    return (
                                        <td key={field} id={field}>
                                            {field === 'image' &&
                                            object['image'] ? (
                                                <div className={'table-image'}>
                                                    <img
                                                        src={object['image']}
                                                        alt={''}
                                                    />
                                                </div>
                                            ) : (
                                                object[field]
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={objects.length}>
                                Nenhum item encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
