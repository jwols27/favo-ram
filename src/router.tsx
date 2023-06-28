import { createBrowserRouter, Outlet } from 'react-router-dom';
import { RouteObject } from 'react-router/dist/lib/context';

import App from './App';
import HomeView from './templates/Home.view';
import TagsManager from './templates/management/Tags.manager';
import OriginsManager from './templates/management/Origins.manager';
import CharactersManager from './templates/management/Characters.manager';
import NotFoundView from './templates/NotFound.view';
import EmporiumView from './templates/Emporium.view';
import CharactersView from './templates/Characters.view';

const routerData: RouteObject[] = [
    //HOME
    {
        path: '',
        element: <HomeView />,
    },

    //EMPORIUM
    {
        path: 'emporium',
        element: <EmporiumView />,
    },

    //EMPORIUM
    {
        path: 'emporium',
        element: <EmporiumView />,
    },

    //CHARACTER
    {
        path: 'characters',
        element: <Outlet />,
        children: [
            {
                path: 'manage',
                element: <CharactersManager />,
            },
            {
                path: ':id',
                element: <CharactersView />,
            },
        ],
    },

    //ORIGIN
    {
        path: 'origins',
        element: <Outlet />,
        children: [
            {
                path: '',
                element: <OriginsManager />,
            },
            {
                path: 'manage',
                element: <OriginsManager />,
            },
            // {
            //     path: ':id',
            //     element: <OriginsManager />,
            // },
        ],
    },

    //TAG
    {
        path: 'tags',
        element: <Outlet />,
        children: [
            {
                path: '',
                element: <TagsManager />,
            },
            {
                path: 'manage',
                element: <TagsManager />,
            },
        ],
    },

    //NOT FOUND
    {
        path: '*',
        element: <NotFoundView />,
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
]);

export default router;
