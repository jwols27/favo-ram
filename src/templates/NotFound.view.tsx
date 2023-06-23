import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFoundView = () => {
    const navigate = useNavigate();
    useEffect(() => navigate('/'), [navigate]);

    return <div>Oops! It seems like you're in the wrong place!</div>;
};

export default NotFoundView;
