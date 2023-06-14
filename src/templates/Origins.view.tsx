import React from 'react';
import { Origin } from '../models';
import { OriginService } from '../shared/services/OriginService';

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
            <table className={'my-table'}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {originList.map((origin) => (
                        <tr key={origin.id}>
                            <th>{origin.id}</th>
                            <th>{origin.name}</th>
                            <th>
                                <div className={'table-image'}>
                                    <img src={origin.image} alt={origin.name} />
                                </div>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OriginsView;
