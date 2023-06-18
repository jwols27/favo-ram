import React from 'react';
import { Origin } from '../models';
import { OriginService } from '../shared/services/OriginService';
import { ColumnSettings, CTable } from '../components';

const settings: ColumnSettings[] = [
    {
        header: 'id',
        field: 'id',
        width: '50px',
    },
    {
        header: 'Name',
        field: 'name',
    },
    {
        header: 'Image',
        field: 'image',
        width: '74px',
    },
];

const OriginsView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Origins';
    }, []);

    const [originList, setOriginList] = React.useState<Origin[]>([]);

    const loadList = () => {
        OriginService.getAll().then((res) => {
            if (res instanceof Error) return console.log(res.message);
            console.log(res);
            setOriginList(res);
        });
    };

    React.useEffect(loadList, []);

    return (
        <CTable
            tableName={'Origins'}
            settings={settings}
            objects={originList}
        />
    );
};

export default OriginsView;
