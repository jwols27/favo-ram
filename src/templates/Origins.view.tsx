import React from 'react';
import { Origin } from '../models';
import { OriginService } from '../shared/services/OriginService';
import { CTable } from '../components';

const header: string[] = ['ID', 'Name', 'Image'];
const columns: string[] = ['id', 'name', 'image'];

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
        <div className={'center-box'}>
            <button onClick={loadList}>Teste</button>
            <CTable
                tableName={'Origins'}
                headerTitles={header}
                columnFields={columns}
                objects={originList}
            />
        </div>
    );
};

export default OriginsView;
