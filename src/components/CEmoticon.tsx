import React from 'react';

import '../styles/emoticon.styles.css';
import junoBop from '../shared/assets/junoBop.png';

interface IEmoticonProps {
    children: React.ReactNode;
}

const CEmoticon = ({ children }: IEmoticonProps) => {
    return <span className={'emoticon-container'}>{children}</span>;
};

export const EmoticonJunoBop = () => {
    return (
        <div className="emoticon">
            <img src={junoBop} alt="junoBop" draggable={false} />
        </div>
    );
};

export default CEmoticon;
