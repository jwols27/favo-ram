import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import GenericObject from '../models/GenericObject';
import '../styles/table.styles.scss';

export type ColumnSettings = {
    header: string;
    field: string;
    width?: string;
    className?: string;
};

export interface ITableProps {
    tableName: string;
    settings: ColumnSettings[];
    objects: GenericObject[];
    editCallback?: (id: number) => void;
    deleteCallback?: (id: number) => void;
}

export const CTable = ({
    tableName,
    settings,
    objects,
    editCallback,
    deleteCallback,
    ...props
}: ITableProps & React.HTMLProps<HTMLTableElement>) => {
    const editable = React.useMemo(
        () => !!((editCallback || deleteCallback) && objects.length),
        [editCallback, deleteCallback],
    );

    return (
        <div className={'table-container'}>
            <table className={'jpl-table'} title={tableName} {...props}>
                <caption>{tableName}</caption>
                <colgroup>
                    {settings.map(({ header, width = 'auto' }) => (
                        <col key={header} style={{ width }} />
                    ))}
                    {editable && <col style={{ width: '100px' }} />}
                </colgroup>
                <thead>
                    <tr>
                        {settings.map(({ header }) => (
                            <th key={header} id={header}>
                                {header}
                            </th>
                        ))}
                        {editable && <th id={'actions'}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {objects.length ? (
                        objects.map((object) => (
                            <tr key={object.id}>
                                {settings.map(({ field, className }) => {
                                    return (
                                        <td
                                            key={field}
                                            id={field}
                                            className={className}
                                        >
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
                                {editable && (
                                    <td id={'actions'}>
                                        <CTableActions
                                            callbackId={object.id}
                                            editCallback={editCallback}
                                            deleteCallback={deleteCallback}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                id={'not-found'}
                                colSpan={settings.length + (editable ? 1 : 0)}
                            >
                                Nenhum item encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

interface ITableActionsProps {
    editCallback?: (id: number) => void;
    deleteCallback?: (id: number) => void;
    callbackId: number;
}

export const CTableActions = ({
    callbackId,
    editCallback,
    deleteCallback,
}: ITableActionsProps) => {
    return (
        <div className={'table-actions'}>
            {editCallback && (
                <div
                    className={'table-actions__item'}
                    onClick={() => editCallback(callbackId)}
                >
                    <FontAwesomeIcon icon={faEdit} fontSize={32} />
                </div>
            )}
            {deleteCallback && (
                <div
                    className={'table-actions__item'}
                    onClick={() => deleteCallback(callbackId)}
                >
                    <FontAwesomeIcon icon={faMinusCircle} fontSize={32} />
                </div>
            )}
        </div>
    );
};
