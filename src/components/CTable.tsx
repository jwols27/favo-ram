import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import GenericObject from '../models/GenericObject';
import '../styles/table.styles.scss';
import { useNavigate } from 'react-router-dom';

export type ColumnSettings = {
    header: string;
    field: string;
    width?: string;
    className?: string;
};

export interface ITableProps {
    tableName: string;
    caption: string;
    settings: ColumnSettings[];
    objects: GenericObject[];
    editCallback?: (id: number) => Promise<void>;
    deleteCallback?: (id: number) => Promise<void>;
}

export const CTable = ({
    tableName,
    caption,
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

    const navigate = useNavigate();
    const goToRowPage = React.useCallback(
        (id: number) => navigate(`/${tableName}/${id}`),
        [tableName],
    );

    return (
        <div className={'table-container'}>
            <table className={'jpl-table'} title={caption} {...props}>
                <caption>{caption}</caption>
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
                                    if (field === 'image' && object['image']) {
                                        let img = new Image();
                                        img.src = object['image'] as string;
                                        return (
                                            <td
                                                key={field}
                                                id={field}
                                                onClick={() =>
                                                    goToRowPage(object.id)
                                                }
                                            >
                                                <div
                                                    className={`table-image ${className}`}
                                                >
                                                    <img
                                                        className={
                                                            img.width /
                                                                img.height <
                                                            0.9
                                                                ? 'tall'
                                                                : 'wide'
                                                        }
                                                        src={object['image']}
                                                        alt={''}
                                                    />
                                                </div>
                                            </td>
                                        );
                                    }

                                    return (
                                        <td
                                            key={field}
                                            id={field}
                                            onClick={() =>
                                                goToRowPage(object.id)
                                            }
                                        >
                                            <span>{object[field]}</span>
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
