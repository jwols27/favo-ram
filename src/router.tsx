import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import { RouteObject } from 'react-router/dist/lib/context';

import App from './App';
import HomeView from './templates/Home.view';
import TagsManager from './templates/management/Tags.manager';
import OriginsManager from './templates/management/Origins.manager';
import CharactersManager from './templates/management/Characters.manager';
import EmporiumView from './templates/Emporium.view';
import CharacterView from './templates/Character.view.tsx';
import OriginView from './templates/Origin.view.tsx';
import {
    NotFoundView,
    ProtectedRoute,
    UnauthorizedView,
} from './templates/TemplateErrorHandler.tsx';
import LoginView from './templates/Login.view.tsx';

const routerData: RouteObject[] = [
    //HOME
    {
        path: '',
        element: <HomeView />,
    },

    //EMPORIUM
    {
        path: 'emporium',
        element: <Outlet />,
        children: [
            {
                path: '',
                element: <EmporiumView />,
            },
            {
                path: ':tag_id',
                element: <EmporiumView />,
            },
        ],
    },

    //CHARACTER
    {
        path: 'characters',
        element: <Outlet />,
        children: [
            {
                path: 'manage',
                element: (
                    <ProtectedRoute>
                        <CharactersManager />,
                    </ProtectedRoute>
                ),
            },
            {
                path: ':char_id',
                element: <CharacterView />,
            },
        ],
    },

    //ORIGIN
    {
        path: 'origins',
        element: <Outlet />,
        children: [
            {
                path: 'manage',
                element: (
                    <ProtectedRoute>
                        <OriginsManager />
                    </ProtectedRoute>
                ),
            },
            {
                path: ':origin_id',
                element: <OriginView />,
            },
        ],
    },

    //TAG
    {
        path: 'tags',
        element: <Outlet />,
        children: [
            {
                path: 'manage',
                element: (
                    <ProtectedRoute>
                        <TagsManager />
                    </ProtectedRoute>
                ),
            },
            {
                path: ':tag_id',
                loader: ({ params: { tag_id } }) =>
                    redirect(`/emporium?tags=${tag_id}`),
            },
        ],
    },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <App>
                <Outlet />
            </App>
        ),
        children: routerData,
    },
    {
        path: 'login',
        element: <LoginView />,
    },
    //UNAUTHORIZED
    {
        path: 'unauthorized',
        element: <UnauthorizedView />,
    },
    //NOT FOUND
    {
        path: '*',
        element: <NotFoundView />,
    },
]);

export default router;
