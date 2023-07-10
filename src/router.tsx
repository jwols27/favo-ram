import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import { RouteObject } from 'react-router/dist/lib/context';

import App from './App';
import HomeView from './templates/Home.view';
import TagsManager from './templates/management/Tags.manager';
import OriginsManager from './templates/management/Origins.manager';
import CharactersManager from './templates/management/Characters.manager';
import NotFoundView from './templates/NotFound.view';
import EmporiumView from './templates/Emporium.view';
import CharacterView from './templates/Character.view.tsx';
import OriginView from './templates/Origin.view.tsx';

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
                element: <CharactersManager />,
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
                element: <OriginsManager />,
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
                element: <TagsManager />,
            },
            {
                path: ':tag_id',
                element: <></>,
                loader: ({ params: { tag_id } }) =>
                    redirect(`/emporium/${tag_id}`),
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
