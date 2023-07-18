import React from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../shared/stores/store.ts';

interface AuthProps {
    children: React.ReactNode;
}

export const NotFoundView = () => {
    const navigate = useNavigate();
    React.useEffect(() => navigate('/'), []);

    return (
        <div className={'center-box-fill'}>
            Oops! It seems like you're in the wrong place!
        </div>
    );
};

export const ProtectedRoute = ({ children }: AuthProps) => {
    const navigate = useNavigate();
    const loggedIn = store.getState().user.loggedIn;

    React.useEffect(() => {
        !loggedIn && navigate('/unauthorized');
    }, [loggedIn]);

    return loggedIn ? children : <div className={'center-box-fill'} />;
};

export const UnauthorizedView = () => {
    const navigate = useNavigate();

    return (
        <div id={'unauthorized'} className={'center-box-fill'}>
            <h3>You shouldn't be here!</h3>
            <button className={'btn fill-1'} onClick={() => navigate('/')}>
                <span>Go back</span>
            </button>
        </div>
    );
};
