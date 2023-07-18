import React from 'react';

import '../styles/login.styles.scss';
import { useNavigate } from 'react-router-dom';
import { CDivider, CFormInput } from '../components';
import { useYupValidationResolver } from '../shared/hooks';
import { Login, LoginSchema } from '../models';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../shared/stores/user.slice.ts';
import {
    faArrowLeft,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginView = () => {
    React.useEffect(() => {
        document.title = 'FAVO-Ram | Login';
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resolver = useYupValidationResolver(LoginSchema);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver, mode: 'onSubmit' });

    const goBack = React.useCallback(
        () => navigate(localStorage.getItem('lastVisited') ?? '/'),
        [localStorage.getItem('lastVisited')],
    );

    const onSubmit: SubmitHandler<Login> = async (data) => {
        console.log(data);
        setValue('username', null);
        setValue('password', null);
        dispatch(setLoggedIn(true));
        goBack();
    };

    return (
        <div id={'login'} className={'center-box-fill bg-color-1'}>
            <div
                id={'login-box'}
                className={'shadow-box center-box bg-color-3-light'}
            >
                <img
                    id={'login-image'}
                    src={''}
                    alt={'logo'}
                    draggable={false}
                />
                <form className={'user-form'} onSubmit={handleSubmit(onSubmit)}>
                    <span>Login</span>
                    <CFormInput
                        register={register}
                        field={'username'}
                        placeholder={'Username'}
                        error={errors.username}
                    />

                    <CFormInput
                        register={register}
                        field={'password'}
                        placeholder={'Password'}
                        error={errors.password}
                    />

                    <CDivider
                        opacity={0.25}
                        width={'100%'}
                        style={{ margin: '8px 0' }}
                    />
                    <button
                        id={'btn_login'}
                        className={'btn fill-2'}
                        type={'submit'}
                    >
                        <span>Log-in</span>
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </button>
                    <button
                        id={'btn_go-back'}
                        className={'btn fill-3'}
                        onClick={goBack}
                        type={'button'}
                    >
                        <span>Go back</span>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
