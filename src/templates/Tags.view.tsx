import React from 'react';
import { Tag } from '../models';
import { TagService } from '../shared/services/TagService';
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
        width: '175px',
    },
    {
        header: 'Description',
        field: 'desc',
    },
];

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

    return <CTable tableName={'Tags'} settings={settings} objects={tagList} />;
};

export default TagsView;
