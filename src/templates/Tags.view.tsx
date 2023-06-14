import React from 'react';
import { Tag } from '../models';
import { TagService } from '../shared/services/TagService';

const TagsView = () => {
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
            <table className={'my-table'}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>desc</th>
                    </tr>
                </thead>
                <tbody>
                    {tagList.map((tag) => (
                        <tr key={tag.id}>
                            <th>{tag.id}</th>
                            <th>{tag.name}</th>
                            <th>{tag.desc}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TagsView;
