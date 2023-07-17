import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaintBrush } from '@fortawesome/free-solid-svg-icons';

import { CTable, ITableProps } from './CTable';

interface ITableManagerProps {
    editOrCreate: string;
    table: ITableProps;
    children: React.ReactNode;
    editID?: number;
    onSubmit?: () => void;
    onClear?: () => void;
}

export const CTableManager = ({
    editOrCreate,
    table,
    children,
    editID,
    onSubmit,
    onClear,
}: ITableManagerProps) => {
    return (
        <div className={'grid-crud-container shadow-box bg-color-3'}>
            <div className={'center-box-top'}>
                <CTable {...table} />
            </div>
            <div className={'center-box-col responsive-align'}>
                <div className={'crud-title color-2-dark'}>
                    <h3>
                        {editID ? 'Edit' : 'Create'} {editOrCreate}
                    </h3>
                    <FontAwesomeIcon
                        icon={editID ? faEdit : faPaintBrush}
                        fontSize={24}
                    />
                </div>

                <form className={'crud-form'} onSubmit={onSubmit}>
                    {children}

                    <div className={'crud-button-container'}>
                        <button className={'btn fill-2'} type="submit">
                            <span>Submit</span>
                        </button>
                        {editID && (
                            <button
                                className={'btn fill-3'}
                                type="button"
                                onClick={onClear}
                            >
                                <span>Cancel</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
