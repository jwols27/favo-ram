import React from 'react';
import { Tag } from '../models';
import { TagService } from '../shared/services/TagService';
import { CTable } from '../components';

const header: string[] = ['ID', 'Name', 'Description'];
const columns: string[] = ['id', 'name', 'desc'];

const TagsView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Tags';
    }, []);

    const [tagList, setTagList] = React.useState<Tag[]>([]);
    const loadList = () => {
        TagService.getAll().then((res) => {
            if (res instanceof Error) return console.log(res.message);
            console.log(res);
            setTagList(res);
        });
    };

    React.useEffect(loadList, []);

    return (
        <div className={'center-box'}>
            <button onClick={loadList}>Teste</button>
            <CTable
                tableName={'Tags'}
                headerTitles={header}
                columnFields={columns}
                objects={tagList}
            />
        </div>
    );
};

export default TagsView;
