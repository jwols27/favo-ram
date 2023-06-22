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
        <div className={'grid-crud-container'}>
            <div className={'center-box'}>
                <CTable {...table} />
            </div>
            <div className={'center-box responsive-align'}>
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
                        <button className={'submit-button'} type="submit">
                            <span>Submit</span>
                        </button>
                        {editID && (
                            <button
                                className={'cancel-button'}
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
